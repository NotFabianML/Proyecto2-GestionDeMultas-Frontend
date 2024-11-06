import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsuarios } from "../../../../services/usuarioService";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Footer from "../../../layouts/Footer";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import ButtonLink from "../../../atoms/ButtonLink";
import Modal from "react-modal"; // Si estás utilizando un modal
import '@fortawesome/fontawesome-free/css/all.css';
import './listaUsuarios.css';

const ListaUsuarios = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const elementosPorPagina = 10;
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener los usuarios cuando se carga el componente
        getUsuarios()
            .then((data) => {
                setUsuarios(data); // Asumiendo que la respuesta es un arreglo de usuarios
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    }, [modalIsOpen]); // Re-cargar la lista de usuarios si se abre el modal

    const usuariosFiltrados = usuarios?.filter(usuario =>
        usuario.userName.toLowerCase().includes(filtro.toLowerCase()) ||
        usuario.id.toString().includes(filtro)
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const usuariosActuales = usuariosFiltrados?.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(usuariosFiltrados?.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    const abrirModal = (usuario) => {
        if (usuario) {
            setUsuarioSeleccionado(usuario);
        } else {
            setUsuarioSeleccionado(null); // Nuevo usuario
        }
        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
        setUsuarioSeleccionado(null); // Limpiar la selección de usuario
    };

    const handleGuardarUsuario = () => {
        // Aquí llamamos a la función para crear o editar un usuario
        // Si usuarioSeleccionado existe, es un usuario ya existente que estamos editando
        // Si no, estamos creando uno nuevo
        console.log(usuarioSeleccionado);
        cerrarModal();
    };

    const handleEliminarUsuario = () => {
        // Función para eliminar un usuario
        console.log(`Eliminar usuario con ID: ${usuarioSeleccionado.id}`);
        // Aquí agregarías la llamada al servicio para eliminar el usuario
        setUsuarios(usuarios.filter(usuario => usuario.id !== usuarioSeleccionado.id));
        cerrarModal();
    };

    return (
        <div>
            <header>
                <AdminNavbar />
            </header>
            <main>
                <h1>Lista de Usuarios</h1>
                <div className="filtro-container">
                    <FiltroInput
                        placeholder="Filtrar"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                    <div><i className="fas fa-search search-icon"></i></div>
                </div>
                <div className="lista-usuarios">
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>ID</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosActuales?.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.userName}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.estado}</td>
                                    <td>
                                        <ButtonLink variant="primary" size="small" text="Editar" onClick={() => abrirModal(usuario)} />
                                        <ButtonLink variant="danger" size="small" text="Eliminar" onClick={() => abrirModal(usuario)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Paginador
                    elementosPorPagina={elementosPorPagina}
                    totalElementos={usuariosFiltrados?.length}
                    cambiarPagina={cambiarPagina}
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                />
                <ButtonLink variant="outline" text="Regresar" to="/InicioAdmin" />
                <ButtonLink variant="alternative" text="Crear Usuario" onClick={() => abrirModal(null)} />

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
                    <h2>{usuarioSeleccionado ? 'Editar Usuario' : 'Crear Usuario'}</h2>
                    {/* Aquí puedes agregar los campos del formulario */}
                    <button onClick={handleGuardarUsuario}>
                        {usuarioSeleccionado ? 'Guardar Cambios' : 'Crear Usuario'}
                    </button>
                    {usuarioSeleccionado && (
                        <button onClick={handleEliminarUsuario}>Eliminar Usuario</button>
                    )}
                </Modal>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ListaUsuarios;
