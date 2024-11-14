import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../../../services/usuarioService";
import { getRolesPorUsuario, asignarRolAUsuario } from "../../../../services/rolService";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Footer from "../../../layouts/Footer";
import Paginador from "../../../layouts/Paginador";
import ButtonLink from "../../../atoms/ButtonLink";
import Modal from "react-modal";
import '@fortawesome/fontawesome-free/css/all.css';
import './listaUsuarios.css';

const ListaUsuarios = () => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [rolesDisponibles, setRolesDisponibles] = useState([]);
    const [error, setError] = useState(null); // Para mostrar el error si falla la asignación de rol
    const elementosPorPagina = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await getUsuarios();
                setUsuarios(data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    // Función para obtener roles del usuario
    const fetchRolesPorUsuario = async (usuarioId) => {
        try {
            const roles = await getRolesPorUsuario(usuarioId);
            setRoles(roles);
        } catch (error) {
            console.error('Error al obtener roles del usuario:', error);
        }
    };

    // Obtener todos los roles disponibles al abrir el modal de cambio de rol
    const abrirModal = async (usuario) => {
        if (usuario) {
            setUsuarioSeleccionado(usuario);
            await fetchRolesPorUsuario(usuario.idUsuario);  // Obtener los roles actuales del usuario
            setRolesDisponibles([ // Asegúrate de reemplazar esto con una llamada real a tu backend
                { id: "1a1b-1234-4567-7890", nombreRol: "Admin" }, // Cambia estos por los IDs reales (Guid)
                { id: "2b2c-5678-9101-1123", nombreRol: "User" },
                { id: "3c3d-9012-3456-7890", nombreRol: "Guest" }
            ]);
        }
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
        setUsuarioSeleccionado(null);
        setError(null); // Limpiar el mensaje de error al cerrar el modal
    };

    const handleAsignarRol = async (rolId) => {
        try {
            await asignarRolAUsuario(usuarioSeleccionado.idUsuario, rolId);
            setRoles(rolesDisponibles.find((rol) => rol.id === rolId)); // Actualiza el rol asignado localmente
            cerrarModal();
        } catch (error) {
            setError("Error al asignar el rol. Por favor, intenta de nuevo."); // Mostrar error si ocurre
            console.error('Error al asignar el rol:', error);
        }
    };

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const usuariosActuales = usuarios.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="pagina-registro">
            <header>
                <AdminNavbar />
            </header>
            <main className="main-content">
                <h1>Lista de Usuarios</h1>
                <div className="lista-usuarios">
                    <table className="tabla-general">
                        <thead>
                            <tr>
                                <th>Foto de Perfil</th>
                                <th>Cédula</th>
                                <th>Nombre Completo</th>
                                <th>Estado</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosActuales.length > 0 ? (
                                usuariosActuales.map((usuario) => (
                                    <tr key={usuario.idUsuario}>
                                        <td>
                                            <img 
                                                src={usuario.fotoPerfil} 
                                                alt="Foto de Perfil" 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                            />
                                        </td>
                                        <td>{usuario.cedula}</td>
                                        <td>{`${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2}`}</td>
                                        <td>{usuario.estado}</td>
                                        <td>
                                            {roles.length > 0 && roles[0].nombreRol} {/* Mostrar el nombre del rol asignado */}
                                            <button onClick={() => abrirModal(usuario)}>Cambiar Rol</button>
                                        </td>
                                        <td>
                                            <ButtonLink variant="danger" size="small" text="Eliminar" onClick={() => abrirModal(usuario)} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No se encontraron usuarios</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginador
                    elementosPorPagina={elementosPorPagina}
                    totalElementos={usuarios.length}
                    cambiarPagina={cambiarPagina}
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                />
                <div className="botones">
                    <ButtonLink variant="primary" text="Regresar" to="/inicio-admin" />
                    <ButtonLink variant="secondary" text="Crear Usuario" onClick={() => abrirModal(null)} />
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
                            border: 'none',
                            boxShadow: 'none',
                        },
                    }}
                >
                    <button onClick={cerrarModal} style={{ float: 'right' }}>X</button>
                    <h2>Cambiar Rol para {usuarioSeleccionado && usuarioSeleccionado.nombre}</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si hay */}
                    <ul>
                        {rolesDisponibles.map((rol) => (
                            <li key={rol.id}>
                                <button onClick={() => handleAsignarRol(rol.id)}>{rol.nombreRol}</button>
                            </li>
                        ))}
                    </ul>
                </Modal>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ListaUsuarios;
