import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import "./index.css";
import Button from "../../atoms/Button";
import { useUserContext } from "../../../contexts/UserContext";

const OficialNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate("/");
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
          <Link to="/consulta-publica">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/about">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/crear-multa">Crear Multa</Link>
        </li>
        <li>
          <Link to="/gestion-multas">Gestionar Multas</Link>
        </li>
        <li>
          <Link to="/administrar-perfil">Ver Perfil</Link>
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
