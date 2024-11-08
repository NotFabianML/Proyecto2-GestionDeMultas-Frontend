import axiosInstance from './axiosInstance';

// Obtener todas las multas
export const getMultas = async () => {
  const response = await axiosInstance.get('/multas');
  return response.data;
};

// Obtener multa por ID
export const getMultaById = async (id) => {
  const response = await axiosInstance.get(`/multas/${id}`);
  return response.data;
};

// Obtener multas por estado
export const getMultasPorEstado = async (estado) => {
  const response = await axiosInstance.get(`/multas/estado/${estado}`);
  return response.data;
};

// Obtener multas por número de placa
export const getMultasPorPlaca = async (numeroPlaca) => {
  const response = await axiosInstance.get(`/multas/placa/${numeroPlaca}`);
  return response.data;
};

// Obtener multas por infracción
export const getMultasPorInfraccion = async (infraccionId) => {
  const response = await axiosInstance.get(`/multas/${infraccionId}/multas-por-infraccion`);
  return response.data;
};

// Crear una nueva multa
export const createMulta = async (multaData) => {
  const response = await axiosInstance.post('/multas', multaData);
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

// Obtener multas por ID de usuario final
export const getMultasPorUsuarioId = async (usuarioId) => {
  const response = await axiosInstance.get(`/multas/usuario/id/${usuarioId}`);
  return response.data;
};

// Obtener multas por cédula de usuario final
export const getMultasPorCedulaUsuario = async (cedula) => {
  const response = await axiosInstance.get(`/multas/usuario/cedula/${cedula}`);
  return response.data;
};

// Inicializar multas
export const inicializarMultas = async () => {
  const response = await axiosInstance.post('/multas/inicializar');
  return response.data;
};
