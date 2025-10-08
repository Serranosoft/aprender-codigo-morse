import { Image, StyleSheet, Text, View } from "react-native";
import { useLetter } from "./letterProvider";
import { ui } from "../../utils/styles";
import Button from "../../components/button";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { updateLevel } from "../../utils/sqlite";
import { STEP_GOAL } from "./utils";
import { LangContext } from "../../utils/Context";

export default function FinishScreen({ mistakes, level, closeCallback, currentLevel, checkCurrentLevel }) {

    const { language } = useContext(LangContext);


    useEffect(() => {
        if (mistakes < 10) {
            levelUp();
        }
    }, [mistakes])

    async function levelUp() {
        const newLvl = parseInt(currentLevel) + 1;
        await updateLevel(newLvl);
        await checkCurrentLevel();
    }

    return (
        <View style={styles.container}>
            <View style={styles.hero}>
                <Image source={require("../../../assets/medal.png")} style={{ width: 100, height: 100 }} />
                {
                    mistakes > 9 ?
                        <Text style={[ui.text, ui.center]}>{language.t("_learnEncouragement")}</Text>
                        :
                        <Text style={[ui.text, ui.center]}>{language.t("_learnCongratulations")} {level} {language.t("_learnCongratulations2")}</Text>
                }

            </View>
            <View style={styles.wrapper}>
                {
                    mistakes > 9 ?
                        <>
                            <Text style={[ui.h2, { textAlign: "center" }]}>{language.t("_learnSuccesses")} {STEP_GOAL - mistakes} {language.t("_learnOf")} {STEP_GOAL}</Text>
                            <Text style={[ui.h5, { textAlign: "center" }]}>{language.t("_learnRepeat")}</Text>
                        </>
                        :
                        <>
                            <Text style={[ui.h2, { textAlign: "center" }]}>{language.t("_learnSuccesses")} {STEP_GOAL - mistakes} {language.t("_learnOf")} {STEP_GOAL}</Text>
                            <Text style={[ui.h5, { textAlign: "center" }]}>{language.t("_learnUnlock")} {level + 1}</Text>
                        </>
                }
                <Button style={{ marginTop: "32" }} onPress={() => closeCallback()}>
                    <Text style={[ui.h4, ui.bold]}>{language.t("_learnHome")}</Text>
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