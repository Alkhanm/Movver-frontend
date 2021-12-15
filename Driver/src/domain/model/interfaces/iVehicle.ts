import { vehicle } from "../types";

export type truckBodyworkType = "OPEN" | "CLOSED" | "ANY";

export function getTruckBodyworkName(type: truckBodyworkType) {
  const names = {
    OPEN: "Aberta",
    CLOSED: "Fechada",
    ANY: "Qualquer"
  };
  return names[type]
}

export interface iVehicle {
  model: vehicle;
  capacity: number;
  licensePlate: string;
  truckBodyWork: truckBodyworkType;
  color: string;
}