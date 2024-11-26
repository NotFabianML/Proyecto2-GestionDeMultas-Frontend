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
import { getPermisos, getPermisosPorRolNombre, asignarPermisoARol, deletePermisoDeRol  } from "../../../../services/permisoService";
import "./roles.css";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [nuevoRol, setNuevoRol] = useState("");
  const [descripcionRol, setDescripcionRol] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [permisosAsignados, setPermisosAsignados] = useState([]);
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

  const abrirModal = async (rol = null) => {
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
    try {
      // Obtener todos los permisos disponibles
      const todosLosPermisos = await getPermisos();
      setPermisosDisponibles(todosLosPermisos);

      // Obtener permisos asignados al rol si está en modo edición
      if (rol) {
        const permisosAsignados = await getPermisosPorRolNombre(rol.nombreRol);
        setPermisosAsignados(permisosAsignados);
      } else {
        setPermisosAsignados([]);
      }
    } catch (error) {
      console.error("Error al cargar permisos:", error);
    }
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setPermisosDisponibles([]);
    setPermisosAsignados([]);
  };
  const agregarPermiso = async (permisoId) => {
    if (!rolSeleccionado) {
      alert("Primero debe guardar el rol antes de asignarle permisos.");
      return;
    }
    try {
      await asignarPermisoARol(rolSeleccionado.idRol, permisoId);
      const permisoAgregado = permisosDisponibles.find((p) => p.idPermiso === permisoId);
      setPermisosAsignados((prev) => [...prev, permisoAgregado]);
      setPermisosDisponibles((prev) => prev.filter((p) => p.idPermiso !== permisoId));
    } catch (error) {
      console.error("Error al asignar permiso:", error);
      alert("Error al asignar permiso.");
    }
  };

  const eliminarPermiso = async (permisoId) => {
    if (!rolSeleccionado) {
      alert("Primero debe guardar el rol antes de eliminar permisos.");
      return;
    }
    try {
      await deletePermisoDeRol(rolSeleccionado.idRol, permisoId);
      const permisoEliminado = permisosAsignados.find((p) => p.idPermiso === permisoId);
      setPermisosDisponibles((prev) => [...prev, permisoEliminado]);
      setPermisosAsignados((prev) => prev.filter((p) => p.idPermiso !== permisoId));
    } catch (error) {
      console.error("Error al eliminar permiso:", error);
      alert("Error al eliminar permiso.");
    }
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
    <div id="roles">
      <header>
        <AdminNavbar />
      </header>
      <main id="roles-main">
        <h1>Gestión de Roles</h1>
        <div className="roles-filtro-container">
          <FiltroInput
            placeholder="Filtrar roles"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="roles-lista-roles">
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
                      variant="secondary"
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
        <div className="roles-espaciado-botones">
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
            <label className="roles-nombre-rol-label">Nombre del Rol:</label>
            <input
              type="text"
              value={nuevoRol}
              onChange={(e) => setNuevoRol(e.target.value)}
            />
          </div>
          <div>
            <label className="roles-descripcion-rol-label">Descripción del Rol:</label>
            <input
              type="text"
              value={descripcionRol}
              onChange={(e) => setDescripcionRol(e.target.value)}
            />
          </div>
          <div className="roles-permisos-container">
            <h3>Permisos Asignados</h3>
            <ul>
              {permisosAsignados.map((permiso) => (
                <li key={permiso.idPermiso}>
                  {permiso.nombrePermiso}
                  <Button
                    variant="danger"
                    text="Eliminar"
                    onClick={() => eliminarPermiso(permiso.idPermiso)}
                  />
                </li>
              ))}
            </ul>
            <h3>Permisos Disponibles</h3>
            <ul>
              {permisosDisponibles
                .filter(
                  (permisoDisponible) =>
                    !permisosAsignados.some(
                      (permisoAsignado) =>
                        permisoAsignado.idPermiso === permisoDisponible.idPermiso
                    )
                )
                .map((permiso) => (
                  <li key={permiso.idPermiso}>
                    {permiso.nombrePermiso}
                    <Button
                      variant="primary"
                      text="Agregar"
                      onClick={() => agregarPermiso(permiso.idPermiso)}
                    />
                  </li>
                ))}
            </ul>
          </div>

          <Button
            className="roles-guardar-rol-btn"
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

