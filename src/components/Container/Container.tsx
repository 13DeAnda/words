import React, { useState, useEffect } from 'react';
import './Container.css';
import Typography from '@mui/material/Typography';
import { useStopwatch } from 'react-timer-hook';

import Word from '../Word/Word';
import GameStatsModal from './GameStatsModal/GameStatsModal';
import { getRandomWord, getUser, updateUser, loading } from '../../services/GameService';

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [tries, setTries] = useState<any[]>([]);
    const [score, setScore] = useState<number>(0); // TODO: implement once has login
    const [scoreModal, setScoreModal] = useState<string | null>(null);
    const [scoreDisplayed, setScoreDisplayed] = useState<number>(0);
    const { seconds, minutes, start, reset } = useStopwatch({ autoStart: false });
    const userId = localStorage.getItem('wordsAppUserId') || '';

    const formatTime = (time: number) => {
        return String(time).padStart(2, '0');
    };
    const retriveWord = async () => {
        const wordResponse = await getRandomWord();
        console.log('word:', wordResponse);
        setWord(wordResponse);
        addWordLine(wordResponse);

        // time needs to be moved into its own component?
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

    const gameWon = async () => {
        const triesLength = document.getElementsByClassName('wordLine').length;
        const newScore = 5 - triesLength - (minutes + seconds / 60) / 60 + score;

        if (userId.length) {
            const userResponse = await getUser(userId);
            userResponse.score = newScore;
            const newScoreR = await updateUser(userId, userResponse);
        }
        setScoreDisplayed(newScore);
        setScore(newScore);
        setScoreModal('won');
    };
    const gameOver = async () => {
        if (userId.length) {
            const userResponse = await getUser(userId);
            const newScore = userResponse.score - 1;
            userResponse.score = newScore;
            const newScoreR = await updateUser(userId, userResponse);
            setScoreDisplayed(newScoreR.score);
            setScore(newScoreR.score);
        } else {
            setScoreDisplayed(scoreDisplayed - 1);
            setScore(score - 1);
        }

        setScoreModal('lost');
    };
    const gameRestart = () => {
        setScoreModal(null);
        setTries([]);
        retriveWord();
    };

    useEffect(() => {
        if (!word.length && !loading) {
            retriveWord();
            if (userId.length) {
                retriveUserScore();
            }
        }
    }, []);

    return (
        <div className="Container">
            <div className="displayBar">
                <Typography className="menuItem timer" sx={{ minWidth: 100 }}>
                    <b>
                        {formatTime(minutes)}: {formatTime(seconds)}
                    </b>
                </Typography>
                <Typography className="menuItem score" sx={{ minWidth: 100 }}>
                    <b>Score: {Math.round(scoreDisplayed)}</b>
                </Typography>
            </div>

            {tries.map((elem: any, index: number) => (
                <div key={`wordLine_${index}`}>{elem}</div>
            ))}
            <GameStatsModal
                open={scoreModal ? true : false}
                handleClose={gameRestart}
                score={score}
                status={scoreModal}
            />
        </div>
    );
}
