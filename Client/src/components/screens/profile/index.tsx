/** Componente para o perfil do usuário */
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../../context/auth-context";
import { iClient } from "../../../domain/model/interfaces/iClient";
import { iFreight } from "../../../domain/model/interfaces/iFreight";
import { FreightHttp } from "../../../domain/services/api/freight-http";
import { Utils } from "../../../domain/services/function/utils";
import { appCss } from "../../../styles/app.css";
import { FreightCard } from "./profile-freight-card";
import { ProfileSettings } from "./profile-settings";

export const Profile = () => {
  const AuthContext = useAuthContext();

  const [freights, setFreights] = useState([] as iFreight[]);
  const client: iClient = AuthContext.client;

  const name = client.name;
  const phoneNumber = Utils.formatPhoneNumber(client.phoneNumber);
  const birthdate = new Date(client.birthdate).toDateString();

  useEffect(() => {
    FreightHttp.getFreights("?startDate!=null&sort=startDate,desc&size=3")
      .then(d => d.filter(({ status }) => status === "FINISHED"))
      .then(setFreights);
  }, []);

  return (
    <SafeAreaView style={appCss.container}>
      <View style={styles.card}>
        <View style={styles.settings}>
          <ProfileSettings />
        </View>
        <View>
          <Image style={styles.img} source={require("../../../assets/perfil.jpeg")} />
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={[styles.card, styles.infoCard]}>
        <View style={styles.info}>
          <Text style={appCss.infoText}>Número de Telefone</Text>
          <Text>{phoneNumber}</Text>
        </View>
        <View style={styles.info}>
          <Text style={appCss.infoText}>Data de nascimento</Text>
          <Text>{birthdate}</Text>
        </View>
      </View>
      <View style={[styles.card, styles.lastFreightList]}>
        <Text style={appCss.title}>Fretes recentes</Text>
        {freights.length ? (
          <FlatList
            style={{ width: "100%", marginBottom: 5 }}
            scrollEnabled
            data={freights}
            renderItem={({ item }) => <FreightCard freight={item} />}
          />
        ) : (
          <View style={styles.emptyList}>
            <Text style={styles.emptyListText}>Você ainda não contratou nem um frete</Text>
          </View>
        )}
        <TouchableOpacity>
          <Text style={styles.lastFreightsButton}>Ver mais antigos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    marginBottom: 5,
    backgroundColor: "white",
    width: "95%",
    elevation: 3,
    padding: 5,
  },
  lastFreightList: {
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 5,
    width: "100%",
    padding: 10,
  },
  lastFreightsButton: {
    fontSize: 14,
    opacity: 0.5,
    alignSelf: "center",
  },
  settings: {
    alignSelf: "flex-start",
  },
  infoCard: {
    flexGrow: 0,
    justifyContent: "space-around",
  },
  info: {
    marginBottom: 5,
    padding: 5,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    alignSelf: "center",
  },

  emptyList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    fontSize: 17,
    opacity: 0.5,
  },
});
