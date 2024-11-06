import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import "./index.css";
import Button from "../../atoms/Button";

const OficialNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); // Redirige a la página de inicio de sesión o de bienvenida
  };

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
        <Button variant="alternative" text="Cerrar Sesion" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default OficialNavbar;
