import { uploadApi } from '../api/axiosInstance';

/**
 * Upload gambar profil
 * @param {File} file - File dari input type="file"
 * @param {string} userId - ID user
 * @returns {Promise<{url: string}>}
 */
export const uploadProfileAvatar = async (file, userId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId);

  try {
    const response = await uploadApi.post('/upload/avatar', formData);
    return response.data;
  } catch (error) {
    console.error('Upload avatar failed:', error);
    throw error;
  }
};

/**
 * Upload gambar resep
 * @param {File} file - File dari input type="file"
 * @returns {Promise<{url: string}>}
 */
export const uploadRecipeImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await uploadApi.post('/upload/recipe', formData);
    return response.data;
  } catch (error) {
    console.error('Upload recipe failed:', error);
    throw error;
  }
};