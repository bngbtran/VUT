// Nguồn chung cho màu và hình học logo VÚT — đồng bộ với brand/README.md và brand/logo/*.svg.

export const brandColors = {
  charcoal: "#1C1F22", // Than — nền tối, chữ trên nền sáng
  terracotta: "#C8643F", // Đất nung — máy bay ở dấu sắc, điểm nhấn
  bone: "#EFE9E1", // Ngà — nền sáng, chữ trên nền tối
  slate: "#5E7384", // Xám xanh — tương tác, thông tin phụ
  stone: "#B5B0A8", // chữ mờ trên nền tối
} as const;

// Chữ V, U, T: đầu nét cắt xiên lên sang phải; chữ T nghiêng lên như đang cất cánh.
export const V_PATH = "M4 23.3 L15 20 L22 40.5 L29 23.3 L40 20 L27 56 L17 56 Z";
export const U_PATH = "M50 23 L60 20 L60 41 A5 5 0 0 0 70 41 L70 23 L80 20 L80 41 A15 15 0 0 1 50 41 Z";
export const T_PATH = "M90 24 L130 12 L130 22 L115 26.5 L115 56 L105 56 L105 29.5 L90 34 Z";

// Dấu sắc = máy bay nhìn từ trên, mũi hướng lên, tâm tại (0,0). Xoay 50° để bay chéo lên như nét dấu sắc.
export const PLANE_PATH =
  "M0 -10.5 L1.8 -7 L1.8 -2 L10 3 L10 5.5 L1.8 2.5 L1.8 6.5 L4.5 9.5 L4.5 11 L1.8 10 L0 11 L-1.8 10 L-4.5 11 L-4.5 9.5 L-1.8 6.5 L-1.8 2.5 L-10 5.5 L-10 3 L-1.8 -2 L-1.8 -7 Z";
export const WORDMARK_PLANE_TRANSFORM = "translate(70 9) rotate(50) scale(.8)";

// Symbol: chữ Ú trong ô vuông 64×64.
export const SYMBOL_U_PATH =
  "M18 31 L27 28.3 L27 42 A5 5 0 0 0 37 42 L37 31 L46 28.3 L46 42 A14 14 0 0 1 18 42 Z";
export const SYMBOL_PLANE_TRANSFORM = "translate(36 15) rotate(50) scale(.85)";
