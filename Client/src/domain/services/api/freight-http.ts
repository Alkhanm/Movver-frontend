import { iFreight } from "../../model/interfaces/iFreight";
import { http } from "./index";

const url = "/freights";

async function getFreights(filter?: string): Promise<iFreight[]> {
  const response = await http.get(url + filter)
  const freights = response.data.content;
  return freights;
}

async function confirm(freight: iFreight): Promise<iFreight> {
  const response = await http.post(url, freight);
  const data: iFreight = response.data
  return data;
}

async function start(freight: iFreight): Promise<iFreight> {
  const response = await http.patch(`${url}/${freight.id}/start`, freight);
  const data: iFreight = response.data
  return data;
}

//Enviar um objeto Frete (Freight) para o backend e recebe este frete com seus valores calculados
async function cancel(freight: iFreight): Promise<iFreight> {
  const response = await http.patch(`${url}/${freight.id}/cancel`, freight);
  const freightData: iFreight = response.data
  return freightData;
}

export const FreightHttp = {
  getFreights,
  confirm,
  start,
  cancel
}