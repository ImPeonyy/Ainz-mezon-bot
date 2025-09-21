import cron from "node-cron";
import { autoUpdateLeaderBoard } from "@/services";
import { UPDATE_LEADERBOARD_CRON_SCHEDULE } from "@/constants";

export const scheduleUpdateLeaderBoard = () => {
    return cron.schedule(`21 ${UPDATE_LEADERBOARD_CRON_SCHEDULE.join(',')} * * *`, () => {
        autoUpdateLeaderBoard();
      }, 
    {
        timezone: 'Asia/Ho_Chi_Minh'
    });
};