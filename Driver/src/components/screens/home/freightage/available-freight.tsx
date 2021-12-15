import Icon from "@expo/vector-icons/build/MaterialCommunityIcons";
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { iFreight } from "../../../../domain/model/interfaces/iFreight";
import { FreightHttp } from "../../../../domain/services/api/freight-http";
import { FreightFunction } from "../../../../domain/services/function/freight-function";
import { appCss } from "../../../../styles/app.css";
import colorCss from "../../../../styles/color.css";
import { MvButton } from "../../../widgets/mv-button";

export const AvailableFreight: React.FC<{ status: boolean }> = ({ status }) => {

    const [freightAvailable, setFreightAvailable] = useState<iFreight>({} as iFreight);
    const [reload, setReaload] = useState(false);
    const [lastRejectedFreightId, setLastRejectedFreightId] = useState(0);

    function next() {
        setFreightAvailable({} as iFreight);
        setReaload(!reload);
        setLastRejectedFreightId(freightAvailable.id);
    }

    useEffect(() => {
        (async () => {
            // Busca pelo último frete confirmado disponivel
            const response: iFreight[] = await FreightHttp.fetchFreightsBy(`status=confirmed&sort=startDate,desc&size=1`);
            const freight: iFreight = response[0];
            if (freight.id != lastRejectedFreightId) setFreightAvailable(freight);
        })()
    }, [status, reload]);

    return <>
        <View style={styles.title}>
            <Text style={appCss.subtitle}>Frete disponivel</Text>
        </View>
        <View style={styles.card} >
            {freightAvailable.id ?
                <>
                    <View style={styles.infos}>
                        <Text style={appCss.infoText}>
                            {freightAvailable?.client?.name}
                        </Text>
                        <Text style={appCss.infoText2}>
                            Serviço de {FreightFunction.getServiceName(freightAvailable?.service)}
                        </Text>
                        <Text style={appCss.infoText2}>
                            {freightAvailable?.distance} km
                        </Text>
                        <Text style={appCss.infoText2}>
                            R$ {freightAvailable?.price}
                        </Text>
                    </View>
                    <View style={styles.actions}>
                        <MvButton children={<Text style={styles.buttonAcceptText}>Aceitar</Text>} propStyle={styles.buttonAccept} />
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                            <Text onPress={next} style={styles.buttonReject}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </>
                :
                <View style={styles.infosEmpty}>
                    <Icon name="truck-outline" size={35} color={colorCss.grey.darken} />
                    <Text style={appCss.infoText2}>No momento não há outros pedidos de serviço</Text>
                    {lastRejectedFreightId &&
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                            <Text onPress={next} style={styles.buttonReject}>Ver anteriores</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
        </View></>;
}



const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    title: {
        alignItems: "center",
        justifyContent: "center",
        bottom: (height / 2.25),
        width: "90%",
        height: 40,
        borderRadius: 30,
        elevation: 10,
        backgroundColor: "white",
    },
    card: {
        justifyContent: "space-between",
        alignItems: "center",
        bottom: (height / 2.3),
        width: "90%",
        height: "30%",
        borderRadius: 30,
        elevation: 10,
        backgroundColor: "white",
    },
    infos: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
    },
    infosEmpty: {
        flex: 1,
        paddingVertical: "10%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    actions: {
        width: "80%",
    },
    buttonAccept: {
        width: "95%",
        borderRadius: 30,
        height: 40,
        marginBottom: 5,
    },
    buttonReject: {
        height: 30,
        fontSize: 15,
        fontWeight: "bold",
        color: colorCss.grey.lighten
    },
    buttonAcceptText: {
        color: "white",
        fontSize: 16,
    },
});
