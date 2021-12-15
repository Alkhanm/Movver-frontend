import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { iDriver } from "../../../domain/model/interfaces/iDriver";
import { truckBodyworkType } from "../../../domain/model/interfaces/iVehicle";
import { numberSeparador } from "../../../domain/services/function/utils";
import { appCss } from "../../../styles/app.css";
import { green, grey } from "../../../styles/color.css";


const DriverCard = ({ drivers }: { drivers: Array<iDriver> }) => {
  const iconTruck = (truckBodywork: truckBodyworkType) => {
    return truckBodywork === "CLOSED" ? "truck" : "dump-truck";
  };

  return (
    <>
      {drivers.map(({ id, name, available, vehicle, location }) => (
        <View key={id} style={styles.driverInfo}>
          <View style={styles.driver}>
            <Image
              style={[styles.driverImg, { borderColor: available ? green.lighten3 : grey.darken }]}
              source={require("../../../assets/perfil.jpeg")}
            />
            <Text style={styles.driverName}>{name}</Text>
          </View>
          <View style={appCss.textIcon}>
            <Icon name={iconTruck(vehicle.truckBodyWork)} size={20} color={grey.darken3} />
            <Text> {vehicle.model}</Text>
          </View>
          <View style={appCss.textIcon}>
            <Icon name="weight-kilogram" size={20} color={grey.darken3} />
            <Text> {numberSeparador(vehicle.capacity)}</Text>
          </View>
          <View style={appCss.textIcon}>
            <Icon name="map-marker-radius" size={20} color={grey.darken3} />
            <Text> {location.name}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  driverInfo: {
    elevation: 2,
    backgroundColor: "white",
    margin: 5,
    marginBottom: 10,
    borderRadius: 20,
    padding: 5,
  },
  driver: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 2,
  },
  driverName: {
    fontSize: 18,
  },
  driverImg: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 3,
  },
});
