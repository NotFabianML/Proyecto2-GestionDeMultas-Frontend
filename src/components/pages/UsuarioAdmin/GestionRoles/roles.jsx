import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import FiltroInput from "../../../layouts/FiltroInput";
import Button from "../../../atoms/Button";
import ButtonLink from "../../../atoms/ButtonLink";
import Modal from "react-modal";
import Paginador from "../../../layouts/Paginador";
import Footer from "../../../layouts/Footer";
import {
  getRoles,
  createRol,
  updateRol,
  deleteRol,
} from "../../../../services/rolService";
import "./roles.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoRol, setNuevoRol] = useState("");
  const [descripcionRol, setDescripcionRol] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const elementosPorPagina = 10;

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesObtenidos = await getRoles();
      setRoles(rolesObtenidos);
      console.log("Roles obtenidos:", rolesObtenidos);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const abrirModal = (rol = null) => {
    if (rol) {
      setRolSeleccionado(rol);
      setNuevoRol(rol.nombreRol);
      setDescripcionRol(rol.descripcion);
    } else {
      setRolSeleccionado(null);
      setNuevoRol("");
      setDescripcionRol("");
    }
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
  };

  const handleGuardarRol = async (e) => {
    e.preventDefault();
    try {
      if (rolSeleccionado) {
        // Actualizamos el rol con los valores correctos
        const rolData = { 
          IdRol: rolSeleccionado.idRol,  // Asegúrate de que el ID es correcto
          NombreRol: nuevoRol,  // Usamos `nuevoRol` que es el estado actualizado
          Descripcion: descripcionRol  // Usamos `descripcionRol` que es el estado actualizado
        };
        console.log("Rol Seleccionado: ", rolSeleccionado);
        // Si rolSeleccionado existe, se actualiza el rol
        console.log("Actualizando rol con id:", rolSeleccionado.idRol); 
        await updateRol(rolSeleccionado.idRol, rolData);  // Enviamos los datos correctos
        alert("Rol actualizado exitosamente.");
      } else {
        // Si no existe rolSeleccionado, se crea un nuevo rol
        await createRol({ nombreRol: nuevoRol, descripcion: descripcionRol });
        alert("Rol creado exitosamente.");
      }
      fetchRoles();  // Refresca los roles
      cerrarModal();  // Cierra el modal
    } catch (error) {
      console.error("Error al guardar el rol:", error);
      alert("Error al guardar el rol.");
    }
  };

  const handleEliminarRol = async (idRol) => {
    console.log("Eliminando rol con id:", idRol);
    try {
      await deleteRol(idRol);
      alert("Rol eliminado exitosamente.");
      fetchRoles();
    } catch (error) {
      console.error("Error al eliminar el rol:", error.response ? error.response.data : error.message);
      alert("Error al eliminar el rol.");
    }
  };

  const rolesFiltrados = roles.filter(
    (rol) =>
      rol.nombreRol.toLowerCase().includes(filtro.toLowerCase()) ||
      rol.idRol.toString().includes(filtro)
  );

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
        <h1>Gestión de Roles</h1>
        <div className="filtro-container">
          <FiltroInput
            placeholder="Filtrar roles"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="lista-roles">
          <table>
            <thead>
              <tr>
                <th>Rol</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {RolesActuales.map((rol) => (
                <tr key={rol.idRol}>
                  <td>{rol.nombreRol}</td>
                  <td>{rol.descripcion}</td>
                  <td>
                    <Button
                      variant="primary"
                      text="Editar"
                      onClick={() => abrirModal(rol)}
                    />
                    <Button
                      variant="danger"
                      text="Eliminar"
                      onClick={() => handleEliminarRol(rol.idRol)}
                    />
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
          <Button
            variant="primary"
            text="Crear Rol"
            onClick={() => abrirModal()}
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={cerrarModal}
          style={{
            content: {
              top: "10%",
              left: "10%",
              right: "10%",
              bottom: "10%",
            },
          }}
        >
          <h2>{rolSeleccionado ? "Editar Rol" : "Crear Nuevo Rol"}</h2>
          <div>
            <label className="nombre-rol-label">Nombre del Rol:</label>
            <input
              type="text"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            />
          </div>
          <div>
            <label className="descripcion-rol-label">Descripción del Rol:</label>
            <input
              type="text"
              value={descripcionRol}
              onChange={(e) => setDescripcionRol(e.target.value)}
            />
          </div>
          <Button
            className="guardar-rol-btn"
            variant="primary"
            text="Guardar"
            onClick={handleGuardarRol}
          />
        </Modal>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Roles;

