import { IActionGif, IMeme } from '@/constants/Type';

import axios from 'axios';

export const getMeme = async (): Promise<IMeme> => {
    try {
        const res = await axios.get('https://meme-api.com/gimme');
        return res.data;
    } catch (error) {
        console.error('Error fetching meme:', error);
        throw error;
    }
};

export const getActionGif = async (actionType: string): Promise<IActionGif> => {
    try {
        const res = await axios.get(`https://nekos.best/api/v2/${actionType}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching action gif:', error);
        throw error;
    }
};
