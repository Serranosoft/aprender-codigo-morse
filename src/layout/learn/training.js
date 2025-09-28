import { StyleSheet, View } from "react-native";
import Answers from "./answers";
import Letter from "./letter";

export default function Training({ letters, setMistakes, level }) {
    
    return (
        <View style={styles.container}>
            <Letter {...{ letters }} />
            <Answers {...{ letters, setMistakes, level }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
        flex: 1,
    }
})