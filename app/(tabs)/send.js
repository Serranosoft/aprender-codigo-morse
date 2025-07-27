import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FlashHandler from "../../src/layout/send/flashHandler";
import { useState } from "react";
import SendDropdown from "../../src/layout/send/dropdown";
import { colors, ui } from "../../src/utils/styles";
import Header from "../../src/layout/header";
import VibrationHandler from "../../src/layout/send/vibrationHandler";


export const OPTIONS = {
    VIBRATION: "VIBRATION",
    FLASH: "FLASH",
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
                <View style={styles.hero}>
                    <Image source={require("../../assets/whistle.png")} style={{ width: 70, height: 70 }} />
                    <Text style={[ui.h5, ui.center]}>Utiliza estas herramientas para <Text style={ui.bold}>mandar un código morse</Text>.</Text>
                </View>
                <View style={styles.content}>
                    <SendDropdown {...{ setOption }} />
                    {
                        option === OPTIONS.VIBRATION ?
                            <VibrationHandler {...{ pressed }} />
                            :
                            /* option === OPTIONS.FLASH ? */
                                <FlashHandler {...{ pressed }} />
                                /* :
                                <Text></Text> */

                    }


                    <TouchableOpacity
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        style={styles.button}>
                        <Text style={[ui.h3, ui.bold]}>Mandar mensaje</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 24,
        padding: 16,
        paddingTop: 24,
        backgroundColor: colors.primary,
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 300,
    },
    content: {
        gap: 24,
        flex: 1,
        // alignItems: "center",
        paddingBottom: 40
    },
    button: {
        width: 200, 
        height: 200,
        borderRadius: 100, 
        backgroundColor: colors.accent,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
        alignSelf: "center",
    }
})