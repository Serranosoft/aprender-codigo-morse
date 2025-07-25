import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslator } from "./useTranslator";

export default function Translator() {
    const [text, setText] = useState('');
    const [swap, setSwap] = useState(false);
    const morse = useTranslator(text, swap);

    return (

        <View style={styles.container}>
            <View style={styles.input}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder={`Escribe aquí el ${swap ? "código morse" : "texto"} que quieres traducir`}
                    placeholderTextColor={"#cccccc"}
                    style={styles.textInput}
                    multiline={true}
                />
            </View>
            <View style={styles.arrow}>
                <Ionicons name="arrow-down" size={24} color="#fff" />
            </View>
            <View style={styles.answer}>
                <Text style={morse ? ui.h5 : { color: "#cccccc" }}>{morse || `Aquí aparecerá tu ${swap ? "código morse" : "texto"} traducido`}</Text>
            </View>
            <View style={styles.swap}>
                <Text style={[ui.muted, { color: swap ? "#cccccc" : colors.accent }]}>Texto a Morse</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{ false: colors.accent, true: "#cccccc" }}
                    thumbColor={'#f4f3f4'}
                    onValueChange={() => setSwap(!swap)}
                    value={swap}
                />
                <Text style={[ui.muted, { color: swap ? colors.accent : "#cccccc" }]}>Morse a Texto</Text>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 16,
        paddingTop: 24,
        gap: 8,
    },

    content: {
        flex: 1,
    },

    input: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 8
    },

    textInput: {
        color: "#fff",
        padding: 16,
    },

    answer: {
        minHeight: 100,
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 8,
        padding: 16
    },

    arrow: {
        justifyContent: "center",
        alignItems: "center"
    },

    swap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    }
})