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
npm ci        # cài đúng theo package-lock.json
npm run dev   # http://localhost:3000
```

Trang bộ nhận diện: `/brand`.

## Deploy (Vercel)

Project Vercel trỏ **Root Directory = `frontend`**, framework Next.js (tự nhận). Mỗi lần push lên `main` là deploy production.
