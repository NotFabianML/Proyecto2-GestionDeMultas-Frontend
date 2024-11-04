import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import ButtonLink from "../../atoms/ButtonLink";
import "./index.css";

const OficialNavbar = () => {
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
          <Link to="/Consulta-Publica">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/about">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/Crear-Multa">Crear Multa</Link>
        </li>
        <li>
          <Link to="/Gestion-Multas">Gestionar Multas</Link>
        </li>
        <li>
          <Link to="/AdministrarPerfil">Ver Perfil</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <ButtonLink variant="alternative" text="Cerrar Sesion" to="/" />
      </div>
    </nav>
  );
};

export default OficialNavbar;
