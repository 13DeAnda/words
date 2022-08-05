const baseURL = 'https://random-word-api.herokuapp.com/word';
const baseDatabase = 'http://localhost:3000';

import { UserI } from '../Interfaces/user';
import axios from 'axios';

export let loading = false;

export const getRandomWord = async () => {
    loading = true;
    const response = await axios.get(baseURL).then((response) => {
        loading = false;
        return response.data[0];
    });

    return response;
};

export const getUsers = async () => {
    const token = localStorage.getItem('wordsAppToken');
    const response = await axios
        .get(`${baseDatabase}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            return response.data;
        });

    return response;
};

export const getUser = async (id: number | string) => {
    const token = localStorage.getItem('wordsAppToken');
    const response = await axios
        .get(`${baseDatabase}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            return response.data;
        });

    return response;
};

export const updateUser = async (id: number | string, data: UserI) => {
    const token = localStorage.getItem('wordsAppToken');
    const response = await axios
        .patch(`${baseDatabase}/users/${id}`, data, {
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            return response.data;
        });

    return response;
};
