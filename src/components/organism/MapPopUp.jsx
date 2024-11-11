import React, { useRef, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const MapPopup = ({ onClose, onMapClick, position }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    });

    // Referencia para el mapa
    const mapRef = useRef(null);

    useEffect(() => {
        // Centrar el mapa en la ubicación seleccionada si se establece una posición
        if (mapRef.current && position.lat && position.lng) {
            mapRef.current.panTo(position);
        }
    }, [position]);

    if (!isLoaded) return <div>Cargando mapa...</div>;

    // Estilos para el popup
    const popupStyles = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        width: "90%",
        maxWidth: "600px",
        padding: "20px",
        textAlign: "center",
    };

    // Estilos para el botón de cerrar (X)
    const closeButtonStyles = {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "transparent",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        color: "#333",
    };

    // Estilos para el contenedor del mapa
    const mapContainerStyles = {
        width: "100%",
        height: "400px",
        marginTop: "20px",
    };

    // Estilos para la leyenda
    const legendStyles = {
        fontSize: "14px",
        color: "#555",
        marginBottom: "10px",
        marginTop: "10px",
    };

    return (
        <div style={popupStyles}>
            <button type="button" onClick={onClose} style={closeButtonStyles}>
                ✕
            </button>
            <p style={legendStyles}>
                Seleccione la ubicación o haga clic en el mapa para marcar el lugar deseado.
            </p>
            <GoogleMap
                mapContainerStyle={mapContainerStyles}
                center={position.lat && position.lng ? position : { lat: 9.7489, lng: -83.7534 }}
                zoom={8}
                onClick={onMapClick}
                onLoad={(map) => (mapRef.current = map)} // Guardamos la referencia al mapa
            >
                {position.lat && position.lng && (
                    <Marker
                        position={position}
                        map={mapRef.current}
                    />
                )}
            </GoogleMap>
        </div>
    );
};

export default MapPopup;
