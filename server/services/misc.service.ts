import { IActionGif, IMeme } from '@/constants/Type';

import got from 'got';

export const getMeme = async (): Promise<IMeme> => {
    try {
        return await got('https://meme-api.com/gimme').json();
    } catch (error) {
        console.error('Error fetching meme:', error);
        throw error;
    }
};

export const getActionGif = async (actionType: string): Promise<IActionGif> => {
    try {
        return await got(`https://nekos.best/api/v2/${actionType}`).json();
    } catch (error) {
        console.error('Error fetching action gif:', error);
        throw error;
    }
};
