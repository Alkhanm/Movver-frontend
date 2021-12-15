import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Login } from "../components/auth/login";
import { RegisterDriver } from "../components/auth/register-driver";
import { useAuthContext } from "../context/auth-context";
import { MainRoutes } from "./navigators/main-routes";
import { authRoutes, mainRoutes } from "./routes-enum";

const Stack = createStackNavigator();

export const Routes = () => {
  const { signed } = useAuthContext();

  return (
    <Stack.Navigator initialRouteName={mainRoutes.MAIN} headerMode="none">
      <Stack.Screen name={authRoutes.AUTH_LOGIN} component={Login} />
      <Stack.Screen name={authRoutes.AUTH_REGISTER_DRIVER} component={RegisterDriver} />
      {signed && (
        <>
          <Stack.Screen name={mainRoutes.MAIN} component={MainRoutes} />
        </>
      )}
    </Stack.Navigator>
  );
};
