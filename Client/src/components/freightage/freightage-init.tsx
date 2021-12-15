import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthContext } from "../../context/auth-context";
import { useFreightContext } from "../../context/freight-context";
import { useLocationContext } from "../../context/location-context";
import { freightService, iFreight } from "../../domain/model/interfaces/iFreight";
import { FreightHttp } from "../../domain/services/api/freight-http";
import { FreightFunction } from "../../domain/services/function/freight-function";
import { appCss } from "../../styles/app.css";
import { blue, grey } from "../../styles/color.css";
import { MvButton } from "../widgets/mv-button";
import { MvModal } from "../widgets/mv-modal";
import Select from "../widgets/mv-select/index";

type serviceOption = {
  freightService: freightService;
  label?: string;
  icon: string;
};

const services: Array<serviceOption> = [
  { freightService: "HOME_MOVING", icon: "truck" },
  { freightService: "MATERIAL_TRANSPORT", icon: "dump-truck" },
];

export const FreightageInit: React.FC = () => {
  const FreightContext = useFreightContext();
  const LocationContext = useLocationContext();
  const AuthContext = useAuthContext();

  const [service, setService] = useState<freightService>({} as freightService);
  const [weight, setWeight] = useState<number>(0);
  const [description, setDescription] = useState("");

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const freight: iFreight = FreightContext.freight;

  const optionSelectedColor = (value: string): string => {
    return service == value ? blue.darken : grey.darken;
  };

  const activeColor = () => (isConfirmed ? "white" : grey.lighten);

  async function handlerConfirm() {
    const freightResponse = await FreightHttp.confirm(freight);
    FreightContext.setFreight(freightResponse);
  }

  useEffect(() => {
    const freight: iFreight = {
      id: 0,
      weight: weight,
      service: service,
      status: "UNCONFIRMED",
      description: description,
      distance: LocationContext.distance,
      client: AuthContext.client,
      origin: LocationContext.origin,
      destination: LocationContext.destination,
    };
    FreightContext.setFreight(freight);
    setIsConfirmed(FreightFunction.isReady(freight));
  }, [service, weight, description]);

  const SendCommentVisible: React.FC = () => (
    <View style={appCss.textIcon}>
      <Icon style={styles.fieldIcon} name="comment-text-outline" color={grey.darken} size={25} />
      <Text style={appCss.subtitle}>Enviar comentario</Text>
    </View>
  );

  const SetWeight: React.FC = () => (
    <View style={appCss.textIcon}>
      <Icon style={styles.fieldIcon} name="weight-kilogram" color={grey.darken} size={25} />
      <Text style={appCss.subtitle}>Peso estimado: {weight} kg</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.expand, styles.expand2]}></View>
        <View style={styles.expand}></View>
        <View style={styles.form}>
          <View style={styles.serviceOptions}>
            {services.map(({ icon, freightService, label }) => (
              <TouchableHighlight
                onPress={_ => setService(freightService)}
                style={[
                  styles.serviceOption,
                  service == freightService ? styles.serviceOptionSelected : {},
                ]}
                underlayColor={grey.lighten3}
                key={freightService}
              >
                <View style={styles.serviceCard}>
                  <Icon name={icon} size={35} color={optionSelectedColor(freightService)} />
                  <Text
                    style={[
                      appCss.subtitle,
                      { textAlign: "center", color: optionSelectedColor(freightService) },
                    ]}
                  >
                    {FreightFunction.getServiceName(freightService)}
                  </Text>
                  <Text style={appCss.infoText}>{label}</Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <View style={styles.fields}>
            <Select
              VisibleElement={SetWeight}
              setValue={setWeight}
              items={[500, 1000, 2000, 4000, 6000, 8000, 10000]}
            />
            <MvModal VisibleElement={SendCommentVisible}>
              <View style={styles.sendComment}>
                <View style={styles.sendCommentText}>
                  <Text style={appCss.subtitle}>Enviar comentario</Text>
                  <Text style={appCss.infoText2}>
                    Há algum detalhe importante que você gostaria de acrescentar?
                  </Text>
                </View>
                <TextInput
                  value={description}
                  onChangeText={text => setDescription(text)}
                  numberOfLines={3}
                  multiline
                  style={styles.sendCommentInput}
                />
              </View>
            </MvModal>
          </View>
        </View>
      </View>
      <MvButton
        onPress={handlerConfirm}
        propStyle={[styles.confirmButton]}
        isTouchable={isConfirmed}
      >
        <View style={appCss.textIcon}>
          <Text style={[styles.confirmButtonText, { color: activeColor() }]}>CONFIRMAR</Text>
          <MaterialCommunityIcons
            name={"arrow-right-bold-outline"}
            color={activeColor()}
            size={22}
          />
        </View>
      </MvButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "55%",
    padding: 10,
    elevation: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
  },
  form: {
    flex: 1,
    paddingVertical: 20,
    justifyContent: "space-around",
  },
  expand: {
    width: "40%",
    borderBottomWidth: 3,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    borderColor: grey.lighten,
  },
  expand2: {
    width: "20%",
    borderBottomWidth: 2,
  },
  descriptionInput: {
    padding: 10,
    backgroundColor: grey.lighten4,
  },
  serviceOptions: {
    flexGrow: 1,
    flexDirection: "row",
  },
  serviceOption: {
    flex: 1,
    elevation: 2,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    margin: 5,
  },
  serviceOptionSelected: {
    borderColor: blue.lighten3,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
  sendComment: {
    flex: 1,
    padding: 10,
  },
  sendCommentText: {
    justifyContent: "center",
    alignItems: "center",
  },
  sendCommentInput: {
    flexGrow: 1,
    backgroundColor: grey.lighten3,
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  serviceCard: {
    alignItems: "center",
  },
  fields: {
    flexGrow: 2,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  fieldIcon: {
    marginRight: 10,
  },
  confirmButton: {
    width: "100%",
    height: 40,
  },
  confirmButtonText: {
    fontSize: 17,
    color: "white",
  },
});
