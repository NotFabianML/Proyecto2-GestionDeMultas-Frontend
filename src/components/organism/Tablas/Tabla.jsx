import React, { useState } from 'react';
import './Tabla.css';  // Asegúrate de que el archivo CSS esté importado

const MultasTabla = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const multas = [
      // Datos de ejemplo, los puedes personalizar según tu aplicación
      { id: 1, fechaEmision: '2024-09-30', fechaCancelacion: '2024-10-07', tipoInfraccion: 'Exceso de velocidad', estado: 'Pagada' },
      { id: 2, fechaEmision: '2024-10-01', fechaCancelacion: '2024-10-08', tipoInfraccion: 'Conducir sin licencia', estado: 'Pagada' },
      // Agrega más multas según sea necesario...
    ];

    const multasFiltradas = multas.filter(multa =>
      multa.id.toString().includes(filtro)
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const multasActuales = multasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(multasFiltradas.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
      setPaginaActual(numeroPagina);
    };

    return (
        <div>
            <h1>Tabla General</h1>
            <div className="filtro-container">
                <input 
                    placeholder="Filtrar" 
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)} 
                />
                <div><i className="fas fa-search search-icon"></i></div>
            </div>
            <div className="lista-multas">
                <table className="tabla-general"> {/* Aplica la clase de estilo aquí */}
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
                        {multasActuales.map((multa) => (
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
                {/* Aquí agregarías el paginador si es necesario */}
            </div>
        </div>
    );
};

export default MultasTabla;
