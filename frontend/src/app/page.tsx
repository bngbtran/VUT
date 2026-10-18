import { Suspense } from "react";
import { AirportPicker, BoardTabs } from "@/components/board-controls";
import { FlightBoard, FlightBoardSkeleton } from "@/components/flight-board";
import { FlightSearch } from "@/components/flight-search";
import { WeatherCard, WeatherCardSkeleton } from "@/components/weather-card";
import { DEFAULT_AIRPORT, findAirport } from "@/lib/airports";
import { friendlyError } from "@/lib/api-error";
import { getAirportBoard } from "@/lib/aviationstack";
import { clockIn } from "@/lib/time";
import type { BoardType } from "@/types/flight";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 pb-16 md:pt-20">
      <section className="mb-14 flex flex-col items-start gap-6">
        <span className="rounded-full bg-terracotta/10 px-3 py-1 font-mono text-xs font-semibold tracking-widest text-clay uppercase ring-1 ring-terracotta/20">
          Dữ liệu chuyến bay thời gian thực
        </span>
        <h1 className="max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight text-balance md:text-6xl">
          Theo dõi chuyến bay. <span className="text-terracotta">Vút.</span>
        </h1>
        <p className="max-w-xl text-lg text-ink-300">
          Giờ bay, cổng, trạng thái và thời tiết hai đầu hành trình — trong một cái liếc mắt.
        </p>
        <FlightSearch />
      </section>

      <Suspense fallback={<BoardSectionSkeleton />}>
        <BoardSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function BoardSection({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const params = await searchParams;
  const requested = typeof params.airport === "string" ? params.airport.toUpperCase() : "";
  // Chỉ cho phép sân bay trong danh sách — tránh tốn lượt gọi API với giá trị tuỳ ý.
  const airport = findAirport(requested)?.board ? requested : DEFAULT_AIRPORT;
  const type: BoardType = params.type === "arrival" ? "arrival" : "departure";
  const info = findAirport(airport)!;

  return (
    <section className="space-y-5">
      <AirportPicker current={airport} type={type} />
      <div className="flex flex-wrap items-end justify-between gap-4 pt-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {info.city} <span className="font-mono text-lg text-ink-500">{airport}</span>
          </h2>
          <p className="text-sm text-ink-500">Sân bay {info.name}</p>
        </div>
        <BoardTabs airport={airport} type={type} />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[1fr_20rem]">
        <Suspense key={`${airport}-${type}`} fallback={<FlightBoardSkeleton />}>
          <Board airport={airport} type={type} />
        </Suspense>
        <div className="space-y-5 lg:sticky lg:top-20">
          <Suspense key={airport} fallback={<WeatherCardSkeleton label="Thời tiết tại sân bay" />}>
            <WeatherCard iata={airport} label="Thời tiết tại sân bay" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

async function Board({ airport, type }: { airport: string; type: BoardType }) {
  const res = await getAirportBoard(airport, type);
  if (!res.ok) {
    return (
      <div className="card px-6 py-12 text-center">
        <p className="font-semibold">Chưa tải được bảng giờ bay</p>
        <p className="mt-1 text-sm text-ink-500">{friendlyError(res.code)}</p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <FlightBoard flights={res.data} type={type} airport={airport} />
      <p className="px-1 text-xs text-ink-500">
        {res.data.length} chuyến · cập nhật lúc {clockIn(res.fetchedAt, "Asia/Ho_Chi_Minh")} · nguồn
        aviationstack
      </p>
    </div>
  );
}

function BoardSectionSkeleton() {
  return (
    <div className="space-y-5">
      <div className="h-9 w-full max-w-2xl animate-pulse rounded-full bg-ink-900" />
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_20rem]">
        <FlightBoardSkeleton />
        <WeatherCardSkeleton />
      </div>
    </div>
  );
}
