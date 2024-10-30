import React, { useState } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Button from "../../../atoms/Button";
import Footer from "../../../layouts/Footer";
import ButtonLink from "../../../atoms/ButtonLink";

const AdministrarPerfil = () => {
  const usuario = {
    fotoPerfil: 'URL',
    userName: 'Santiago',
    apellidos: 'Pérez',
    id: '1',
    estado: 'Activo',
    correo: 'santiago@example.com',
    numeroPlaca: 'ABC1234',
    rol: 'Administrador'
  };

  const [nombre, setNombre] = useState(usuario.userName);
  const [apellidos, setApellidos] = useState(usuario.apellidos);
  const [correo, setCorreo] = useState(usuario.correo);
  const [numeroPlaca, setNumeroPlaca] = useState(usuario.numeroPlaca);
  const [rol, setRol] = useState(usuario.rol);

  const handleClick = () => {
    alert(`Nombre: ${nombre}, Apellidos: ${apellidos}, Correo: ${correo}, Número de Placa: ${numeroPlaca}, Rol: ${rol}`);
    // Aquí puedes añadir la lógica para guardar los cambios en la base de datos
  };

  return (
    <div>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <h1>Editar Perfil</h1>
        <div className="perfil-container" style={{ display: 'flex' }}>
          <img src={usuario.fotoPerfil} alt={`${usuario.userName}'s profile`} width="100" height="100" />
          <div className="perfil-info" style={{ display: 'flex', marginLeft: '20px' }}>
            <div className="columna-izquierda" style={{ marginRight: '20px' }}>
              <div>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div>
                <label>Apellidos:</label>
                <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
              </div>
              <div>
                <label>Correo:</label>
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
              <div>
                <label>Número de Placa del Vehículo:</label>
                <input type="text" value={numeroPlaca} onChange={(e) => setNumeroPlaca(e.target.value)} />
              </div>
            </div>
            <div className="columna-derecha">
              <div>
                <label>Rol:</label>
                <select value={rol} onChange={(e) => setRol(e.target.value)}>
                  <option value="Administrador">Administrador</option>
                  <option value="Oficial">Oficial</option>
                  <option value="Juez">Juez</option>
                  <option value="UsuarioNormal">Usuario Normal</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <ButtonLink variant="outline" text="Regresar" to="/ListaUsuarios" />
        <Button variant="alternative" text="Guardar Cambios" onClick={handleClick} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdministrarPerfil;