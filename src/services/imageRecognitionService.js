import axiosInstance from './axiosInstance';

export const analyzeIdDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // Agrega el archivo al formData

  try {
    const response = await axiosInstance.post('/ImageRecognition/AnalyzeIdDocument', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al analizar el documento.');
  }
};
