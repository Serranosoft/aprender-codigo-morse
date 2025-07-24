// LetterProvider.tsx
import { createContext, useContext, useState } from 'react';

const LetterContext = createContext(null);

export function LetterProvider({ children, letters, values }) {
    
    const [currentLetter, setCurrentLetter] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [step, setStep] = useState(0);

    return (
        <LetterContext.Provider value={{ letters, values, currentLetter, setCurrentLetter, setCorrectAnswer, correctAnswer, step, setStep }}>
            {children}
        </LetterContext.Provider>
    );
}

export const useLetter = () => useContext(LetterContext);
