import { StyleSheet } from 'react-native';

export const appCss = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        alignSelf: "center",
    },
    subtitle: {
        paddingLeft: 5,
        fontSize: 18,
        opacity: 0.7
    },
    infoText: {
        fontSize: 17,
        elevation: 6,
        opacity: 0.7,
    },
    infoText2: {
        fontSize: 14,
        elevation: 6,
        opacity: 0.6,
        paddingHorizontal: 10
    },
    infoText3: {
        fontSize: 15,
        opacity: 0.7,
        paddingHorizontal: 10
    },
    textIcon: {
        margin: 5,
        flexDirection: "row",
        alignItems: "center",
    },
})