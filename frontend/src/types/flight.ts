export type FlightStatus =
  | "scheduled"
  | "boarding"
  | "delayed"
  | "departed"
  | "landed"
  | "cancelled";

export type Flight = {
  /** Mã chuyến bay IATA, vd "VN213" */
  number: string;
  airline: string;
  /** Mã sân bay IATA */
  origin: string;
  destination: string;
  destinationCity: string;
  /** Giờ địa phương "HH:mm" */
  scheduledTime: string;
  estimatedTime?: string;
  terminal?: string;
  gate?: string;
  status: FlightStatus;
};
