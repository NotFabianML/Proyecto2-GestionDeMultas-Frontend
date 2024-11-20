import React, { useEffect, useState } from 'react';
import './DashboardAdmin.css';
import AdminNavbar from '../../layouts/Navbar/AdminNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import Button from '../../atoms/Button.jsx';
import Paginador from '../../layouts/Paginador.jsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importa el complemento
import { getMultas } from '../../../services/multaServices'; 
import { getDisputas } from '../../../services/disputaService'; // Asegúrate de tener estos servicios correctamente configurados para hacer los requests
import { formatId } from '../../../utils/idFormatUtils.js';
import { isoToDateFormatter } from '../../../utils/dateUtils.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formatFechaNacimiento, getDateFromISO } from '../../../utils/dateUtils.js';
import { format } from 'date-fns';

const DashboardAdmin = () => {
    const [multas, setMultas] = useState([]);
    const [disputas, setDisputas] = useState([]);
    const [error, setError] = useState(null);
    const [filtroMulta, setFiltroMulta] = useState('');
    const [filtroFechaInicioMulta, setFiltroFechaInicioMulta] = useState('');
    const [filtroFechaFinMulta, setFiltroFechaFinMulta] = useState('');
    const [filtroEstadoMulta, setFiltroEstadoMulta] = useState('');
    const [filtroDisputa, setFiltroDisputa] = useState('');
    const [filtroEstadoDisputa, setFiltroEstadoDisputa] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    useEffect(() => {
        // Obtener las multas y disputas
        getMultas()
            .then((data) => {
                setMultas(data);
            })
            .catch((error) => {
                setError(`Error al obtener las multas: ${error.message}`);
            });

        getDisputas()
            .then((data) => {
                setDisputas(data);
            })
            .catch((error) => {
                setError(`Error al obtener las disputas: ${error.message}`);
            });
    }, []);

    const handleFechaInicioChange = (e) => {
        const isoDate = e.target.value; // formato ISO (yyyy-MM-dd)
        if (isoDate) {
            const formattedDate = format(new Date(isoDate), 'dd-MM-yyyy');
            setFiltroFechaInicioMulta(formattedDate);
        } else {
            setFiltroFechaInicioMulta('');
        }
    };
    
    const handleFechaFinChange = (e) => {
        const isoDate = e.target.value;
        if (isoDate) {
            const formattedDate = format(new Date(isoDate), 'dd-MM-yyyy');
            setFiltroFechaFinMulta(formattedDate);
        } else {
            setFiltroFechaFinMulta('');
        }
    };


    const multasFiltradas = multas.filter((multa) => {
        const matchesFiltro = multa.idMulta.toString().includes(filtroMulta);

        const fecha = new Date(multa.fechaHora);
        const fechaInicio = filtroFechaInicioMulta ? new Date(filtroFechaInicioMulta) : null;
        const fechaFin = filtroFechaFinMulta ? new Date(filtroFechaFinMulta) : null;

        const matchesFecha = (!fechaInicio || fecha >= fechaInicio) && (!fechaFin || fecha <= fechaFin);
        const matchesEstado = filtroEstadoMulta ? 
            (filtroEstadoMulta === 'Pendiente' && multa.estado === 1) ||
            (filtroEstadoMulta === 'En disputa' && multa.estado === 2) ||
            (filtroEstadoMulta === 'Pagada' && multa.estado === 3) 
            : true;

        return matchesFiltro && matchesFecha && matchesEstado;
    });

    const disputasFiltradas = disputas.filter((disputa) => {
        const matchesFiltro = disputa.idDisputa.toString().includes(filtroDisputa);
        const matchesEstado = filtroEstadoDisputa ? 
            (filtroEstadoDisputa === 'Pendiente' && disputa.estado === 1) ||
            (filtroEstadoDisputa === 'Resuelta' && disputa.estado === 2) ||
            (filtroEstadoDisputa === 'Rechazada' && disputa.estado === 3)
            : true;

        return matchesFiltro && matchesEstado;
    });

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const multasActuales = multasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);

    const totalPaginas = Math.ceil(multasFiltradas.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const exportarPDF = () => {
        const doc = new jsPDF();
        const fechaActual = new Date().toLocaleDateString();

        doc.setFontSize(16);
        doc.text("Informe de Multas y Disputas", 14, 20);
        doc.setFontSize(12);
        doc.text(`Fecha: ${formatFechaNacimiento(fechaActual)}`, 160, 20);

        // Agregar la tabla de multas
        doc.setFontSize(12);
        doc.autoTable({
            head: [['ID Multa', 'Fecha', 'Vehículo', 'Monto', 'Estado']],
            body: multasFiltradas.map(multa => [
                formatId(multa.idMulta),
                (isoToDateFormatter(multa.fechaHora)),
                multa.numeroPlaca,
                "CRC " + multa.montoTotal + ",00",
                multa.estado === 1 ? 'Pendiente' : multa.estado === 2 ? 'En disputa' : 'Pagada'
            ]),
            startY: 30,
        });

        // Agregar la tabla de disputas
        doc.autoTable({
            head: [['ID Disputa', 'Fecha', 'Estado']],
            body: disputasFiltradas.map(disputa => [
                formatId(disputa.idDisputa),
                new Date(disputa.fechaHora).toLocaleDateString(),
                disputa.estado === 1 ? 'Pendiente' : disputa.estado === 2 ? 'Resuelta' : 'Rechazada'
            ]),
            startY: doc.autoTable.previous.finalY + 10,
        });

        // Agregar estadísticas de las multas
        doc.autoTable({
            head: [['Estado', 'Cantidad']],
            body: [
                ['Pendiente', multasFiltradas.filter(multa => multa.estado === 1).length],
                ['En disputa', multasFiltradas.filter(multa => multa.estado === 2).length],
                ['Pagada', multasFiltradas.filter(multa => multa.estado === 3).length]
            ],
            startY: doc.autoTable.previous.finalY + 10,
        });

        // Descargar el archivo PDF
        doc.save("informe_multas_disputas.pdf");
    };

    return (
        <div className="dashboard-admin" id="DashboardAdmin">
            <header>
                <AdminNavbar />
            </header>

            <main>
                <h1>Dashboard de Administrador</h1>

                {/* Filtros para la tabla de Multas */}
                <div className="filtro-container">
                    <input
                        type="text"
                        placeholder="Filtrar por ID Multa"
                        value={filtroMulta}
                        onChange={(e) => setFiltroMulta(e.target.value)}
                        id="filtro-id-multa"
                    />
                    <input
                        type="date"
                        value={
                            filtroFechaInicioMulta
                                ? format(new Date(filtroFechaInicioMulta.split('-').reverse().join('-')), 'yyyy-MM-dd')
                                : ''
                        }
                        onChange={handleFechaInicioChange}
                        id="filtro-fecha-inicio-multa"
                    />
                    <input
                        type="date"
                        value={
                            filtroFechaFinMulta
                                ? format(new Date(filtroFechaFinMulta.split('-').reverse().join('-')), 'yyyy-MM-dd')
                                : ''
                        }
                        onChange={handleFechaFinChange}
                        id="filtro-fecha-fin-multa"
                    />
                    <select
                        value={filtroEstadoMulta}
                        onChange={(e) => setFiltroEstadoMulta(e.target.value)}
                        id="filtro-estado-multa"
                    >
                        <option value="">Estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En disputa">En disputa</option>
                        <option value="Pagada">Pagada</option>
                    </select>
                </div>

                {/* Tabla de Multas */}
                <div className="contenedor-tabla" id="tabla-multas">
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>ID Multa</th>
                                <th>Fecha</th>
                                <th>Vehículo</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {multasFiltradas.length > 0 ? (
                                multasActuales.map((multa) => (
                                    <tr key={multa.idMulta}>
                                        <td>{formatId(multa.idMulta)}</td>
                                        <td>{isoToDateFormatter(multa.fechaHora)}</td>
                                        <td>{multa.numeroPlaca}</td>
                                        <td>{formatCurrency(multa.montoTotal)}</td>
                                        <td>{multa.estado === 1 ? 'Pendiente' : multa.estado === 2 ? 'En disputa' : 'Pagada'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No tienes multas registradas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tabla del Estado de las Multas */}
                <div className="contenedor-tabla" id="tabla-estado-multas">
                    <h3>Estado de las Multas</h3>
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>Estado</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pendiente</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 1).length}</td>
                            </tr>
                            <tr>
                                <td>En disputa</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 2).length}</td>
                            </tr>
                            <tr>
                                <td>Pagada</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 3).length}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Filtros para la tabla de Disputas */}
                <div className="filtro-container">
                    <input
                        type="text"
                        placeholder="Filtrar por ID Disputa"
                        value={filtroDisputa}
                        onChange={(e) => setFiltroDisputa(e.target.value)}
                        id="filtro-id-disputa"
                    />
                    <select
                        value={filtroEstadoDisputa}
                        onChange={(e) => setFiltroEstadoDisputa(e.target.value)}
                        id="filtro-estado-disputa"
                    >
                        <option value="">Estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Resuelta">Resuelta</option>
                        <option value="Rechazada">Rechazada</option>
                    </select>
                </div>

                {/* Tabla de Disputas */}
                <div className="contenedor-tabla" id="tabla-disputas">
                    <h3>Estado de las Disputas</h3>
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>ID Disputa</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disputasFiltradas.length > 0 ? (
                                disputasFiltradas.map((disputa) => (
                                    <tr key={disputa.idDisputa}>
                                        <td>{formatId(disputa.idDisputa)}</td>
                                        <td>{isoToDateFormatter(disputa.fechaHora)}</td>
                                        <td>{disputa.estado === 1 ? 'Pendiente' : disputa.estado === 2 ? 'Resuelta' : 'Rechazada'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        No tienes disputas registradas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {multasFiltradas.length > 0 && (
                    <Paginador
                        totalPaginas={totalPaginas}
                        paginaActual={paginaActual}
                        cambiarPagina={cambiarPagina}
                    />
                )}

                {/* Botón para exportar el PDF */}
                <Button 
                    className="button" 
                    type="button" 
                    variant="primary" 
                    size="small" 
                    onClick={exportarPDF} 
                    text="Descargar Informe PDF"
                />

                {error && <div className="error">{error}</div>}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default DashboardAdmin;
