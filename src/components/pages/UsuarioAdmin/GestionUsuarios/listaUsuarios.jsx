import "@fortawesome/fontawesome-free/css/all.css";
import "./listaUsuarios.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsuarios,
  updateUsuario,
  deleteUsuario,
} from "../../../../services/usuarioService";
import { getRoles, asignarRolAUsuario, deleteRolDeUsuario } from "../../../../services/rolService";
import { formatFechaNacimiento } from "../../../../utils/dateUtils";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Footer from "../../../layouts/Footer";
import Paginador from "../../../layouts/Paginador";
import Modal from "react-modal";
import ButtonLink from "../../../atoms/ButtonLink";
import Button from "../../../atoms/Button";
import FormAdminCrearUsuario from "../../../organism/FormAdminCrearUsuario";
import FiltroInput from "../../../layouts/FiltroInput";

const ListaUsuarios = () => {
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const elementosPorPagina = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
    Modal.setAppElement("#root");
  }, [modalIsOpen]);

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.cedula.includes(filtro) ||
      `${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`
        .toLowerCase()
        .includes(filtro.toLowerCase()) ||
      usuario.roles?.some((role) =>
        role.toLowerCase().includes(filtro.toLowerCase())
      ) ||
      (usuario.estado ? "activo" : "inactivo").includes(filtro.toLowerCase())
  );

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const usuariosActuales = usuariosFiltrados.slice(
    indicePrimerElemento,
    indiceUltimoElemento
  );
  const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const abrirModal = (usuario = null) => {
    setIsEditing(!!usuario);
    setUsuarioSeleccionado(
      usuario || {
        cedula: "",
        nombre: "",
        apellido1: "",
        apellido2: "",
        fechaNacimiento: "",
        telefono: "",
        roleName: "",
        estado: true,
      }
    );
    setModalIsOpen(true);
  };

  const cerrarModal = () => {
    setModalIsOpen(false);
    setTimeout(() => {
      setUsuarioSeleccionado(null);
    }, 300); // Espera un momento para limpiar el estado
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    const usuarioData = {
      idUsuario: usuarioSeleccionado.idUsuario,
      cedula: usuarioSeleccionado.cedula,
      nombre: usuarioSeleccionado.nombre,
      apellido1: usuarioSeleccionado.apellido1,
      apellido2: usuarioSeleccionado.apellido2 || null,
      email: usuarioSeleccionado.email,
      fechaNacimiento: formatFechaNacimiento(
        usuarioSeleccionado.fechaNacimiento
      ),
      telefono: usuarioSeleccionado.telefono,
      fotoPerfil: usuarioSeleccionado.fotoPerfil || null,
    };

    try {
      await updateUsuario(usuarioSeleccionado.idUsuario, usuarioData);
      alert("Usuario actualizado con éxito");
      cerrarModal();
      await fetchUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      alert("Error al actualizar el usuario");
    }
  };

  const handleEliminarUsuario = async (usuarioId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await deleteUsuario(usuarioId);
        alert("Usuario eliminado exitosamente.");
        await fetchUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert(
          "Hubo un problema al intentar eliminar el usuario. Puede que ya haya sido eliminado."
        );
      }
    }
  };

  return (
    <div className="pagina-usuarios-registro">
      <header>
        <AdminNavbar />
      </header>
      <main className="main-content-usuarios">
        <h1>Lista de Usuarios</h1>
        <div className="filtro-container-usuarios">
          <FiltroInput
            placeholder="Filtrar"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div>
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>
        <div className="lista-usuarios-tabla">
          <table className="tabla-general-usuarios">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre Completo</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosActuales.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.cedula}</td>
                  <td>{`${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.roles?.join(", ") || "Sin rol"}</td>
                  <td>{usuario.estado ? "Activo" : "Inactivo"}</td>
                  <td className="botones-accion">
                    <Button
                      variant="primary"
                      size="small"
                      text="Editar"
                      onClick={() => abrirModal(usuario)}
                    />
                    <Button
                      variant="danger"
                      size="small"
                      text="Eliminar"
                      onClick={() => handleEliminarUsuario(usuario.idUsuario)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginador
          elementosPorPagina={elementosPorPagina}
          totalElementos={usuariosFiltrados.length}
          cambiarPagina={cambiarPagina}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
        />
        <div className="botones-usuarios">
          <ButtonLink variant="primary" text="Regresar" to="/inicio-admin" />
          <Button
            variant="secondary"
            text="Crear Usuario"
            onClick={() => abrirModal(null)}
          />
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={cerrarModal}
          className="modal-usuarios"
        >
          <button onClick={cerrarModal} className="cerrar">
            X
          </button>
          <h2>{isEditing ? "Editar Usuario" : "Crear Usuario"}</h2>
          {isEditing ? (
            <form onSubmit={handleGuardarCambios}>
              <div className="filas">
                <label>Cédula</label>
                <input
                  type="text"
                  value={usuarioSeleccionado?.cedula || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      cedula: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="filas">
                <label>Nombre</label>
                <input
                  type="text"
                  value={usuarioSeleccionado?.nombre || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="filas">
                <label>Apellido 1</label>
                <input
                  type="text"
                  value={usuarioSeleccionado?.apellido1 || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      apellido1: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="filas">
                <label>Apellido 2</label>
                <input
                  type="text"
                  value={usuarioSeleccionado?.apellido2 || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      apellido2: e.target.value,
                    })
                  }
                />
              </div>
              <div className="filas">
                <label>Correo</label>
                <input
                  type="email"
                  value={usuarioSeleccionado?.email || ""}
                  readOnly
                />
              </div>
              <div className="filas">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={usuarioSeleccionado?.fechaNacimiento || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      fechaNacimiento: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="filas">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={usuarioSeleccionado?.telefono || ""}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      telefono: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="filas">
                <label>Estado</label>
                <select
                  value={usuarioSeleccionado?.estado ? "Activo" : "Inactivo"}
                  onChange={(e) =>
                    setUsuarioSeleccionado({
                      ...usuarioSeleccionado,
                      estado: e.target.value === "Activo",
                    })
                  }
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="filas">
              <label>Rol</label>
                    <select
                    value=""
                    onChange={async (e) => {
                        try {
                        const rolId = e.target.value;
                        await asignarRolAUsuario(usuarioSeleccionado.idUsuario, rolId);
                        alert("Rol asignado exitosamente.");
                        fetchUsuarios(); // Actualizar la lista de usuarios
                        } catch (error) {
                        alert("Error al asignar el rol.");
                        }
                    }}
                    >
                    <option value="">Seleccionar rol</option>
                    {roles.map((rol) => (
                        <option key={rol.idRol} value={rol.idRol}>
                        {rol.nombreRol}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="filas">
                <label>Eliminar Rol</label>
    <select
      defaultValue=""
      onChange={async (e) => {
        const rolId = e.target.value;
        if (!rolId) {
          alert("Selecciona un rol válido para eliminar.");
          return;
        }
        try {
          await deleteRolDeUsuario(usuarioSeleccionado.idUsuario, rolId);
          alert("Rol eliminado exitosamente.");
          fetchUsuarios(); // Actualizar la lista de usuarios
        } catch (error) {
          console.error("Error al eliminar el rol:", error);
          alert("Error al eliminar el rol.");
        }
      }}
    >
      <option value="">Seleccionar rol para eliminar</option>
      {usuarioSeleccionado.roles?.map((rol) => (
        <option key={rol.idRol} value={rol.idRol}>
          {rol.nombreRol}
        </option>
      ))}
    </select>
</div>
              <div className="botones-modal">
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  text="Guardar Cambios"
                />
              </div>
            </form>
          ) : (
            <FormAdminCrearUsuario
              usuario={usuarioSeleccionado}
              onChange={(field, value) =>
                setUsuarioSeleccionado({
                  ...usuarioSeleccionado,
                  [field]: value,
                })
              }
              roles={roles}
              onSuccess={() => {
                fetchUsuarios();
                cerrarModal();
              }}
            />
          )}
        </Modal>
      </main>
      <footer className="footer-usuarios">
        <Footer />
      </footer>
    </div>
  );
};

export default ListaUsuarios;
