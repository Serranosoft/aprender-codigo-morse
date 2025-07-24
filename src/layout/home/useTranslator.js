import { useMemo } from 'react';

const morseMap = {
    A: '.-', B: '-...', C: '-.-.',
    D: '-..', E: '.', F: '..-.',
    G: '--.', H: '....', I: '..',
    J: '.---', K: '-.-', L: '.-..',
    M: '--', N: '-.', O: '---',
    P: '.--.', Q: '--.-', R: '.-.',
    S: '...', T: '-', U: '..-',
    V: '...-', W: '.--', X: '-..-',
    Y: '-.--', Z: '--..',
    '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',
    '0': '-----', ' ': '/',
};

export function useTranslator(input) {
    const translation = useMemo(() => {
        return input
            .toUpperCase()
            .split('')
            .map(char => morseMap[char] || '')
            .join(' ');
    }, [input]);

    return translation;
}
