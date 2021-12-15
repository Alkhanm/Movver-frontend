import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFreightContext } from "../../context/freight-context";
import { iFreight } from "../../domain/model/interfaces/iFreight";
import { FreightHttp } from "../../domain/services/api/freight-http";
import { FreightFunction } from "../../domain/services/function/freight-function";
import { appCss } from "../../styles/app.css";
import colorCss, { blue, grey } from "../../styles/color.css";
import { MvButton } from "../widgets/mv-button";

export const FreightageConfirm: React.FC = () => {
  const FreightContext = useFreightContext();

  const freight: iFreight = FreightContext.freight;

  const { weight, distance } = freight;
  const price = freight.price?.toFixed(2);
  const service = FreightFunction.getServiceName(freight.service)

  const originName = freight.origin?.name;
  const destinationName = freight.destination?.name;

  function handlerStart() {
    FreightHttp.start(freight)
      .then(FreightContext.setFreight);
  }

  return (
    <View style={styles.container}>
      <View style={styles.freightData}>
        <Text style={appCss.title}>Buscar motorista</Text>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons
            name={freight.service === "HOME_MOVING" ? "truck" : "dump-truck"}
            color={colorCss.grey.c}
            size={22}
          />
          <Text style={[appCss.infoText3, styles.data]}>{service}</Text>
        </View>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons name="cash" color={colorCss.grey.c} size={22} />
          <Text style={[appCss.infoText3, styles.data]}>R$ {price}</Text>
        </View>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons name="weight" color={colorCss.grey.c} size={22} />
          <Text style={[appCss.infoText3, styles.data]}>{weight} kg</Text>
        </View>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons name="map-marker-distance" color={colorCss.grey.c} size={22} />
          <Text style={[appCss.infoText3, styles.data]}>{distance} km</Text>
        </View>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons name="map-marker" color={colorCss.grey.darken} size={22} />
          <Text style={[appCss.infoText3, styles.data]}>
            Indo de
            <Text style={{ fontWeight: "bold" }}> {originName} </Text>
          </Text>
        </View>
        <View style={appCss.textIcon}>
          <MaterialCommunityIcons name="map-marker" color={colorCss.blue.c} size={22} />
          <Text style={[appCss.infoText3, styles.data]}>
            Para
            <Text style={{ fontWeight: "bold" }}> {destinationName} </Text>
          </Text>
        </View>
      </View>
      <MvButton onPress={handlerStart} propStyle={styles.confirmButton}>
        <View style={appCss.textIcon}>
          <Text style={styles.confirmButtonText}>BUSCAR</Text>
        </View>
      </MvButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "55%",
    padding: 10,
    elevation: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  freightData: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  data: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: grey.lighten,
  },
  confirmButton: {
    width: "100%",
    height: 35,
    backgroundColor: blue.darken,
  },
  confirmButtonText: {
    fontSize: 17,
    color: "white",
  },
});
