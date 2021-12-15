
import { iClient } from '../../model/interfaces/iClient';
import { http } from "./index";

const URL = "/clients";

async function save(client: iClient): Promise<iClient> {
  const response = await http.post(URL, client);
  const data: iClient = response.data;
  return data;
}


const ClientHttp = {
  save,
}

export {
  ClientHttp
};

