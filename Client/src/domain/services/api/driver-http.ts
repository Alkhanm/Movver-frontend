import { iDriver } from "../../model/interfaces/iDriver";
import { http } from "./index";


const url = "/drivers"

export async function getDrivers(filter?: string): Promise<iDriver[]> {
  const response = await http.get(url)
  const drivers = response.data;
  return drivers;
}


export const DriverHttp = {
  getDrivers,
}