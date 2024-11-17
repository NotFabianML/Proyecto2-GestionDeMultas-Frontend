import axiosInstance from './axiosInstance';

// Obtener todas las multas
export const getMultas = async () => {
  const response = await axiosInstance.get('/Multas');
  return response.data;
};

// Obtener multa por ID
export const getMultaById = async (id) => {
  const response = await axiosInstance.get(`/Multas/${id}`);
  return response.data;
};

// Obtener multas por estado
export const getMultasPorEstado = async (estado) => {
  const response = await axiosInstance.get(`/Multas/estado/${estado}`);
  return response.data;
};

// Obtener multas por número de placa
export const getMultasPorPlaca = async (numeroPlaca) => {
  const response = await axiosInstance.get(`/Multas/placa/${numeroPlaca}`);
  return response.data;
};

// Obtener multas por infracción
export const getMultasPorInfraccion = async (infraccionId) => {
  const response = await axiosInstance.get(`/Multas/${infraccionId}/multas-por-infraccion`);
  return response.data;
};

// Crear una nueva multa
export const createMulta = async (multaData) => {
  try {
    const response = await axiosInstance.post('/Multas', multaData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la multa:", error);
    throw error;
  }
};


// Actualizar una multa
export const updateMulta = async (id, multaData) => {
  await axiosInstance.put(`/Multas/${id}`, multaData);
};

// Cambiar estado de la multa
export const cambiarEstadoMulta = async (id, estado) => {
  await axiosInstance.post(`/Multas/${id}/cambiar-estado/${estado}`);
};

// Obtener multas por ID de usuario final
export const getMultasPorUsuarioId = async (usuarioId) => {
  const response = await axiosInstance.get(`/Multas/usuario/id/${usuarioId}`);
  return response.data;
};

// Obtener multas por cédula de usuario final
export const getMultasPorCedulaUsuario = async (cedula) => {
  const response = await axiosInstance.get(`/Multas/usuario/cedula/${cedula}`);
  return response.data;
};

// Eliminar una multa por ID
export const deleteMulta = async (multaId) => {
  try {
    const response = await axiosInstance.delete(`/Multas/${multaId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la multa:", error);
    throw error;
  }
};

// Inicializar multas
export const inicializarMultas = async () => {
  const response = await axiosInstance.post('/Multas/inicializar');
  return response.data;
};

// Obtener multas por ID de oficial
export const getMultasPorOficialId = async (oficialId) => {
  const response = await axiosInstance.get(`/Multas/oficial/${oficialId}`);
  return response.data;
};
