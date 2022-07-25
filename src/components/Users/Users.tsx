import React, { useState, useEffect } from 'react';
import './users.css';
import { getTopUsers, loadingTopUsers } from '../../services/TopScoresService';
import { TopUserI } from '../../Interfaces/topUser';

function Users() {
    const [topScores, setTopScores] = useState<TopUserI[]>([]);

    const retriveTopUsers = async () => {
        const users = getTopUsers();
        console.log('the top users', users);
    };

    useEffect(() => {
        if (!topScores && !loadingTopUsers) {
            retriveTopUsers;
        }
    }, []);

    return (
        <div className="Container">
            <div className="topScores">Top Scores</div>
            <div>Your Stats</div>
        </div>
    );
}

export default Users;
