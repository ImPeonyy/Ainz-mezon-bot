import {
    addPetToTeam,
    createTeam,
    getRandomTeamForBattle,
    getTeam,
    getTeamByName,
    getTeamForBattle,
    updatePetPosition,
    updateTeamMember,
    updateTeamName,
    getTeamForCalcCP,
    updateTeamCombatPower,
    fillTeamMembers
} from '@/services/team.service';
import { createUser, getUserWithTeam, updateUser, getUser, upsertUser } from '@/services/user.service';
import {
    createUserDailyActivity,
    getTodayUserDailyActivity,
    updateUserDailyActivity
} from '@/services/userDailyActivity.service';
import {
    createUserPet,
    createUserPets,
    getUserPetByName,
    getUserPetByPetName,
    getUserPetDetail,
    getUserPets,
    getUserPetsByRarity,
    updateUserPet,
    upsertUserPetCount,
    getUserPetById,
    getUserPetsByRarityAndLevel
} from '@/services/userPet.service';
import {
    deleteImagesFromCloudinary,
    uploadImageToCloudinary,
    deleteImageFromCloudinary
} from '@/services/cloudinary.service';
import { getActionGif, getMeme } from '@/services/misc.service';
import { getPet, getPetDetail, getPets, getPetsByRarity } from '@/services/pet.service';
import { getRarities } from '@/services/rarity.service';
import {
    createLeaderBoard,
    getMyLeaderBoard,
    getLevelLeaderBoard,
    getCombatPowerLeaderBoard,
    getWinsLeaderBoard,
    getLossesLeaderBoard,
    getUserRank,
    autoUpdateLeaderBoard,
    upsertLeaderBoard
} from '@/services/leaderBoard.service';
import { scheduleUpdateLeaderBoard } from '@/services/schedule.service';
import { sendDMToUser, sendTokenToUser } from '@/services/mezon.service';
import {
    upserGachaCount,
    getGachaCount,
    clearGachaCount
} from '@/services/gachaCount.service';

export {
    getActionGif,
    getMeme,
    getPets,
    getRarities,
    createUser,
    getUserWithTeam,
    getUser,
    updateUser,
    upsertUser,
    getPetDetail,
    createUserDailyActivity,
    getTodayUserDailyActivity,
    updateUserDailyActivity,
    createUserPet,
    createUserPets,
    getUserPets,
    upsertUserPetCount,
    uploadImageToCloudinary,
    deleteImagesFromCloudinary,
    updateUserPet,
    getRandomTeamForBattle,
    getTeamForBattle,
    addPetToTeam,
    updatePetPosition,
    updateTeamName,
    updateTeamMember,
    createTeam,
    getTeam,
    getTeamByName,
    getUserPetByPetName,
    getUserPetDetail,
    getUserPetsByRarity,
    getUserPetByName,
    getPet,
    getPetsByRarity,
    createLeaderBoard,
    getMyLeaderBoard,
    getLevelLeaderBoard,
    getCombatPowerLeaderBoard,
    getWinsLeaderBoard,
    getLossesLeaderBoard,
    getUserRank,
    autoUpdateLeaderBoard,
    scheduleUpdateLeaderBoard,
    upsertLeaderBoard,
    getTeamForCalcCP,
    updateTeamCombatPower,
    sendDMToUser,
    sendTokenToUser,
    deleteImageFromCloudinary,
    getUserPetById,
    getUserPetsByRarityAndLevel,
    fillTeamMembers,
    upserGachaCount,
    getGachaCount,
    clearGachaCount
};
