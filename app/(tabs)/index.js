import { Image,  StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../../src/utils/styles";
import Header from "../../src/layout/header";
import Translator from "../../src/layout/home/translator";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import { bannerId } from "../../src/utils/constants";
import { useContext } from "react";
import { AdsContext } from "../../src/utils/Context";

export default function Home() {

    const { adsLoaded } = useContext(AdsContext);

    return (
        <>
            <Header />
            {adsLoaded && <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}
            <View style={styles.container}>
                <View style={styles.hero}>
                    <Image source={require("../../assets/notebook.png")} style={{ width: 100, height: 100 }} />
                    <Text style={[ui.text, ui.center]}>Traduce al instante cualquier <Text style={ui.bold}>texto a código morse</Text> o viceversa.</Text>
                </View>

                <Translator />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        padding: 16,
        paddingTop: 24,
        gap: 16,
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 250,
    },
    
})