import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DisputasJuez.css';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import FiltroInput from '../../layouts/FiltroInput.jsx';
import '@fortawesome/fontawesome-free/css/all.css';
import Paginador from '../../layouts/Paginador.jsx';
import { getMultasAsignadasAJuez } from '../../../services/disputaService.js';
import { useUserContext } from '../../../contexts/UserContext.jsx';
import { isoToDateFormatter } from '../../../utils/dateUtils.js';
import Button from '../../atoms/Button.jsx';
import { formatId } from '../../../utils/idFormatUtils.js';
import { getEstadoDisputa } from '../../../utils/disputaUtils.js';

const Disputas = () => {
    const [disputas, setDisputas] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;
    const navigate = useNavigate();
    const { userId } = useUserContext();


    useEffect(() => {
        getMultasAsignadasAJuez(userId)
            .then((data) => {
                const disputasEstado1 = data.filter(disputa => disputa.estado === 1);
                setDisputas(disputasEstado1);
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            });
    }, [userId]);
        

    const handleDispute = (disputa) => {
        navigate(`/resolver-disputa`, { state: { motivo: disputa.motivoReclamo, idMulta: disputa.multaId, idDisputa: disputa.idDisputa } });
    };


    const disputasFiltradas = disputas.filter(disputa =>
        Object.values(disputa).some(value =>
            value.toString().toLowerCase().includes(filtro.toLowerCase())
        )
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const disputasActuales = disputasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);

    const totalPaginas = Math.ceil(disputasFiltradas.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="disputas-juez">
            <header>
                <JuezNavbar />
            </header>

            <div className="contenedor-disputas-juez">
                <h1>Disputas asignadas</h1>

                <div className="filtro-container">
                    <FiltroInput 
                        placeholder="Filtrar" 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)} 
                    />
                    <div><i className="fas fa-search search-icon"></i></div>
                </div>

                <div className="contenedor-tabla">
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>ID Disputa</th>
                                <th>Vehículo</th>
                                <th>Fecha de Creación</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputasFiltradas.length > 0 ? (
                                disputasActuales.map((disputa) => (
                                    <tr key={disputa.id}>
                                        <td>{formatId(disputa.idDisputa)}</td>
                                        <td>{disputa.numeroPlaca}</td>
                                        <td>{isoToDateFormatter(disputa.fechaCreacion)}</td>
                                        <td>{getEstadoDisputa(disputa.estado)}</td>
                                        <td className="buttonLink">
                                            <Button 
                                               // to={ `/resolver-disputa/${disputa.multaId}` }
                                                variant="secondary" 
                                                size="medium" 
                                                text="Resolver disputa" 
                                                onClick={() => handleDispute(disputa)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        El usuario no tiene disputas asignadas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {disputasFiltradas.length > 0 && (
                    <Paginador 
                        totalPaginas={totalPaginas} 
                        paginaActual={paginaActual} 
                        cambiarPagina={cambiarPagina} 
                    />
                )}
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Disputas;
