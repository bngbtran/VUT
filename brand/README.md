# VÚT — Bộ nhận diện thương hiệu

> **Vút** /vút/ — từ tượng thanh chỉ thứ lao đi thật nhanh. Một chiếc máy bay cất cánh: *vút!*

VÚT là ứng dụng theo dõi chuyến bay: giờ bay, cổng, trạng thái, băng chuyền hành lý — gọn, nhanh, đọc được trong một cái liếc mắt giữa sảnh sân bay.

## 1. Ý tưởng cốt lõi

**Dấu sắc là chiếc máy bay đang bay.** Dấu sắc trên chữ **Ú** được vẽ thành một chiếc máy bay nhìn từ trên xuống, bay chéo lên đúng hướng nét dấu sắc — đọc là chữ "VÚT", nhìn là một chuyến bay vừa cất cánh.

**Cùng một hướng bay.** Đầu nét V, Ú, T cắt xiên lên sang phải; thanh ngang chữ T nghiêng lên như đường băng nhìn theo hướng cất cánh. Cả chữ lao về phía trước.

**Symbol** là chữ **Ú** trên ô than chì, với chiếc máy bay đất nung ở vị trí dấu sắc.

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
| `logo/vut-lockup-light.svg` | Symbol + chữ, trên nền tối |

**Quy tắc**
- Khoảng trống tối thiểu quanh logo = độ dày nét chữ (≈ 1/6 chiều cao logo).
- Kích thước tối thiểu: symbol 16px, wordmark 64px chiều ngang.
- Máy bay ở dấu sắc **luôn** màu đất nung `#C8643F`, trên mọi nền.
- Không xoay, không đổ bóng, không đổi hướng bay hay thay máy bay bằng icon khác.
- Không viết "Vut" hay "VUT" không dấu trong logo. Trong văn bản: **VÚT** (in hoa) cho tên thương hiệu.

## 3. Màu sắc

Tông trầm, ấm — như bầu trời lúc hoàng hôn nhìn từ cửa sổ máy bay. Tránh các tổ hợp gắn với hãng bay Việt (xanh ngọc–vàng, đỏ–vàng, xanh lá).

### Màu thương hiệu
| Tên | Hex | Vai trò |
|---|---|---|
| **Than** (Charcoal) | `#1C1F22` | Màu chủ đạo — nền tối, nền symbol, chữ trên nền sáng |
| **Đất nung** (Terracotta) | `#C8643F` | Màu nhận diện — máy bay ở dấu sắc, điểm nhấn |
| **Ngà** (Bone) | `#EFE9E1` | Nền sáng, chữ trên nền tối |
| **Xám xanh** (Slate) | `#5E7384` | Tương tác, viền focus, thông tin phụ |
| Đất nung sáng (Clay) | `#E38A64` | Chữ nhấn (giờ bay) trên nền tối — đủ tương phản |

### Thang nền tối (giao diện)
| Token | Hex |
|---|---|
| `ink-950` | `#121416` |
| `ink-900` | `#1C1F22` |
| `ink-800` | `#26292D` |
| `ink-700` | `#33373C` |
| `ink-500` | `#7A7F86` (chữ phụ) |
| `ink-300` | `#B5B0A8` (chữ mờ) |

### Màu trạng thái chuyến bay
Cũng hạ độ bão hòa cho hợp tông, nhưng vẫn phân biệt rõ:

| Trạng thái | Hex |
|---|---|
| Đúng giờ | `#7CC49A` |
| Đang lên máy bay | `#8FB3D1` |
| Trễ | `#E0A54F` |
| Hủy | `#E0607E` |
| Đã cất cánh / Đã hạ cánh | `#B5B0A8` |

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
