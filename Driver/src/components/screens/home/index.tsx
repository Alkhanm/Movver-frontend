import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useLocationContext } from "../../../context/location-context";
import colorCss from "../../../styles/color.css";
import { AvailableFreight } from "./freightage/available-freight";

export const Home: React.FC = () => {
  const { origin } = useLocationContext();

  const [isActive, setIsActive] = useState(false);


  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation loadingEnabled initialRegion={origin} />
      {isActive ?
        <>
          <TouchableOpacity onPress={() => setIsActive(!isActive)} style={styles.statusButtonOnline} activeOpacity={0.7}>
            <Text style={styles.statusText}>Online</Text>
            <Icon name="car" style={styles.statusIconOnline} />
          </TouchableOpacity>
          <AvailableFreight status={isActive} />
        </>
        :
        <TouchableOpacity onPress={() => setIsActive(!isActive)} style={[styles.statusButtonOnline, styles.statusButtonOffline]} activeOpacity={0.7}>
          <Text style={styles.statusText}>Offline</Text>
          <Icon name="car" style={[styles.statusIconOnline, styles.statusIconOffline]} />
        </TouchableOpacity>
      }

    </View>
  );
};

export default Home;

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  statusButtonOnline: {
    flexDirection: "row",
    top: -(height / 1.1),
    width: "40%",
    height: 50,
    borderRadius: 50,
    elevation: 10,
    margin: 10,
    padding: 10,
    paddingLeft: 20,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colorCss.blue.c,
  },
  statusButtonOffline: {
    backgroundColor: colorCss.grey.lighten,
  },
  statusIconOnline: {
    fontSize: 25,
    padding: 5,
    borderRadius: 50,
    backgroundColor: "white",
    color: colorCss.blue.c,
  },
  statusIconOffline: {
    color: colorCss.grey.lighten,
  },
  statusText: {
    color: "white",
    fontSize: 16,
  },

});
