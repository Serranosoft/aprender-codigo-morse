// LetterProvider.tsx
import { createContext, useContext } from 'react';

const LetterContext = createContext(null);

export function LetterProvider({ children, letters, step, setStep, correctAnswer, setCorrectAnswer, currentLetter, setCurrentLetter }) {
    return (
        <LetterContext.Provider value={{ letters, currentLetter, setCurrentLetter, setCorrectAnswer, correctAnswer, step, setStep }}>
            {children}
        </LetterContext.Provider>
    );
}

export const useLetter = () => useContext(LetterContext);
