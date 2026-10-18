import { friendlyError } from "@/lib/api-error";
import { findAirport } from "@/lib/airports";
import { getAirportWeather } from "@/lib/weatherstack";
import { WeatherIcon } from "@/components/weather-icon";

export async function WeatherCard({ iata, label }: { iata: string; label?: string }) {
  const airport = findAirport(iata);
  const res = await getAirportWeather(iata);

  return (
    <section className="card p-5">
      <header className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          {label && (
            <div className="text-xs font-semibold uppercase tracking-widest text-ink-500">{label}</div>
          )}
          <div className="truncate font-semibold">
            {airport?.city ?? iata} <span className="font-mono text-sm text-ink-500">{iata}</span>
          </div>
        </div>
        {res.ok && res.data.localtime && (
          <div className="shrink-0 font-mono text-xs text-ink-500">
            {res.data.localtime.slice(11)} giờ địa phương
          </div>
        )}
      </header>

      {res.ok ? (
        <>
          <div className="mt-4 flex items-center gap-4">
            <WeatherIcon kind={res.data.kind} isDay={res.data.isDay} className="size-14 text-bone" />
            <div>
              <div className="text-5xl font-bold tracking-tight">
                {res.data.temperature}
                <span className="align-top text-2xl text-ink-500">°C</span>
              </div>
              <div className="text-sm text-ink-300">{res.data.description}</div>
            </div>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
            <Stat label="Cảm giác" value={`${res.data.feelsLike}°`} />
            <Stat label="Độ ẩm" value={`${res.data.humidity}%`} />
            <Stat label="Gió" value={`${res.data.windSpeed} km/h ${res.data.windDir}`} />
            <Stat label="Tầm nhìn" value={`${res.data.visibility} km`} />
          </dl>
        </>
      ) : (
        <p className="mt-4 text-sm text-ink-500">
          Chưa có dữ liệu thời tiết — {friendlyError(res.code)}
        </p>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ink-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

export function WeatherCardSkeleton({ label }: { label?: string }) {
  return (
    <section className="card animate-pulse p-5" aria-busy>
      {label && <div className="text-xs font-semibold uppercase tracking-widest text-ink-500">{label}</div>}
      <div className="mt-2 h-4 w-32 rounded bg-ink-700" />
      <div className="mt-5 flex items-center gap-4">
        <div className="size-14 rounded-full bg-ink-700" />
        <div className="h-10 w-24 rounded bg-ink-700" />
      </div>
      <div className="mt-5 h-8 rounded bg-ink-800" />
    </section>
  );
}
