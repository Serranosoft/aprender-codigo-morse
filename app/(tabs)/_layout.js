import { SplashScreen, Tabs } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { createRef, useEffect, useState } from "react";
import { colors } from "../../src/utils/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { initDb } from "../../src/utils/sqlite";
import * as StoreReview from 'expo-store-review';
import AdsHandler from "../../src/utils/AdsHandler";
import { AdsContext, LangContext } from "../../src/utils/Context";
import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import { translations } from "../../src/utils/localizations";
import * as Notifications from 'expo-notifications';
import { scheduleWeeklyNotification } from "../../src/utils/notifications";
import { userPreferences } from "../../src/utils/user-preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default function Layout() {

    // Idioma
    const [langRdy, setLangRdy] = useState(false);
    const [language, setLanguage] = useState(getLocales()[0].languageCode);
    const i18n = new I18n(translations);
    if (language) i18n.locale = language;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    // Configurar notificaciones y cargar preferencias de usuario
    useEffect(() => {
        configureNotifications();
        getUserPreferences();
        initDb();
    }, [])

    // Al terminar de configurar el idioma se lanza notificación
    useEffect(() => {
        if (langRdy) {
            scheduleWeeklyNotification(i18n);
        }
    }, [language, langRdy])

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

    async function getUserPreferences() {
        const language = await AsyncStorage.getItem(userPreferences.LANGUAGE);
        setLanguage(language || getLocales()[0].languageCode);
        setLangRdy(true);
    }

    async function configureNotifications() {
        const { granted } = await Notifications.requestPermissionsAsync();
        if (granted) {
            await AsyncStorage.setItem(userPreferences.NOTIFICATION_PERMISSION, "true");
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowBanner: true,
                    shouldShowList: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                }),
            });
        } else {
            await AsyncStorage.setItem(userPreferences.NOTIFICATION_PERMISSION, "false");

        }
    }

    async function askForReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    return (
        <>
            <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />
            <View style={styles.container}>
                <LangContext.Provider value={{ language: i18n, setLanguage: setLanguage }}>
                    <AdsContext.Provider value={{ setAdTrigger: setAdTrigger, adsLoaded: adsLoaded, setShowOpenAd: setShowOpenAd }} >

                        <Tabs
                            backBehavior="history"
                            options={{ headerShown: false }}
                        >
                            <Tabs.Screen
                                name="index"
                                options={{
                                    tabBarStyle: { backgroundColor: colors.primary },
                                    tabBarLabel: i18n.t("_tabTranslate"),
                                    tabBarLabelStyle: { marginBottom: 2 },
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
                                    tabBarStyle: { backgroundColor: colors.primary },
                                    tabBarLabel: i18n.t("_tabLearn"),
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
                                    tabBarStyle: { backgroundColor: colors.primary },
                                    tabBarLabel: i18n.t("_tabSend"),
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

                                    tabBarStyle: { backgroundColor: colors.primary },
                                    tabBarLabel: i18n.t("_tabAlphabet"),
                                    tabBarLabelStyle: { marginTop: 2 },
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="book" size={25} color={focused ? colors.accent : "#fff"} />,
                                    tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                    headerShown: false,
                                    tabBarActiveTintColor: colors.accent,
                                    tabBarInactiveTintColor: "#fff",
                                }}
                            />
                            <Tabs.Screen
                                name="settings"
                                options={{
                                    href: null,
                                    tabBarStyle: { backgroundColor: colors.primary },
                                    tabBarLabel: i18n.t("_tabSettings"),
                                    tabBarLabelStyle: { marginTop: 2 },
                                    tabBarIcon: ({ focused }) => <MaterialIcons name="book" size={25} color={focused ? colors.accent : "#fff"} />,
                                    tabBarBadgeStyle: { color: "#fff", backgroundColor: "#337AB7" },
                                    headerShown: false,
                                    tabBarActiveTintColor: colors.accent,
                                    tabBarInactiveTintColor: "#fff",
                                }}
                            />
                        </Tabs>

                    </AdsContext.Provider>
                </LangContext.Provider>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        backgroundColor: colors.primary,
        paddingTop: Constants.statusBarHeight,
    },
})