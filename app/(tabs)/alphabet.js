import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import morseData from '../../assets/alphabet.json';
import { colors, ui } from "../../src/utils/styles";
import Header from "../../src/layout/header";

export default function Alphabet() {

    const { letters, numbers, symbols } = morseData;

    const combinedData = [
        ...letters.map(item => ({ ...item, type: "letter" })),
        ...numbers.map(item => ({ ...item, type: "number" })),
        ...symbols.map(item => ({ ...item, type: "symbol" })),
    ];

    return (
        <>
            <Header back />
            <View style={styles.container}>
                <View style={styles.columns}>
                    <Text style={[ui.h3, ui.bold]}>Letra</Text>
                    <Text style={[ui.h3, ui.bold]}>Morse</Text>
                    <Text style={[ui.h3, ui.bold]}>Clave</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        style={{ flex: 1, width: "100%" }}
                        contentContainerStyle={{ paddingBottom: 40, gap: 24, justifyContent: "center", alignItems: "center" }}
                        data={combinedData}
                        keyExtractor={(item, index) => `${item.type}-${index}`}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", justifyContent: "space-between", width: 300 }}>
                                <Text style={ui.h4}>
                                    {item.letter || item.number || item.symbol}
                                </Text>
                                <Text style={ui.h4}>{item.morse}</Text>
                                <Text style={ui.h4}>{item.word}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        padding: 16,
        paddingTop: 24,
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    columns: {
        width: 300,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: colors.accent
    },
    content: {
        flex: 1,
        paddingBottom: 40,
    },
    list: {
        width: "100%",

    }
})