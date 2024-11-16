import React, { useEffect, useState } from 'react';
import './MisDisputas.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getDisputasPorUsuario } from '../../../services/disputaService';

const MisDisputas = () => {
    const [disputas, setDisputas] = useState([]);
    const [error, setError] = useState(null);
    const usuarioId = "8BE6F45C-7ACB-4AED-8A38-7B3A87C969B8"; // Id quemado - Hacerlo dinámico

    useEffect(() => {
        getDisputasPorUsuario(usuarioId)
            .then((data) => {
                setDisputas(data);
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            });
    }, [usuarioId]);

    return (
        <div className="container-disputas">
            <UsuarioNavbar />
            <h1>Mis Disputas</h1>
            <p className="textoIn">Selecciona una disputa ...</p>

            <div className='main-container'>
                <div className="grid-container">
                    {error ? (
                        <p className="error-message">* No se encontraron disputas para el usuario especificado</p>
                    ) : disputas.length > 0 ? (
                        disputas.map((disputa) => (
                            <div key={disputa.idDisputa} className="card">
                                <div className="infoDisputa">
                                    <p><strong>ID Disputa:</strong> {disputa.idDisputa}</p>
                                    <p><strong>Multa ID:</strong> {disputa.multaId}</p>
                                    <p><strong>Juez Asignado:</strong> {disputa.juezId || 'No asignado'}</p>
                                    <p><strong>Fecha de Creación:</strong> {new Date(disputa.fechaCreacion).toLocaleDateString()}</p>
                                    <p><strong>Motivo:</strong> {disputa.motivoReclamo}</p>
                                    <p><strong>Estado:</strong> {disputa.estado}</p>
                                    <p><strong>Resolución Juez:</strong> {disputa.resolucionJuez || 'Pendiente'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-disputas-message">El usuario no tiene disputas abiertas.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MisDisputas;
