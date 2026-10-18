import type { Metadata } from "next";
import { LogoSymbol, LogoWordmark } from "@/components/logo";
import { StatusBadge, statusMeta } from "@/components/status-badge";
import type { FlightStatus } from "@/types/flight";

export const metadata: Metadata = {
  title: "Thương hiệu",
  description: "Bộ nhận diện thương hiệu VÚT: logo, màu sắc, chữ, giọng văn.",
};

const brandColors = [
  { name: "Đêm", en: "Midnight", hex: "#0A1430", role: "Màu chủ đạo, nền tối" },
  { name: "Hổ phách", en: "Amber", hex: "#FFB020", role: "Màu nhận diện, dấu sắc, giờ bay" },
  { name: "Trời", en: "Sky", hex: "#4C8DFF", role: "Liên kết, tương tác" },
  { name: "Mây", en: "Cloud", hex: "#F4F6FB", role: "Nền sáng, chữ trên nền tối" },
];

const nightScale = [
  ["950", "#060C1F"],
  ["900", "#0A1430"],
  ["800", "#111E42"],
  ["700", "#1B2A55"],
  ["500", "#5B6B94"],
  ["300", "#A9B4D0"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-night-800 py-12">
      <h2 className="mb-6 font-mono text-sm font-semibold uppercase tracking-widest text-amber">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Bộ nhận diện VÚT</h1>
        <p className="mt-4 text-lg text-night-300">
          <em>Vút</em> — từ tượng thanh chỉ thứ lao đi thật nhanh. Dấu sắc trên chữ Ú là vệt
          cất cánh màu hổ phách, lấy từ chữ LED trên bảng giờ bay sân bay.
        </p>
      </header>

      <Section title="Logo">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-night-800">
            <LogoSymbol className="size-28" />
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-night-900 text-cloud ring-1 ring-night-800">
            <LogoWordmark className="h-20 w-auto" />
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-cloud text-midnight">
            <LogoWordmark className="h-20 w-auto" />
          </div>
        </div>
        <ul className="mt-6 grid gap-2 text-sm text-night-300 md:grid-cols-2">
          <li>• Vệt dấu sắc luôn màu hổ phách #FFB020 trên mọi nền.</li>
          <li>• Kích thước tối thiểu: symbol 16px, wordmark rộng 64px.</li>
          <li>• Không xoay, đổ bóng, hay đổi góc dấu sắc.</li>
          <li>• Viết tên thương hiệu là VÚT — in hoa, có dấu.</li>
        </ul>
      </Section>

      <Section title="Màu thương hiệu">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {brandColors.map((c) => (
            <div key={c.hex} className="overflow-hidden rounded-2xl ring-1 ring-night-800">
              <div className="h-28 border-b border-night-800" style={{ background: c.hex }} />
              <div className="bg-night-900 p-4">
                <div className="font-semibold">
                  {c.name} <span className="text-night-500">· {c.en}</span>
                </div>
                <div className="font-mono text-sm text-night-300">{c.hex}</div>
                <div className="mt-1 text-xs text-night-500">{c.role}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-10 mb-3 font-semibold">Thang nền tối</h3>
        <div className="flex overflow-hidden rounded-xl ring-1 ring-night-800">
          {nightScale.map(([step, hex]) => (
            <div key={step} className="flex-1">
              <div className="h-14" style={{ background: hex }} />
              <div className="bg-night-900 px-2 py-2 font-mono text-[11px] text-night-300">
                {step}
                <span className="hidden sm:inline"> · {hex}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-10 mb-3 font-semibold">Trạng thái chuyến bay</h3>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(statusMeta) as FlightStatus[]).map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
        <p className="mt-3 text-sm text-night-500">
          Trạng thái luôn có chữ đi kèm — không chỉ dựa vào màu.
        </p>
      </Section>

      <Section title="Chữ">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-night-900 p-6 ring-1 ring-night-800">
            <div className="text-xs text-night-500">Tiêu đề & nội dung</div>
            <div className="mt-1 text-2xl font-bold">Be Vietnam Pro</div>
            <p className="mt-4 text-3xl font-extrabold leading-snug">
              Chuyến bay đã sẵn sàng cất cánh.
            </p>
            <p className="mt-2 text-night-300">
              Ăn quả nhớ kẻ trồng cây — đầy đủ dấu tiếng Việt ở mọi độ đậm.
            </p>
          </div>
          <div className="rounded-2xl bg-night-900 p-6 ring-1 ring-night-800">
            <div className="text-xs text-night-500">Mã chuyến bay, giờ, cổng</div>
            <div className="mt-1 text-2xl font-bold">JetBrains Mono</div>
            <div className="mt-4 space-y-1 font-mono text-2xl font-bold">
              <div>
                <span className="text-amber">07:55</span> VN213 <span className="text-night-500">B12</span>
              </div>
              <div>
                <span className="text-amber">08:40</span> VJ121 <span className="text-night-500">A05</span>
              </div>
            </div>
            <p className="mt-2 text-night-300">Số đơn cách giúp các cột giờ thẳng hàng như bảng FIDS.</p>
          </div>
        </div>
      </Section>

      <Section title="Giọng văn">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-status-ontime/10 p-6">
            <div className="text-sm font-semibold text-status-ontime">Nên</div>
            <p className="mt-2 text-lg">Cổng đổi sang <b>B12</b>. Còn 25 phút để tới.</p>
          </div>
          <div className="rounded-2xl bg-status-cancelled/10 p-6">
            <div className="text-sm font-semibold text-status-cancelled">Tránh</div>
            <p className="mt-2 text-lg text-night-300">
              Xin trân trọng thông báo tới quý khách cổng khởi hành đã được thay đổi.
            </p>
          </div>
        </div>
        <p className="mt-4 text-night-300">
          Ngắn, chủ động, nói thật. Xưng “bạn”. Slogan: <b className="text-cloud">Theo dõi chuyến bay. Vút.</b>
        </p>
      </Section>
    </div>
  );
}
