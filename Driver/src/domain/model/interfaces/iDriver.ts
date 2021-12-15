import { iLocation } from "./iLocation";
import { iVehicle } from "./iVehicle";
export interface iDriver {
   name: string,
   phoneNumber: string,
   birthdate: number,
   vehicle: iVehicle,
   password?: string;
   trips?: number,
   location?: iLocation,
   available?: boolean,
   id?: string
}