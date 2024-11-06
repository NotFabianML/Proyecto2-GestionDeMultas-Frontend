import React, { useState } from 'react';
import './ConsultaPublica.css';
import Button from '../../atoms/Button.jsx';
import InvitadoNavbarDos from '../../layouts/Navbar/InvitadoNavbarDos.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getMultasPorPlaca } from '../../../services/multaServices.js';
import { isoToDateFormatter } from '../../../utils/dateUtils.js';

const ConsultaPublica = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [placa, setPlaca] = useState('');
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);

    // Función para traducir el estado de la multa
    const traducirEstado = (estado) => {
        switch (estado) {
            case 1:
                return "Pendiente";
            case 2:
                return "En Disputa";
            case 3:
                return "Pagada";
            default:
                return "Desconocido";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9]*$/;
        
        if (placa.length === 6 && regex.test(placa)) {
            try {
                const data = await getMultasPorPlaca(placa);
                setMultas(data);
                setError(null);
                setMostrarTabla(true);
            } catch (error) {
                setError(`Error: ${error.response?.data || error.message}`);
                setMultas([]);
                setMostrarTabla(false);
            }
        } else {
            setMostrarTabla(false);
            alert("La placa debe tener 6 caracteres y no puede contener caracteres especiales.");
        }
    };

    return (
        <div className="consulta-publica">
            <header>
                <InvitadoNavbarDos />
            </header>

            <div className="contenido">
                <h2>Realiza una consulta pública de multas</h2>
                <p>Ingresa la placa de tu vehículo con el formato adecuado.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        required
                        maxLength="6"
                        placeholder="000000"
                        className="input-placa"
                    />
                    <Button id="btnConsultaMulta" className="btnConsultaMulta" variant="primary" size="medium" text="Consultar Multas" />
                </form>

                {error && <p className="error-message">{error}</p>}

                {mostrarTabla && multas.length > 0 && (
                    <table className="tabla-multas">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {multas.map((multa, index) => (
                                <tr key={index}>
                                    <td>{isoToDateFormatter(multa.fechaHora)}</td>
                                    <td>{traducirEstado(multa.estado)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                
                {mostrarTabla && multas.length === 0 && !error && (
                    <p>No se encontraron multas para la placa ingresada.</p>
                )}
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ConsultaPublica;
