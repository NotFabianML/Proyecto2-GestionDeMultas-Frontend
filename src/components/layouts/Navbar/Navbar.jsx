import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import ButtonLink from "../../atoms/ButtonLink";
import './index.css';

const Navbar = () => {
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
          <Link to="/consulta-publica">Consulta Multas</Link>
        </li>
        <li>
          <Link to="/mapa-calor">Mapa de Calor</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <ButtonLink variant="alternative" text="Registrarse" to="/registro-usuario" />
      </div>
    </nav>
  );
};

export default Navbar;
