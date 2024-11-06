

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Button from "../../../atoms/Button";
import Footer from "../../../layouts/Footer";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import ButtonLink from "../../../atoms/ButtonLink";
import "./infraccion.css";
import { createInfraccion, getInfracciones, updateInfraccion } from "../../../../services/infraccionService";

// const infraccionesIniciales = [
//   { id: '1', titulo: 'Exceso de velocidad', articulo: 'A-1', monto: '500.00', descripcion: 'Conducir a una velocidad mayor a la permitida' },  
//   { id: '2', titulo: 'Conducir sin licencia', articulo: 'A-2', monto: '1000.00', descripcion: 'Conducir un vehículo sin tener la licencia correspondiente' },
//   { id: '3', titulo: 'Estacionamiento indebido', articulo: 'A-3', monto: '200.00', descripcion: 'Estacionar en lugares prohibidos' },
//   { id: '4', titulo: 'Pasar en rojo', articulo: 'A-4', monto: '500.00', descripcion: 'Pasar un semáforo en rojo' },
//   { id: '5', titulo: 'Conducir en estado de ebriedad', articulo: 'A-5', monto: '1000.00', descripcion: 'Conducir un vehículo bajo los efectos del alcohol' },
//   // Puedes agregar más infracciones aquí
// ];

const Infracciones = () => {
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [infraccionSeleccionada, setInfraccionSeleccionada] = useState(null);
  const [infraccionesIniciales, setInfracciones] = useState([]);
  const [error, setError] = useState(null);
  const [nuevaInfraccion, setNuevaInfraccion] = useState({
    idInfraccion: '',
    titulo: '',
    articulo: '',
    monto: '',
    descripcion: ''
  });
  const elementosPorPagina = 10;
 
  useEffect(() => {
    getInfracciones()
    .then((data) => {
        setInfracciones(data);
    })
    .catch((error) => {
        setError(`Error: ${error.message}`);
    });
}, [!modalIsOpen]);

  const infraccionesFiltradas = infraccionesIniciales?.filter(infraccion =>
    infraccion.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
    infraccion.idInfraccion.toString().includes(filtro)
  );

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const InfraccionesActuales = infraccionesFiltradas?.slice(indicePrimerElemento, indiceUltimoElemento);
  const totalPaginas = Math.ceil(infraccionesFiltradas?.length / elementosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const abrirModal = (infraccion) => {
    if (infraccion) {
      setInfraccionSeleccionada(infraccion);
      setNuevaInfraccion(infraccion);
    } else {
      setInfraccionSeleccionada(null);
      setNuevaInfraccion({ idInfraccion: '', titulo: '', articulo: '', monto: '', descripcion: '' });
    }
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setInfraccionSeleccionada(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaInfraccion({ ...nuevaInfraccion, [name]: value });
  };

  const handleGuardarInfraccion = () => {
    if (infraccionSeleccionada) {
      // Editar infracción existente
      console.log(nuevaInfraccion);
      updateInfraccion(nuevaInfraccion.idInfraccion, nuevaInfraccion).then((result) => {
        setNuevaInfraccion({ ...nuevaInfraccion });
      });
    } else {
      // Crear nueva infracción
      const { idInfraccion, ...infraccionSinId } = nuevaInfraccion;
      createInfraccion(infraccionSinId).then((result) => {
        setNuevaInfraccion({ ...nuevaInfraccion });
      });
    }
    cerrarModal();
  };

  const handleEliminarInfraccion = () => {
    const infraccionesActualizadas = infraccionesIniciales?.filter(infraccion =>
      infraccion.idInfraccion !== infraccionSeleccionada.idInfraccion
    );
    infraccionesIniciales = infraccionesActualizadas;
    cerrarModal();
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
              {InfraccionesActuales?.map((infraccion) => (
                <tr key={infraccion.idInfraccion}>
                  <td>{infraccion.titulo}</td>
                  <td>
                    <Button variant="primary" text="Editar Infracción" onClick={() => abrirModal(infraccion)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginador
          elementosPorPagina={elementosPorPagina}
          totalElementos={infraccionesFiltradas?.length}
          cambiarPagina={cambiarPagina}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
        />
        <ButtonLink variant="outline" text="Regresar" to="/inicio-admin" />
        <Button variant="alternative" text="Crear Infracción" onClick={() => abrirModal(null)} />
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={cerrarModal}
          style={{
            content: {
              top: '10%',
              left: '10%',
              right: '10%',
              bottom: '10%',
            },
          }}
        >
          <button onClick={cerrarModal} style={{ float: 'right' }}>X</button>
          <h2>{infraccionSeleccionada ? 'Editar Infracción' : 'Crear Infracción'}</h2>
          <div>
            <label>Nombre de la Infracción:</label>
            <input
              type="text"
              name="titulo"
              value={nuevaInfraccion.titulo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Artículo:</label>
            <input
              type="text"
              name="articulo"
              value={nuevaInfraccion.articulo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Monto:</label>
            <input
              type="text"
              name="monto"
              value={nuevaInfraccion.monto}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              name="descripcion"
              value={nuevaInfraccion.descripcion}
              onChange={handleChange}
            />
          </div>
          <Button variant="alternative" text="Guardar Cambios" onClick={handleGuardarInfraccion} />
          {infraccionSeleccionada && (
            <Button variant="danger" text="Eliminar Infracción" onClick={handleEliminarInfraccion} />
          )}
        </Modal>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Infracciones;

