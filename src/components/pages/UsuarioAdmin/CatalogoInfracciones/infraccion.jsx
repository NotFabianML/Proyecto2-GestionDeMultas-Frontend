import React, { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import FiltroInput from "../../../layouts/FiltroInput";
import ButtonLink from "../../../atoms/ButtonLink";
import Footer from "../../../layouts/Footer";
import Paginador from "../../../layouts/Paginador";
import Button from "../../../atoms/Button";

const Infracciones = () => {
  const handleClick = () => {
    alert("Botón clickeado");
  };
  
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;

  const infracciones = [
    { id: '1', infraccion: 'Exceso de velocidad' },
    { id: '2', infraccion: 'Conducir sin licencia' },
    { id: '3', infraccion: 'Estacionamiento indebido' },
    { id: '4', infraccion: 'Pasar en rojo' },
    // Puedes agregar más infracciones aquí
  ];

  const infraccionesFiltradas = infracciones.filter(infraccion =>
    infraccion.infraccion.toLowerCase().includes(filtro.toLowerCase()) ||
    infraccion.id.toString().includes(filtro)
  );

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const InfraccionesActuales = infraccionesFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);
  const totalPaginas = Math.ceil(infraccionesFiltradas.length / elementosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <h1>Lista de Infracciones</h1>
        <div className="filtro-container">
          <FiltroInput 
            placeholder="Filtrar" 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)} 
          />
          <div><i className="fas fa-search search-icon"></i></div>
        </div>
        <div className="lista-infracciones">
          <table>
            <thead>
              <tr>
                <th>Infracción</th>
              </tr>
            </thead>
            <tbody>
              {InfraccionesActuales.map((infraccion) => (
                <tr key={infraccion.id}>
                  <td>{infraccion.infraccion}</td>
                  <td>
                    <Button variant="primary" text="Editar Infracción" onClick={handleClick} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginador
          elementosPorPagina={elementosPorPagina}
          totalElementos={infraccionesFiltradas.length}
          cambiarPagina={cambiarPagina}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
        />
        <ButtonLink variant="outline" text="Regresar" to="/InicioAdmin" />
        <Button variant="alternative" text="Crear Infracción" onClick={handleClick} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Infracciones;