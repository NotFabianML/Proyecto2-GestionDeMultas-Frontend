import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import './index.css';
import Button from "../../atoms/Button";
import { useUserContext } from "../../../contexts/UserContext";

const AdminNavbar = () => {
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
        <Link to="/inicio-admin">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/consulta-publica">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/mapa-calor">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/lista-usuarios">Usuarios</Link>
        </li>
        <li>
          <Link to="/roles">Roles y Permisos</Link>
        </li>
        <li>
          <Link to="/infraccion">Catalogo de Infracciones</Link>
        </li>
        <li>
          <Link to="/multas-tabla">Estadistica de Multas</Link>
        </li>
      </ul>

      {/* Botones */}
      <div className="navbar-actions">
        <Button variant="alternative" text="Cerrar Sesion" onClick={handleLogout}/>
      </div>
    </nav>
  );
};

export default AdminNavbar;
