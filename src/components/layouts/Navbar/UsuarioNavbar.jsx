import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import ButtonLink from "../../atoms/ButtonLink";
import './index.css';

const UsuarioNavbar = () => {
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
          <Link to="/home">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/about">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/about">Multas</Link>
        </li>
        <li>
          <Link to="/about">Disputas</Link>
        </li>
        <li>
          <Link to="/about">Vehiculos</Link>
        </li>
        <li>
          <Link to="/about">Ver Perfil</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <ButtonLink variant="alternative" text="Cerrar Sesion" to="/" />
      </div>
    </nav>
  );
};

export default UsuarioNavbar;
