import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { iFreight } from "../../../domain/model/interfaces/iFreight";
import { FreightFunction } from "../../../domain/services/function/freight-function";
import { appCss } from "../../../styles/app.css";
import colorCss from "../../../styles/color.css";

export const FreightCard: React.FC<{ freight: iFreight }> = ({ freight }) => {

  const date = freight.startDate;
  const origin = freight.origin.name;
  const destination = freight.destination.name;
  const status = FreightFunction.getStatusName(freight.status);


  return (
    <View key={freight.id} style={styles.freightCard}>
      <View style={styles.dateCard}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View>
        <View style={appCss.textIcon}>
          <Icon name="room" size={20} color={"gray"} />
          <Text style={styles.text}>{origin}</Text>
        </View>
        <View style={appCss.textIcon}>
          <Icon name="room" size={20} color={"black"} />
          <Text style={styles.text}>{destination}</Text>
        </View>
      </View>
      <View style={styles.priceStatus}>
        <View style={appCss.textIcon}>
          <Icon name="circle" size={15} color={"gray"} />
          <Text style={[styles.text, styles.status]}>{status}</Text>
        </View>
        <View style={appCss.textIcon}>
          <Text style={styles.text}>R$ {freight.price?.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  freightCard: {
    marginHorizontal: 5,
    padding: 5,
    marginBottom: 5,
    elevation: 2,
    backgroundColor: "white",
    borderColor: "#2196f3",
    color: "white",
  },
  dateCard: {
    height: 25,
    padding: 5,
    borderRadius: 10,
    backgroundColor: colorCss.blue.c,
    alignSelf: "center",
    justifyContent: "center",
  },
  dateText: {
    fontSize: 15,
    color: "white",
  },
  text: {
    color: "black",
  },
  priceStatus: {
    flexDirection: "row",
    marginLeft: 3,
    marginRight: 3,
    justifyContent: "space-between",
  },
  status: {
    marginLeft: 3,
  },

});
