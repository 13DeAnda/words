import React, { useState, useEffect } from 'react';
import './Word.css';

function Word(props: { word: string }) {
    const [wordArray, setWordArray] = useState(['']);

    useEffect(() => {
        if (wordArray.length === 1 && props.word.length) {
            setWordArray(props.word.split(''));
        }
    });

    return (
        <div className="Word">
            {wordArray.map((letter: string, index: number) => (
                <div className="letterContainer" key={`letter${index}`}>
                    {' '}
                    {letter.toLocaleUpperCase()}
                </div>
            ))}
        </div>
    );
}

export default Word;
