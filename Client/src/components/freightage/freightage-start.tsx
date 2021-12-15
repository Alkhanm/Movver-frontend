import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { appCss } from "../../styles/app.css";
import { blue } from "../../styles/color.css";

export const FreightageStart: React.FC = () => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator size="large" color={blue.c} />
      <Text style={[appCss.subtitle, { alignSelf: "center" }]}>Buscando motorista...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "55%",
    padding: 55,
    elevation: 1,
  },
});
