// Kết quả gọi API dạng giá trị (không throw) để có thể cache cả lỗi trong thời gian ngắn.
export type ApiResult<T> =
  | { ok: true; data: T; fetchedAt: string }
  | { ok: false; code: string; /** Ngày mở lại khi hết hạn mức, "dd/mm/yyyy" */ resetsOn?: string };

// Lỗi chỉ cache ngắn để thử lại sớm; thành công cache theo cấu hình từng nguồn.
export const ERROR_CACHE_LIFE = { stale: 30, revalidate: 60, expire: 120 };

/** Câu thông báo thân thiện cho người dùng, theo mã lỗi. */
export function friendlyError(code: string): string {
  switch (code) {
    case "missing_key":
      return "Chưa cấu hình khoá API.";
    case "usage_limit_reached":
    case "104":
      return "Đã hết lượt gọi API trong tháng.";
    case "invalid_access_key":
    case "101":
      return "Khoá API không hợp lệ.";
    case "rate_limit_reached":
    case "106":
      return "Gọi API quá nhanh, thử lại sau ít phút.";
    case "method_not_supported":
      return "Khoá API không dùng được cho dịch vụ này.";
    case "unknown_airport":
      return "Chưa có toạ độ của sân bay này.";
    case "quota_exhausted":
      return "Đã dùng hết lượt tra cứu chuyến bay của tháng này.";
    case "quota_store_missing":
      return "Chưa cấu hình bộ đếm lượt gọi API.";
    case "quota_store_error":
      return "Bộ đếm lượt gọi API đang lỗi.";
    case "network":
      return "Không kết nối được nguồn dữ liệu.";
    default:
      return `Nguồn dữ liệu báo lỗi (${code}).`;
  }
}

/** Các mã lỗi nghĩa là đang tạm dừng gọi API (hiển thị trạng thái bảo trì). */
export function isMaintenance(code: string): boolean {
  return code.startsWith("quota_");
}
