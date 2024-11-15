import React, { useState } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import Footer from "../../../layouts/Footer";
import ButtonLink from "../../../atoms/ButtonLink";
import './multasTabla.css'; 

const MultasTabla = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const multas = [
      { id: 30, fechaEmision: '2024-10-29', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 29, fechaEmision: '2024-10-28', fechaCancelacion: '2024-11-05', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 28, fechaEmision: '2024-10-27', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 27, fechaEmision: '2024-10-26', fechaCancelacion: '2024-11-03', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 26, fechaEmision: '2024-10-25', fechaCancelacion: '2024-11-01', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
      { id: 25, fechaEmision: '2024-10-24', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 24, fechaEmision: '2024-10-23', fechaCancelacion: '2024-10-31', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 23, fechaEmision: '2024-10-22', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 22, fechaEmision: '2024-10-21', fechaCancelacion: '2024-10-30', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 21, fechaEmision: '2024-10-20', fechaCancelacion: '2024-10-28', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
      { id: 20, fechaEmision: '2024-10-19', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 19, fechaEmision: '2024-10-18', fechaCancelacion: '2024-10-25', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 18, fechaEmision: '2024-10-17', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 17, fechaEmision: '2024-10-16', fechaCancelacion: '2024-10-23', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 16, fechaEmision: '2024-10-15', fechaCancelacion: '2024-10-22', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
      { id: 15, fechaEmision: '2024-10-14', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 14, fechaEmision: '2024-10-13', fechaCancelacion: '2024-10-19', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 13, fechaEmision: '2024-10-12', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 12, fechaEmision: '2024-10-11', fechaCancelacion: '2024-10-18', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 11, fechaEmision: '2024-10-10', fechaCancelacion: '2024-10-17', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
      { id: 10, fechaEmision: '2024-10-09', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 9, fechaEmision: '2024-10-08', fechaCancelacion: '2024-10-14', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 8, fechaEmision: '2024-10-07', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 7, fechaEmision: '2024-10-06', fechaCancelacion: '2024-10-13', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 6, fechaEmision: '2024-10-05', fechaCancelacion: '2024-10-12', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
      { id: 5, fechaEmision: '2024-10-04', fechaCancelacion: '-------------', tipoInfraccion: 'Exceso de velocidad', estado: 'Pendiente' },
      { id: 4, fechaEmision: '2024-10-03', fechaCancelacion: '2024-10-10', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      { id: 3, fechaEmision: '2024-10-02', fechaCancelacion: '-------------', tipoInfraccion: 'Estacionamiento indebido', estado: 'Pendiente' },
      { id: 2, fechaEmision: '2024-10-01', fechaCancelacion: '2024-10-08', tipoInfraccion: 'Pasar en rojo', estado: 'Pagada' },
      { id: 1, fechaEmision: '2024-09-30', fechaCancelacion: '2024-10-07', tipoInfraccion: 'No usar el cinturón de seguridad', estado: 'Pagada' },
    ];

    const multasFiltradas = multas.filter(multa =>
      multa.id.toString().includes(filtro)
    );

    const multasOrdenadas = multasFiltradas.sort((a, b) => b.id - a.id).slice(0, 20);

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const MultasActuales = multasOrdenadas.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(multasOrdenadas.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
      setPaginaActual(numeroPagina);
    };

    return (
        <div>
        <header>
            <AdminNavbar />
        </header>
        <main>
            <h1 className="titulo-multas-tabla">Lista de Multas</h1>
            <div className="filtro-container">
                <FiltroInput 
                    placeholder="Filtrar" 
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)} 
                />
                <div><i className="fas fa-search search-icon"></i></div>
            </div>
            <div className="lista-multas">
                <table className="tabla-general"> {/* Cambié la clase a tabla-general */}
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha de Emisión</th>
                            <th>Fecha de Cancelación</th>
                            <th>Tipo de Infracción</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MultasActuales.map((multa) => (
                            <tr key={multa.id}>
                                <td>{multa.id}</td>
                                <td>{multa.fechaEmision}</td>
                                <td>{multa.fechaCancelacion}</td>
                                <td>{multa.tipoInfraccion}</td>
                                <td>{multa.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginador 
                    elementosPorPagina={elementosPorPagina}
                    totalElementos={multasOrdenadas.length}
                    cambiarPagina={cambiarPagina}
                />
            </div>
            <div className="boton-container">
                <ButtonLink variant="primary" text="Regresar" to="/inicio-admin" />
                <ButtonLink variant="secondary" text="Visualizar Gráfico" to="/multas-grafico" />
            </div>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
    );
}

export default MultasTabla;
