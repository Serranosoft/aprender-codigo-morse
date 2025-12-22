import { useRef, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ui } from '../../utils/styles';
import { LangContext } from '../../utils/Context';
import Button from '../../components/button';

export default function FlashHandler({ pressed }) {
    const { language } = useContext(LangContext);
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();


    // Se está cargando el hook de permisos.
    if (!permission) {
        return <View />
    }

    // No ha aceptado los permisos.
    if (!permission.granted) {
        return (
            <>
                <View style={styles.permissionWrapper}>
                    <Text style={[ui.h4, { textAlign: "center" }]}>{language.t("_flashlightTitle")}</Text>
                    <Button text={language.t("_flashlightPermission")} onClick={requestPermission} />
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
        justifyContent: "center"
    },
    camera: {
        position: 'absolute',
        width: 1,
        height: 1,
        top: -10, // fuera de pantalla
        left: -10, // fuera de pantalla
    },
});
