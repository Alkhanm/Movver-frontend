/** Componente de acesso as rotas
 */
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/auth-context";
import { LocationProvider } from "./context/location-context";
import { TomCompleteProvider } from "./context/tom-complete-context";
import { Routes } from "./routes";

export default function () {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <TomCompleteProvider>
            <LocationProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Routes />
                </SafeAreaView>
            </LocationProvider>
          </TomCompleteProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
