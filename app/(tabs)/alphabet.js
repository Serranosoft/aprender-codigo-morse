import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import morseData from '../../assets/alphabet.json';
import { colors } from "../../src/utils/styles";

export default function Alphabet() {

    const { letters, numbers, symbols } = morseData;

    return (
        <View style={styles.container}>
            <Text>Abecedario</Text>
            <ScrollView>

                <FlatList
                    data={letters}
                    keyExtractor={(item) => item.letter}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row" }}>
                            <Text>{item.letter}</Text>
                            <Text>{item.morse}</Text>
                            <Text>{item.word}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={numbers}
                    keyExtractor={(item) => item.letter}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row" }}>
                            <Text>{item.number}</Text>
                            <Text>{item.morse}</Text>
                            <Text>{item.word}</Text>
                        </View>
                    )}
                />
                <FlatList
                    data={symbols}
                    keyExtractor={(item) => item.letter}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: "row" }}>
                            <Text>{item.symbol}</Text>
                            <Text>{item.morse}</Text>
                            <Text>{item.word}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})