import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header({ 
    close,
    closeCallback,
    back
}) {

    return (
        <View style={styles.header}>
            { close && 
                <TouchableOpacity onPress={() => closeCallback()}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
            }
            { back && 
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            }
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
        borderBottomWidth: 2,
        borderColor: colors.secondary
    },

    back: {
        width: 32,
        height: 32,
    }
})