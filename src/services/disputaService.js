import axiosInstance from './axiosInstance';

// Obtener todas las disputas
export const getDisputas = async () => {
  const response = await axiosInstance.get('/disputas');
  return response.data;
};

// Obtener disputa por ID
export const getDisputaById = async (id) => {
  const response = await axiosInstance.get(`/disputas/${id}`);
  return response.data;
};

// Obtener disputas por usuario
export const getDisputasPorUsuario = async (usuarioId) => {
  const response = await axiosInstance.get(`/disputas/${usuarioId}/obtener-disputas`);
  return response.data;
};

// Crear nueva disputa
export const createDisputa = async (disputaData) => {
  const response = await axiosInstance.post('/disputas', disputaData);
  return response.data;
};

// Actualizar disputa por ID
export const updateDisputa = async (id, disputaData) => {
  await axiosInstance.put(`/disputas/${id}`, disputaData);
};

// Cambiar el estado de una disputa
export const cambiarEstadoDisputa = async (id, estado) => {
  await axiosInstance.post(`/disputas/${id}/cambiar-estado/${estado}`);
};

// Eliminar disputa
export const deleteDisputa = async (id) => {
  await axiosInstance.delete(`/disputas/${id}`);
};