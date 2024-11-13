import axios from 'axios';

// Subir imagen a Cloudinary
export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_NexTek'); // Reemplaza con tu upload preset

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dekwvhxog/image/upload`, formData);
        return response.data.secure_url; // Devuelve la URL segura de la imagen
    } catch (error) {
        console.error('Error al subir la imagen a Cloudinary:', error);
        throw error;
    }
};

// Obtener imagen desde Cloudinary
export const getImageUrl = (publicId, transformations = 'c_fill,h_100,w_100') => {
    return `https://res.cloudinary.com/dekwvhxog/image/upload/${transformations}/${publicId}`;
};
