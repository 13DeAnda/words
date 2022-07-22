const baseDatabase = 'http://localhost:3000';

import { UserI } from '../Interfaces/user';
import axios from 'axios';

export let loading = false;

export const getTopUsers = async () => {
    const response = await axios.get(`${baseDatabase}/topUsers`).then((response) => {
        return response.data;
    });

    return response;
};

export const isTopUser = async (score: number) => {
    const response = await axios.get(`${baseDatabase}/topUsers`).then((response) => {
        return response.data;
    });

    for (let index in response) {
        let topUser = response[index];
        if (score <= topUser.score) {
            return topUser.id;
        }
    }

    return null;
};
