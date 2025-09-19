import { IActionGif, IMeme } from '@/constants/Type';

import axios from 'axios';

export const getMeme = async (): Promise<IMeme> => {
    try {
        // 1. Lấy access token
        const tokenRes = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            new URLSearchParams({ grant_type: 'client_credentials' }),
            {
                auth: {
                    username: process.env.REDDIT_CLIENT_ID || '',
                    password: process.env.REDDIT_CLIENT_SECRET || ''
                },
                headers: {
                    'User-Agent': 'windows:AinzMezonBot:v1.0.0 (by /u/ProfitSignificant897)'
                }
            }
        );

        const token = tokenRes.data.access_token;

        // 2. Lấy nhiều post từ subreddit
        const res = await axios.get('https://oauth.reddit.com/r/memes/hot?limit=50', {
            headers: {
                Authorization: `Bearer ${token}`,
                'User-Agent': 'windows:AinzMezonBot:v1.0.0 (by /u/ProfitSignificant897)'
            }
        });

        // 3. Lọc bỏ NSFW + spoiler + chỉ lấy image
        const posts = res.data.data.children
            .map((c: any) => c.data)
            .filter(
                (post: any) => !post.over_18 && !post.spoiler && !post.is_video
            );

        // 4. Random chọn 1
        const post = posts[Math.floor(Math.random() * posts.length)];

        return {
            title: post.title,
            url: post.url,
            ups: post.ups,
            author: post.author,
            postLink: `https://reddit.com${post.permalink}`,
            subreddit: post.subreddit,
            nsfw: post.over_18,
            spoiler: post.spoiler,
            preview: post.preview?.images[0]?.resolutions?.map((r: any) => r.url) || []
        };
    } catch (error: any) {
        console.error('Error fetching meme:', error.response?.status, error.message);
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
