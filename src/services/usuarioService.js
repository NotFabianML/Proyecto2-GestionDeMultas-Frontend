import axiosInstance from './axiosInstance';

// Obtener todos los usuarios
export const getUsuarios = async () => {
  const response = await axiosInstance.get('/usuarios');
  return response.data;
};

// Obtener un usuario por ID
export const getUsuarioById = async (id) => {
  const response = await axiosInstance.get(`/usuarios/${id}`);
  return response.data;
};

// Obtener usuario por cédula
export const getUsuarioPorCedula = async (cedula) => {
  const response = await axiosInstance.get(`/usuarios/cedula/${cedula}`);
  return response.data;
};

export const verificarCorreoUnico = async (email) => {
  const response = await axiosInstance.get(`/usuarios/verificar-correo/${email}`);
  return response.data;
};

// Obtener usuarios por rol ID
export const getUsuariosPorRol = async (rolId) => {
  const response = await axiosInstance.get(`/usuarios/usuarios-por-rol/${rolId}`);
  return response.data;
};

// Obtener usuarios por nombre de rol
export const getUsuariosPorNombreRol = async (rolNombre) => {
  const response = await axiosInstance.get(`/usuarios/usuarios-por-rol-nombre/${rolNombre}`);
  return response.data;
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData) => {
  const response = await axiosInstance.post('/usuarios', usuarioData);
  return response.data;
};

// Actualizar usuario por ID
export const updateUsuario = async (id, usuarioData) => {
  const response = await axiosInstance.put(`/usuarios/${id}`, usuarioData);
  return response.data;
};

// Eliminar usuario por ID
export const deleteUsuario = async (idUsuario) => {
  const response = await axiosInstance.delete(`/usuarios/${idUsuario}`);
  return response.data;
};

// Cambiar el estado de un usuario (1=Activo, 0=Inactivo)
export const cambiarEstadoUsuario = async (id, estado) => {
  await axiosInstance.put(`/usuarios/${id}/cambiar-estado/${estado}`);
};

// Activar doble factor de autenticación
export const activarDobleFactor = async (id) => {
  await axiosInstance.put(`/usuarios/${id}/activar-2fa`);
};

// Desactivar doble factor de autenticación
export const desactivarDobleFactor = async (id) => {
  await axiosInstance.put(`/usuarios/${id}/desactivar-2fa`);
};

// Inicializar usuarios en la base de datos
export const inicializarUsuarios = async () => {
  const response = await axiosInstance.post('/usuarios/inicializar');
  return response.data;
};

// Login de usuario
export const loginUsuario = async (loginData) => {
  const response = await axiosInstance.post('/usuarios/login', loginData);
  return response.data; // Retorna el token si el login es exitoso
};
