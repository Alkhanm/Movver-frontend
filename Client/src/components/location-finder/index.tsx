import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationContext } from "../../context/location-context";
import { directionEnum } from "../../domain/model/enums";
import { secondaryRoutes } from "../../routes/routes-enum";
import { appCss } from "../../styles/app.css";
import { TomComplete } from "./tom-complete";
import { TomContainer } from "./tom-container";

export function LocationFinder() {
  const Navigation = useNavigation();
  const LocationContext = useLocationContext();

  //Quando a localização de origem e destino são selecionadas, a busca por motorista se inicia
  useEffect(() => {
    if (LocationContext.isReady) Navigation.navigate(secondaryRoutes.FREIGHTAGE);
  }, [LocationContext.destination, LocationContext.origin]);

  return (
    <SafeAreaView style={appCss.container}>
      <View style={styles.mainView}>
        <TouchableOpacity onPress={Navigation.goBack} style={styles.close}>
          <MaterialCommunityIcons name="window-close" size={30} />
        </TouchableOpacity>
        <View style={styles.searches}>
          <TomComplete direction={directionEnum.ORIGIN} />
          <TomComplete direction={directionEnum.DESTINATION} />
        </View>
        <View style={styles.resultsContainer}>
          <TomContainer />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searches: {
    margin: 10,
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  close: {
    top: 1,
    marginLeft: 10,
    width: 35,
  },
});
