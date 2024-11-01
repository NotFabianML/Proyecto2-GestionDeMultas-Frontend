import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Asegúrate de definir esta variable en el entorno
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar el token de autenticación si es necesario
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Obtén el token desde localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
