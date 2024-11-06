import React, { useState } from "react";
import "./InicioSesion.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../layouts/Navbar/Navbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { getUserRole, login } from "../../../services/authService";

const InicioSesion = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!correo || !contrasena) {
      setError("Por favor, llena ambos campos.");
    } else {
      try {
        const userData = {
            Email: correo,
            Password: contrasena
        }
        await login(userData);
        const userRole = getUserRole(); // Obtén el rol después de iniciar sesión

        // Redirige según el rol del usuario
        switch (userRole) {
            case "Administrador":
                navigate("/InicioAdmin");
                break;
            case "Oficial de Tránsito":
                navigate("/Pagina-Oficial");
                break;
            case "Juez de Tránsito":
                navigate("/Pagina-Juez");
                break;
            case "Usuario Final":
                navigate("/Pagina-Usuario");
                break;
            default:
                console.log("Rol no reconocido");
        }
      } catch (err) {
        // Muestra el mensaje de error en caso de fallo
        setError("Credenciales incorrectas o error al iniciar sesión");
      }
    }
  };

  return (
    <div className="pagina-inicio-sesion">
      <header>
        <Navbar />
      </header>

      <div className="contenedor-principal">
        <div className="contenedor-texto">
          <h2>Bienvenido de nuevo. Ingresa tu cuenta para iniciar.</h2>
          <p>
            Una vez que ingreses tu cuenta se te redireccionará a la página que
            corresponda al rol ingresado en el registro.
          </p>
          <div className="links-inicio-sesion">
            <Link to="/Password-Recovery">¿Olvidaste tu contraseña?</Link>
            <Link to="/Registro-Usuario">¿No tienes una cuenta aún?</Link>
          </div>
        </div>
        <div className="contenedor-formulario">
          <form onSubmit={handleLogin}>
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="example@email"
            />
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              placeholder="Contraseña"
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="boton-iniciar-sesion">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default InicioSesion;
