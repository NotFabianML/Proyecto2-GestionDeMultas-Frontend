import React, { useState } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Button from "../../../atoms/Button";
import Footer from "../../../layouts/Footer";
import ButtonLink from "../../../atoms/ButtonLink";
import './administrarPerfil.css';
import axios from "axios"; // Asegúrate de instalar axios con `npm install axios`

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
  const [fotoPerfil, setFotoPerfil] = useState(null); // Estado para la foto de perfil

  const handleImageChange = (e) => {
    setFotoPerfil(e.target.files[0]); // Guardar el archivo seleccionado en el estado
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellidos", apellidos);
    formData.append("correo", correo);
    formData.append("numeroPlaca", numeroPlaca);
    formData.append("rol", rol);

    if (fotoPerfil) {
      formData.append("fotoPerfil", fotoPerfil); // Agregar la imagen solo si fue seleccionada
    }
    
    try {
      await axios.post("/api/guardarPerfil", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error al guardar el perfil", error);
      alert("Hubo un error al guardar el perfil");
    }
  };

  return (
    <div className="pagina-editar-perfil">
      <header>
        <AdminNavbar />
      </header>
      <main>
        <h1>Editar Perfil</h1>
        <div className="perfil-container">
          <img src={usuario.fotoPerfil} alt={` Perfil de ${usuario.userName}`} width="100" height="100" />
          <input type="file" accept="image/*" onChange={handleImageChange} /> {/* Input para subir imagen */}
        </div>
        <div className="perfil-info">
          <div className="columna-izquierda">
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
          <Button variant="alternative" text="Guardar Cambios" onClick={handleClick} />
        </div>
        <ButtonLink variant="outline" text="Regresar" to="/lista-usuarios" />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AdministrarPerfil;
