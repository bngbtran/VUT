// Sân bay đã biết: tên hiển thị tiếng Việt + toạ độ để hỏi thời tiết (không tốn lượt gọi API).
// `board: true` = được phép xem bảng giờ bay trên trang chủ (giới hạn để bảo vệ hạn mức API).

export type Airport = {
  iata: string;
  city: string;
  name: string;
  lat: number;
  lon: number;
  board?: boolean;
};

const list: Airport[] = [
  { iata: "SGN", city: "TP. Hồ Chí Minh", name: "Tân Sơn Nhất", lat: 10.8188, lon: 106.652, board: true },
  { iata: "HAN", city: "Hà Nội", name: "Nội Bài", lat: 21.2212, lon: 105.8072, board: true },
  { iata: "DAD", city: "Đà Nẵng", name: "Đà Nẵng", lat: 16.0439, lon: 108.1994, board: true },
  { iata: "CXR", city: "Nha Trang", name: "Cam Ranh", lat: 11.9982, lon: 109.2194, board: true },
  { iata: "PQC", city: "Phú Quốc", name: "Phú Quốc", lat: 10.1698, lon: 103.9931, board: true },
  { iata: "HPH", city: "Hải Phòng", name: "Cát Bi", lat: 20.8194, lon: 106.725 },
  { iata: "HUI", city: "Huế", name: "Phú Bài", lat: 16.4015, lon: 107.7026 },
  { iata: "DLI", city: "Đà Lạt", name: "Liên Khương", lat: 11.75, lon: 108.3667 },
  { iata: "UIH", city: "Quy Nhơn", name: "Phù Cát", lat: 13.955, lon: 109.042, board: true },
  { iata: "VII", city: "Vinh", name: "Vinh", lat: 18.7376, lon: 105.6708 },
  { iata: "VCA", city: "Cần Thơ", name: "Cần Thơ", lat: 10.0851, lon: 105.7117 },
  { iata: "BMV", city: "Buôn Ma Thuột", name: "Buôn Ma Thuột", lat: 12.6683, lon: 108.1203 },
  { iata: "VDH", city: "Đồng Hới", name: "Đồng Hới", lat: 17.515, lon: 106.5906 },
  { iata: "THD", city: "Thanh Hoá", name: "Thọ Xuân", lat: 19.9017, lon: 105.4678 },
  { iata: "VCS", city: "Côn Đảo", name: "Côn Đảo", lat: 8.7318, lon: 106.633 },
  { iata: "TBB", city: "Tuy Hoà", name: "Tuy Hoà", lat: 13.0496, lon: 109.3337 },
  { iata: "PXU", city: "Pleiku", name: "Pleiku", lat: 14.0045, lon: 108.0172 },
  { iata: "VCL", city: "Chu Lai", name: "Chu Lai", lat: 15.4033, lon: 108.7062 },
  { iata: "VKG", city: "Rạch Giá", name: "Rạch Giá", lat: 9.958, lon: 105.1324 },
  { iata: "CAH", city: "Cà Mau", name: "Cà Mau", lat: 9.1777, lon: 105.1778 },
  { iata: "DIN", city: "Điện Biên", name: "Điện Biên Phủ", lat: 21.3975, lon: 103.0078 },
  { iata: "VDO", city: "Quảng Ninh", name: "Vân Đồn", lat: 21.1178, lon: 107.4142 },
  { iata: "BKK", city: "Bangkok", name: "Suvarnabhumi", lat: 13.69, lon: 100.7501 },
  { iata: "DMK", city: "Bangkok", name: "Don Mueang", lat: 13.9126, lon: 100.6068 },
  { iata: "SIN", city: "Singapore", name: "Changi", lat: 1.3644, lon: 103.9915 },
  { iata: "KUL", city: "Kuala Lumpur", name: "KLIA", lat: 2.7456, lon: 101.7099 },
  { iata: "HKG", city: "Hồng Kông", name: "Hong Kong Intl", lat: 22.308, lon: 113.9185 },
  { iata: "TPE", city: "Đài Bắc", name: "Đào Viên", lat: 25.0797, lon: 121.2342 },
  { iata: "ICN", city: "Seoul", name: "Incheon", lat: 37.4602, lon: 126.4407 },
  { iata: "PUS", city: "Busan", name: "Gimhae", lat: 35.1795, lon: 128.9382 },
  { iata: "NRT", city: "Tokyo", name: "Narita", lat: 35.772, lon: 140.3929 },
  { iata: "HND", city: "Tokyo", name: "Haneda", lat: 35.5494, lon: 139.7798 },
  { iata: "KIX", city: "Osaka", name: "Kansai", lat: 34.432, lon: 135.2304 },
  { iata: "PVG", city: "Thượng Hải", name: "Phố Đông", lat: 31.1443, lon: 121.8083 },
  { iata: "PEK", city: "Bắc Kinh", name: "Thủ Đô", lat: 40.0799, lon: 116.6031 },
  { iata: "CAN", city: "Quảng Châu", name: "Bạch Vân", lat: 23.3924, lon: 113.2988 },
  { iata: "MNL", city: "Manila", name: "Ninoy Aquino", lat: 14.5086, lon: 121.0198 },
  { iata: "CGK", city: "Jakarta", name: "Soekarno–Hatta", lat: -6.1256, lon: 106.6559 },
  { iata: "DPS", city: "Bali", name: "Ngurah Rai", lat: -8.7482, lon: 115.1675 },
  { iata: "KTI", city: "Phnom Penh", name: "Techo", lat: 11.3497, lon: 104.9375 },
  { iata: "PNH", city: "Phnom Penh", name: "Pochentong", lat: 11.5466, lon: 104.8441 },
  { iata: "SAI", city: "Siem Reap", name: "Siem Reap–Angkor", lat: 13.37, lon: 104.22 },
  { iata: "VTE", city: "Viêng Chăn", name: "Wattay", lat: 17.9883, lon: 102.5633 },
  { iata: "RGN", city: "Yangon", name: "Yangon", lat: 16.9073, lon: 96.1332 },
  { iata: "DEL", city: "New Delhi", name: "Indira Gandhi", lat: 28.5562, lon: 77.1 },
  { iata: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji", lat: 19.0896, lon: 72.8656 },
  { iata: "DOH", city: "Doha", name: "Hamad", lat: 25.2731, lon: 51.6081 },
  { iata: "DXB", city: "Dubai", name: "Dubai Intl", lat: 25.2532, lon: 55.3657 },
  { iata: "IST", city: "Istanbul", name: "Istanbul", lat: 41.2753, lon: 28.7519 },
  { iata: "CDG", city: "Paris", name: "Charles de Gaulle", lat: 49.0097, lon: 2.5479 },
  { iata: "FRA", city: "Frankfurt", name: "Frankfurt", lat: 50.0379, lon: 8.5622 },
  { iata: "LHR", city: "London", name: "Heathrow", lat: 51.47, lon: -0.4543 },
  { iata: "SYD", city: "Sydney", name: "Kingsford Smith", lat: -33.9399, lon: 151.1753 },
  { iata: "MEL", city: "Melbourne", name: "Tullamarine", lat: -37.669, lon: 144.841 },
  { iata: "LAX", city: "Los Angeles", name: "LAX", lat: 33.9416, lon: -118.4085 },
  { iata: "SFO", city: "San Francisco", name: "SFO", lat: 37.6213, lon: -122.379 },
];

const byIata = new Map(list.map((a) => [a.iata, a]));

export const boardAirports = list.filter((a) => a.board);
export const DEFAULT_AIRPORT = "SGN";

export function findAirport(iata: string | null | undefined): Airport | undefined {
  return iata ? byIata.get(iata.toUpperCase()) : undefined;
}

/** Tên thành phố để hiển thị; rơi về tên sân bay từ API nếu chưa có trong danh sách. */
export function cityOf(iata: string, fallback: string): string {
  return byIata.get(iata)?.city ?? fallback;
}
