// services/heatmapService.js
import axiosInstance from "./axiosInstance";

// Obtener datos para el mapa de calor
export const fetchHeatmapData = async (categoria) => {
  try {
    const response = await axiosInstance.get("/Multas/heatmap", {
      params: { categoria },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos del mapa de calor:", error);
    throw error;
  }
};
