import { useRef, useEffect, useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ui } from '../../utils/styles';
import { LangContext } from '../../utils/Context';

export default function FlashHandler({ pressed }) {
    const { language } = useContext(LangContext);
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        requestPermission();
    }, []);

    // Se está cargando el hook de permisos.
    if (!permission) {
        return <View />
    }

    // No ha aceptado los permisos.
    if (!permission.granted) {
        return (
            <>
                {/* <Header back={true} /> */}
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
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    camera: {
        position: 'absolute',
        width: 0,
        height: 0,
        top: -100, // fuera de pantalla
    },
});
