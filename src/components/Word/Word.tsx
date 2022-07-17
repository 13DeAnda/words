import React, { useState, useEffect } from 'react';
import './Word.css';
import Button from '@mui/material/Button';

import { wordMapI } from '../../Interfaces/wordMap';

function Word(props: { word: string; onAtempt: (success: boolean, word: string) => void }) {
    const [wordArray, setWordArray] = useState(['']);
    const [typedWord, setTypedWord] = useState<wordMapI[]>([]);
    const [lettersTyped, setLettersTyped] = useState(0);
    const [wordVerified, setWordVerified] = useState(false);

    const verifyWord = (word: wordMapI[]) => {
        const copyWord = [...word];
        let wordTyped = '';
        let correctGuess = false;

        for (let i = 0; i < props.word.length; i++) {
            for (const letter of copyWord) {
                wordTyped += letter.typed;
                if (letter.typed == props.word[i]) {
                    letter.found = true;
                }
            }
            if (wordTyped === props.word) {
                correctGuess = true;
            }
        }

        setWordVerified(true);
        props.onAtempt(correctGuess, props.word);
    };

    const onKeyDownDetected = (letter: string) => {
        if (letter === 'Backspace') {
            if (lettersTyped !== 0) {
                const wordArrayCopy = [...typedWord];
                wordArrayCopy[lettersTyped - 1].typed = '';
                setLettersTyped(lettersTyped - 1);
            }
        } else {
            if (lettersTyped < props.word.length) {
                const wordArrayCopy = [...typedWord];
                wordArrayCopy[lettersTyped].typed = letter;
                setLettersTyped(lettersTyped + 1);
            }
        }
    };

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if ((!wordVerified && evt.keyCode >= 65 && evt.keyCode <= 90) || evt.key === 'Backspace') {
            onKeyDownDetected(evt.key);
        }
    };

    useEffect(() => {
        if (wordArray.length === 1 && props.word.length) {
            setWordArray(props.word.split(''));
            //pushing blank word
            const tempArr = [];
            for (let i = 0; i < props.word.length; i++) {
                tempArr.push({ letter: props.word[i], typed: '', found: false });
            }
            setTypedWord(tempArr);
        }
    });

    return (
        <div>
            <div className="Word">
                {typedWord.map((space: wordMapI, index: number) => (
                    <div
                        className={`letterContainer ${wordVerified ? (space.found ? 'correct' : 'incorrect') : ''} `}
                        key={`letter${index}`}
                    >
                        {' '}
                        {space.typed !== '' ? space.typed.toLocaleUpperCase() : '.'}
                    </div>
                ))}
            </div>
            {!wordVerified ? (
                <Button
                    variant="contained"
                    onClick={() => {
                        verifyWord(typedWord);
                    }}
                >
                    Verify
                </Button>
            ) : null}
        </div>
    );
}

export default Word;
