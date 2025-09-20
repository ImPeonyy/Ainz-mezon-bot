import cron from "node-cron";
import { autoUpdateLeaderBoard } from "@/services";

export const scheduleUpdateLeaderBoard = () => {
    return cron.schedule("0 8,12,17 * * *", () => {
        autoUpdateLeaderBoard();
      }, 
    {
        timezone: 'Asia/Ho_Chi_Minh'
    });
};