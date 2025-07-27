import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LetterProvider, useLetter } from "../../src/layout/learn/letterProvider";
import Training from "../../src/layout/learn/training";
import Configuration from "../../src/layout/learn/configuration";
import Header from "../../src/layout/header";
import FinishScreen from "../../src/layout/learn/finishScreen";
import { colors } from "../../src/utils/styles";
import { getLevel } from "../../src/utils/sqlite";

export const STEP_GOAL = 15;

export default function Learn() {

    const [isReady, setIsReady] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [letters, setLetters] = useState([]);
    const [step, setStep] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [currentLetter, setCurrentLetter] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [level, setLevel] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(10);

    function closeCallback() {
        setStep(0);
        setMistakes(0);
        setLevel(null);
        setIsReady(false);
        setIsFinished(false);
        setCorrectAnswer(null);
        setCurrentLetter(null);
    }

    useEffect(() => {
        if (step === STEP_GOAL) {
            setIsFinished(true);
        }
    }, [step])

    async function checkCurrentLevel() {
        const currentLvl = await getLevel();
        setCurrentLevel(parseInt(currentLvl));
    }


    return (
        <>

            <LetterProvider {...{ letters, step, setStep, correctAnswer, setCorrectAnswer, currentLetter, setCurrentLetter }}>
                <Header
                    back={!isReady || isFinished}
                    backCallback={isFinished ? closeCallback : null}
                    close={isReady && !isFinished}
                    closeCallback={closeCallback}
                    learning={isReady}
                    step={step}
                />
                <View style={styles.container}>
                    {isReady ?
                        isFinished ?
                            <FinishScreen {...{ mistakes, level, closeCallback, currentLevel, checkCurrentLevel }} />
                            :
                            <Training {...{ letters, setMistakes, level }} />
                        :
                        <Configuration {...{ setLetters, setLevel, level, setIsReady, currentLevel, checkCurrentLevel }} />}
                </View>
            </LetterProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 16,
        paddingTop: 24,
    }
})