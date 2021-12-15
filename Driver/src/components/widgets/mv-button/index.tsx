import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import { blue, grey } from "../../../styles/color.css";

interface MvButtonProps extends TouchableOpacityProps {
  isTouchable?: boolean;
  children: React.ReactNode;
  propStyle?: ViewStyle | ViewStyle[];
}

export const MvButton = ({ children, isTouchable = true, propStyle, ...rest }: MvButtonProps) => {
  return (
    <TouchableOpacity
      style={[isTouchable ? styles.mvButton : styles.mvButtonDisabled, propStyle]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mvButton: {
    width: 100,
    backgroundColor: blue.c,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
  mvButtonDisabled: {
    backgroundColor: grey.lighten3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
});
