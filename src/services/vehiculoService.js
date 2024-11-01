import axiosInstance from './axiosInstance';

// Obtener todos los vehículos
export const getVehiculos = async () => {
  const response = await axiosInstance.get('/vehiculos');
  return response.data;
};

// Obtener un vehículo por ID
export const getVehiculoById = async (id) => {
  const response = await axiosInstance.get(`/vehiculos/${id}`);
  return response.data;
};

// Obtener un vehículo por número de placa
export const getVehiculoPorPlaca = async (numeroPlaca) => {
  const response = await axiosInstance.get(`/vehiculos/placa/${numeroPlaca}`);
  return response.data;
};

// Obtener vehículos por usuario
export const getVehiculosPorUsuario = async (usuarioId) => {
  const response = await axiosInstance.get(`/vehiculos/usuario/${usuarioId}`);
  return response.data;
};

// Crear un nuevo vehículo
export const createVehiculo = async (vehiculoData) => {
  const response = await axiosInstance.post('/vehiculos', vehiculoData);
  return response.data;
};

// Actualizar un vehículo por ID
export const updateVehiculo = async (id, vehiculoData) => {
  await axiosInstance.put(`/vehiculos/${id}`, vehiculoData);
};

// Cambiar la foto del vehículo
export const cambiarFotoVehiculo = async (id, foto) => {
  await axiosInstance.put(`/vehiculos/${id}/cambiar-foto/${foto}`);
};

// Eliminar un vehículo por ID
export const deleteVehiculo = async (id) => {
  await axiosInstance.delete(`/vehiculos/${id}`);
};

// Inicializar vehículos para usuarios específicos
export const inicializarVehiculos = async () => {
  const response = await axiosInstance.post('/vehiculos/inicializar');
  return response.data;
};
