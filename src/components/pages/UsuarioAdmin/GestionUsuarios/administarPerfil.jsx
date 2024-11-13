import React, { useState, useEffect } from "react";
import AdminNavbar from "../../../layouts/Navbar/AdminNavbar";
import Button from "../../../atoms/Button";
import Footer from "../../../layouts/Footer";
import ButtonLink from "../../../atoms/ButtonLink";
import './administrarPerfil.css';
import axios from "axios";
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from "@cloudinary/url-gen/actions/resize";

const AdministrarPerfil = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dekwvhxog'
    }
  });

  const usuario = {
    fotoPerfil: '',
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
  const [fotoPerfil, setFotoPerfil] = useState(cld.image('user_iiwdqq').resize(fill().width(100).height(100)).toURL());

  const handleImageUpload = (result) => {
    if (result.event === 'success') {
      setFotoPerfil(result.info.secure_url); // Guarda la URL de la imagen cargada
    }
  };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dekwvhxog',
        uploadPreset: 'preset_NexTek',
        sources: ['local', 'url'],
      },
      (error, result) => {
        if (result && result.event === 'success') {
          handleImageUpload(result);
        }
      }
    );
  };

  const [showModal, setShowModal] = useState(false);
  const [roles] = useState(['Administrador', 'Oficial', 'Juez', 'Usuario Normal']);

  const handleRoleSelect = (selectedRole) => {
    setRol(selectedRole);
    setShowModal(false);
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      console.log('Cloudinary widget script cargado');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pagina-editar-perfil">
      <header>
        <AdminNavbar />
      </header>
      <main>
        <h1>Editar Perfil</h1>

        <div className="perfil-container">
          <img 
            src={fotoPerfil} 
            alt={`Perfil de ${nombre}`} 
            className="user-photo" 
          />
          <Button className="btn-foto" variant="secondary" size="medium" text="Subir Foto" onClick={openUploadWidget} />
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
          </div>

          <div className="columna-derecha">
            <div>
              <label>Rol:</label>
              <div className="rol-selector">
                <button onClick={() => setShowModal(true)}>{rol}</button>
                {showModal && (
                  <div className="rol-modal">
                    {roles.map((role) => (
                      <button key={role} onClick={() => handleRoleSelect(role)}>{role}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="guardar-cambios">
            <Button variant="alternative" text="Guardar Cambios" onClick={handleClick} />
          </div>
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
