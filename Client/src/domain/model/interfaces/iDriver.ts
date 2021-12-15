import { iLocation } from "./iLocation";
import { iVehicle } from "./iVehicle";
export interface iDriver {
  readonly name: string,
  readonly phoneNumber: string,
  readonly trips: number,
  readonly vehicle: iVehicle,
  readonly location: iLocation,
  readonly available: boolean,
  readonly id?: string
}