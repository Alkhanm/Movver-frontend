import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FindDriver } from "../../components/screens/find-driver/index";
import { Home } from "../../components/screens/home/index";
import { Profile } from "../../components/screens/profile/index";
import { mainRoutes } from "../routes-enum";

const Tab = createBottomTabNavigator();

export function MainRoutes() {
  return (
    <Tab.Navigator initialRouteName={mainRoutes.HOME}>
      <Tab.Screen
        name={mainRoutes.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={mainRoutes.FIND_DRIVER}
        component={FindDriver}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name={mainRoutes.PROFILE}
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="build" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
