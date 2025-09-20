import {
    addPetToTeam,
    createTeam,
    getRandomTeamForBattle,
    getTeam,
    getTeamByName,
    getTeamForBattle,
    updatePetPosition,
    updateTeamMember,
    updateTeamName
} from '@/services/team.service';
import { createUser, getUser, updateUser } from '@/services/user.service';
import {
    createUserDailyActivity,
    getTodayUserDailyActivity,
    updateUserDailyActivity
} from '@/services/userDailyActivity.service';
import {
    createUserPet,
    createUserPets,
    getRandomUserPets,
    getUserPetByName,
    getUserPetByPetName,
    getUserPetDetail,
    getUserPets,
    getUserPetsByRarity,
    updateUserPet,
    upsertUserPetCount
} from '@/services/userPet.service';
import { deleteImagesFromCloudinary, uploadImageToCloudinary } from '@/services/cloudinary.service';
import { getActionGif, getMeme } from '@/services/misc.service';
import { getPet, getPetDetail, getPets, getPetsByRarity } from '@/services/pet.service';

import { getRarities } from '@/services/rarity.service';
import { createLeaderBoard } from '@/services/leaderBoard.service';

export {
    getActionGif,
    getMeme,
    getPets,
    getRarities,
    createUser,
    getUser,
    updateUser,
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
    getRandomUserPets,
    getPet,
    getPetsByRarity,
    createLeaderBoard
};
