import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useContext, useState } from "react";
import { colors, ui } from "../../utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { OPTIONS } from "./utils";
import { LangContext } from "../../utils/Context";


export default function SendDropdown({ setOption }) {

    const { language } = useContext(LangContext);
    const [value, setValue] = useState(OPTIONS.VIBRATION);
    const [isFocus, setIsFocus] = useState(false);
    
    return (
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: colors.accent }]}
            placeholderStyle={ui.text}
            selectedTextStyle={ui.text}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemTextStyle={{ color: "#000" }}
            data={
                [
                    { label: language.t("_sendVibration"), value: OPTIONS.VIBRATION },
                    { label: language.t("_sendFlashlight"), value: OPTIONS.FLASH },
                ]
            }
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setOption(item.value);
                setValue(item.value);
                setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <Ionicons
                    style={styles.icon}
                    color={'#fff'}
                    name="bulb-outline"
                    size={24}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({

    dropdown: {
        height: 50,
        borderColor: "lightgray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
    },

})