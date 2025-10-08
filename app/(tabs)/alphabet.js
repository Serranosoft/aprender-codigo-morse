import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import morseData from '../../assets/alphabet.json';
import { colors, ui } from "../../src/utils/styles";
import Header from "../../src/layout/header";
import { useContext } from "react";
import { AdsContext, LangContext } from "../../src/utils/Context";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../../src/utils/constants";

export default function Alphabet() {

    const { adsLoaded } = useContext(AdsContext);
    const { letters, numbers, symbols } = morseData;
    const { language, setLanguage } = useContext(LangContext);


    const combinedData = [
        ...letters.map(item => ({ ...item, type: "letter" })),
        ...numbers.map(item => ({ ...item, type: "number" })),
        ...symbols.map(item => ({ ...item, type: "symbol" })),
    ];

    return (
        <>
            <Header />
            {adsLoaded && <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}
            <View style={styles.container}>

                <View style={styles.hero}>
                    <Image source={require("../../assets/dictionary.png")} style={{ width: 100, height: 100 }} />
                    <Text style={[ui.text, ui.center]}>{language.t("_alphabetTitle")}</Text>
                </View>

                <View style={styles.columns}>
                    <Text style={[ui.h3, ui.bold]}>{language.t("_alphabetLetter")}</Text>
                    <Text style={[ui.h3, ui.bold]}>{language.t("_alphabetMorse")}</Text>
                    <Text style={[ui.h3, ui.bold]}>{language.t("_alphabetKey")}</Text>
                </View>
                <View style={styles.content}>
                    <FlatList
                        contentContainerStyle={styles.innerContent}
                        data={combinedData}
                        keyExtractor={(item, index) => `${item.type}-${index}`}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <Text style={ui.h4}>
                                    {item.letter || item.number || item.symbol}
                                </Text>
                                <Text style={ui.h4}>{item.morse}</Text>
                                <Text style={ui.h4}>{item.word}</Text>
                            </View>
                        )}
                    />
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
        alignItems: "center",
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 250,
    },
    columns: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 8,
        borderBottomWidth: 2,
        borderBottomColor: colors.accent
    },
    content: {
        flex: 1,
        paddingBottom: 40,
    },

    innerContent: {
        paddingBottom: 40,
        paddingHorizontal: 8,
        gap: 24,
        justifyContent: "center",
        alignItems: "center"
    },

    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    }

})