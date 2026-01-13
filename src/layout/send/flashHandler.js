import { useRef, useContext } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ui } from '../../utils/styles';
import { LangContext } from '../../utils/Context';
import Button from '../../components/button';

export default function FlashHandler({ pressed }) {
    const { language } = useContext(LangContext);
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();

    async function openSettings() {
        Linking.openSettings();
    }

    // Se está cargando el hook de permisos.
    if (!permission) {
        return <View />
    }

    // No ha aceptado los permisos.
    if (!permission.granted) {
        return (
            <>
                <View style={styles.permissionWrapper}>
                    {
                        !permission.canAskAgain ?
                            <>
                                <Text style={[ui.muted, { textAlign: "center" }]}>Activa los permisos de la cámara en Ajustes para poder acceder a la linterna</Text>
                                <Button onPress={() => openSettings()}>
                                    <Text style={ui.text}>Abrir ajustes</Text>
                                </Button>
                            </>
                            :
                            <>
                                <Text style={[ui.muted, { textAlign: "center" }]}>{language.t("_flashlightTitle")}</Text>
                                <Button onPress={() => requestPermission()}>
                                    <Text style={ui.text}>{language.t("_flashlightPermission")}</Text>
                                </Button>
                            </>
                    }
                </View>
            </>
        );
    }

    return (
        <View style={styles.container}>

            <CameraView
                enableTorch={pressed}
                facing={"back"}
                style={styles.camera}
                ref={cameraRef}
                mute={true}
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    permissionWrapper: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8
    },
    camera: {
        position: 'absolute',
        width: 10,
        height: 10,
        bottom: 0,
        right: 0,
        opacity: 0.01
    },
});
