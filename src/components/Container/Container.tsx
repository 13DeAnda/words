import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';
import axios from 'axios';

const baseURL = 'https://random-word-api.herokuapp.com/word';

export default function Container() {
    const [word, setWord] = useState<string>('');
    const [post, setPost] = React.useState(null);

    const retriveWord = () => {
        axios.get(baseURL).then((response) => {
            setPost(response.data);
            setWord(response.data[0]);
        });
    };

    useEffect(() => {
        retriveWord();
    }, []);

    if (!post) return null;

    return (
        <div className="Container">
            <Word word={word} />
        </div>
    );
}
