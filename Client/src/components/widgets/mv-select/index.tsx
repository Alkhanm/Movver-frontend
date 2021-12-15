import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MvModal } from "../mv-modal";
import Item from "./select-item";

type item = { label: string; value: any };
type items = item[] | string[] | number[];

interface Props {
  setValue: Function;
  items: items;
  VisibleElement: React.FC;
  showValue?: boolean;
}

const Select: React.FC<Props> = ({items, setValue, VisibleElement, showValue}) => {
  const [newValue, setNewValue] = useState(null);

  //Função q transforma qlqr tipo de array em uma array de "item"
  function transformToItems(arr: items): item[] {
    if (typeof arr[0] === "object") return arr as item[];
    return arr.map(i => ({ value: i, label: String(i) }));
  }

  //useMemo -> evita que essa função seja chamada repetidas vezes desnecessariamente
  const itemsList: item[] = useMemo(() => transformToItems(items), [items]);

  //Callback que será enviada ao elemento filho Item sempre q o valor mudar
  function onChangeValue(value: any) {
    setValue(value);
    setNewValue(value);
  }

  return (
    <MvModal VisibleElement={VisibleElement}>
      <View style={styles.items}>
        {itemsList.map(({ label, value }) => (
          <Item
            label={label}
            value={value}
            setValue={onChangeValue}
            newValue={newValue}
            key={value}
          />
        ))}
      </View>
    </MvModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonClose: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 5,
    borderRadius: 10,
  },
  items: {
    flexGrow: 1,
  },
});

export default Select;
