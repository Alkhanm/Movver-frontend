import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useRef } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFreightContext } from "../../context/freight-context";
import { useLocationContext } from "../../context/location-context";
import { googleApi } from "../../domain/services/config";
import { FreightageConfirm } from "./freightage-confirm";
import { FreightageFinish } from "./freightage-finished";
import { FreightageInit } from "./freightage-init";
import { FreightageStart } from "./freightage-start";

export function Freightage() {
  const Navigation = useNavigation();
  const LocationContext = useLocationContext();
  const FreightContext = useFreightContext();

  console.log(FreightContext.freight)

  const status = FreightContext.freight.status;

  const mapRef = useRef<any>(null);
  const edgePadding = {
    bottom: 50,
    top: 50,
    left: 50,
    right: 50,
  };

  useEffect(() => {
    Navigation.addListener("beforeRemove", () => {
      FreightContext.setFreight({ ...FreightContext.freight, status: "UNCONFIRMED" });
    });
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={LocationContext.origin}
        showsUserLocation
        loadingEnabled
        ref={mapRef}
      >
        <MapViewDirections
          origin={LocationContext.origin}
          destination={LocationContext.destination}
          apikey={googleApi}
          strokeWidth={3}
          onReady={result => {
            LocationContext.setDistance(result.distance);
            mapRef.current.fitToCoordinates(result.coordinates, edgePadding);
          }}
        />
      </MapView>
      {status === "UNCONFIRMED" && <FreightageInit />}
      {status === "CONFIRMED" && <FreightageConfirm />}
      {status === "STARTED" && <FreightageStart />}
      {status === "FINISHED" && <FreightageFinish />}
      <TouchableOpacity onPress={Navigation.goBack} activeOpacity={0.8} style={styles.backButton}>
        <Icon name="keyboard-backspace" size={35} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: "45%",
    width: "100%",
  },
  content: {
    height: "55%",
    padding: 10,
    elevation: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  backButton: {
    backgroundColor: "white",
    elevation: 10,
    top: -780,
    height: 40,
    width: 80,
    borderRadius: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: "100%",
    height: 40,
  },
  confirmButtonText: {
    fontSize: 17,
    color: "white",
  },
});
