import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLetter } from "./letterProvider";

export default function Answers({ letters, setMistakes }) {

    const { correctAnswer, step, setStep } = useLetter();
    const [randomValues, setRandomValues] = useState([]);
    const [isMistaken, setIsMistaken] = useState(null);
    const [pressedValue, setPressedValue] = useState(null);

    useEffect(() => {
        if (correctAnswer) {
            retrieve();
        }
    }, [correctAnswer])

    useEffect(() => {
        if (pressedValue) checkAnswer();
    }, [pressedValue])

    useEffect(() => {
        if (isMistaken) setMistakes((mistakes) => mistakes + 1);
    }, [isMistaken])

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

    function checkAnswer() {
        setIsMistaken(pressedValue !== correctAnswer);

        setTimeout(() => {
            setStep((step) => step + 1);
            setIsMistaken(null);
        }, 1500);
    }



    return (
        <View style={styles.container}>
            {randomValues.map((value) => {
                return (
                    <TouchableOpacity
                        key={value}
                        onPress={() => setPressedValue(value)}
                        disabled={isMistaken !== null}
                        style={[
                            styles.answer,
                            {
                                backgroundColor:
                                    isMistaken === null
                                        ? "#cccccc"
                                        : value === correctAnswer
                                            ? "#4CAF50"
                                            : isMistaken && value === pressedValue
                                                ? "#F44336"
                                                : "#cccccc"
                            }
                        ]}
                    >
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