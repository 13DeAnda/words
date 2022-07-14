import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';
import axios from 'axios';
import Button from '@mui/material/Button';

const baseURL = 'https://random-word-api.herokuapp.com/word';

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [post, setPost] = useState(null);
    const [tries, setTries] = useState<any[]>([]);

    const retriveWord = () => {
        setWord('comerian');
        addWordLine('comerian');
        //TEMP  commented because api server is down
        // axios.get(baseURL).then((response) => {
        //     setPost(response.data);
        //     setWord(response.data[0]);
        //      addWordLine(response.data[0]);
        // });
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
        retriveWord();
    }, []);

    useEffect(() => {
        console.log('tries updated', tries);
    }, [tries]);

    return (
        <div className="Container">
            {tries.map((elem: any, index: number) => (
                <div key={`wordLine_${index}`}>{elem}</div>
            ))}
        </div>
    );
}
