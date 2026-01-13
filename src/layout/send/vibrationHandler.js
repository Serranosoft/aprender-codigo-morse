import React, { useEffect } from 'react';
import { Vibration, Platform, View, StyleSheet } from 'react-native';

const isPad = Platform.OS === 'ios' && Platform.isPad;

export default function VibrationHandler({ pressed }) {

    useEffect(() => {
        if (!isPad) {
            if (pressed) {
                Vibration.vibrate(10000);
            } else {
                Vibration.cancel();
            }
        }

        return () => !isPad && Vibration.cancel();
    }, [pressed]);

    // ALTERNATIVA PARA IPAD: 
    // Si es iPad y está presionado, devolvemos un View que genera un efecto visual.
    // Si es iPhone o no está presionado, no renderiza nada (null).
    if (isPad && pressed) {
        return (
            <View
                style={styles.visualVibration}
                pointerEvents="none" // Importante: para que no bloquee los toques
            />
        );
    }

    return null;
}

const styles = StyleSheet.create({
    visualVibration: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        zIndex: 9999,
    },
});