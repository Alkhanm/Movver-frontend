import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { appCss } from "../../../styles/app.css";


const icons = {
  SELECTED: "radiobox-marked",
  NOT_SELECTED: "radiobox-blank",
};

const Item = ({
  label,
  value,
  setValue,
  newValue,
}: {
  label?: string | number;
  value: any;
  setValue: Function;
  newValue: typeof value;
}) => {
  const [icon, setIcon] = useState<string>(icons.NOT_SELECTED);

  //Executa qnd este componente Item for selecionado
  function onSelect() {
    //Se o Item não estiver marcado, marque-o
    setIcon(icons.SELECTED);
    setValue(value);
  }

  useEffect(() => {
    //Sempre que um novo item é selecionado, os outros são desmarcados
    if (newValue !== value) setIcon(icons.NOT_SELECTED);
  }, [newValue]);

  return (
    <TouchableOpacity onPress={onSelect} style={[appCss.textIcon, styles.item]}>
      <Icon name={icon} size={20} color="gray" />
      <Text style={styles.itemText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    margin: 5,
  },
  itemText: {
    marginLeft: 5,
  },
});
