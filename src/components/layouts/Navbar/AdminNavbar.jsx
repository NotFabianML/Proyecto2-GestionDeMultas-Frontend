import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import ButtonLink from "../../atoms/ButtonLink";
import './index.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/homeAdmin">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/home">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/about">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/about">Usuarios</Link>
        </li>
        <li>
          <Link to="/about">Roles y Permisos</Link>
        </li>
        <li>
          <Link to="/about">Catalogo de Infracciones</Link>
        </li>
        <li>
          <Link to="/about">Estadistica de Multas</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <ButtonLink variant="alternative" text="Cerrar Sesion" to="/" />
      </div>
    </nav>
  );
};

export default AdminNavbar;
