import React from 'react';
import { useStopwatch } from 'react-timer-hook';

export default function Timer() {
    const { seconds, minutes } = useStopwatch({ autoStart: true });

    return (
        <div>
            {minutes}: {seconds}
        </div>
    );
}
