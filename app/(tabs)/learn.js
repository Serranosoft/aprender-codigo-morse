import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LetterProvider } from "../../src/layout/learn/letterProvider";
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

    function closeCallback() {
        setIsFinished(true);
    }

    return (
        <>

            <LetterProvider {...{ letters }}>
                <Header
                    close={isReady && !isFinished}
                    closeCallback={closeCallback}
                />
                <View style={styles.container}>
                    {isReady ?
                        isFinished ?
                            <FinishScreen />
                            :
                            <Training {...{ letters, isFinished, setIsFinished }} />
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
        backgroundColor: colors.primary
    }
})