import React, { useState, useEffect } from 'react';
import './Container.css';

import Word from '../Word/Word';

export default function Container() {
    const [word, setWord] = useState<string>('authoritharian');

    return (
        <div className="Container">
            <Word word={word} />
        </div>
    );
}
