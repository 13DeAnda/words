const baseDatabase = 'http://localhost:3000';

import { TopUserI } from '../Interfaces/topUser';
import { UserI } from '../Interfaces/user';
import axios from 'axios';

export let loading = false;

export const getTopUsers = async () => {
    const response = await axios.get(`${baseDatabase}/topUsers`).then((response) => {
        return response.data;
    });

    return response;
};

export const updateTopUser = async (id: number, data: TopUserI) => {
    data.rank = id + 1;

    const response = await axios
        .patch(`${baseDatabase}/users/${id}`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            return response.data;
        });

    return response;
};

export const isTopUser = async (user: UserI) => {
    const response = await axios.get(`${baseDatabase}/topUsers`).then((response) => {
        return response.data;
    });
    let userToPush = null;

    for (let index in response) {
        const topUser = response[index];
        if (userToPush) {
            userToPush.id = index;
            userToPush.rank = index + 1;
            updateTopUser(userToPush.id, userToPush);
            userToPush = topUser;
        } else if (user.score <= topUser.score) {
            let copy = {
                rank: parseInt(index) + 1,
                userId: user.id,
                id: parseInt(index),
                username: user.username,
                score: user.score,
            };

            userToPush = topUser;
            updateTopUser(user.id, copy);
        }
    }

    return null;
};
