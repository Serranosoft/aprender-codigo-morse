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
    'Ñ': '--.--', 'Á': '.--.-', 'É': '..-..',
    'Ó': '---.', 'Ü': '..--', 'Ä': '.-.-',
    'Ö': '---.', 'ẞ': '...--..', 'À': '.--.-',
    'È': '.-..-', 'Ç': '-.-..',
};

// Invertimos el mapa: Morse → Letra
const inverseMap = Object.entries(morseMap).reduce((acc, [letter, morse]) => {
    acc[morse] = letter;
    return acc;
}, {});

export function useTranslator(input, swap = false) {
    const translation = useMemo(() => {
        if (!input) return '';

        if (!swap) {
            // Texto a Morse
            return input
                .toUpperCase()
                .split('')
                .map(char => morseMap[char] || '')
                .join(' ');
        } else {
            // Morse a Texto
            return input
                .trim()
                .split(' ') // Los códigos Morse van separados por espacios
                .map(symbol => inverseMap[symbol] || '')
                .join('');
        }
    }, [input, swap]);

    return translation;
}
