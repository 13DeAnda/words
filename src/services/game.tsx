const baseURL = 'https://random-word-api.herokuapp.com/word';
import axios from 'axios';

export const getRandomWord = async () => {
    const response = await axios.get(baseURL).then((response) => {
        return response.data[0];
    });

    return response;
};
