import { iDriver } from "../../model/interfaces/iDriver";

// Objeto que implementa um filtro para selecionar os motoristas que possuam veiculos com certo capacidade
function vehicleCapacityFilter(capacity: number, drivers: iDriver[]): iDriver[] {
  return drivers.filter(driver => driver.vehicle.capacity >= capacity);
}

export const DriverFunction = {
  vehicleCapacityFilter
}