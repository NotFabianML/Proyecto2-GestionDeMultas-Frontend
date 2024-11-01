import axiosInstance from './axiosInstance';

// Obtener todas las infracciones
export const getInfracciones = async () => {
  const response = await axiosInstance.get('/infracciones');
  return response.data;
};

// Obtener infracción por ID
export const getInfraccionById = async (id) => {
  const response = await axiosInstance.get(`/infracciones/${id}`);
  return response.data;
};

// Crear nueva infracción
export const createInfraccion = async (infraccionData) => {
  const response = await axiosInstance.post('/infracciones', infraccionData);
  return response.data;
};

// Actualizar infracción por ID
export const updateInfraccion = async (id, infraccionData) => {
  await axiosInstance.put(`/infracciones/${id}`, infraccionData);
};

// Asignar infracción a una multa
export const asignarInfraccionAMulta = async (multaId, infraccionId) => {
  await axiosInstance.post(`/infracciones/${multaId}/asignar-infracciones/${infraccionId}`);
};

// Cambiar estado de una infracción
export const cambiarEstadoInfraccion = async (id, estado) => {
  await axiosInstance.post(`/infracciones/${id}/estado/${estado}`);
};

// Inicializar infracciones
export const inicializarInfracciones = async () => {
  await axiosInstance.post('/infracciones/inicializar');
};
