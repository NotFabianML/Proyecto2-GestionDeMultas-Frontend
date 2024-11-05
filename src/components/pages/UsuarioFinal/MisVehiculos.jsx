import React, { useEffect, useState } from 'react';
import './MisVehiculos.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getVehiculosPorUsuario } from '../../../services/vehiculoService';

const MisVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const usuarioId = "17E97F21-4302-4FB1-B140-180E880A0C61"; //Id quemado - Hacerlo dinámico

    useEffect(() => {
        // Llamada al endpoint para obtener vehiculos por usuario
        getVehiculosPorUsuario(usuarioId)
            .then((data) => {
                setVehiculos(data);
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            });
    }, [usuarioId]);

    return (
        <div className="container">
            <UsuarioNavbar />
            <h1>Mis Vehiculos</h1>
            <p className="textoIn"></p>

            <div className="grid-container">
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    vehiculos.map((vehiculo) => (
                        <div key={vehiculo.idVehiculo} className="card">
                            <div className="infoVehiculo">
                                <h3 className="numPlaca"><strong>Placa:</strong> {vehiculo.numeroPlaca}</h3>
                                <p><strong>Marca:</strong> {vehiculo.marca}</p>
                                <p><strong>Año:</strong> {vehiculo.anno || 'No asignado'}</p>
                           
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MisVehiculos;
