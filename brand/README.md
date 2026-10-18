# VÚT — Bộ nhận diện thương hiệu

> **Vút** /vút/ — từ tượng thanh chỉ thứ lao đi thật nhanh. Một chiếc máy bay cất cánh: *vút!*

VÚT là ứng dụng theo dõi chuyến bay: giờ bay, cổng, trạng thái, băng chuyền hành lý — gọn, nhanh, đọc được trong một cái liếc mắt giữa sảnh sân bay.

## 1. Ý tưởng cốt lõi

**Dấu sắc là vệt cất cánh.** Dấu sắc trên chữ **Ú** được vẽ thành một vệt hổ phách hướng lên — đúng góc một máy bay rời đường băng. Màu hổ phách lấy từ chữ LED trên bảng giờ bay (FIDS) ở sân bay; nền xanh đêm là bầu trời lúc bay đêm.

| Giá trị | Thể hiện |
|---|---|
| **Nhanh** | Thông tin quan trọng nhất (giờ, cổng, trạng thái) luôn hiện đầu tiên |
| **Rõ** | Chữ lớn, tương phản cao, mã chuyến bay dùng font đơn cách |
| **Bình tĩnh** | Trễ chuyến đã đủ mệt — giọng văn ngắn, thật, không gây hoảng |

## 2. Logo

| File | Dùng khi |
|---|---|
| `logo/vut-symbol.svg` | App icon, favicon, avatar mạng xã hội |
| `logo/vut-wordmark-dark.svg` | Chữ VÚT trên nền sáng |
| `logo/vut-wordmark-light.svg` | Chữ VÚT trên nền tối |
| `logo/vut-lockup-dark.svg` | Symbol + chữ, trên nền sáng |
| `logo/vut-lockup-light.svg` | Symbol + chữ, trên nền tối (nền khác `#0A1430` để ô symbol không chìm) |

**Quy tắc**
- Khoảng trống tối thiểu quanh logo = chiều cao nét chữ (≈ 1/7 chiều cao logo).
- Kích thước tối thiểu: symbol 16px, wordmark 64px chiều ngang.
- Vệt dấu sắc **luôn** là màu hổ phách `#FFB020`, kể cả trên nền sáng hay tối.
- Không xoay, không đổ bóng, không đổi góc dấu sắc, không viết "Vut" hay "VUT" không dấu trong logo.
- Trong văn bản: viết **VÚT** (in hoa) cho tên thương hiệu, "vút" (thường) khi dùng như từ thường.

## 3. Màu sắc

### Màu thương hiệu
| Tên | Hex | Vai trò |
|---|---|---|
| **Đêm** (Midnight) | `#0A1430` | Màu chủ đạo, nền tối, chữ trên nền sáng |
| **Hổ phách** (Amber) | `#FFB020` | Màu nhận diện — dấu sắc, điểm nhấn, giờ bay trên bảng |
| **Trời** (Sky) | `#4C8DFF` | Liên kết, nút tương tác, trạng thái đang chọn |
| **Mây** (Cloud) | `#F4F6FB` | Nền sáng, chữ trên nền tối |

### Thang nền tối (giao diện)
| Token | Hex |
|---|---|
| `night-950` | `#060C1F` |
| `night-900` | `#0A1430` |
| `night-800` | `#111E42` |
| `night-700` | `#1B2A55` |
| `night-500` | `#5B6B94` (chữ phụ) |
| `night-300` | `#A9B4D0` (chữ mờ) |

### Màu trạng thái chuyến bay
| Trạng thái | Hex |
|---|---|
| Đúng giờ | `#2BD67B` |
| Đang lên máy bay | `#4C8DFF` |
| Trễ | `#FF7A1A` |
| Hủy | `#FF4D5E` |
| Đã cất cánh / Đã hạ cánh | `#A9B4D0` |

Trạng thái luôn có **chữ đi kèm**, không chỉ dựa vào màu (người mù màu vẫn đọc được).

## 4. Chữ

| Vai trò | Font | Ghi chú |
|---|---|---|
| Tiêu đề & nội dung | **Be Vietnam Pro** (600–800 tiêu đề, 400–500 nội dung) | Thiết kế cho tiếng Việt, dấu đẹp ở mọi độ đậm |
| Mã chuyến bay, giờ, cổng | **JetBrains Mono** (500–700) | Số đơn cách → các cột giờ thẳng hàng như bảng FIDS |

Cả hai đều miễn phí trên Google Fonts và hỗ trợ đầy đủ tiếng Việt.

## 5. Giọng văn

- Ngắn, chủ động: "Cổng đổi sang **B12**" thay vì "Xin thông báo cổng khởi hành đã được thay đổi".
- Nói thật về trễ chuyến, kèm giờ mới nếu có.
- Xưng "bạn", không dùng "quý khách".
- Slogan: **"Theo dõi chuyến bay. Vút."**
