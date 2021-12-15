import { iFreight } from "../../model/interfaces/iFreight";
import { http } from "./index";

const URL = "/freights";
const URL_SEARCH = "/freights/search?"

async function fetchAllUserFreights(filter?: string): Promise<iFreight[]> {
  const response = await http.get(URL + filter)
  const freights = response.data.content;
  return freights;
}

async function fetchFreightsBy(filter?: string){
  const response = await http.get(URL_SEARCH + filter);
  const freights = response.data.content;
  return freights;
}

async function confirm(freight: iFreight): Promise<iFreight> {
  const response = await http.post(URL, freight);
  const data: iFreight = response.data
  return data;
}

async function start(freight: iFreight): Promise<iFreight> {
  const response = await http.patch(`${URL}/${freight.id}/start`, freight);
  const data: iFreight = response.data
  return data;
}

//Enviar um objeto Frete (Freight) para o backend e recebe este frete com seus valores calculados
async function cancel(freight: iFreight): Promise<iFreight> {
  const response = await http.patch(`${URL}/${freight.id}/cancel`, freight);
  const freightData: iFreight = response.data
  return freightData;
}

export const FreightHttp = {
  fetchAllUserFreights,
  fetchFreightsBy,
  confirm,
  start,
  cancel
}