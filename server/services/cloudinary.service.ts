import { cloudinary } from '@/configs';

export const uploadImageToCloudinary = async (buffer, folder) => {
    try {
        const base64String = `data:image/png;base64,${buffer.toString('base64')}`;

        const result = await cloudinary.uploader.upload(base64String, {
            folder: `${process.env.CLOUDINARY_ROOT_FOLDER}/${folder}`,
            unique_filename: true,
            resource_type: 'image',
            format: 'png'
        });

        return result;
    } catch (err) {
        throw err;
    }
};

export const deleteImageFromCloudinary = async (publicId) => {
    try {
        const results = await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        return results;
    } catch (err) {
        throw err;
    }
};

export const deleteImagesFromCloudinary = async (publicIds) => {
    try {
        const results = await Promise.all(publicIds.map((id) => cloudinary.uploader.destroy(id, { resource_type: 'image' })));
        return results;
    } catch (err) {
        throw err;
    }
};
