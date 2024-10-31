import React, {useState} from "react";
import { AdminNavbar } from "../../../layouts/Navbar";
import FiltroInput from "../../../layouts/FiltroInput";
import Paginador from "../../../layouts/Paginador";
import '@fortawesome/fontawesome-free/css/all.css';
import ButtonLink from "../../../atoms/ButtonLink";
import Footer from "../../../layouts/Footer";

const ListaUsuarios = () => {
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;

    const usuarios = [
        { fotoPerfil: 'URL', userName: 'Santiago', id: '1', estado: 'Activo', correo: 'santiago@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Felipe', id: '2', estado: 'Activo', correo: 'felipe@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Tomaz', id: '3', estado: 'Inactivo', correo: 'tomaz@example.com', rol: 'UsuarioNormal' },
        { fotoPerfil: 'URL', userName: 'Usuario4', id: '4', estado: 'Activo', correo: 'usuario4@example.com', rol: 'Oficial' },
        { fotoPerfil: 'URL', userName: 'Usuario5', id: '5', estado: 'Inactivo', correo: 'usuario5@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Usuario6', id: '6', estado: 'Activo', correo: 'usuario6@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Usuario7', id: '7', estado: 'Inactivo', correo: 'usuario7@example.com', rol: 'UsuarioNormal' },
        { fotoPerfil: 'URL', userName: 'Usuario8', id: '8', estado: 'Activo', correo: 'usuario8@example.com', rol: 'Oficial' },
        { fotoPerfil: 'URL', userName: 'Usuario9', id: '9', estado: 'Inactivo', correo: 'usuario9@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Usuario10', id: '10', estado: 'Activo', correo: 'usuario10@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Usuario11', id: '11', estado: 'Inactivo', correo: 'usuario11@example.com', rol: 'UsuarioNormal' },
        { fotoPerfil: 'URL', userName: 'Usuario12', id: '12', estado: 'Activo', correo: 'usuario12@example.com', rol: 'Oficial' },
        { fotoPerfil: 'URL', userName: 'Usuario13', id: '13', estado: 'Inactivo', correo: 'usuario13@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Usuario14', id: '14', estado: 'Activo', correo: 'usuario14@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Usuario15', id: '15', estado: 'Inactivo', correo: 'usuario15@example.com', rol: 'UsuarioNormal' },
        { fotoPerfil: 'URL', userName: 'Usuario16', id: '16', estado: 'Activo', correo: 'usuario16@example.com', rol: 'Oficial' },
        { fotoPerfil: 'URL', userName: 'Usuario17', id: '17', estado: 'Inactivo', correo: 'usuario17@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Usuario18', id: '18', estado: 'Activo', correo: 'usuario18@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Usuario19', id: '19', estado: 'Inactivo', correo: 'usuario19@example.com', rol: 'UsuarioNormal' },
        { fotoPerfil: 'URL', userName: 'Usuario20', id: '20', estado: 'Activo', correo: 'usuario20@example.com', rol: 'Oficial' },
        { fotoPerfil: 'URL', userName: 'Usuario21', id: '21', estado: 'Inactivo', correo: 'usuario21@example.com', rol: 'Administrador' },
        { fotoPerfil: 'URL', userName: 'Usuario22', id: '22', estado: 'Activo', correo: 'usuario22@example.com', rol: 'Juez' },
        { fotoPerfil: 'URL', userName: 'Usuario23', id: '23', estado: 'Inactivo', correo: 'usuario23@example.com', rol: 'UsuarioNormal' },
    ];

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.userName.toLowerCase().includes(filtro.toLowerCase()) ||
        usuario.id.toString().includes(filtro)
      );
    
        // Calcular los índices de la página actual
        const indiceUltimoElemento = paginaActual * elementosPorPagina;
        const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
        const UsuariosActuales = usuariosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);
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
                            {UsuariosActuales.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.userName}</td>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.estado}</td>
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
                <ButtonLink variant="alternative" text="Registrate Usuario Nuevo" to="/RegistrarUsuarioAdmin" />
            </main>
            <footer>
                <Footer />
            </footer>

        </div>
    );
    }
    export default ListaUsuarios;