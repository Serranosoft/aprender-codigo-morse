import { SplashScreen, Stack, Tabs } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { createRef, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { colors } from "../../src/utils/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { initDb } from "../../src/utils/sqlite";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as StoreReview from 'expo-store-review';
import AdsHandler from "../../src/utils/AdsHandler";

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

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adTrigger > 3) {
            askForReview();
        }
        if (adsLoaded) {
            if (adTrigger > 4) {
                adsHandlerRef.current.showIntersitialAd();
                setAdTrigger(0);
            }
        }
    }, [adTrigger])

    async function askForReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <AdsContext.Provider value={{ setAdTrigger: setAdTrigger, adsLoaded: adsLoaded, setShowOpenAd: setShowOpenAd }} >

                <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />

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
            </AdsContext.Provider>
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