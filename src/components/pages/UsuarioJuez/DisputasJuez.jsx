import React, { useState } from 'react';
import './DisputasJuez.css';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import FiltroInput from '../../layouts/FiltroInput.jsx';
import '@fortawesome/fontawesome-free/css/all.css';
import Paginador from '../../layouts/Paginador.jsx';

const Disputas = () => {

 // Estados para filtros y paginación
 const [filtro, setFiltro] = useState('');
 const [paginaActual, setPaginaActual] = useState(1);
 const elementosPorPagina = 10;


  // Datos de disputa (quemados) - esto tiene que venir de la base de datos
  const disputas = [
      { id: '1234', vehiculo: 'ABC123', fecha: '03/02/2024', estado: 'Pendiente' },
      { id: '5678', vehiculo: 'DEF456', fecha: '04/03/2024', estado: 'Resuelto' },
      { id: '9101', vehiculo: 'GHI789', fecha: '05/04/2024', estado: 'Pendiente' },
      // Agrega más datos según sea necesario
  ];

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
                    <FiltroInput placeholder="Filtrar"/>
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
                            <tr>
                                <td>1234</td>
                                <td>ABC123</td>
                                <td>03/02/2024</td>
                                <td>Pendiente</td>
                                <td className="buttonLink"><ButtonLink variant= "secondary" size="medium" text="Resolver disputa" /></td>
                            </tr>
                            <tr>
                                <td>5678</td>
                                <td>ABC123</td>
                                <td>03/02/2024</td>
                                <td>Pendiente declaración de oficial</td>
                                <td className="buttonLink"><ButtonLink variant= "secondary" size="medium" text="Resolver disputa" /></td>
                            </tr>
                            <tr>
                                <td>9101</td>
                                <td>ABC123</td>
                                <td>03/02/2024</td>
                                <td>Resuelto</td>
                                <td className="buttonLink"><ButtonLink variant= "secondary" size="medium" text="Resolver disputa" /></td>
                            </tr>
                            <tr>
                                <td>1213</td>
                                <td>ABC123</td>
                                <td>03/02/2024</td>
                                <td>Resuelto</td>
                                <td className="buttonLink"><ButtonLink variant= "secondary" size="medium" text="Resolver disputa" /></td>
                            </tr>
                            <tr>
                                <td>1415</td>
                                <td>ABC123</td>
                                <td>03/02/2024</td>
                                <td>Pendiente declaración de oficial</td>
                                <td className="buttonLink"><ButtonLink variant= "secondary" size="medium" text="Resolver disputa" /></td>
                            </tr>
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
