import React, { useState, useEffect } from 'react';
import './Word.css';

function Word() {
    const [word, setWord] = useState<string>('authoritharian');
    const [wordArray, setWordArray] = useState(['']);

    useEffect(() => {
        if (wordArray.length === 1) {
            setWordArray(word.split(''));
        }
    });

    return (
        <div className="Word">
            the word: {word}
            {wordArray.map((letter: string, index: number) => (
                <div className="letterContainer" key={`letter${index}`}>
                    {' '}
                    {letter}
                </div>
            ))}
        </div>
    );
}

export default Word;
