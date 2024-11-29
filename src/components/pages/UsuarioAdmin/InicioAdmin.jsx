import React from "react";
import ButtonLink from "../../atoms/ButtonLink";
import Button from "../../atoms/Button";
import { AdminNavbar } from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import "./InicioAdmin.css";

const InicioAdmin = () => {
  const handleClick = () => {
    alert("Boton clickeado");
  };

  return (
    <div className="inicio-admin">

      <header>
        <AdminNavbar />
      </header>

      <div className="contenido-inicio-admin">
        <h1>Opciones de Administrador</h1>
        <div className="BotonesAdmin">
          <ButtonLink variant="secondary" text="Gestionar Usuarios" to="/lista-usuarios" />
          <ButtonLink variant="secondary" text="Gestionar Roles y Permisos" to="/roles" />
          <ButtonLink variant="secondary" text="Gestionar Catálogo de Infracciones" to="/infraccion" />
          <ButtonLink variant="secondary" text="Estadísticas de Multas" to="/dashboard-admin" />
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default InicioAdmin;
