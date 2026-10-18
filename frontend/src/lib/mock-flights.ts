import type { Flight } from "@/types/flight";

// Dữ liệu mẫu cho giai đoạn dựng giao diện — sẽ thay bằng API thật.
export const mockDepartures: Flight[] = [
  { number: "VN213", airline: "Vietnam Airlines", origin: "SGN", destination: "HAN", destinationCity: "Hà Nội", scheduledTime: "06:00", terminal: "T1", gate: "12", status: "departed" },
  { number: "VJ121", airline: "Vietjet Air", origin: "SGN", destination: "DAD", destinationCity: "Đà Nẵng", scheduledTime: "06:45", terminal: "T1", gate: "5", status: "boarding" },
  { number: "QH203", airline: "Bamboo Airways", origin: "SGN", destination: "HAN", destinationCity: "Hà Nội", scheduledTime: "07:10", estimatedTime: "07:55", terminal: "T1", gate: "8", status: "delayed" },
  { number: "VN1821", airline: "Vietnam Airlines", origin: "SGN", destination: "PQC", destinationCity: "Phú Quốc", scheduledTime: "07:30", terminal: "T1", gate: "15", status: "scheduled" },
  { number: "SQ183", airline: "Singapore Airlines", origin: "SGN", destination: "SIN", destinationCity: "Singapore", scheduledTime: "08:05", terminal: "T2", gate: "22", status: "scheduled" },
  { number: "VJ8891", airline: "Vietjet Air", origin: "SGN", destination: "HPH", destinationCity: "Hải Phòng", scheduledTime: "08:20", terminal: "T1", status: "cancelled" },
  { number: "VU751", airline: "Vietravel Airlines", origin: "SGN", destination: "CXR", destinationCity: "Nha Trang", scheduledTime: "08:40", terminal: "T1", gate: "3", status: "scheduled" },
  { number: "TG551", airline: "Thai Airways", origin: "SGN", destination: "BKK", destinationCity: "Bangkok", scheduledTime: "09:15", estimatedTime: "09:40", terminal: "T2", gate: "18", status: "delayed" },
];
