import { Button, View } from "react-native";
import Answers from "./answers";
import Letter from "./letter";
import { useLetter } from "./letterProvider";
import { useEffect } from "react";
import { STEP_GOAL } from "../../../app/(tabs)/learn";

export default function Training({ letters, isFinished, setIsFinished }) {
    const { step, setStep } = useLetter();


    useEffect(() => {
        if (step === STEP_GOAL) {
            setStep(0);
            setIsFinished(true);
        }
    }, [step])

    useEffect(() => {
        if (isFinished) {
            setStep(0);
        }
    }, [isFinished])
    
    return (
        <View>
            <Letter {...{ letters }} />
            <Answers {...{ letters }} />
            <Button title="Siguiente" onPress={() => setStep((step) => step + 1)}></Button>

        </View>
    )
}