import { useNavigation } from "@react-navigation/core";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "../../context/auth-context";
import { iClient } from "../../domain/model/interfaces/iClient";
import { ClientHttp } from "../../domain/services/api/client-http";
import { Utils } from "../../domain/services/function/utils";
import { mainRoutes } from "../../routes/routes-enum";
import authCss from "../../styles/auth.css";
import { MvButton } from "../widgets/mv-button";
import { MvInput } from "../widgets/mv-input";

export const RegisterDriver = () => {
  const AuthContext = useAuthContext();

  const { goBack, navigate } = useNavigation();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [birthdate, setBirthdate] = useState<number>(0);
  const [password, setPassword] = useState<string>("");

  const formattedPhone: string = useMemo(() => Utils.formatPhoneNumber(phoneNumber), [phoneNumber]);

  // const formattedBirthdate: [string, boolean] = useMemo(() => Utils.maskDate(birthdate), [birthdate]);

  async function handlerRegister() {
    const client: iClient = {
      name,
      phoneNumber,
      birthdate,
      password,
    };
    await ClientHttp.save(client);
    const signed = await AuthContext.signIn(phoneNumber, password);
    if (signed) navigate(mainRoutes.MAIN, { screen: mainRoutes.HOME });
    else console.warn("Login ou senha informados são invalidos");
  }

  return (
    <SafeAreaView style={authCss.container}>
      <View style={[authCss.mainView, { justifyContent: "space-around" }]}>
        <TouchableOpacity onPress={goBack} style={authCss.goBack}>
          <Icon style={{ marginLeft: 10 }} name="keyboard-backspace" size={45} />
        </TouchableOpacity>

        <View style={authCss.infos}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Seja bem-vindo</Text>
          <Text></Text>
          <Text>Precisamos de apenas algumas informações</Text>
          <Text>Isso será rápido! 😉</Text>
        </View>

        <View style={authCss.form}>
          <ScrollView>
            <MvInput
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              icon="account-outline"
            />
            <MvInput
              placeholder="Número do telefone"
              value={formattedPhone}
              maxLength={15}
              onChangeText={setPhoneNumber}
              icon="cellphone"
              keyboardType="phone-pad"
            />
            <MvInput
              placeholder="Data de nascimento"
              maxLength={10}
              editable={false}
              // value={formattedBirthdate[0]}
              // onChangeText={setBirthdate}
              value={""}
              onChangeText={() => {}}
              icon="calendar-outline"
              keyboardType="number-pad"
            />
            <MvInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              icon="lock-outline"
              secureTextEntry
            />
          </ScrollView>
        </View>

        <MvButton propStyle={authCss.loginButton} onPress={handlerRegister}>
          <Text style={authCss.registerText}>Próximo</Text>
        </MvButton>
      </View>
    </SafeAreaView>
  );
};
