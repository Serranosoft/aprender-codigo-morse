import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, ui } from "../../src/utils/styles";
import { LangContext } from "../../src/utils/Context";
import Header from "../../src/layout/header";

export default function Settings() {

    const { language, setLanguage } = useContext(LangContext);
    const [selected, setSelected] = useState(language._locale);

    const languages = [
        { title: language.t("_langListSpanish"), acronym: "es" },
        { title: language.t("_langListEnglish"), acronym: "en" },
        { title: language.t("_langListGerman"), acronym: "de" },
        { title: language.t("_langListFrench"), acronym: "fr" },
        { title: language.t("_langListPortuguese"), acronym: "pt" },
        { title: language.t("_langListItalian"), acronym: "it" }
    ]


    async function updateLanguage(acronym) {
        setLanguage(acronym);
        await AsyncStorage.setItem(userPreferences.LANGUAGE, acronym);
    }

    function handlePress(acronym) {
        updateLanguage(acronym);
        setSelected(acronym);
    }

    return (
        <>
            <Header back />
            <View style={styles.container}>
                <View style={styles.box}>

                    <Text style={[ui.h2]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.h4]}>{language.t("_settingsLang")}</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView style={styles.scroll}>
                            {
                                languages.map((language, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handlePress(language.acronym)} style={[styles.option, selected === language.acronym && styles.selected]}>
                                            <Text style={[ui.text/* , { color: selected === language.acronym ? "#fff" : "#000" } */]}>{language.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 12,
        backgroundColor: colors.primary,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#f0f0f0"
    },

    box: {
        gap: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 16,

    },

    scrollContainer: {
        height: 250,
        width: "100%",
    },

    scroll: {
        flex: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: colors.accent,
        borderRadius: 16,
    },
    option: {
        padding: 16,
    },

    selected: {
        backgroundColor: "#323458",
    }

})