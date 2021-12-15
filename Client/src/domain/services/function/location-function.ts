import * as ExpoLocation from "expo-location";
import * as Permissions from "expo-permissions";
import { iLocation } from "../../model/interfaces/iLocation";


async function askForLocationAccess(): Promise<ExpoLocation.LocationObject> {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") throw new Error("O acesso a localização não foi permitido!");
  //Comportamento inesperado abaixo...
  return await ExpoLocation.getCurrentPositionAsync({accuracy: ExpoLocation.Accuracy.Lowest})
}

// Pede permissão do usuário para acessar sua geolocalição ou retorna um erro se não for concedida.
async function getCurrentLocation(): Promise<iLocation> {
  const { coords } = await askForLocationAccess();
  return { ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 };
}


const LocationFunctions = {
  getCurrentLocation,
}

export { LocationFunctions };
