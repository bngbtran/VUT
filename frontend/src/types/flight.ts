/** Trạng thái hiển thị. "delayed" do VÚT suy ra từ độ trễ, không phải trạng thái gốc của API. */
export type FlightStatus =
  | "scheduled"
  | "delayed"
  | "active"
  | "landed"
  | "cancelled"
  | "diverted"
  | "incident"
  | "unknown";

export type FlightEndpoint = {
  iata: string;
  airport: string;
  /** Tên thành phố tiếng Việt (nếu biết), ngược lại là tên sân bay */
  city: string;
  timezone: string;
  terminal: string | null;
  gate: string | null;
  baggage: string | null;
  /** Phút trễ */
  delay: number | null;
  /** Giờ địa phương "YYYY-MM-DDTHH:mm" */
  scheduled: string | null;
  estimated: string | null;
  actual: string | null;
};

export type Flight = {
  /** Mã IATA, vd "VN213" */
  code: string;
  date: string;
  status: FlightStatus;
  airline: string;
  airlineIata: string | null;
  departure: FlightEndpoint;
  arrival: FlightEndpoint;
  aircraft: { registration: string | null; model: string | null } | null;
  live: {
    latitude: number;
    longitude: number;
    altitude: number;
    speed: number;
    isGround: boolean;
    updated: string;
  } | null;
};

export type BoardType = "departure" | "arrival";
