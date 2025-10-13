import { useEffect } from 'react';
import { Vibration } from 'react-native'
export default function VibrationHandler({ pressed }) {

    useEffect(() => {
        pressed ? Vibration.vibrate(10000) : Vibration.cancel();
    }, [pressed])

    return (
        <></>
    )
}