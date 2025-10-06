import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Progress from "./learn/progress";
import { useLetter } from "./learn/letterProvider";
import { STEP_GOAL } from "./learn/utils";
import { Menu, MenuItem } from "react-native-material-menu";
import { useContext, useState } from "react";
import { LangContext } from "../utils/Context";

export default function Header({
    back,
    backCallback,
    close,
    closeCallback,
    learning,
    step,
}) {

    const { language } = useContext(LangContext);

    // Estados para abrir el menu
    const [menuVisible, setMenuVisible] = useState(false);
    const showMenu = () => setMenuVisible(true);
    const hideMenu = () => setMenuVisible(false);

    function handleBack() {
        if (backCallback) {
            backCallback();
        } else {
            router.back();
        }
    }

    return (
        <View style={styles.header}>
            { !close && !back && !learning && <View /> }
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
            <Menu
                visible={menuVisible}
                onRequestClose={hideMenu}
                anchor={(
                    <TouchableWithoutFeedback onPress={showMenu}>
                        <View style={styles.menuTouch}>
                            <Image source={require("../../assets/more.png")} style={styles.menuImg} />
                        </View>
                    </TouchableWithoutFeedback>
                )}>
                <MenuItem onPress={() => {
                    router.navigate("settings");
                    hideMenu();
                }}>
                    <View style={styles.row}>
                        <Image style={styles.menuImg} source={require("../../assets/settings.png")} />
                        <Text style={[ui.text, ui.black]}>{language.t("dropDownSettings")}</Text>
                    </View>
                </MenuItem>
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        gap: 8,
        paddingVertical: 8,
        paddingLeft: 16,
        paddingRight: 8,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.primary,
    },

    back: {
        width: 32,
        height: 32,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    menuTouch: {
        padding: 12,
    },
    menuImg: {
        width: 24,
        height: 24,
    }
})