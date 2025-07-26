import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLetter } from "./letterProvider";

export default function Answers({ letters }) {

    const { correctAnswer, step, setStep } = useLetter();
    const [randomValues, setRandomValues] = useState([]);

    useEffect(() => {
        if (correctAnswer) {
            retrieve();
        }
    }, [correctAnswer])
    
    function retrieve() {
        let values;

        if (step % 2 === 0) {
            values = Object.keys(letters);
        } else {
            values = Object.values(letters);
        }

        const randomValue = values.find((value) => value != correctAnswer);
        const options = [randomValue, correctAnswer];
        const shuffled = options.sort(() => Math.random() - 0.5);
        setRandomValues(shuffled);
    }

    function checkAnswer(value) {
        if (correctAnswer === value) {
            alert("Correcto");
        } else {
            alert("Incorrecto");
        }

        setStep((step) => step + 1);
    }

    return (
        <View style={styles.container}>
            {randomValues.map((value) => {
                return (
                    <TouchableOpacity style={styles.answer} key={value} onPress={() => checkAnswer(value)}>
                        <Text style={styles.answerText}>{value}</Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
        marginTop: "auto"
    },
    answer: {
        borderRadius: 8,
        // width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cccccc",
    }, 
    answerText: {
        fontSize: 60,
        textAlign: "center",
    }
})