import axiosInstance from './axiosInstance';

// Obtener todos los permisos
export const getPermisos = async () => {
  const response = await axiosInstance.get('/permisos');
  return response.data;
};

// Obtener un permiso por ID
export const getPermisoById = async (id) => {
  const response = await axiosInstance.get(`/permisos/${id}`);
  return response.data;
};

// Obtener permisos asignados a un rol por ID del rol
export const getPermisosPorRol = async (rolId) => {
  const response = await axiosInstance.get(`/permisos/${rolId}/permisos-por-rol`);
  return response.data;
};

// Obtener permisos asignados a un rol por nombre del rol
export const getPermisosPorRolNombre = async (rolNombre) => {
  const response = await axiosInstance.get(`/permisos/${rolNombre}/permisos-por-rol-nombre`);
  return response.data;
};

// Crear un nuevo permiso
export const createPermiso = async (permisoData) => {
  const response = await axiosInstance.post('/permisos', permisoData);
  return response.data;
};

// Actualizar un permiso por ID
export const updatePermiso = async (id, permisoData) => {
  await axiosInstance.put(`/permisos/${id}`, permisoData);
};

// Asignar un permiso a un rol
export const asignarPermisoARol = async (rolId, permisoId) => {
  await axiosInstance.post(`/permisos/${rolId}/asignar-permiso/${permisoId}`);
};

// Eliminar un permiso por ID
export const deletePermiso = async (id) => {
  await axiosInstance.delete(`/permisos/${id}`);
};

// Eliminar un permiso de un rol
export const deletePermisoDeRol = async (rolId, permisoId) => {
  await axiosInstance.delete(`/permisos/${rolId}/eliminar-permiso/${permisoId}`);
};

// Cambiar el estado de un permiso (1=Activo, 0=Inactivo)
export const cambiarEstadoPermiso = async (id, estado) => {
  await axiosInstance.put(`/permisos/${id}/cambiar-estado/${estado}`);
};

// Inicializar permisos en la base de datos
export const inicializarPermisos = async () => {
  const response = await axiosInstance.post('/permisos/inicializar');
  return response.data;
};

// Inicializar permisos para roles
export const inicializarPermisosParaRoles = async () => {
  const response = await axiosInstance.post('/permisos/inicializarPermisos');
  return response.data;
};
