const baseDatabase = 'http://localhost:3000';

import axios from 'axios';

export let loading = false;

export const newUser = async (username: string, password: string) => {
    loading = true;
    const data = {
        username: username,
        score: 0,
        password: password,
    };
    console.log('new user', username, password);
    const response = await axios.post(`${baseDatabase}/register`, data).then((response) => {
        loading = false;
        return response.data;
    });

    return response;
};
