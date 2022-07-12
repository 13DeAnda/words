import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';
import axios from 'axios';

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

    const addWordLine = (wordR?: string) => {
        const key = `wordLine_${tries.length}`;
        const elem = (
            <div key={key}>
                <Word word={wordR || word} />
            </div>
        );
        // 4 tries for game over.
        if (tries.length < 5) {
            setTries([elem]);
        }
    };

    useEffect(() => {
        retriveWord();
    }, []);

    // if (!post) return null;

    return (
        <div className="Container">
            {tries.map((elem: any, index: number) => (
                <div key="number">{elem}</div>
            ))}
        </div>
    );
}
