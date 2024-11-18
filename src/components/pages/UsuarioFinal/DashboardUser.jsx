import React, { useEffect, useState } from 'react'; 
import './DashboardUser.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getMultasPorUsuarioId } from '../../../services/multaServices';  // Importa la función desde el servicio
import Button from '../../atoms/Button.jsx';
import Paginador from '../../layouts/Paginador.jsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importa el complemento

const DashboardUser = () => {
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
    const [filtroFechaFin, setFiltroFechaFin] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;
    const usuarioId = "5318886d-4d6c-4820-aa56-6b9d687e0cdf";

    useEffect(() => {
        // Obtener las multas del usuario
        getMultasPorUsuarioId(usuarioId)
            .then((data) => {
                setMultas(data);
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            });
    }, [usuarioId]);

    const multasFiltradas = multas.filter((multa) => {
        const matchesFiltro = multa.idMulta.toString().includes(filtro);

        const fecha = new Date(multa.fechaHora);
        const fechaInicio = filtroFechaInicio ? new Date(filtroFechaInicio) : null;
        const fechaFin = filtroFechaFin ? new Date(filtroFechaFin) : null;

        const matchesFecha = (!fechaInicio || fecha >= fechaInicio) && (!fechaFin || fecha <= fechaFin);
        const matchesEstado = filtroEstado ? 
            (filtroEstado === 'Pendiente' && multa.estado === 1) ||
            (filtroEstado === 'En disputa' && multa.estado === 2) ||
            (filtroEstado === 'Pagada' && multa.estado === 3) 
            : true;

        return matchesFiltro && matchesFecha && matchesEstado;
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

        doc.setFontSize(16);
        doc.text("Informe de Multas", 14, 20);

        // Agregar la tabla de multas
        doc.setFontSize(12);
        doc.autoTable({
            head: [['ID Multa', 'Fecha', 'Vehículo', 'Monto', 'Estado']],
            body: multasFiltradas.map(multa => [
                multa.idMulta,
                new Date(multa.fechaHora).toLocaleDateString(),
                multa.numeroPlaca,
                "₡ " + multa.montoTotal,
                multa.estado === 1 ? 'Pendiente' : multa.estado === 2 ? 'En disputa' : 'Pagada'
            ]),
            startY: 30,
        });

        // Agregar la tabla de estado de las multas (sin "Vencida")
        doc.autoTable({
            head: [['Estado', 'Cantidad']],
            body: [
                ['Pendiente', multasFiltradas.filter(multa => multa.estado === 1).length],
                ['En disputa', multasFiltradas.filter(multa => multa.estado === 2).length],
                ['Pagada', multasFiltradas.filter(multa => multa.estado === 3).length]
            ],
            startY: doc.autoTable.previous.finalY + 10, // Ajusta la posición de la siguiente tabla
        });

        // Descargar el archivo PDF
        doc.save("informe_multas.pdf");
    };

    return (
        <div className="dashboard-user">
            <header>
                <UsuarioNavbar />
            </header>

            <main>
                <h1>Dashboard de Multas</h1>

                {/* Filtros de Búsqueda */}
                <div className="filtro-container">
                    <input
                        type="text"
                        placeholder="Filtrar por ID Multa"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <input
                        type="date"
                        value={filtroFechaInicio}
                        onChange={(e) => setFiltroFechaInicio(e.target.value)}
                        placeholder="Fecha de Inicio"
                    />
                    <input
                        type="date"
                        value={filtroFechaFin}
                        onChange={(e) => setFiltroFechaFin(e.target.value)}
                        placeholder="Fecha de Fin"
                    />
                    <select
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En disputa">En disputa</option>
                        <option value="Pagada">Pagada</option>
                    </select>
                </div>

                {/* Tabla de Multas */}
                <div className="contenedor-tabla">
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
                                        <td>{multa.idMulta}</td>
                                        <td>{new Date(multa.fechaHora).toLocaleDateString()}</td>
                                        <td>{multa.numeroPlaca}</td>
                                        <td>{"₡ " + multa.montoTotal}</td>
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

                {/* Tabla de estado de las multas */}
                <div className="contenedor-tabla">
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

export default DashboardUser;

