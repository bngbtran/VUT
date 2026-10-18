import { cacheLife } from "next/cache";
import { findAirport } from "@/lib/airports";
import { ERROR_CACHE_LIFE, type ApiResult } from "@/lib/api-error";

const WEATHER_CACHE_LIFE = { stale: 300, revalidate: 3600, expire: 6 * 3600 };

export type WeatherKind = "clear" | "partly" | "cloudy" | "fog" | "rain" | "thunder" | "snow";

export type Weather = {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDir: string;
  visibility: number;
  uvIndex: number;
  isDay: boolean;
  kind: WeatherKind;
  description: string;
  /** Giờ địa phương tại điểm đo, "YYYY-MM-DD HH:mm" */
  localtime: string;
};

// Mã thời tiết weatherstack (chuẩn WWO) → nhóm biểu tượng + mô tả tiếng Việt.
const CODES: Record<number, [WeatherKind, string]> = {
  113: ["clear", "Trời quang"],
  116: ["partly", "Có mây rải rác"],
  119: ["cloudy", "Nhiều mây"],
  122: ["cloudy", "U ám"],
  143: ["fog", "Sương mù nhẹ"],
  176: ["rain", "Có thể có mưa rào"],
  185: ["rain", "Mưa phùn lạnh"],
  200: ["thunder", "Có thể có dông"],
  248: ["fog", "Sương mù"],
  260: ["fog", "Sương mù dày"],
  263: ["rain", "Mưa phùn"],
  266: ["rain", "Mưa phùn"],
  293: ["rain", "Mưa nhẹ"],
  296: ["rain", "Mưa nhẹ"],
  299: ["rain", "Mưa vừa"],
  302: ["rain", "Mưa vừa"],
  305: ["rain", "Mưa to"],
  308: ["rain", "Mưa rất to"],
  353: ["rain", "Mưa rào nhẹ"],
  356: ["rain", "Mưa rào"],
  359: ["rain", "Mưa rào rất to"],
  386: ["thunder", "Mưa dông"],
  389: ["thunder", "Dông mạnh"],
  392: ["thunder", "Dông kèm tuyết"],
  395: ["thunder", "Dông kèm tuyết"],
};

function classify(code: number, isDay: boolean, fallback: string): [WeatherKind, string] {
  if (code === 113) return ["clear", isDay ? "Nắng" : "Trời quang"];
  if (CODES[code]) return CODES[code];
  if ((code >= 179 && code <= 182) || (code >= 227 && code <= 230) || (code >= 311 && code <= 377))
    return ["snow", "Tuyết / mưa băng"];
  return ["cloudy", fallback || "Không rõ"];
}

async function fetchCurrent(query: string, key: string, protocol: "https" | "http") {
  const url = new URL(`${protocol}://api.weatherstack.com/current`);
  url.searchParams.set("access_key", key);
  url.searchParams.set("query", query);
  url.searchParams.set("units", "m");
  const res = await fetch(url);
  return res.json();
}

/** Thời tiết hiện tại tại một sân bay (theo toạ độ trong lib/airports). */
export async function getAirportWeather(iata: string): Promise<ApiResult<Weather>> {
  "use cache: remote";
  const key = process.env.WEATHERSTACK_ACCESS_KEY;
  const airport = findAirport(iata);
  if (!key || !airport) {
    cacheLife(ERROR_CACHE_LIFE);
    return { ok: false, code: key ? "unknown_airport" : "missing_key" };
  }

  try {
    const query = `${airport.lat},${airport.lon}`;
    let json = await fetchCurrent(query, key, "https");
    // Gói miễn phí có thể không cho HTTPS (mã 105) → thử lại qua HTTP (gọi từ server, key không lộ ra trình duyệt).
    if (json.error?.code === 105) json = await fetchCurrent(query, key, "http");
    if (json.error) {
      cacheLife(ERROR_CACHE_LIFE);
      return { ok: false, code: String(json.error.type ?? json.error.code) };
    }

    const c = json.current;
    const isDay = c.is_day === "yes";
    const [kind, description] = classify(c.weather_code, isDay, c.weather_descriptions?.[0]);
    cacheLife(WEATHER_CACHE_LIFE);
    return {
      ok: true,
      fetchedAt: new Date().toISOString(),
      data: {
        temperature: c.temperature,
        feelsLike: c.feelslike,
        humidity: c.humidity,
        windSpeed: c.wind_speed,
        windDir: c.wind_dir,
        visibility: c.visibility,
        uvIndex: c.uv_index,
        isDay,
        kind,
        description,
        localtime: json.location?.localtime ?? "",
      },
    };
  } catch {
    cacheLife(ERROR_CACHE_LIFE);
    return { ok: false, code: "network" };
  }
}
