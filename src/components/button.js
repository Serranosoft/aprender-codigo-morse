import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, ui } from "../utils/styles";

export default function Button({ children, onPress, disabled }) {
    return (
        <TouchableOpacity style={[styles.button]} onPress={onPress} disabled={disabled}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button: {
        alignSelf: "center",
        flexDirection: "row",
        gap: 16,
        backgroundColor: colors.accent,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    buttonText: {
        color: "#fff"
    },

    disabled: {
        backgroundColor: "#047e66"
    }
})