import axiosInstance from './axiosInstance';

// Login: realiza la autenticación y guarda el token en localStorage
export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    const { token } = response.data;

    // Almacena el token en localStorage
    localStorage.setItem('authToken', token);

    return response.data;
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

// Logout: elimina el token de localStorage
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Registrar usuario: crea un nuevo usuario en la base de datos
export const register = async (newUser) => {
  try {
    const response = await axiosInstance.post('/auth/register', newUser);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar usuario');
  }
};

// Obtener usuario con rol de Admin
export const isAdmin = async (userName) => {
  try {
    const response = await axiosInstance.get(`/auth/roletesting?userName=${userName}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al verificar el rol de Admin');
  }
};

// Asignar rol de Admin a un usuario
export const makeAdmin = async (userName) => {
  try {
    const response = await axiosInstance.get(`/auth/makeadmin?userName=${userName}`);
    return response.data;
  } catch (error) {
    throw new Error('Error al asignar el rol de Admin');
  }
};
