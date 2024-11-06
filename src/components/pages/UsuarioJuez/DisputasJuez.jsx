import React, { useState, useEffect } from 'react';
import './DisputasJuez.css';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import FiltroInput from '../../layouts/FiltroInput.jsx';
import '@fortawesome/fontawesome-free/css/all.css';
import Paginador from '../../layouts/Paginador.jsx';

const Disputas = () => {
    // Estados para filtros y paginación

    const [disputas, setDisputas] = useState([]); 
    const [error, setError] = useState(null); 
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;



    useEffect(() => {
        // Llamada a la API
        fetch('https://localhost:7185/api/disputas')
          .then((response) => {
            if (!response.ok) {  // Verifica si la respuesta es correcta
              throw new Error(`Error en la respuesta: ${response.statusText}`);
            }
            return response.json();
          })
          .then((disputas) => {
            setDisputas(disputas);  // Guarda los datos en el estado
          })
          .catch((error) => {
            setError(error.message);  // Guarda el error en el estado
          });
      }, []);
    

    // Filtrar disputas en base a los filtros
    const disputasFiltradas = disputas.filter(disputa =>
        Object.values(disputa).some(value =>
            value.toString().toLowerCase().includes(filtro.toLowerCase())
        )
    );

    // Calcular los índices de la página actual
    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const disputasActuales = disputasFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);

    // Calcular el número total de páginas
    const totalPaginas = Math.ceil(disputasFiltradas.length / elementosPorPagina);

    // Cambiar de página
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="disputas-juez">
            <header>
                <JuezNavbar />
            </header>

            <main>
                <h1>Disputas asignadas</h1>

                {/* Componentes de Filtro */}
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
                            {disputasActuales.map((disputa) => (
                                <tr key={disputa.id}>
                                    <td>{disputa.id}</td>
                                    <td>{disputa.vehiculo}</td>
                                    <td>{disputa.fecha}</td>
                                    <td>{disputa.estado}</td>
                                    <td className="buttonLink">
                                        <ButtonLink to="/resolver-disputa"
                                            variant="secondary" 
                                            size="medium" 
                                            text="Resolver disputa" 
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Paginador 
                    totalPaginas={totalPaginas} 
                    paginaActual={paginaActual} 
                    cambiarPagina={cambiarPagina} 
                />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Disputas;
