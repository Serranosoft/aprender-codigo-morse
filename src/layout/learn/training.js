import { Button, View } from "react-native";
import Answers from "./answers";
import Letter from "./letter";
import { useLetter } from "./letterProvider";

export default function Training({ letters/* , values */ }) {
    const { setStep } = useLetter();


    return (
        <View>
            <Letter {...{ letters }} />
            <Answers {...{ letters }} />
            <Button title="Siguiente" onPress={() => setStep((step) => step + 1)}></Button>

        </View>
    )
}