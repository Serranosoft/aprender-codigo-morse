import { Text, TouchableOpacity, View } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import Animated from 'react-native-reanimated';
import { router } from "expo-router";
import { ui } from "../../utils/styles";

export default function Progress({ current, qty }) {

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${((current) * 100) / qty}%`
    }));

    return (
        <View style={{ gap: 3, marginHorizontal: 16, width: 150 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {/* <Text style={[ui.text, ui.bold, { marginLeft: 3 }]}>{current} / {qty} </Text> */}
                {/* {
                    current == qty ?
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={[ui.muted, ui.bold]}>qwe</Text>
                        </TouchableOpacity>
                        :
                        <Text style={[ui.text, ui.bold, { fontSize: 13 }]}>asd</Text>
                } */}
            </View>
            <View style={{ backgroundColor: "rgba(0,0,0,0.35)", height: 16, borderRadius: 16 }}>
                <Animated.View style={[animatedStyle, { backgroundColor: "#92C742", height: 16, borderRadius: 16 }]}></Animated.View>
            </View>
        </View>
    )
}