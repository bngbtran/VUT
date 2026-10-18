import type { FlightStatus } from "@/types/flight";

export const statusMeta: Record<FlightStatus, { label: string; className: string }> = {
  scheduled: { label: "Đúng giờ", className: "text-status-ontime bg-status-ontime/10" },
  boarding: { label: "Đang lên máy bay", className: "text-status-boarding bg-status-boarding/10" },
  delayed: { label: "Trễ", className: "text-status-delayed bg-status-delayed/10" },
  departed: { label: "Đã cất cánh", className: "text-status-done bg-status-done/10" },
  landed: { label: "Đã hạ cánh", className: "text-status-done bg-status-done/10" },
  cancelled: { label: "Hủy", className: "text-status-cancelled bg-status-cancelled/10" },
};

export function StatusBadge({ status }: { status: FlightStatus }) {
  const { label, className } = statusMeta[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {label}
    </span>
  );
}
