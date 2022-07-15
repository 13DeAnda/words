import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';
import { getRandomWord } from '../../services/game';

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [tries, setTries] = useState<any[]>([]);

    const retriveWord = async () => {
        const wordResponse = await getRandomWord();
        setWord(wordResponse);
        addWordLine(wordResponse);
    };

    const onAttempt = (won: boolean, word: string) => {
        if (won) {
            alert('game won');
            retriveWord();
        } else {
            console.log('whats on here', word);
            addWordLine(word);
        }
    };

    const addWordLine = (wordR?: string) => {
        const index = document.getElementsByClassName('wordLine').length;
        if (index < 4) {
            const key = `wordLine_${index}`;
            const elem = (
                <div key={key} className={'wordLine'}>
                    <Word word={wordR || word} onAtempt={onAttempt} />
                </div>
            );

            if (index) {
                setTries((tries) => [...tries, elem]);
            } else {
                setTries([elem]);
            }
        }
    };

    useEffect(() => {
        if (!word.length) {
            retriveWord();
        }
    }, []);

    return (
        <div className="Container">
            {tries.map((elem: any, index: number) => (
                <div key={`wordLine_${index}`}>{elem}</div>
            ))}
        </div>
    );
}
