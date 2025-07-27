import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLetter } from "./letterProvider";

export default function Answers({ letters, setMistakes, level }) {
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

        // Calculamos la cantidad de opciones (nvl 4+ se muestran 4 respuestas)
        const numberOfOptions = level > 3 ? 4 : 2;
        // Obtenemos la lista de respuestas incorrectas
        const wrongOptions = values.filter((v) => v !== correctAnswer);
        // Barajar posibilidades de respuestas
        const selectedWrongOptions = shuffleArray(wrongOptions).slice(0, numberOfOptions - 1);
        // Incluimos la respuesta correcta en la colección de respuestas
        const allOptions = [...selectedWrongOptions, correctAnswer];
        const shuffled = shuffleArray(allOptions);

        setRandomValues(shuffled);
    }

    function shuffleArray(array) {
        return [...array].sort(() => Math.random() - 0.5);
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
                                width: 140,
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
        marginTop: "auto",
        flexWrap: "wrap"
    },
    answer: {
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cccccc",
    },
    answerText: {
        fontSize: 60,
        textAlign: "center",
    }
})