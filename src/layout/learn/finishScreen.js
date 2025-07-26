import { Image, StyleSheet, Text, View } from "react-native";
import { useLetter } from "./letterProvider";
import { STEP_GOAL } from "../../../app/(tabs)/learn";
import { ui } from "../../utils/styles";
import Button from "../../components/button";
import { router } from "expo-router";
import { useEffect } from "react";

export default function FinishScreen({ mistakes, level, closeCallback }) {
    useEffect(() => {
        if (mistakes < 5) {
            levelUp();
        }
    }, [mistakes])

    async function levelUp() {
        const newLvl = currentLevel + 1;
        await updateLevel(newLvl);
        await checkCurrentLevel();
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image source={require("../../../assets/medal.png")} style={{ width: 100, height: 100 }} />
                {
                    mistakes > 4 ?
                        <Text style={[ui.text, ui.center]}>Sigue así, <Text style={ui.bold}>estás un paso más cerca</Text> de conseguirlo 💪</Text>
                        :
                        <Text style={[ui.text, ui.center]}>¡Felicidades! Has completado <Text style={ui.bold}>el nivel {level} con éxito 🎉</Text>.</Text>
                }

            </View>
            <View style={styles.wrapper}>
                {
                    mistakes > 4 ?
                        <>
                            <Text style={[ui.h2, { textAlign: "center" }]}>Has acertado {STEP_GOAL - mistakes} de {STEP_GOAL}</Text>
                            <Text style={[ui.h5, { textAlign: "center" }]}>¡Has fallado muchas! Tienes que repetir este nivel para desbloquear el siguiente</Text>
                        </>
                        :
                        <>
                            <Text style={[ui.h2, { textAlign: "center" }]}>Has acertado {STEP_GOAL - mistakes} de {STEP_GOAL}</Text>
                            <Text style={[ui.h5, { textAlign: "center" }]}>Has desbloqueado el siguiente nivel {level + 1}</Text>
                        </>
                }
                <Button style={{ marginTop: "32" }} onPress={() => closeCallback()}>
                    <Text style={[ui.h4, ui.bold]}>Volver al inicio</Text>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
        flex: 1,
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 250,
    },
    wrapper: {
        gap: 16,
        flex: 1,
    }
})