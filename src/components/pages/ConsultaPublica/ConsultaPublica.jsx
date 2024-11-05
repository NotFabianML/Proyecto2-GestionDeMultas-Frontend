import React, { useState, useEffect } from 'react';
import './ConsultaPublica.css';
import Button from '../../atoms/Button.jsx';
import InvitadoNavbarDos from '../../layouts/Navbar/InvitadoNavbarDos.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getMultasPorPlaca } from '../../../services/multaServices.js';

const ConsultaPublica = () => {
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [placa, setPlaca] = useState('');
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        getMultasPorPlaca(placa)
        .then((data) => {
            setMultas(data);
        })
        .catch((error) => {
            setError(`Error: ${error.message}`);
        });
    }, [mostrarTabla]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const regex = /^[a-zA-Z0-9]*$/;
        if (placa.length === 6 && regex.test(placa)) {
            setMostrarTabla(true);
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
                    <Button id="btnConsultaMulta" className="btnConsultaMulta" variant= "primary" size="medium" text="Consultar Multas" />
                </form>

                {mostrarTabla && (
                    <table className="tabla-multas">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Tipo de Infracción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>01/01/2023</td>
                                <td>Cancelada</td>
                                <td>Particular</td>
                            </tr>
                            <tr>
                                <td>05/02/2023</td>
                                <td>Pendiente</td>
                                <td>Particular</td>
                            </tr>
                            <tr>
                                <td>15/03/2023</td>
                                <td>Pagada</td>
                                <td>Comercial</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ConsultaPublica;
