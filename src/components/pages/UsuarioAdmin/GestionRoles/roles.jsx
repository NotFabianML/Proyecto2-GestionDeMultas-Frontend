import React from "react";
import '@fortawesome/fontawesome-free/css/all.css';
import { useState } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import FiltroInput from "../../../layouts/FiltroInput";
import ButtonLink from "../../../atoms/ButtonLink";
import Footer from "../../../layouts/Footer";
import Paginador from "../../../layouts/Paginador";
import Button from "../../../atoms/Button";
import Modal from 'react-modal';
import './roles.css'; 

const Roles = () => {
  const handleClick = () => {
    alert("Boton clickeado");
  };
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 10;
  const roles = [
    { id: '1', rol: 'Administrador' },
    { id: '2', rol: 'Juez' },
    { id: '3', rol: 'UsuarioNormal' },
    { id: '4', rol: 'Oficial' },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoRol, setNuevoRol] = useState('');
  const [permisos, setPermisos] = useState({
    permiso1: false,
    permiso2: false,
    permiso3: false,
    permiso4: false,
    permiso5: false,
    permiso6: false,
  });
  const abrirModal = () => {
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const handlePermisoChange = (permiso) => {
    setPermisos({ ...permisos, [permiso]: !permisos[permiso] });
  };

  const handleGuardarRol = () => {
    roles.push({ id: (roles.length + 1).toString(), rol: nuevoRol });
    cerrarModal();
  };

  const rolesFiltrados = roles.filter(rol =>
    rol.rol.toLowerCase().includes(filtro.toLowerCase()) ||
    rol.id.toString().includes(filtro)
  );

  // Calcular los índices de la página actual
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const RolesActuales = rolesFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);
  const totalPaginas = Math.ceil(rolesFiltrados.length / elementosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <h1>Lista de Roles</h1>
        <div className="filtro-container">
          <FiltroInput 
            placeholder="Filtrar" 
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)} 
          />
          <div><i className="fas fa-search search-icon"></i></div>
        </div>
        <div className="lista-roles">
          <table>
            <thead>
              <tr>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {RolesActuales.map((rol) => (
                <tr key={rol.id}>
                  <td>{rol.rol}</td>
                  <td>
                    <Button variant="primary" text="Editar" onClick={handleClick} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginador
          elementosPorPagina={elementosPorPagina}
          totalElementos={rolesFiltrados.length}
          cambiarPagina={cambiarPagina}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
        />
        <div className="espaciado-botones">
          <ButtonLink variant="secondary" text="Regresar" to="/inicio-admin" />
          <Button className="crear-rol-btn" variant="primary" text="Crear Rol" onClick={abrirModal} />
        </div>

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
          <h2>Crear Nuevo Rol</h2>
          <div>
            <label className="nombre-rol-label">Nombre del Rol:</label>
            <input
              type="text"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            />
          </div>
          <div className="permisos-container">
            <h3>Permisos</h3>
            {Object.keys(permisos).map((permiso, index) => (
              <div key={index}>
                <label className="permiso-label">{`Permiso ${index + 1}`}</label>
                <input
                  type="checkbox"
                  checked={permisos[permiso]}
                  onChange={() => handlePermisoChange(permiso)}
                />
              </div>
            ))}
          </div>
          <Button className="guardar-rol-btn" variant="primary" size="medium" text="Guardar Rol" onClick={handleGuardarRol} />
        </Modal>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Roles;
