import React, { useState, useEffect } from 'react';
import './Word.css';

interface wordMapType {
    letter: string;
    found: boolean;
}

function Word(props: { word: string }) {
    const [wordArray, setWordArray] = useState(['']);
    const [typedWord, setTypedWord] = useState<wordMapType[]>([]);

    useEffect(() => {
        if (wordArray.length === 1 && props.word.length) {
            setWordArray(props.word.split(''));
            //pushing blank word
            const tempArr = [];
            for (let i = 0; i < props.word.length; i++) {
                tempArr.push({ letter: props.word[i], found: false });
            }
            setTypedWord(tempArr);
        }
    });

    return (
        <div className="Word">
            {typedWord.map((space: wordMapType, index: number) => (
                <div className="letterContainer" key={`letter${index}`}>
                    {' '}
                    {space.found ? space.letter.toLocaleUpperCase() : '.'}
                </div>
            ))}
        </div>
    );
}

export default Word;
