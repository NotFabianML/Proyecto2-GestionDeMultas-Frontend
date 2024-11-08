import axiosInstance from './axiosInstance';

// Obtener todos los roles
export const getRoles = async () => {
  const response = await axiosInstance.get('/roles');
  return response.data;
};

// Obtener un rol por ID
export const getRolById = async (id) => {
  const response = await axiosInstance.get(`/roles/${id}`);
  return response.data;
};

// Obtener roles asignados a un usuario por ID de usuario
export const getRolesPorUsuario = async (usuarioId) => {
  const response = await axiosInstance.get(`/roles/${usuarioId}/roles-por-usuario`);
  return response.data;
};

// Crear un nuevo rol
export const createRol = async (rolData) => {
  const response = await axiosInstance.post('/roles', rolData);
  return response.data;
};

// Actualizar un rol por ID
export const updateRol = async (id, rolData) => {
  await axiosInstance.put(`/roles/${id}`, rolData);
};

// Eliminar un rol por ID
export const deleteRol = async (id) => {
  await axiosInstance.delete(`/roles/${id}`);
};

// Asignar rol a un usuario
export const asignarRolAUsuario = async (usuarioId, rolId) => {
  await axiosInstance.post(`/roles/${usuarioId}/asignar-rol/${rolId}`);
};

// Eliminar rol de un usuario
export const deleteRolDeUsuario = async (usuarioId, rolId) => {
  await axiosInstance.delete(`/roles/${usuarioId}/eliminar-rol/${rolId}`);
};

// Inicializar roles en el sistema
export const inicializarRoles = async () => {
  const response = await axiosInstance.post('/roles/inicializar');
  return response.data;
};

// Inicializar asignaciones de roles a usuarios
export const inicializarRolesParaUsuarios = async () => {
  const response = await axiosInstance.post('/roles/inicializarRoles');
  return response.data;
};
