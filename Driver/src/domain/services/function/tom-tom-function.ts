import axios from "axios";
import { iLocation } from "../../model/interfaces/iLocation";
import { iTomTomSearch } from "../../model/interfaces/iTomTomSearch";
import { tomKey } from "../../services/config";

const BASE_URL = "https://api.tomtom.com/search/2/search/";
const LIMIT = 5;

async function getAddress(search: string, location: iLocation): Promise<iTomTomSearch> {
  const query = encodeURIComponent(search);
  const APROX_LAT = location.latitude;
  const APROX_LON = location.longitude;
  const SEARCH_URL = `${BASE_URL}${query}.json?&countrySet=br&lat=${APROX_LAT}&lon=${APROX_LON}&language=pt-br&limit=${LIMIT}&key=${tomKey}`;
  const response = await axios.get(SEARCH_URL);
  const result: iTomTomSearch = response.data;
  return result;
}

export const TomTomFunctions = {
  getAddress
}