export interface IMeme {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
}

export interface IActionGif {
    results: {
        anime_name: string;
        url: string;
    }[];
}

export type ParsedAction = {
    trigger: string | null;
    action: string | null;
    targetRaw: string | null;
};
