import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuthContext } from "../../../context/auth-context";
import { appCss } from "../../../styles/app.css";
import colorCss from "../../../styles/color.css";
import { MvTextAction } from "../../widgets/mv-text-action";

export const ProfileSettings = () => {
  const [visibility, setVisibility] = useState(false);
  const { signOut } = useAuthContext();

  function handlerSignOut(): void {
    setVisibility(false);
    signOut();
  }

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={visibility}>
        <TouchableOpacity
          //Ao clicar ao lado de fora do modal ele fechará
          onPressIn={() => setVisibility(false)}
          activeOpacity={1}
          style={styles.centeredView}
        >
          <TouchableOpacity
            onPressIn={() => setVisibility(true)}
            activeOpacity={1}
            style={styles.modalView}
          >
            <View style={styles.title}>
              <Text style={appCss.title}>Configurações</Text>
            </View>
            <View style={styles.card}>
              <View style={styles.section}>
                <Text style={appCss.infoText}>Lugares</Text>
              </View>
              <View style={[styles.section, styles.sectionActions]}>
                <MvTextAction text="Sobre" action={() => {}} />
                <MvTextAction text="Sair" action={handlerSignOut} showIcon={false} />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setVisibility(true)}>
        <Icon name="menu" size={40} />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "visible",
    backgroundColor: "rgba(52, 52, 52, 0.1)",
  },
  modalView: {
    flex: 1,
    width: "80%",
    alignSelf: "flex-start",
    backgroundColor: "white",
    elevation: 10,
  },
  title: {
    margin: 15,
  },
  card: {
    flex: 1,
  },
  section: {
    flex: 1,
    padding: 15,
    borderColor: colorCss.grey.lighten2,
    borderTopWidth: 1,
  },
  sectionActions: {
    justifyContent: "flex-end",
  },
});
