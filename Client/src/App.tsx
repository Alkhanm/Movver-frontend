/** Componente de acesso as rotas
 */
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./context/auth-context";
import { FreightProvider } from "./context/freight-context";
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
              <FreightProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Routes />
                </SafeAreaView>
              </FreightProvider>
            </LocationProvider>
          </TomCompleteProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
