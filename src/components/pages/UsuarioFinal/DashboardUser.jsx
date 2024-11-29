import React, { useEffect, useState } from 'react'; 
import './DashboardUser.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getMultasPorUsuarioId } from '../../../services/multaServices';  // Importa la función desde el servicio
import Button from '../../atoms/Button.jsx';
import Paginador from '../../layouts/Paginador.jsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Importa el complemento
import { useUserContext } from "../../../contexts/UserContext.jsx";
import { formatId } from '../../../utils/idFormatUtils.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';
import { formatFechaNacimiento, getDateFromISO, isoToDateFormatter } from '../../../utils/dateUtils.js';

// Importar los componentes para los gráficos
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, LineElement, PointElement); // Registrar el PointElement y LineElement

const DashboardUser = () => {
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
    const [filtroFechaFin, setFiltroFechaFin] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const { userId, token } = useUserContext();

    useEffect(() => {
        if (!userId || !token) {
            setError("");
            return;
        }

        getMultasPorUsuarioId(userId)
            .then((data) => setMultas(data))
            .catch((error) =>
                setError(`Error al obtener vehículos: ${error.message}`)
            );
    }, [userId, token]);

    const multasFiltradas = multas.filter((multa) => {
        const matchesFiltro = multa.idMulta.toString().startsWith(filtro); // Corregir para buscar solo el primer carácter del ID

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
        const fechaActual = new Date().toLocaleDateString();
    
        doc.setFontSize(16);
        doc.text("Informe de Multas", 14, 20);
        doc.setFontSize(12);
        doc.text(`Fecha: ${fechaActual}`, 160, 20);
    
        // Agregar la tabla de multas
        doc.setFontSize(12);
        doc.autoTable({
            head: [['ID Multa', 'Fecha / Hora', 'Vehículo', 'Monto', 'Estado']],
            body: multasFiltradas.map(multa => [
                formatId(multa.idMulta),
                isoToDateFormatter(multa.fechaHora),
                multa.numeroPlaca,
                "CRC " + multa.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 }),
                multa.estado === 1 ? 'Pendiente' : multa.estado === 2 ? 'En disputa' : 'Pagada'
            ]),
            startY: 30,
        });
    
        // Agregar la tabla de estado de las multas
        doc.autoTable({
            head: [['Estado', 'Cantidad', 'Porcentaje']],
            body: [
                ['Pendiente', multasFiltradas.filter(multa => multa.estado === 1).length, `${porcentajePendientes.toFixed(2)}%`],
                ['En disputa', multasFiltradas.filter(multa => multa.estado === 2).length, `${porcentajeEnDisputa.toFixed(2)}%`],
                ['Pagada', multasFiltradas.filter(multa => multa.estado === 3).length, `${porcentajePagadas.toFixed(2)}%`]
            ],
            startY: doc.autoTable.previous.finalY + 10, // Ajusta la posición de la siguiente tabla
        });
    
        // Convertir los gráficos a imágenes base64
        const chartPieCanvas = document.querySelector('#chart-pie canvas');
        const chartLineCanvas = document.querySelector('#chart-line canvas');
    
        if (chartPieCanvas && chartLineCanvas) {
            const pieImage = chartPieCanvas.toDataURL('image/png');
            const lineImage = chartLineCanvas.toDataURL('image/png');
    
            // Agregar los gráficos al PDF
            doc.addImage(pieImage, 'PNG', 14, doc.autoTable.previous.finalY + 10, 140, 50); // Pie chart 
            doc.addImage(lineImage, 'PNG', 14, doc.autoTable.previous.finalY + 65, 140, 80); // Line chart 
        }
    
        // Descargar el archivo PDF
        doc.save("informe_multas.pdf");
    };
    

    // Datos para los gráficos
    const pendientes = multasFiltradas.filter(multa => multa.estado === 1).length;
    const enDisputa = multasFiltradas.filter(multa => multa.estado === 2).length;
    const pagadas = multasFiltradas.filter(multa => multa.estado === 3).length;
    const totalMultas = pendientes + enDisputa + pagadas;

    const porcentajePendientes = (pendientes / totalMultas) * 100;
    const porcentajeEnDisputa = (enDisputa / totalMultas) * 100;
    const porcentajePagadas = (pagadas / totalMultas) * 100;

    const chartData = {
        labels: ['Pendientes', 'En Disputa', 'Pagadas'],
        datasets: [
            {
                label: 'Porcentaje de Multas por Estado',
                data: [porcentajePendientes, porcentajeEnDisputa, porcentajePagadas],
                backgroundColor: ['#ffcc00', '#00bcd4', '#181D23'],
                // Habilitar la visualización de porcentajes en el gráfico
                hoverOffset: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`; // Muestra el porcentaje en el tooltip
                    },
                },
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${percentage}%`; // Muestra el porcentaje dentro del gráfico
                },
                color: '#fff',
            },
        },
        maintainAspectRatio: false, // Para que el gráfico no se estire demasiado
    };

    // Datos para el gráfico lineal (porcentajes por estado)
    const lineChartData = {
        labels: ['Pendiente', 'En Disputa', 'Pagada'],
        datasets: [
            {
                label: 'Porcentaje de Estados de Multas',
                data: [porcentajePendientes, porcentajeEnDisputa, porcentajePagadas],
                fill: false,
                borderColor: '#181D23',
                tension: 0.1,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true, // Hace que el gráfico sea responsivo
        maintainAspectRatio: true, // Mantiene la relación de aspecto
        aspectRatio: 1, // Relación de aspecto 1:1 (ancho igual a alto)
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Para asegurarnos de que el eje Y siempre llega a 100%
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                    },
                },
            },
        },
    };
    

    return (
        <div className="dashboard-user">
            <header>
                <UsuarioNavbar />
            </header>

            <div className="dashboard-contenedor">
                <h1>Dashboard de Multas</h1>

                {/* Filtros de Búsqueda */}
                <div className="filtro-container-dashboard">
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

                {/* Tabla de multas */}
                <div className="contenedor-tabla">
                    <h3>Multas</h3>
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>ID Multa</th>
                                <th>Fecha / Hora</th>
                                <th>Vehículo</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {multasActuales.map(multa => (
                                <tr key={multa.idMulta}>
                                    <td>{formatId(multa.idMulta)}</td>
                                    <td>{isoToDateFormatter(multa.fechaHora)}</td>
                                    <td>{multa.numeroPlaca}</td>
                                    <td>{formatCurrency(multa.montoTotal)}</td>
                                    <td>{multa.estado === 1 ? 'Pendiente' : multa.estado === 2 ? 'En disputa' : 'Pagada'}</td>
                                </tr>
                            ))}
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
                                <th>Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pendiente</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 1).length}</td>
                                <td>{porcentajePendientes.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>En disputa</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 2).length}</td>
                                <td>{porcentajeEnDisputa.toFixed(2)}%</td>
                            </tr>
                            <tr>
                                <td>Pagada</td>
                                <td>{multasFiltradas.filter(multa => multa.estado === 3).length}</td>
                                <td>{porcentajePagadas.toFixed(2)}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Contenedor de gráficos centrado */}
                <div className="chart-row">
                    <div className="chart-container" id="chart-pie">
                        <Chart type="pie" data={chartData} options={chartOptions} height={250} />
                    </div>
                    <div className="chart-container" id="chart-line">
                        <Chart type="line" data={lineChartData} options={lineChartOptions} height={250} />
                    </div>
                </div>

                {multasFiltradas.length > 0 && (
                    <Paginador
                        totalPaginas={totalPaginas}
                        paginaActual={paginaActual}
                        cambiarPagina={cambiarPagina}
                    />
                )}

                {/* Botón para exportar el PDF */}
                <div className="contenedor-boton">
                    <Button 
                        className="button" 
                        type="button" 
                        variant="primary" 
                        size="small" 
                        onClick={exportarPDF} 
                        text="Descargar Informe PDF"
                    />
                </div>
                {error && <div className="error">{error}</div>}
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default DashboardUser;
