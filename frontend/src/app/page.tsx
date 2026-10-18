import { FlightBoard } from "@/components/flight-board";
import { mockDepartures } from "@/lib/mock-flights";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <section className="mb-10 max-w-2xl">
        <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-amber">
          Khởi hành · SGN Tân Sơn Nhất
        </p>
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          Theo dõi chuyến bay.{" "}
          <span className="text-amber">Vút.</span>
        </h1>
        <p className="mt-4 text-lg text-night-300">
          Giờ bay, cổng, trạng thái — cập nhật trong một cái liếc mắt.
        </p>
      </section>

      <FlightBoard flights={mockDepartures} />

      <p className="mt-4 text-sm text-night-500">
        Dữ liệu mẫu — chưa kết nối nguồn dữ liệu chuyến bay thật.
      </p>
    </div>
  );
}
