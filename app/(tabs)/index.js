import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, ui } from "../../src/utils/styles";
import { useState } from "react";
import { useTranslator } from "../../src/layout/home/useTranslator";

export default function Translator() {
    const [text, setText] = useState('');
    const morse = useTranslator(text);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Image source={require("../../assets/notebook.png")} style={{ width: 100, height: 100 }} />
                    <Text style={[ui.text, ui.center]}>Traduce al instante cualquier <Text style={ui.bold}>texto a código morse</Text>.</Text>
                </View>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Escribe un texto"
                    style={{ borderBottomWidth: 1, marginBottom: 20 }}
                />
                <Text style={{ fontSize: 16 }}>{morse}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 250,
    },
})