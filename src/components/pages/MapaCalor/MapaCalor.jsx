/* global google */
import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, HeatmapLayer, LoadScript } from "@react-google-maps/api";
import { getInfracciones } from "../../../services/infraccionService";
import { fetchHeatmapData } from "../../../services/heatmapService";
import "./MapaCalor.css";
import { useUserContext } from "../../../contexts/UserContext.jsx";
import UsuarioNavbar from "../../layouts/Navbar/UsuarioNavbar.jsx";
import OficialNavbar from "../../layouts/Navbar/OficialNavbar.jsx";
import JuezNavbar from "../../layouts/Navbar/JuezNavbar.jsx";
import AdminNavbar from "../../layouts/Navbar/AdminNavbar.jsx";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";

const GOOGLE_MAPS_LIBRARIES = ["visualization"];

const MapaCalor = () => {
  const { role } = useUserContext();
  const [heatmapData, setHeatmapData] = useState([]);
  const [infracciones, setInfracciones] = useState([]);
  const [selectedInfraccion, setSelectedInfraccion] = useState("");
  const [cantidadMultas, setCantidadMultas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar infracciones
  useEffect(() => {
    const loadInfracciones = async () => {
      try {
        const data = await getInfracciones();
        setInfracciones(data);
      } catch (error) {
        console.error("Error al cargar las infracciones:", error);
      }
    };

    loadInfracciones();
  }, []);

  // Procesar y cargar datos del mapa de calor
  const loadHeatmapData = useCallback(async () => {
    setHeatmapData([]); // Limpia datos anteriores
    setIsLoading(true); // Muestra estado de carga
    try {
      const data = await fetchHeatmapData(selectedInfraccion);
      const formattedData = data.map(({ latitud, longitud }) => ({
        location: new window.google.maps.LatLng(latitud, longitud),
        weight: 1,
      }));
      setHeatmapData(formattedData);
      setCantidadMultas(data.length); // Actualiza la cantidad de multas
    } catch (error) {
      console.error("Error al cargar los datos del mapa de calor:", error);
    } finally {
      setIsLoading(false); // Oculta estado de carga
    }
  }, [selectedInfraccion]);

  useEffect(() => {
    if (selectedInfraccion) {
      loadHeatmapData();
    }
  }, [selectedInfraccion, loadHeatmapData]);

  const handleNavbar = () => {
    switch (role) {
      case "Usuario Final":
        return <UsuarioNavbar />;
      case "Oficial de Tránsito":
        return <OficialNavbar />;
      case "Juez de Tránsito":
        return <JuezNavbar />;
      case "Administrador":
        return <AdminNavbar />;
      default:
        return <InvitadoNavbar />;
    }
  };

  return (
    <div className="mapa-calor-page">
      <header>{handleNavbar()}</header>
      <main className="mapa-calor-content">
        <div className="texto-contenedor">
          <h1>Mapa de Calor de Multas</h1>
          <div className="filter-container">
            <label htmlFor="infraccionFilter">Tipo de infracción:</label>
            <select
              id="infraccionFilter"
              value={selectedInfraccion}
              onChange={(e) => setSelectedInfraccion(e.target.value)}
            >
              <option value="">Todas las infracciones</option>
              {infracciones.map((infraccion) => (
                <option key={infraccion.idInfraccion} value={infraccion.titulo}>
                  {infraccion.titulo}
                </option>
              ))}
            </select>

            {!isLoading && selectedInfraccion && (
            <div className="info-box">
              <p>
                <strong>Infracción seleccionada:</strong> {selectedInfraccion}
              </p>
              <p>
                <strong>Cantidad de multas:</strong> {cantidadMultas}
              </p>
            </div>
          )}
          </div>
        </div>
        <div className="map-container">
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            libraries={GOOGLE_MAPS_LIBRARIES}
          >
            <GoogleMap
              key={selectedInfraccion} // Fuerza la recreación al cambiar infracción
              mapContainerClassName="map"
              center={{ lat: 9.7489, lng: -83.7534 }}
              zoom={8}
              options={{ streetViewControl: false, mapTypeControl: false }}
            >
              {heatmapData.length > 0 && (
                <HeatmapLayer
                  data={heatmapData.map((point) => point.location)}
                  options={{
                    radius: 50,
                    opacity: 0.6,
                    gradient: [
                      "rgba(0, 255, 255, 0)",
                      "rgba(0, 255, 255, 1)",
                      "rgba(0, 191, 255, 1)",
                      "rgba(0, 127, 255, 1)",
                      "rgba(0, 63, 255, 1)",
                      "rgba(0, 0, 255, 1)",
                      "rgba(0, 0, 223, 1)",
                      "rgba(0, 0, 191, 1)",
                      "rgba(0, 0, 159, 1)",
                      "rgba(0, 0, 127, 1)",
                      "rgba(63, 0, 91, 1)",
                      "rgba(127, 0, 63, 1)",
                      "rgba(191, 0, 31, 1)",
                      "rgba(255, 0, 0, 1)",
                    ],
                  }}
                />
              )}
            </GoogleMap>
          </LoadScript>
          {isLoading && <p className="loading-message">Cargando datos...</p>}
          
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MapaCalor;
