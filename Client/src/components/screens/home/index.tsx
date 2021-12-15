import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { useLocationContext } from "../../../context/location-context";
import { secondaryRoutes } from "../../../routes/routes-enum";

export const Home: React.FC = () => {
  const { origin } = useLocationContext();
  const { navigate } = useNavigation();

  function handlerFindDriver() {
    navigate(secondaryRoutes.LOCATION_FINDER);
  }

  return (
    <>
      <MapView style={styles.map} showsUserLocation loadingEnabled initialRegion={origin} />
      <View onTouchStart={handlerFindDriver} style={styles.findButton}>
        <Text>Buscar?</Text>
      </View>
    </>
  );
};

export default Home;

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  findButton: {
    top: -(height / 1.25),
    height: 50,
    borderRadius: 50,
    elevation: 10,
    margin: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
