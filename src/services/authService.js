import axiosInstance from './axiosInstance';
import { jwtDecode } from 'jwt-decode';

// Login: realiza la autenticación y guarda el token en localStorage
// export const login = async (userData) => {
//   try {
//     const response = await axiosInstance.post('/Auth/Login', userData);
//     const { token } = response.data;

//     // Almacena el token en localStorageF
//     localStorage.setItem('authToken', token);

//     return response.data;
//   } catch (error) {
//     throw new Error('Error al iniciar sesión');
//   }
// };

export const login = async (userData) => {
  try {
    const response = await axiosInstance.post('/Auth/Login', userData);
    const { token, userId, role } = response.data;
    localStorage.setItem("authToken", token);
    return { userId, token, role };
  } catch (error) {
    throw new Error('Error al iniciar sesión');
  }
};

export const getUserRole = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Extrae el rol desde el token decodificado
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};

// Logout: elimina el token de localStorage
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Registrar usuario: crea un nuevo usuario en la base de datos
export const register = async (newUser) => {
  try {
    const response = await axiosInstance.post('/Auth/Register', newUser, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    throw new Error('Error al registrar usuario');
  }
};

// Crear usuario desde administración
export const registerUsuarioAdmin = async (newUser, roleName) => {
  try {
    const response = await axiosInstance.post('/auth/RegisterUsuarioAdmin', 
      { ...newUser, roleName }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error("Hubo un problema al registrar el usuario");
  }
};

// Crear usuario desde administración y luego asignar el rol
export const createUserWithRole = async (newUser, rolNombre) => {
  try {
    // Crear el usuario
    const response = await axiosInstance.post('/auth/RegisterUsuarioAdmin', newUser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const createdUser = response.data; // Guardamos el usuario creado
    
    // Verificar que se haya recibido un ID para asignar el rol
    if (createdUser && createdUser.idUsuario) {
      // Asignar el rol utilizando el ID del usuario recién creado y el ID del rol
      await axiosInstance.post(`/roles/${createdUser.idUsuario}/asignar-rol-por-nombre/${rolNombre}`);
      return createdUser;
    } else {
      throw new Error("Error al obtener el ID del usuario creado.");
    }
  } catch (error) {
    console.error("Error en el proceso de creación y asignación de rol:", error);
    throw new Error("Hubo un problema al crear el usuario o asignarle el rol.");
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
