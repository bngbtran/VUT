import { cacheLife } from "next/cache";
import { cityOf } from "@/lib/airports";
import { ERROR_CACHE_LIFE, type ApiResult } from "@/lib/api-error";
import { reserveCall } from "@/lib/quota";
import { stripOffset } from "@/lib/time";
import type { BoardType, Flight, FlightEndpoint, FlightStatus } from "@/types/flight";

// Gói miễn phí có hạn mức theo tháng → cache dài, dùng chung giữa mọi instance (use cache: remote).
const FLIGHTS_CACHE_LIFE = { stale: 300, revalidate: 1800, expire: 6 * 3600 };

type RawEndpoint = {
  airport: string | null;
  timezone: string | null;
  iata: string | null;
  terminal: string | null;
  gate: string | null;
  baggage?: string | null;
  delay: number | null;
  scheduled: string | null;
  estimated: string | null;
  actual: string | null;
};

type RawFlight = {
  flight_date: string;
  flight_status: string;
  departure: RawEndpoint;
  arrival: RawEndpoint;
  airline: { name: string | null; iata: string | null } | null;
  flight: { iata: string | null; number: string | null; codeshared: unknown | null };
  aircraft: { registration: string | null; iata: string | null } | null;
  live: {
    updated: string;
    latitude: number;
    longitude: number;
    altitude: number;
    speed_horizontal: number;
    is_ground: boolean;
  } | null;
};

async function request(params: Record<string, string>): Promise<ApiResult<RawFlight[]>> {
  const key = process.env.AVIATIONSTACK_ACCESS_KEY?.trim();
  if (!key) return { ok: false, code: "missing_key" };

  // Hạn mức tháng: giữ chỗ 1 lượt trước khi gọi; hết lượt → không gọi.
  const quota = await reserveCall();
  if (!quota.ok) return quota;

  const url = new URL("https://api.aviationstack.com/v1/flights");
  url.searchParams.set("access_key", key);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  try {
    const res = await fetch(url);
    const json = await res.json();
    if (json.error) return { ok: false, code: String(json.error.code ?? json.error.type) };
    return { ok: true, data: json.data as RawFlight[], fetchedAt: new Date().toISOString() };
  } catch {
    return { ok: false, code: "network" };
  }
}

function titleCase(s: string): string {
  return s.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
}

function endpoint(raw: RawEndpoint): FlightEndpoint {
  const iata = raw.iata ?? "???";
  const airport = raw.airport ?? iata;
  return {
    iata,
    airport,
    city: cityOf(iata, airport),
    timezone: raw.timezone ?? "UTC",
    terminal: raw.terminal,
    gate: raw.gate,
    baggage: raw.baggage ?? null,
    delay: raw.delay,
    scheduled: stripOffset(raw.scheduled),
    estimated: stripOffset(raw.estimated),
    actual: stripOffset(raw.actual),
  };
}

function status(raw: RawFlight): FlightStatus {
  const s = raw.flight_status;
  if (s === "scheduled") return (raw.departure.delay ?? 0) >= 15 ? "delayed" : "scheduled";
  if (["active", "landed", "cancelled", "diverted", "incident"].includes(s)) return s as FlightStatus;
  return "unknown";
}

function normalize(raw: RawFlight): Flight {
  return {
    code: raw.flight.iata?.toUpperCase() ?? "—",
    date: raw.flight_date,
    status: status(raw),
    airline: titleCase(raw.airline?.name ?? "Không rõ hãng"),
    airlineIata: raw.airline?.iata?.toUpperCase() ?? null,
    departure: endpoint(raw.departure),
    arrival: endpoint(raw.arrival),
    aircraft: raw.aircraft
      ? { registration: raw.aircraft.registration, model: raw.aircraft.iata }
      : null,
    live: raw.live
      ? {
          latitude: raw.live.latitude,
          longitude: raw.live.longitude,
          altitude: raw.live.altitude,
          speed: raw.live.speed_horizontal,
          isGround: raw.live.is_ground,
          updated: raw.live.updated,
        }
      : null,
  };
}

/** Bảng giờ khởi hành / đến của một sân bay. Bỏ các bản ghi codeshare (trùng chuyến thật). */
export async function getAirportBoard(iata: string, type: BoardType): Promise<ApiResult<Flight[]>> {
  "use cache: remote";
  const res = await request({ [type === "departure" ? "dep_iata" : "arr_iata"]: iata, limit: "100" });
  if (!res.ok) {
    cacheLife(ERROR_CACHE_LIFE);
    return res;
  }
  cacheLife(FLIGHTS_CACHE_LIFE);
  const side = type === "departure" ? "departure" : "arrival";
  const flights = res.data
    .filter((f) => !f.flight.codeshared && f.flight.iata)
    .map(normalize)
    .sort((a, b) => (a[side].scheduled ?? "").localeCompare(b[side].scheduled ?? ""));
  return { ok: true, data: flights, fetchedAt: res.fetchedAt };
}

/** Tra một chuyến theo mã IATA. Ưu tiên chuyến đang bay, rồi chuyến của ngày gần nhất. */
export async function getFlightByCode(code: string): Promise<ApiResult<Flight | null>> {
  "use cache: remote";
  const res = await request({ flight_iata: code, limit: "10" });
  if (!res.ok) {
    cacheLife(ERROR_CACHE_LIFE);
    return res;
  }
  cacheLife(FLIGHTS_CACHE_LIFE);
  const flights = res.data.map(normalize);
  const pick =
    flights.find((f) => f.status === "active") ??
    flights.sort((a, b) => b.date.localeCompare(a.date))[0] ??
    null;
  return { ok: true, data: pick, fetchedAt: res.fetchedAt };
}

/** Mã chuyến hợp lệ: 2 ký tự hãng + 1–4 số (+ chữ cái tuỳ chọn), vd VN213, VJ121, 8M123. */
export function normalizeFlightCode(input: string): string | null {
  const code = input.replace(/\s+/g, "").toUpperCase();
  return /^[A-Z0-9]{2}\d{1,4}[A-Z]?$/.test(code) ? code : null;
}
