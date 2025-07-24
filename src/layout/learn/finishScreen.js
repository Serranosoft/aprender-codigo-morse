import { Text, View } from "react-native";
import { useLetter } from "./letterProvider";
import { STEP_GOAL } from "../../../app/(tabs)/learn";
import { ui } from "../../utils/styles";

export default function FinishScreen() {
    const { step } = useLetter();
    return (
        <View>
            { 
                step === STEP_GOAL ?
                <Text style={ui.text}>Lo conseguiste, esta es tu puntuación</Text>
                :
                <Text style={ui.text}>Cancelaste antes de tiempo, esta es tu puntuación</Text>
            }
        </View>
    )
}