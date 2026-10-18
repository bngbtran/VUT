# VÚT

Theo dõi chuyến bay — giờ bay, cổng, trạng thái. *Vút.*

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| [`frontend/`](frontend/) | Web app — Next.js 16 (App Router) · TypeScript · Tailwind CSS v4. Deploy lên Vercel. |
| [`brand/`](brand/) | Bộ nhận diện thương hiệu: logo SVG, màu, chữ, giọng văn. Xem [`brand/README.md`](brand/README.md). |

## Chạy local

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

Trang bộ nhận diện: `/brand`.

## Deploy (Vercel)

Project Vercel trỏ **Root Directory = `frontend`**, framework Next.js (tự nhận). Mỗi lần push lên `main` là deploy production.
