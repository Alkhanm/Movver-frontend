import React, { createContext, useContext, useState } from "react";
import { directionEnum } from "../domain/model/enums";
import { iTomTomSearch } from "../domain/model/interfaces/iTomTomSearch";

interface ContextType {
  query: string;
  direction: directionEnum;
  tomSearch: iTomTomSearch;
  setQuery: (query: string) => void;
  setDirection: (context: directionEnum) => void;
  setTomSearch: (tomSearch: iTomTomSearch) => void;
}

export const TomCompleteContext = createContext({} as ContextType);

export const TomCompleteProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState<string>("");
  const [tomSearch, setTomSearch] = useState({} as iTomTomSearch);
  const [direction, setDirection] = useState({} as directionEnum);

  return (
    <TomCompleteContext.Provider
      value={{
        query,
        tomSearch,
        direction,
        setQuery,
        setDirection,
        setTomSearch,
      }}
    >
      {children}
    </TomCompleteContext.Provider>
  );
};

export function useTomCompleteContext() {
  return useContext(TomCompleteContext);
}
