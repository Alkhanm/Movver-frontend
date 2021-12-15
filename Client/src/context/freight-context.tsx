import React, { createContext, useContext, useState } from "react";
import { iFreight } from "../domain/model/interfaces/iFreight";

interface ContextType {
  freight: iFreight;
  setFreight: (freight: iFreight) => void;
}

export const FreightContext = createContext({} as ContextType);

export const FreightProvider = ({ children }: { children: React.ReactNode }) => {
  const [freight, setFreight] = useState<iFreight>({ status: "UNCONFIRMED" } as iFreight);

  return (
    <FreightContext.Provider value={{ freight, setFreight }}>{children}</FreightContext.Provider>
  );
};

export function useFreightContext() {
  return useContext(FreightContext);
}
