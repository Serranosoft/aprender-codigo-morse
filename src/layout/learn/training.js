import { Button, View } from "react-native";
import Answers from "./answers";
import Letter from "./letter";
import { useLetter } from "./letterProvider";
import { useEffect } from "react";
import { STEP_GOAL } from "../../../app/(tabs)/learn";

export default function Training({ letters, setIsFinished }) {
    const { step, setStep } = useLetter();


    
    
    return (
        <View>
            <Letter {...{ letters }} />
            <Answers {...{ letters }} />
            <Button title="Siguiente" onPress={() => setStep((step) => step + 1)}></Button>

        </View>
    )
}