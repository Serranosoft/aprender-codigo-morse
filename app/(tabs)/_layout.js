import { SplashScreen, Tabs } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from "../../src/utils/styles";

SplashScreen.preventAutoHideAsync();
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Regular": require("../../assets/fonts/AncizarSans-Regular.ttf"),
        "Medium": require("../../assets/fonts/AncizarSans-Medium.ttf"),
        "Semibold": require("../../assets/fonts/AncizarSans-Bold.ttf"),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Tabs backBehavior="history" options={{ headerShown: false }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarStyle: { height: 60, backgroundColor: colors.primary },
                        tabBarLabel: "Traductor",
                        tabBarLabelStyle: { color: "#fff", marginTop: 2 },
                        tabBarIcon: ({ focused }) => <Ionicons name="git-branch-outline" size={25} color={focused ? "#fff" : "red"} />,
                        tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                        headerShown: false,
                        tabBarActiveTintColor: "#337AB7",
                        tabBarInactiveTintColor: "#b5b5b5",
                    }}
                />
            </Tabs>
            <StatusBar style="light" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})