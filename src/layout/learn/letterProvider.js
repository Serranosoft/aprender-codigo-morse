// LetterProvider.tsx
import { createContext, useContext, useState } from 'react';

const LetterContext = createContext(null);

export function LetterProvider({ children, letters, step, setStep }) {
    
    const [currentLetter, setCurrentLetter] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    return (
        <LetterContext.Provider value={{ letters, currentLetter, setCurrentLetter, setCorrectAnswer, correctAnswer, step, setStep }}>
            {children}
        </LetterContext.Provider>
    );
}

export const useLetter = () => useContext(LetterContext);
