const baseDatabase = 'http://localhost:3000';

import axios from 'axios';

export let loading = false;

export const newUser = async (username: string, password: string) => {
    const data = {
        username: username,
        score: 0,
        password: password,
    };
    const response = await axios
        .post(`${baseDatabase}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
            console.log('the response', response);
            return response.data;
        });

    return response;
};
