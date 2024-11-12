import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Button from "../../../atoms/Button";
import Footer from "../../../layouts/Footer";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import ButtonLink from "../../../atoms/ButtonLink";
import "./infraccion.css";
import { createInfraccion, getInfracciones, updateInfraccion, cambiarEstadoInfraccion } from "../../../../services/infraccionService";

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
  const [ocultarBtnEliminar, setOcultarBtn] = useState(false);
 
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

  //Hace tabla dinamica
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
      setOcultarBtn(false);
    } else {
      setInfraccionSeleccionada(null);
      setNuevaInfraccion({ idInfraccion: '', titulo: '', articulo: '', monto: '', descripcion: '' });
      setOcultarBtn(true);
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
      updateInfraccion(nuevaInfraccion.idInfraccion, nuevaInfraccion).then((result) => {
        setNuevaInfraccion({ ...nuevaInfraccion });
        alert("Infracción actualizada");
      });
    } else {
      const { idInfraccion, ...infraccionSinId } = nuevaInfraccion;
      createInfraccion(infraccionSinId).then((result) => {
        setNuevaInfraccion({ ...nuevaInfraccion });
        alert("Infracción creada");
      });
    }
    cerrarModal();
  };

  const handleEliminarInfraccion = () => {
    cambiarEstadoInfraccion(infraccionSeleccionada.idInfraccion, 0).then((result) => {  
      alert("Infracción eliminada");
    });
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
                <th>Artículo</th>
                <th>Infracción</th>
                <th>Monto</th>
                <th></th> {/* Columna para el botón de editar */}
              </tr>
            </thead>
            <tbody>
              {InfraccionesActuales?.map((infraccion) => (
                <tr key={infraccion.idInfraccion}>
                  <td>{infraccion.articulo}</td>
                  <td>{infraccion.titulo}</td>
                  <td>{`₡${infraccion.monto}`}</td>
                  <td>
                    <Button variant="secondary" size="small" text="Editar" onClick={() => abrirModal(infraccion)} />
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

        <div className="botones-infraccion">
          <ButtonLink variant="outline" text="Regresar" to="/inicio-admin" />
          <Button variant="alternative" text="Crear Infracción" onClick={() => abrirModal(null)} />
        </div>

        <Modal
          className="modal-crear-infraccion"
          isOpen={modalIsOpen}
          onRequestClose={cerrarModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <button onClick={cerrarModal} className="cerrar">X</button>
          <h2>{infraccionSeleccionada ? 'Editar Infracción' : 'Crear Infracción'}</h2>
          <form>
            <div className="filas">
              <label>Nombre de la Infracción:</label>
              <input
                type="text"
                name="titulo"
                value={nuevaInfraccion.titulo}
                onChange={handleChange}
              />
            </div>

            <div className="filas">
              <label>Artículo:</label>
              <input
                type="text"
                name="articulo"
                value={nuevaInfraccion.articulo}
                onChange={handleChange}
              />
            </div>
            <div className="filas">
              <label>Monto:</label>
              <input
                type="text"
                name="monto"
                value={nuevaInfraccion.monto}
                onChange={handleChange}
                placeholder="₡0.00"
              />
            </div>
            <div className="filas">
              <label>Descripción:</label>
              <input
                type="text"
                name="descripcion"
                value={nuevaInfraccion.descripcion}
                onChange={handleChange}
              />
            </div>
          </form>

          <div className="botones-modal">
            <Button variant="alternative" size="medium" text="Guardar Cambios" onClick={handleGuardarInfraccion} />
            {!ocultarBtnEliminar && (<Button variant="danger" text="Eliminar Infracción" onClick={handleEliminarInfraccion} />)}
          </div>
        </Modal>


      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Infracciones;
