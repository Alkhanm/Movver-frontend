import { iDriver } from "../../model/interfaces/iDriver";
import { http } from "./index";


const URL = "/drivers"

async function save(driver: iDriver): Promise<iDriver> {
  const response = await http.post(URL, driver);
  const data: iDriver = response.data;
  return data;
}


export const DriverHttp = {
  save
}