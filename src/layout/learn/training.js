import { Button, StyleSheet, View } from "react-native";
import Answers from "./answers";
import Letter from "./letter";
import { useLetter } from "./letterProvider";
import { useEffect } from "react";
import { STEP_GOAL } from "../../../app/(tabs)/learn";

export default function Training({ letters, setIsFinished }) {
    
    return (
        <View style={styles.container}>
            <Letter {...{ letters }} />
            <Answers {...{ letters }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 32,
        flex: 1,
    }
})