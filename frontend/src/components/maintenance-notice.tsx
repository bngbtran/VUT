import { friendlyError } from "@/lib/api-error";

/** Thông báo bảo trì khi đã chạm hạn mức gọi API của tháng (hoặc bộ đếm chưa sẵn sàng). */
export function MaintenanceNotice({ code, resetsOn }: { code: string; resetsOn?: string }) {
  const exhausted = code === "quota_exhausted";
  return (
    <div className="card relative overflow-hidden px-6 py-12 text-center">
      <div className="pointer-events-none absolute -top-20 left-1/2 size-64 -translate-x-1/2 rounded-full bg-status-delayed/10 blur-3xl" />
      <div className="relative mx-auto max-w-md">
        <span className="inline-flex items-center gap-2 rounded-full bg-status-delayed/10 px-3 py-1 text-xs font-semibold tracking-widest text-status-delayed uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-current" aria-hidden />
          Đang bảo trì
        </span>
        <p className="mt-4 text-xl font-semibold">Tạm dừng tra cứu chuyến bay mới</p>
        <p className="mt-2 text-ink-300">
          {friendlyError(code)}
          {exhausted && resetsOn && (
            <>
              {" "}
              Dữ liệu sẽ mở lại từ ngày <b className="text-bone">{resetsOn}</b>.
            </>
          )}
        </p>
        <p className="mt-3 text-sm text-ink-500">Thời tiết vẫn cập nhật bình thường.</p>
      </div>
    </div>
  );
}
