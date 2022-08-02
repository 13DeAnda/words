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
    const response = await axios
        .post(`${baseDatabase}/register`, data, axiosConfig)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });

    loading = false;

    return response;
};
export const logIn = async (username: string, password: string) => {
    loading = true;
    const data = {
        email: username,
        password: password,
    };
    const response = await axios
        .post(`${baseDatabase}/login`, data, axiosConfig)
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            return err.response;
        });

    loading = false;

    return response;
};

export const isLoggedIn = () => {
    const logged = localStorage.getItem('wordsAppToken');

    return logged ? true : false;
};

export const logOut = () => {
    localStorage.removeItem('wordsAppToken');
    window.location.reload();
};
