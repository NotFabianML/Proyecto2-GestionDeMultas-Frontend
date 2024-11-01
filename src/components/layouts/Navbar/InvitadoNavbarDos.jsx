import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import ButtonLink from "../../atoms/ButtonLink";
import './index.css';

const InvitadoNavbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/Pagina-Inicio">Inicio</Link>
        </li>
        <li>
          <Link to="/Mapa-Calor">Mapa de Calor</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <ButtonLink variant="outline" text="Registrarse" to="/Registro-Usuario" />
        <ButtonLink variant="alternative" text="Iniciar Sesión" to="/Inicio-Sesion" />
      </div>
    </nav>
  );
};

export default InvitadoNavbar;
