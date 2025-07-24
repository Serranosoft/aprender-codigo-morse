import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlashHandler from "../../src/layout/send/flashHandler";
import { useState } from "react";
import SendDropdown from "../../src/layout/send/dropdown";
import { colors } from "../../src/utils/styles";
import Header from "../../src/layout/header";
import VibrationHandler from "../../src/layout/send/vibrationHandler";


export const OPTIONS = {
    VIBRATION: "VIBRATION",
    FLASH: "FLASH",
    SOUND: "SOUND",
}
export default function Send() {

    const [option, setOption] = useState(OPTIONS.VIBRATION);
    const [pressed, setPressed] = useState(false);

    return (
        <>
            <Header
                back={true}
            />
            <View style={styles.container}>
                <SendDropdown {...{ setOption }} />
                {
                    option === OPTIONS.VIBRATION ?
                        <VibrationHandler {...{ pressed }} />
                        :
                        option === OPTIONS.FLASH ?
                            <FlashHandler {...{ pressed }} />
                            :
                            <Text>SOOUND</Text>

                }


                <TouchableOpacity
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                    style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: "red" }}>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    }
})