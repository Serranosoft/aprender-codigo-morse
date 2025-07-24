import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getLevelData } from "../../src/layout/learn/useLearn";
import Letter from "../../src/layout/learn/letter";
import Answers from "../../src/layout/learn/answers";
import { LetterProvider, useLetter } from "../../src/layout/learn/letterProvider";
import Training from "../../src/layout/learn/training";
import Configuration from "../../src/layout/learn/configuration";

export default function Learn() {

    const [isReady, setIsReady] = useState(false);
    const [letters, setLetters] = useState([]);
    // const [values, setValues] = useState([]);

    return (
        <LetterProvider {...{ letters/* , values */ }}>
            <View>
                { isReady ? <Training {...{ letters/* , values */ }} /> : <Configuration {...{ setLetters, /* setValues, */ setIsReady }} /> }
            </View>
        </LetterProvider>
    )
}