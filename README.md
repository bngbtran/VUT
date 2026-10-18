# VÚT

Theo dõi chuyến bay — giờ bay, cổng, trạng thái. *Vút.*

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| [`frontend/`](frontend/) | Web app — Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Deploy lên Vercel. |
| [`brand/`](brand/) | Bộ nhận diện thương hiệu: logo SVG, màu, chữ, giọng văn. Xem [`brand/README.md`](brand/README.md). |

## Chạy local

Dùng Node trong conda env `msa` (không cài gì global lên máy). Env đã đặt sẵn `npm_config_cache` vào trong env và tắt telemetry của Next.

```bash
conda activate msa
cd frontend
cp .env.example .env.local   # rồi điền key
npm ci        # cài đúng theo package-lock.json
npm run dev   # http://localhost:3000
```

## Nguồn dữ liệu

| Dữ liệu | Nguồn | Biến môi trường |
|---|---|---|
| Chuyến bay: giờ, cổng, nhà ga, băng chuyền, trạng thái, vị trí | [aviationstack](https://aviationstack.com) | `AVIATIONSTACK_ACCESS_KEY` |
| Thời tiết hiện tại ở điểm đi / điểm đến | [Open-Meteo](https://open-meteo.com) | không cần key |

- Key chỉ dùng ở server (không có tiền tố `NEXT_PUBLIC_`) nên không lộ ra trình duyệt. Không commit `.env.local`.
- aviationstack gói miễn phí có hạn mức theo tháng, nên kết quả được cache dùng chung (`use cache: remote`): chuyến bay ~30 phút, thời tiết ~15 phút (Open-Meteo cập nhật mỗi 15 phút), lỗi ~1 phút. Chỉnh trong `src/lib/aviationstack.ts` và `src/lib/weather.ts`.
- Thời tiết của mọi sân bay trên bảng giờ bay được gom vào **một** lần gọi Open-Meteo (API nhận danh sách toạ độ).
- Bảng giờ bay chỉ mở cho các sân bay có `board: true` trong `src/lib/airports.ts`.
- aviationstack trả giờ **địa phương** của từng sân bay (dù gắn nhãn `+00:00`) — xem `src/lib/time.ts`.

Trang bộ nhận diện: `/brand`.

## Deploy (Vercel)

Project Vercel trỏ **Root Directory = `frontend`**, framework Next.js (tự nhận). Mỗi lần push lên `main` là deploy production.

Nhớ thêm `AVIATIONSTACK_ACCESS_KEY` trong **Settings → Environment Variables** của project, rồi Redeploy. Kiểm tra bằng `/api/health` (chỉ trả về có/không, không lộ key).

## Giới hạn lượt gọi aviationstack (95 lượt/tháng)

Gói miễn phí chỉ có 100 lượt/tháng. VÚT đếm **mọi** lượt gọi (kể cả lượt lỗi) và dừng ở **95** — chừa 5 lượt dự phòng. Khi chạm mốc, trang hiện "Đang bảo trì" và không gọi API nữa (dữ liệu đã cache và thời tiết vẫn hiển thị); sang tháng mới (giờ Việt Nam) tự mở lại.

- Bộ đếm: `src/lib/quota.ts` (đổi mốc ở `MONTHLY_CALL_LIMIT`). Key Redis theo tháng: `vut:aviationstack:calls:YYYY-MM`.
- **Trên Vercel bắt buộc có Upstash Redis** (serverless không có ổ đĩa bền). Thiếu Redis → chặn gọi API để không vượt hạn mức.
  1. Vercel → project → **Storage** (hoặc Marketplace) → **Upstash for Redis** → tạo database (gói Free) → **Connect** vào project. Vercel tự thêm `KV_REST_API_URL` và `KV_REST_API_TOKEN`.
  2. Redeploy.
  3. Đồng bộ số đếm với số thật trên dashboard aviationstack: trong Upstash Console → **Data Browser / CLI**, chạy `SET vut:aviationstack:calls:2026-10 <số lượt đã dùng>`.
- Chạy local: nếu `.env.local` không có biến Redis thì đếm vào file `frontend/.quota/` (đã gitignore). Muốn dev và production dùng **chung** một bộ đếm (vì chung một key API) thì chép `KV_REST_API_URL`/`KV_REST_API_TOKEN` vào `.env.local`.
- Xem số đã dùng: `/api/health` → `aviationstackQuota`.
