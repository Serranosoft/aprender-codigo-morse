import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LetterProvider, useLetter } from "../../src/layout/learn/letterProvider";
import Training from "../../src/layout/learn/training";
import Configuration from "../../src/layout/learn/configuration";
import Header from "../../src/layout/header";
import FinishScreen from "../../src/layout/learn/finishScreen";
import { colors } from "../../src/utils/styles";

export const STEP_GOAL = 5;

export default function Learn() {
    const [isReady, setIsReady] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [letters, setLetters] = useState([]);
    const [step, setStep] = useState(0);

    function closeCallback() {
        setStep(0);
        setIsReady(false);
        setIsFinished(false);
    }

    useEffect(() => {
        if (step === STEP_GOAL) {
            setIsFinished(true);
        }
    }, [step])


    return (
        <>

            <LetterProvider {...{ letters, step, setStep }}>
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
                            <FinishScreen />
                            :
                            <Training {...{ letters, setIsFinished }} />
                        :
                        <Configuration {...{ setLetters, setIsReady }} />}
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