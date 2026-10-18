import { cacheLife } from "next/cache";
import { findAirport } from "@/lib/airports";
import { ERROR_CACHE_LIFE, type ApiResult } from "@/lib/api-error";

// Open-Meteo: miễn phí, không cần key, số liệu "current" cập nhật mỗi 15 phút.
const WEATHER_CACHE_LIFE = { stale: 300, revalidate: 900, expire: 3 * 3600 };

export type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "rain" | "thunder" | "snow";

export type Weather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  /** km */
  visibility: number;
  isDay: boolean;
  kind: WeatherKind;
  description: string;
  /** Giờ địa phương tại điểm đo, "YYYY-MM-DDTHH:mm" */
  localtime: string;
};

// Mã thời tiết WMO → nhóm biểu tượng + mô tả tiếng Việt.
function classify(code: number, isDay: boolean): [WeatherKind, string] {
  if (code === 0) return ["clear", isDay ? "Nắng" : "Trời quang"];
  if (code === 1) return ["partly", isDay ? "Nắng nhẹ" : "Ít mây"];
  if (code === 2) return ["partly", "Có mây rải rác"];
  if (code === 3) return ["cloudy", "U ám"];
  if (code === 45 || code === 48) return ["fog", "Sương mù"];
  if (code >= 51 && code <= 57) return ["rain", "Mưa phùn"];
  if (code === 61 || code === 80) return ["rain", "Mưa nhẹ"];
  if (code === 63 || code === 81) return ["rain", "Mưa vừa"];
  if (code === 65 || code === 82) return ["rain", "Mưa to"];
  if (code === 66 || code === 67) return ["rain", "Mưa băng"];
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return ["snow", "Tuyết"];
  if (code >= 95) return ["thunder", code === 95 ? "Dông" : "Dông kèm mưa đá"];
  return ["cloudy", "Không rõ"];
}

const COMPASS = ["B", "ĐB", "Đ", "ĐN", "N", "TN", "T", "TB"];
function compass(deg: number): string {
  return COMPASS[Math.round(deg / 45) % 8];
}

type RawCurrent = {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  visibility: number;
};

function normalize(c: RawCurrent): Weather {
  const isDay = c.is_day === 1;
  const [kind, description] = classify(c.weather_code, isDay);
  return {
    temperature: Math.round(c.temperature_2m),
    feelsLike: Math.round(c.apparent_temperature),
    humidity: c.relative_humidity_2m,
    windSpeed: Math.round(c.wind_speed_10m),
    windDir: compass(c.wind_direction_10m),
    visibility: Math.round(c.visibility / 100) / 10,
    isDay,
    kind,
    description,
    localtime: c.time,
  };
}

/**
 * Thời tiết hiện tại cho nhiều sân bay trong MỘT lần gọi (Open-Meteo nhận danh sách toạ độ).
 * Sân bay không có trong lib/airports bị bỏ qua.
 */
export async function getWeatherBatch(iatas: string[]): Promise<ApiResult<Record<string, Weather>>> {
  "use cache: remote";
  const airports = [...new Set(iatas)].sort().flatMap((i) => findAirport(i) ?? []);
  if (airports.length === 0) {
    cacheLife(WEATHER_CACHE_LIFE);
    return { ok: true, data: {}, fetchedAt: new Date().toISOString() };
  }

  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", airports.map((a) => a.lat).join(","));
  url.searchParams.set("longitude", airports.map((a) => a.lon).join(","));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,visibility",
  );
  url.searchParams.set("timezone", "auto");

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok || json.error) {
      cacheLife(ERROR_CACHE_LIFE);
      return { ok: false, code: json.reason ? "open_meteo" : String(res.status) };
    }
    // 1 toạ độ → object, nhiều toạ độ → mảng (cùng thứ tự)
    const list: { current: RawCurrent }[] = Array.isArray(json) ? json : [json];
    const data: Record<string, Weather> = {};
    airports.forEach((a, i) => {
      if (list[i]?.current) data[a.iata] = normalize(list[i].current);
    });
    cacheLife(WEATHER_CACHE_LIFE);
    return { ok: true, data, fetchedAt: new Date().toISOString() };
  } catch {
    cacheLife(ERROR_CACHE_LIFE);
    return { ok: false, code: "network" };
  }
}

export async function getAirportWeather(iata: string): Promise<ApiResult<Weather>> {
  if (!findAirport(iata)) return { ok: false, code: "unknown_airport" };
  const res = await getWeatherBatch([iata]);
  if (!res.ok) return res;
  const w = res.data[iata];
  return w ? { ok: true, data: w, fetchedAt: res.fetchedAt } : { ok: false, code: "unknown_airport" };
}
