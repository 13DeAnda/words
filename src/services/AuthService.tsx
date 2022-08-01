const baseDatabase = 'http://localhost:3000';

import axios from 'axios';

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    },
};

export let loading = false;

export const newUser = async (username: string, password: string) => {
    loading = true;
    const data = {
        email: username,
        score: 0,
        password: password,
    };
    console.log('new user', username, password, data);
    const response = await axios
        .post(`${baseDatabase}/register`, data, axiosConfig)
        .then((response) => {
            return response.data;
        })
        .catch((err) => console.log('Login: ', err.response));

    loading = false;

    return response;
};
