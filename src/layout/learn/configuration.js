import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getLevelData } from "./useLearn";
import { colors, ui } from "../../utils/styles";
import { Dropdown } from "react-native-element-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../../components/button";

export default function Configuration({ setLetters, /* setValues, */ setIsReady }) {

    const [level, setLevel] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    function start() {
        const letters = getLevelData(level);
        // const values = Object.values(letters);
        setLetters(letters);
        // setValues(values);
        setIsReady(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image source={require("../../../assets/alarm-clock.png")} style={{ width: 100, height: 100 }} />
                <Text style={[ui.text, ui.center]}>Dedica 5 minutos al día para aprender código morse <Text style={ui.bold}>en menos de 2 semanas</Text>.</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.group}>
                    <Text style={ui.text}>Nivel seleccionado:</Text>
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={ui.text}
                        selectedTextStyle={ui.text}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={
                            [
                                { label: "Nivel 1", value: 1 },
                                { label: "Nivel 2", value: 2 },
                                { label: "Nivel 3", value: 3 },
                                { label: "Nivel 4", value: 4 },
                                { label: "Nivel 5", value: 5 },
                                { label: "Nivel 6", value: 6 },
                                { label: "Nivel 7", value: 7 },
                                { label: "Nivel 8", value: 8 },
                                { label: "Nivel 9", value: 9 },
                                { label: "Nivel 10", value: 10 },
                                { label: "Nivel 11", value: 11 },
                                { label: "Nivel 12", value: 12 },
                                { label: "Nivel 13", value: 13 },
                                { label: "Nivel 14", value: 14 },
                            ]
                        }
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Elige un nivel' : value}
                        searchPlaceholder="Elige un nivel ..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setLevel(item.value);
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Ionicons
                                style={styles.icon}
                                color={'#fff'}
                                name="bulb-outline"
                                size={24}
                            />
                        )}
                    />
                </View>
                <Button onPress={() => start()}>
                    <Text style={[ui.h3, ui.center]}>Comenzar</Text>
                </Button>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: 32
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 250,
    },
    content: {
        gap: 16,
    },
    group: {
        gap: 8
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
    },
});