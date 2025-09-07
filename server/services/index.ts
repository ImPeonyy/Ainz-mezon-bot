import { createUser, getUser, updateUser } from '@/services/user.service';
import {
    createUserDailyActivity,
    getTodayUserDailyActivity,
    updateUserDailyActivity
} from '@/services/userDailyActivity.service';
import { createUserPet, createUserPets, upsertUserPetCount } from '@/services/userPet.service';
import { deleteImagesFromCloudinary, uploadImageToCloudinary } from '@/services/cloudinary.service';
import { getActionGif, getMeme } from '@/services/misc.service';
import { getPetDetail, getPets, updateUserPet } from '@/services/pet.service';

import { getRarities } from '@/services/rarity.service';

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
    upsertUserPetCount,
    uploadImageToCloudinary,
    deleteImagesFromCloudinary,
    updateUserPet
};
