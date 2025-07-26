import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLetter } from "./letterProvider";
import { colors } from "../../utils/styles";

export default function Letter({ letters }) {

    const { currentLetter, setCurrentLetter, setCorrectAnswer, step, setStep } = useLetter();

    // La primera vez que se monta se establece el primer step.
    useEffect(() => {
        setStep((step) => step + 1);
    }, [])

    // Cada vez que se pasa de step se hace un retrieve.
    useEffect(() => {
        if (step > 0) {
            retrieve();
        }
    }, [step])


    function retrieve() {
        let values;
        if (step % 2 === 0) {
            values = Object.values(letters);
        } else {
            values = Object.keys(letters);
        }
        const randomKey = values[Math.floor(Math.random() * values.length)];

        let randomValue;
        if (step % 2 === 0) {
            randomValue = Object.fromEntries(Object.entries(letters).map(([k, v]) => [v, k]))[randomKey];
        } else {
            randomValue = letters[randomKey];
        }

        setCurrentLetter(randomKey);
        setCorrectAnswer(randomValue);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{currentLetter}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: colors.accent,
        width: 200,
    },
    title: {
        fontSize: 80,
        color: "#fff",
        textAlign: "center"
    }
})