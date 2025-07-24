import { useState } from "react";
import { Button, Text, View } from "react-native";
import { getLevelData } from "./useLearn";

export default function Configuration({ setLetters, /* setValues, */ setIsReady }) {
    
    const [level, setLevel] = useState(null);

    function start() {
        const letters = getLevelData(level);
        // const values = Object.values(letters);
        setLetters(letters);
        // setValues(values);
        setIsReady(true);
    }

    return (
        <View>
            <Text>Elige un nivel</Text>
            <Button title="1" onPress={() => setLevel(1)}></Button>
            <Button title="2" onPress={() => setLevel(2)}></Button>
            <Button title="3" onPress={() => setLevel(3)}></Button>
            <Button title="4" onPress={() => setLevel(4)}></Button>
            <Button title="Comenzar" onPress={() => start()}></Button>
        </View>
    )
}