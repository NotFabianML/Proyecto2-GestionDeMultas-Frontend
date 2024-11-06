import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/Nextek-logo.svg";
import './index.css';
import Button from "../../atoms/Button";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); // Redirige a la página de inicio de sesión o de bienvenida
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/InicioAdmin">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/Consulta-Publica">Consulta Publica</Link>
        </li>
        <li>
          <Link to="/Mapa-Calor">Mapa de Calor</Link>
        </li>
        <li>
          <Link to="/about">Usuarios</Link>
        </li>
        <li>
          <Link to="/Roles">Roles y Permisos</Link>
        </li>
        <li>
          <Link to="/Infraccion">Catalogo de Infracciones</Link>
        </li>
        <li>
          <Link to="/MultasTabla">Estadistica de Multas</Link>
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
