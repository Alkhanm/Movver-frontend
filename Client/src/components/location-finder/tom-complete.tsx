import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLocationContext } from "../../context/location-context";
import { useTomCompleteContext } from "../../context/tom-complete-context";
import { directionEnum } from "../../domain/model/enums";
import { iLocation } from '../../domain/model/interfaces/iLocation';
import { TomTomFunctions } from "../../domain/services/function/tom-tom-function";
import { grey } from "../../styles/color.css";
import { MvInput } from "../widgets/mv-input";

/* TomComplete:
 * providencia uma forma simples de buscar endereços atráves de entradas de texto */
export const TomComplete = ({ direction }: { direction: directionEnum }) => {
  const TomCompleteContext = useTomCompleteContext();
  const LocationContext = useLocationContext();
  const [query, setQuery] = useState<string>("");

  function removeLocation() {
    setQuery("");
  }

  //Faz a busca por endereços
  async function searchAddres(text: string) {
    setQuery(text);
    //Evita que ao digitar haja uma excesso de consultas
    if (query.length % 3 !== 0) return;
    const result = await TomTomFunctions.getAddress(query, LocationContext.origin);
    TomCompleteContext.setTomSearch(result);
    TomCompleteContext.setDirection(direction);
  }

  //Primeira função a ser executada ao clicar no componente
  useEffect(() => {
    TomCompleteContext.setDirection(direction);
    /* Se esse componente receber a localização de origem, irá apontar para a localização atual */
    if (direction !== directionEnum.ORIGIN) return;
    setQuery("Localização atual");
    const origin: iLocation = {
      ...LocationContext.origin,
      name: "Localização atual",
    };
    LocationContext.setLocation(directionEnum.ORIGIN)(origin);
  }, []);

  //Atualiza o campo do input de acordo com os dados escolhidos pelo usuário no "TomContainer"
  useEffect(() => {
    //Verifica se os dados deve ser inseridos nesse componente ou não
    if (TomCompleteContext.direction === direction) setQuery(TomCompleteContext.query);
  }, [TomCompleteContext.query]);

  return (
    <View style={styles.search}>
      <MvInput
        icon="map-marker"
        placeholder={direction}
        value={query}
        style={{ height: 55, marginBottom: 0, marginTop: 0 }}
        //Sempre que uma nova entrada for digitada, ira buscar novos endereções
        onChangeText={searchAddres}
      />
      <TouchableHighlight
        onPress={removeLocation}
        style={styles.clearButton}
        underlayColor={grey.lighten2}
      >
        <Icon name="close-circle" size={25} color="gray" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
  },
  clearButton: {
    height: 44,
    width: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
