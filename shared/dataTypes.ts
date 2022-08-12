export type Trip = {
  departureTime: string;
  returnTime: string;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  coveredDistanceMeters: number;
  durationSeconds: number;
};

export type Station = {
  fid: number;
  id: number;
  finnishName: string;
  swedishName: string;
  englishName: string;
  address: string;
  swedishAddress: string;
  city: string;
  swedishCity: string;
  operator: string;
  capasity: number;
  x: number;
  y: number;
};
