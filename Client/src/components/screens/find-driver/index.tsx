import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { iDriver } from "../../../domain/model/interfaces/iDriver";
import { getTruckBodyworkName, truckBodyworkType } from "../../../domain/model/interfaces/iVehicle";
import { DriverHttp } from "../../../domain/services/api/driver-http";
import { appCss } from "../../../styles/app.css";
import Select from "../../widgets/mv-select";
import DriverCard from "./driver-card";

export const FindDriver: React.FC = () => {
  const [drivers, setDrivers] = useState<iDriver[]>([]);

  const [capacityFilter, setCapacityFilter] = useState(0);
  const [truckBodyWorkFilter, setTruckBodyWorkFilter] = useState<truckBodyworkType>("ANY");

  const SetWeight: React.FC = () => (
    <Text style={appCss.infoText}>Capacidade de carga: {capacityFilter} kg </Text>
  );
  const SetTruckBodyWork: React.FC = () => (
    <Text style={appCss.infoText}>Carroceria: {getTruckBodyworkName(truckBodyWorkFilter)} </Text>
  );

  useEffect(() => {
    DriverHttp.getDrivers().then(response => setDrivers(response));
  }, []);

  const filtredDrivers: iDriver[] = useMemo(() => {
    return drivers
      .filter(driver => driver.vehicle.capacity >= capacityFilter)
      .filter(driver => {
        if (truckBodyWorkFilter === "ANY") return true;
        return driver.vehicle.truckBodyWork === truckBodyWorkFilter;
      });
  }, [drivers, capacityFilter, truckBodyWorkFilter]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, styles.titleCard]}>
        <Text style={appCss.title}>Motoristas próximos</Text>
      </View>
      <View style={[styles.card, styles.optionsCard]}>
        <Text>Seleções</Text>
        <View style={styles.options}>
          <View style={appCss.textIcon}>
            <Select
              VisibleElement={SetTruckBodyWork}
              setValue={setTruckBodyWorkFilter}
              items={[
                { label: "Fechada", value: "CLOSED" },
                { label: "Aberta", value: "OPEN" },
                { label: "Todas", value: "ANY" },
              ]}
            />
          </View>
          <View style={[appCss.textIcon]}>
            <Select
              VisibleElement={SetWeight}
              setValue={setCapacityFilter}
              items={[500, 1000, 2000, 4000, 6000, 8000, 10000]}
            />
          </View>
        </View>
      </View>
      <ScrollView style={[styles.card, styles.driversCard]}>
        <Text
          style={styles.resultCounter}
        >{`Resultados: ${filtredDrivers.length} de ${drivers.length}`}</Text>
        <DriverCard drivers={filtredDrivers} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 5,
    backgroundColor: "white",
    width: "95%",
    elevation: 3,
    padding: 5,
  },
  titleCard: {
    justifyContent: "center",
    flexGrow: 1,
    marginTop: 5,
    alignItems: "center",
  },
  optionsCard: {
    flexGrow: 2,
    alignItems: "center",
  },
  driversCard: {
    flexGrow: 8,
  },
  options: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  select: {
    justifyContent: "center",
    height: 10,
  },
  resultCounter: {
    fontSize: 13,
    opacity: 0.5,
    alignSelf: "flex-end",
  },
});
