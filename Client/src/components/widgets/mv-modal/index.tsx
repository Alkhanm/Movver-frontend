import React, { useState } from "react";
import {
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { grey } from "../../../styles/color.css";

interface MvModalProps extends ModalProps {
  VisibleElement?: React.FC;
  children: React.ReactNode;
}

export const MvModal: React.FC<MvModalProps> = ({ VisibleElement, children, ...rest }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        collapsable={true}
        {...rest}
      >
        <TouchableOpacity style={styles.view} onPressIn={() => setVisible(false)} />
        <View style={[styles.view, styles.viewBottom]}>
          <View style={styles.children}>{children}</View>
          <Pressable style={styles.buttonClose} onPress={() => setVisible(!visible)}>
            <Text style={styles.buttonCloseText}>PRONTO</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.buttonOpen} onTouchStart={() => setVisible(true)}>
        {VisibleElement && <VisibleElement />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
  },
  viewBottom: {
    maxHeight: "40%",
    alignSelf: "flex-end",
    backgroundColor: grey.lighten4,
    borderRadius: 10,
    padding: 5,
  },
  children: {
    flexGrow: 1,
  },

  buttonOpen: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  buttonClose: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 5,
    borderRadius: 10,
  },
  buttonCloseText: {
    color: "white",
    fontSize: 16,
  },
  modalText: {
    color: "black",
    fontSize: 17,
    opacity: 0.6,
    textAlign: "center",
  },
});
