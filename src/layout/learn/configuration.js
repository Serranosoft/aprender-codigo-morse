import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getLevelData } from "./useLearn";
import { ui } from "../../utils/styles";
import { getLevel, updateLevel } from "../../utils/sqlite";

export default function Configuration({ setLetters, setIsReady, setLevel, level }) {

    const [currentLevel, setCurrentLevel] = useState(null);

    function start() {
        const letters = getLevelData(level);
        setLetters(letters);
        setIsReady(true);
    }


    useEffect(() => {
        checkCurrentLevel();
    }, [])

    async function checkCurrentLevel() {
        const currentLvl = await getLevel();
        setCurrentLevel(parseInt(currentLvl));
    }

    

    useEffect(() => {
        if (level) start();
    }, [level])

    return (
        <View style={styles.container}>

            <View style={styles.hero}>
                <Image source={require("../../../assets/trophy.png")} style={{ width: 70, height: 70 }} />
                <Text style={[ui.h5, ui.center]}>Desbloquea todos los níveles y aprende código morse <Text style={ui.bold}>en menos de 2 semanas</Text>.</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} style={{ width: "100%" }}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.box} onPress={() => setLevel(1)}>
                        <View style={[styles.imgWrapper, { borderColor: "#F7C4DB" }]}>
                            <Image source={require("../../../assets/dna.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 1</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 2 && styles.disabled]} onPress={() => setLevel(2)} disabled={currentLevel < 2}>
                        <View style={[styles.imgWrapper, { borderColor: "#CAB4EF" }]}>
                            <Image source={require("../../../assets/calculator.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 3 && styles.disabled]} onPress={() => setLevel(3)} disabled={currentLevel < 3}>
                        <View style={[styles.imgWrapper, { borderColor: "#8BB6EF" }]}>
                            <Image source={require("../../../assets/fountain-pen.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 4 && styles.disabled]} onPress={() => setLevel(4)} disabled={currentLevel < 4}>
                        <View style={[styles.imgWrapper, { borderColor: "#FEF2A8" }]}>
                            <Image source={require("../../../assets/geography.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 5 && styles.disabled]} onPress={() => setLevel(5)} disabled={currentLevel < 5}>
                        <View style={[styles.imgWrapper, { borderColor: "#8CB7F0" }]}>
                            <Image source={require("../../../assets/mortarboard.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 6 && styles.disabled]} onPress={() => setLevel(6)} disabled={currentLevel < 6}>
                        <View style={[styles.imgWrapper, { borderColor: "#FFA585" }]}>
                            <Image source={require("../../../assets/school.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 7 && styles.disabled]} onPress={() => setLevel(7)} disabled={currentLevel < 7}>
                        <View style={[styles.imgWrapper, { borderColor: "#8EBBF5" }]}>
                            <Image source={require("../../../assets/telescope.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 8 && styles.disabled]} onPress={() => setLevel(8)} disabled={currentLevel < 8}>
                        <View style={[styles.imgWrapper, { borderColor: "#D3BCFA" }]}>
                            <Image source={require("../../../assets/book.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 8</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 9 && styles.disabled]} onPress={() => setLevel(9)} disabled={currentLevel < 9}>
                        <View style={[styles.imgWrapper, { borderColor: "#B4E9F3" }]}>
                            <Image source={require("../../../assets/atom.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 10 && styles.disabled]} onPress={() => setLevel(10)} disabled={currentLevel < 10}>
                        <View style={[styles.imgWrapper, { borderColor: "#FFA586" }]}>
                            <Image source={require("../../../assets/briefcase.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 10</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 11 && styles.disabled]} onPress={() => setLevel(11)} disabled={currentLevel < 11}>
                        <View style={[styles.imgWrapper, { borderColor: "#FFAB8A" }]}>
                            <Image source={require("../../../assets/color-palette.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 11</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.box, currentLevel < 12 && styles.disabled]} onPress={() => setLevel(12)} disabled={currentLevel < 12}>
                        <View style={[styles.imgWrapper, { borderColor: "#7BF1CA" }]}>
                            <Image source={require("../../../assets/folder.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 12</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 13 && styles.disabled]} onPress={() => setLevel(13)} disabled={currentLevel < 13}>
                        <View style={[styles.imgWrapper, { borderColor: "#95BCF1" }]}>
                            <Image source={require("../../../assets/paper-plane.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 13</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.box, currentLevel < 14 && styles.disabled]} onPress={() => setLevel(14)} disabled={currentLevel < 14}>
                        <View style={[styles.imgWrapper, { borderColor: "#7AEAC5" }]}>
                            <Image source={require("../../../assets/blackboard.png")} style={styles.boxImg} />
                        </View>
                        <Text style={[ui.text, styles.boxTitle]}>Nível 14</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        gap: 24,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    hero: {
        alignSelf: "center",
        alignItems: "center",
        gap: 8,
        maxWidth: 300,
    },
    content: {
        gap: 24,
        alignItems: "center",
        paddingBottom: 40
    },
    row: {
        flexDirection: "row",
        gap: 32
    },
    box: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    disabled: {
        opacity: 0.3,
    },
    imgWrapper: {
        width: 90,
        height: 90,
        borderRadius: 100,
        borderWidth: 2,
        padding: 8,
        // borderColor: "#CAB4EF",
        justifyContent: "center",
        alignItems: "center",
    },
    boxImg: {
        width: 60,
        height: 60,
    },
    boxTitle: {
        maxWidth: 150,
        textAlign: "center"
    }

});