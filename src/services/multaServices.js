import axiosInstance from './axiosInstance';

// Obtener todas las multas
export const getMultas = async () => {
  const response = await axiosInstance.get('/multas');
  return response.data;
};

// Obtener multa por ID
export const getMultaById = async (id) => {
  const response = await axiosInstance.get(`/Multas/${id}`);
  return response.data;
};

// Obtener multas por estado
export const getMultasPorEstado = async (estado) => {
  const response = await axiosInstance.get(`/multas/estado/${estado}`);
  return response.data;
};

// Obtener multas por número de placa
export const getMultasPorPlaca = async (numeroPlaca) => {
  const response = await axiosInstance.get(`/Multas/placa/${numeroPlaca}`);
  return response.data;
};

// Obtener multas por infracción
export const getMultasPorInfraccion = async (infraccionId) => {
  const response = await axiosInstance.get(`/multas/${infraccionId}`);
  return response.data;
};

// Crear una nueva multa
export const createMulta = async (multaData) => {
  const response = await axiosInstance.post('/Multas', multaData);
  return response.data;
};

// Actualizar una multa
export const updateMulta = async (id, multaData) => {
  await axiosInstance.put(`/multas/${id}`, multaData);
};

// Cambiar estado de la multa
export const cambiarEstadoMulta = async (id, estado) => {
  await axiosInstance.post(`/multas/${id}/cambiar-estado/${estado}`);
};

// Obtener multa por Usuario ID
export const getMultaByUsuarioId = async (usuarioId) => {
  const response = await axiosInstance.get(`/Multas/usuario/id/${usuarioId}`);
  return response.data;
};
