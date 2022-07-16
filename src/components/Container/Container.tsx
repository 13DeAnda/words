import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';
import { getRandomWord, getUser, updateUser, loading } from '../../services/game';

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [tries, setTries] = useState<any[]>([]);
    const [score, setScore] = useState<number>(0); // TODO: implement once has login

    const retriveWord = async () => {
        const wordResponse = await getRandomWord();
        console.log('word:', wordResponse);
        setWord(wordResponse);
        addWordLine(wordResponse);
    };

    const gameWon = async () => {
        // TEMP: till we have users functionality
        const userId = 1;
        const userResponse = await getUser(userId);
        // TODO: need to figure out a scoring calc
        const newScore = userResponse.score + 1;
        userResponse.score = newScore;
        const newScoreR = await updateUser(userId, userResponse);
        console.log('new score', newScore);
        setScore(newScore);
    };

    const onAttempt = (won: boolean, word: string) => {
        if (won) {
            gameWon();
            console.log('how many tries its', tries);
        } else {
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
        if (!word.length && !loading) {
            retriveWord();
        }
    }, []);

    useEffect(() => {
        if (score > 0) {
            console.log('the score changed', score);
            setTries([]);
            retriveWord();
        }
    }, [score]);

    return (
        <div className="Container">
            {tries.map((elem: any, index: number) => (
                <div key={`wordLine_${index}`}>{elem}</div>
            ))}
        </div>
    );
}
