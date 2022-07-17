import React, { useState, useEffect } from 'react';
import './Container.css';
import Typography from '@mui/material/Typography';
import { useStopwatch } from 'react-timer-hook';

import Word from '../Word/Word';
import { getRandomWord, getUser, updateUser, loading } from '../../services/GameService';
const userId = 1; // TODO: replace once we have users hook up.

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [tries, setTries] = useState<any[]>([]);
    const [score, setScore] = useState<number>(0); // TODO: implement once has login
    const [scoreDisplayed, setScoreDisplayed] = useState<number>(0);
    const { seconds, minutes, start, reset } = useStopwatch({ autoStart: false });

    const formatTime = (time: number) => {
        return String(time).padStart(2, '0');
    };
    const retriveWord = async () => {
        const wordResponse = await getRandomWord();
        console.log('word:', wordResponse);
        setWord(wordResponse);
        addWordLine(wordResponse);
        if (seconds || minutes) {
            reset();
        } else {
            start();
        }
    };

    const retriveUserScore = async () => {
        const userResponse = await getUser(userId);
        const score = userResponse.score;
        setScoreDisplayed(score);
    };

    const onAttempt = (won: boolean, word: string) => {
        if (won) {
            gameWon();
        } else {
            const triesLength = document.getElementsByClassName('wordLine').length;
            if (triesLength !== 4) {
                addWordLine(word);
            } else {
                gameOver();
            }
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

    // TODO: needs a pop up declaring game was won or lost
    const gameWon = async () => {
        const userResponse = await getUser(userId);

        const newScore = userResponse.score + ((5 - tries.length) * Math.round(minutes + seconds / 60)) / 60;
        userResponse.score = newScore;
        const newScoreR = await updateUser(userId, userResponse);
        setScoreDisplayed(newScoreR.score);
        setScore(newScoreR.score);
    };
    const gameOver = async () => {
        const userResponse = await getUser(userId);

        const newScore = userResponse.score - 1;
        userResponse.score = newScore;
        const newScoreR = await updateUser(userId, userResponse);
        setScoreDisplayed(newScoreR.score);
        setScore(newScoreR.score);
    };

    useEffect(() => {
        if (score > 0) {
            setTries([]);
            retriveWord();
        }
    }, [score]);

    useEffect(() => {
        if (!word.length && !loading) {
            retriveWord();
            retriveUserScore();
        }
    }, []);

    return (
        <div className="Container">
            <div className="displayBar">
                <Typography className="menuItem" sx={{ minWidth: 100 }}>
                    <b>
                        {formatTime(minutes)}: {formatTime(seconds)}
                    </b>
                </Typography>
                <Typography className="menuItem" sx={{ minWidth: 100 }}>
                    <b>Score: {scoreDisplayed}</b>
                </Typography>
            </div>

            {tries.map((elem: any, index: number) => (
                <div key={`wordLine_${index}`}>{elem}</div>
            ))}
        </div>
    );
}
