import React, { useState, useEffect } from "react";
import { AdminNavbar } from "../../../layouts/Navbar";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import '@fortawesome/fontawesome-free/css/all.css';
import ButtonLink from "../../../atoms/ButtonLink";
import Footer from "../../../layouts/Footer";
import './listaUsuarios.css';
import { getUsuarios } from "../../../../services/usuarioService";

const ListaUsuarios = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios
    const elementosPorPagina = 10;

    // Obtener los usuarios de la API
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosData = await getUsuarios();
                // Validamos que los usuariosData sean un array
                if (Array.isArray(usuariosData)) {
                    setUsuarios(usuariosData);
                } else {
                    console.error("Los datos de usuarios no son un arreglo válido", usuariosData);
                }
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };
    
        fetchUsuarios();
    }, []);

    // Filtrado de usuarios
    const usuariosFiltrados = usuarios.filter(usuario =>
        (usuario.userName && usuario.userName.toLowerCase().includes(filtro.toLowerCase())) || 
        (usuario.id && usuario.id.toString().includes(filtro))
    );

    // Calcular los índices de la página actual
    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const usuariosActuales = usuariosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);
    const totalPaginas = Math.ceil(usuariosFiltrados.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
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
                            {usuariosActuales.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.userName}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.estado === 1 ? 'Activo' : 'Inactivo'}</td>
                                    <td>
                                        <ButtonLink variant="primary" size="small" text="Editar" to="/AdministrarPerfil" />
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
                <ButtonLink variant="outline" text="Regresar" to="/InicioAdmin" />
                <div className="boton-registrar-usuario">
                    <ButtonLink variant="alternative" text="Registrate Usuario Nuevo" to="/RegistrarUsuarioAdmin" />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ListaUsuarios;