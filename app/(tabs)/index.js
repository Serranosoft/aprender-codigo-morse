import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../src/utils/styles";
import { useState } from "react";
import { useTranslator } from "../../src/layout/home/useTranslator";

export default function Translator() {
    const [text, setText] = useState('');
    const morse = useTranslator(text);

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Escribe un texto"
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Text style={{ fontSize: 16 }}>{morse}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})