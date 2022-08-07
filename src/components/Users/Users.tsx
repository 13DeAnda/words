import React, { useState, useEffect } from 'react';
import './users.css';
import { getTopUsers, loadingTopUsers } from '../../services/TopScoresService';
import { getUser } from '../../services/GameService';
import { TopUserI } from '../../Interfaces/topUser';
import { UserI } from '../../Interfaces/user';

// TODO: must introduce loading icons
function Users() {
    const [topScores, setTopScores] = useState<TopUserI[]>([]);
    const [user, setUser] = useState<UserI | null>(null);
    const userId = localStorage.getItem('wordsAppUserId') || '';

    const retriveTopScores = async () => {
        const response = await getTopUsers();
        if (!response.status) {
            setTopScores(response);
        }
    };
    const retriveUser = async () => {
        const response = await getUser(userId);
        if (!response.status) {
            setUser(response);
        }
    };

    useEffect(() => {
        if (!loadingTopUsers) {
            retriveTopScores();
            if (userId.length) {
                retriveUser();
            }
        }
    }, []);
    return (
        <div className="Container">
            {topScores && (
                <div className="topScores">
                    <h3>Top High Scores</h3>
                    {topScores.map((user, index) => (
                        <div
                            key={`topUser_${index}`}
                            className={user.userId == parseInt(userId) ? 'yourTopScore topScore' : 'topScore'}
                        >
                            <div>
                                <b># {user.rank}</b> {user.email}{' '}
                            </div>
                            <div>
                                <b> {user.score} pts</b>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {user && (
                <div className="topScores">
                    <h3>Your Score</h3>
                    <div className="userScore">{user?.score} pts</div>
                </div>
            )}
        </div>
    );
}

export default Users;
