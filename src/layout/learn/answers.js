import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { useLetter } from "./letterProvider";

export default function Answers({ letters }) {

    const { correctAnswer, step } = useLetter();
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
    }

    return (
        <View>
            {randomValues.map((value) => {
                return (
                    <TouchableOpacity key={value} onPress={() => checkAnswer(value)}>
                        <Text style={{ fontSize: 55 }}>{value}</Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}