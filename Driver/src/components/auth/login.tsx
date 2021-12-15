import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthContext } from "../../context/auth-context";
import { Utils } from "../../domain/services/function/utils";
import { authRoutes, mainRoutes } from "../../routes/routes-enum";
import authCss from "../../styles/auth.css";
import colorCss, { blue, grey } from "../../styles/color.css";
import { MvButton } from "../widgets/mv-button";
import { MvInput } from "../widgets/mv-input";

export const Login = () => {
  const Navigation = useNavigation();
  const AuthContext = useAuthContext();

  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formattedPhone = useMemo(() => Utils.formatPhoneNumber(phone), [phone]);

  function goToHome(): void {
    Navigation.navigate(mainRoutes.MAIN, { screen: mainRoutes.HOME });
  }

  function handlerRegisterClient(): void {
    Navigation.navigate(authRoutes.AUTH_REGISTER_CLIENT);
  }
  function handlerRegisterDriver(): void {
    Navigation.navigate(authRoutes.AUTH_REGISTER_DRIVER);
  }

  async function handlerLogin() {
    const signed = await AuthContext.signIn(phone, password);
    if (signed) goToHome();
    else console.log("Login ou senha informados são invalidos");
  }

  useEffect(() => {
    if (AuthContext.signed) goToHome();
  }, [AuthContext.signed]);

  return (
    <SafeAreaView style={authCss.container}>
      <View style={authCss.mainView}>
        <View style={styles.user}>
          <Image style={styles.image} source={require("../../assets/perfil.jpeg")} />
          <Text style={{ fontSize: 20 }}>Seja bem-vindo</Text>
          <Text>Faça a autenticação para continuar</Text>
        </View>
        <View style={authCss.form}>
          <MvInput
            value={formattedPhone}
            placeholder="Número de telefone"
            icon="phone-outline"
            maxLength={15}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <MvInput
            value={password}
            icon="lock-outline"
            placeholder="Senha"
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          >
            <MaterialCommunityIcons
              onPress={() => setShowPassword(!showPassword)}
              name={showPassword ? "eye-check" : "eye"}
              color={showPassword ?  blue.c : grey.darken }
              size={22}
            />
          </MvInput>
        </View>
        <MvButton propStyle={authCss.loginButton} onPress={handlerLogin}>
          <Text style={styles.loginText}>Entrar</Text>
        </MvButton>
        <View style={authCss.cardRegister}>
          <Text style={{ opacity: 0.8 }}>Ainda não possui uma conta?</Text>
          <TouchableOpacity onPress={handlerRegisterClient}>
            <Text style={authCss.alreadyExistOrNo}>Crie sua conta</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlerRegisterDriver}>
            <Text style={styles.collaboratorTxt}>Desejo me tornar um parceiro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  user: {
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  loginButton: {
    height: 40,
    width: "70%",
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: "white",
    textTransform: "uppercase",
  },
  cardRegister: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    padding: 5,
  },
  collaboratorTxt: {
    marginTop: 20,
    fontSize: 15,
    color: colorCss.blue.darken2,
  },
});
