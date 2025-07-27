import { SplashScreen, Stack, Tabs } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { colors } from "../../src/utils/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { initDb } from "../../src/utils/sqlite";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Regular": require("../../assets/fonts/AncizarSans-Regular.ttf"),
        "Medium": require("../../assets/fonts/AncizarSans-Medium.ttf"),
        "Semibold": require("../../assets/fonts/AncizarSans-Bold.ttf"),
    });

    useEffect(() => {
        initDb();
    }, [])

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
            <SafeAreaProvider>

                <SafeAreaView style={styles.container}>

                    <Tabs
                        backBehavior="history"
                        options={{ headerShown: false }}
                    >
                        <Tabs.Screen
                            name="index"
                            options={{
                                tabBarStyle: { height: 60, backgroundColor: colors.primary },
                                tabBarLabel: "Traductor",
                                tabBarLabelStyle: { marginTop: 2 },
                                tabBarIcon: ({ focused }) => <MaterialIcons name="translate" size={25} color={focused ? colors.accent : "#fff"} />,
                                tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                headerShown: false,
                                tabBarActiveTintColor: colors.accent,
                                tabBarInactiveTintColor: "#fff",
                            }}
                        />
                        <Tabs.Screen
                            name="learn"
                            options={{
                                tabBarStyle: { height: 60, backgroundColor: colors.primary },
                                tabBarLabel: "Aprender",
                                tabBarLabelStyle: { marginTop: 2 },
                                tabBarIcon: ({ focused }) => <MaterialIcons name="wysiwyg" size={25} color={focused ? colors.accent : "#fff"} />,
                                tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                headerShown: false,
                                tabBarActiveTintColor: colors.accent,
                                tabBarInactiveTintColor: "#fff",
                            }}
                        />
                        <Tabs.Screen
                            name="send"
                            options={{
                                tabBarStyle: { height: 60, backgroundColor: colors.primary },
                                tabBarLabel: "Envíar código",
                                tabBarLabelStyle: { marginTop: 2 },
                                tabBarIcon: ({ focused }) => <MaterialIcons name="send" size={25} color={focused ? colors.accent : "#fff"} />,
                                tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                headerShown: false,
                                tabBarActiveTintColor: colors.accent,
                                tabBarInactiveTintColor: "#fff",
                            }}
                        />
                        <Tabs.Screen
                            name="alphabet"
                            options={{

                                tabBarStyle: { height: 60, backgroundColor: colors.primary },
                                tabBarLabel: "Abecedario",
                                tabBarLabelStyle: { marginTop: 2 },
                                tabBarIcon: ({ focused }) => <MaterialIcons name="book" size={25} color={focused ? colors.accent : "#fff"} />,
                                tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                headerShown: false,
                                tabBarActiveTintColor: colors.accent,
                                tabBarInactiveTintColor: "#fff",
                            }}
                        />
                    </Tabs>
                </SafeAreaView>
            </SafeAreaProvider>
            <StatusBar style="light" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
    },
})