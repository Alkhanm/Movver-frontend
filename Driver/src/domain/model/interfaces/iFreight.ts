import { iClient } from "./iClient";
import { iDriver } from "./iDriver";
import { iLocation } from "./iLocation";

export type freightService = "HOME_MOVING" | "MATERIAL_TRANSPORT";
export type freightStatus = "UNCONFIRMED" | "CONFIRMED" | "STARTED" | "FINISHED"
export interface iFreight {
  service: freightService;
  weight: number;
  client: iClient;
  origin: iLocation;
  destination: iLocation;
  status: freightStatus;
  distance: number;
  price?: number;
  startDate: number;
  endDate?: number;
  driver?: iDriver;
  description?: string;
  id: number;
}