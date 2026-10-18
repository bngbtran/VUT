import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FlightRoute } from "@/components/flight-route";
import { FlightSearch } from "@/components/flight-search";
import { StatusBadge } from "@/components/status-badge";
import { WeatherCard, WeatherCardSkeleton } from "@/components/weather-card";
import { findAirport } from "@/lib/airports";
import { friendlyError, type ApiResult } from "@/lib/api-error";
import { getAirportBoard, getFlightByCode, normalizeFlightCode } from "@/lib/aviationstack";
import { clock, clockIn, formatDuration, localToEpoch } from "@/lib/time";
import type { BoardType, Flight, FlightEndpoint } from "@/types/flight";

export async function generateMetadata({ params }: PageProps<"/flight/[code]">): Promise<Metadata> {
  const { code } = await params;
  return { title: `Chuyến ${decodeURIComponent(code).toUpperCase()}` };
}

export default function FlightPage({ params, searchParams }: PageProps<"/flight/[code]">) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="text-sm text-ink-500 transition hover:text-bone">
          ← Bảng giờ bay
        </Link>
        <div className="w-full sm:w-auto sm:min-w-[24rem]">
          <FlightSearch />
        </div>
      </div>
      <Suspense fallback={<FlightSkeleton />}>
        <FlightDetail params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

/** Dùng lại bảng giờ bay đã cache nếu người dùng đi từ bảng sang → không tốn thêm lượt gọi API. */
async function loadFlight(code: string, from?: string, type?: BoardType): Promise<ApiResult<Flight | null>> {
  if (from && type && findAirport(from)?.board) {
    const board = await getAirportBoard(from, type);
    const hit = board.ok ? board.data.find((f) => f.code === code) : undefined;
    if (board.ok && hit) return { ok: true, data: hit, fetchedAt: board.fetchedAt };
  }
  return getFlightByCode(code);
}

async function FlightDetail({
  params,
  searchParams,
}: Pick<PageProps<"/flight/[code]">, "params" | "searchParams">) {
  const [{ code: raw }, sp] = await Promise.all([params, searchParams]);
  const code = normalizeFlightCode(decodeURIComponent(raw));
  if (!code) return <Message title="Mã chuyến bay không hợp lệ" body="Ví dụ mã hợp lệ: VN213, VJ121, QH203." />;

  const from = typeof sp.from === "string" ? sp.from.toUpperCase() : undefined;
  const type = sp.type === "arrival" ? "arrival" : sp.type === "departure" ? "departure" : undefined;
  const res = await loadFlight(code, from, type);

  if (!res.ok) return <Message title={`Chưa tải được chuyến ${code}`} body={friendlyError(res.code)} />;
  if (!res.data)
    return (
      <Message
        title={`Không tìm thấy chuyến ${code}`}
        body="Có thể chuyến không bay hôm nay, hoặc mã thuộc hãng khác (chuyến liên danh). Kiểm tra lại mã trên vé của bạn."
      />
    );

  const f = res.data;
  const dep = f.departure;
  const arr = f.arrival;
  const depEpoch = localToEpoch(dep.actual ?? dep.estimated ?? dep.scheduled, dep.timezone);
  const arrEpoch = localToEpoch(arr.actual ?? arr.estimated ?? arr.scheduled, arr.timezone);
  const schedDep = localToEpoch(dep.scheduled, dep.timezone);
  const schedArr = localToEpoch(arr.scheduled, arr.timezone);
  const duration = schedDep && schedArr && schedArr > schedDep ? (schedArr - schedDep) / 60000 : null;

  return (
    <div className="space-y-5">
      <section className="card relative overflow-hidden p-6 md:p-8">
        <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-terracotta/15 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-sm text-ink-300">{f.airline}</div>
            <h1 className="font-mono text-4xl font-bold tracking-tight md:text-5xl">{f.code}</h1>
            <div className="mt-1 text-sm text-ink-500">
              Ngày bay {f.date.split("-").reverse().join("/")}
              {duration && <> · Thời gian bay {formatDuration(duration)}</>}
            </div>
          </div>
          <div className="text-lg">
            <StatusBadge status={f.status} />
          </div>
        </div>

        <div className="relative mt-8">
          <FlightRoute
            from={dep.iata}
            to={arr.iata}
            departEpoch={depEpoch}
            arriveEpoch={arrEpoch}
            status={f.status}
          />
          <div className="mt-1 flex justify-between gap-4 text-sm text-ink-300">
            <span className="truncate">{dep.city}</span>
            <span className="truncate text-right">{arr.city}</span>
          </div>
        </div>
      </section>

      <div className="grid gap-5 md:grid-cols-2">
        <EndpointCard title="Khởi hành" e={dep} kind="departure" />
        <EndpointCard title="Đến" e={arr} kind="arrival" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Suspense fallback={<WeatherCardSkeleton label="Thời tiết điểm đi" />}>
          <WeatherCard iata={dep.iata} label="Thời tiết điểm đi" />
        </Suspense>
        <Suspense fallback={<WeatherCardSkeleton label="Thời tiết điểm đến" />}>
          <WeatherCard iata={arr.iata} label="Thời tiết điểm đến" />
        </Suspense>
      </div>

      {(f.aircraft?.model || f.aircraft?.registration || f.live) && (
        <section className="card grid grid-cols-2 gap-4 p-5 text-sm sm:grid-cols-4">
          {f.aircraft?.model && <Info label="Máy bay" value={f.aircraft.model} mono />}
          {f.aircraft?.registration && <Info label="Số đăng ký" value={f.aircraft.registration} mono />}
          {f.live && <Info label="Độ cao" value={`${Math.round(f.live.altitude).toLocaleString("vi-VN")} m`} />}
          {f.live && <Info label="Tốc độ" value={`${Math.round(f.live.speed)} km/h`} />}
        </section>
      )}

      <p className="px-1 text-xs text-ink-500">
        Cập nhật lúc {clockIn(res.fetchedAt, "Asia/Ho_Chi_Minh")} (giờ Việt Nam) · giờ hiển thị là giờ địa
        phương tại từng sân bay · nguồn aviationstack, weatherstack
      </p>
    </div>
  );
}

function EndpointCard({ title, e, kind }: { title: string; e: FlightEndpoint; kind: "departure" | "arrival" }) {
  const best = e.actual ?? e.estimated;
  const changed = best && e.scheduled && clock(best) !== clock(e.scheduled);
  return (
    <section className="card p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-xs font-semibold tracking-widest text-ink-500 uppercase">{title}</h2>
        {e.delay ? <span className="text-xs font-semibold text-status-delayed">Trễ {e.delay} phút</span> : null}
      </div>
      <div className="mt-1 truncate font-semibold">
        {e.airport} <span className="font-mono text-sm text-ink-500">{e.iata}</span>
      </div>

      <div className="mt-4 flex items-end gap-3">
        <span className={`font-mono text-5xl font-bold ${changed ? "text-status-delayed" : "text-clay"}`}>
          {clock(changed ? best : e.scheduled)}
        </span>
        {changed && <span className="mb-1.5 font-mono text-lg text-ink-500 line-through">{clock(e.scheduled)}</span>}
      </div>
      <div className="mt-1 text-xs text-ink-500">
        {e.actual ? "Thực tế" : changed ? "Dự kiến" : "Theo lịch"} · giờ địa phương
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
        <Info label="Nhà ga" value={e.terminal ?? "—"} mono big />
        <Info label="Cổng" value={e.gate ?? "—"} mono big />
        {kind === "arrival" ? (
          <Info label="Băng chuyền" value={e.baggage ?? "—"} mono big />
        ) : (
          <Info label="Múi giờ" value={e.timezone.split("/").pop()?.replace(/_/g, " ") ?? "—"} />
        )}
      </dl>
    </section>
  );
}

function Info({ label, value, mono, big }: { label: string; value: string; mono?: boolean; big?: boolean }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-ink-500">{label}</dt>
      <dd className={`truncate ${mono ? "font-mono" : ""} ${big ? "text-2xl font-bold" : "font-medium"}`}>
        {value}
      </dd>
    </div>
  );
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <div className="card px-6 py-16 text-center">
      <p className="text-xl font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-ink-500">{body}</p>
    </div>
  );
}

function FlightSkeleton() {
  return (
    <div className="space-y-5" aria-busy>
      <div className="card h-64 animate-pulse" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="card h-56 animate-pulse" />
        <div className="card h-56 animate-pulse" />
      </div>
    </div>
  );
}
