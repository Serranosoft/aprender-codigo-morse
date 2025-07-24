import { useRef, useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { ui } from '../../utils/styles';

export default function FlashHandler({ pressed }) {
    const cameraRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    useEffect(() => {
        console.log(pressed);
    }, [pressed])
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
                    <Text style={[ui.h4, { textAlign: "center" }]}>Para poder encender la linterna, debe conceder permisos</Text>
                    <Button text="Permitir linterna" onClick={requestPermission} />
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
        width: 1,
        height: 1,
        top: -100, // fuera de pantalla
    },
});
