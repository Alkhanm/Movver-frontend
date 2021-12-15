import React, { createContext, useContext, useEffect, useState } from "react";
import { directionEnum } from "../domain/model/enums";
import { iLocation } from "../domain/model/interfaces/iLocation";
import { LocationFunctions } from "../domain/services/function/location-function";

interface ContextType {
  origin: iLocation;
  destination: iLocation;
  distance: number;
  isReady: boolean;
  setDistance: (distance: number) => void;
  setLocation: (direction: directionEnum) => (localization: iLocation) => void;
}

export const LocationContext = createContext({} as ContextType);

export const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [origin, setOrigin] = useState({} as iLocation);
  const [destination, setDestination] = useState({} as iLocation);
  const [distance, setDistance] = useState(0);

  const setLocation = (direction: directionEnum) => (localization: iLocation) => {
    if (direction === directionEnum.ORIGIN) setOrigin(localization);
    else setDestination(localization);
  };

  //Inicialmente o mapa irá mostrar a localização atual
  useEffect(() => {
    LocationFunctions.getCurrentLocation().then(setOrigin);
  }, []);

  return (
    <LocationContext.Provider
      value={{
        origin,
        destination,
        isReady: Boolean(origin.latitude && destination.latitude),
        distance,
        setDistance,
        setLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocationContext() {
  return useContext(LocationContext);
}
