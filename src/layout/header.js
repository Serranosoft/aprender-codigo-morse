import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Progress from "./learn/progress";
import { useLetter } from "./learn/letterProvider";
import { STEP_GOAL } from "./learn/utils";

export default function Header({
    back,
    backCallback,
    close,
    closeCallback,
    learning,
    step,
}) {

    function handleBack() {
        if (backCallback) {
            backCallback();
        } else {
            router.back();
        }
    }

    return (
        <View style={styles.header}>
            {close &&
                <TouchableOpacity onPress={() => closeCallback()}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            }
            {back &&
                <TouchableOpacity onPress={() => handleBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            }
            {
                learning && <Progress current={step} qty={STEP_GOAL} />
            }
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 8,
        padding: 12,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.primary,
    },

    back: {
        width: 32,
        height: 32,
    }
})