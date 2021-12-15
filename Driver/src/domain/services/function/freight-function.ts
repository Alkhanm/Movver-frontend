import { freightService, freightStatus, iFreight } from "../../model/interfaces/iFreight";

function getStatusName(status: freightStatus): string {
  const values = {
    UNCONFIRMED: "Não confirmado",
    CONFIRMED: "Confirmado",
    STARTED: "Iniciado",
    FINISHED: "Finalizado",
  };
  return values[status];
}

function isReady(freight: iFreight) {
  return Boolean(
    freight.origin &&
    freight.destination &&
    freight.weight &&
    freight.service
  );
}

function getServiceName(service: freightService): string {
  const services = {
    HOME_MOVING: "Mudança",
    MATERIAL_TRANSPORT: "Transporte de Materiais",
  };
  return services[service];
}


export const FreightFunction = {
  getServiceName,
  getStatusName,
  isReady
}