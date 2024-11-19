import React, { useState } from "react";
import "./InicioSesion.css";
import { Link, useNavigate } from "react-router-dom";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { login } from "../../../services/authService";
import { useUserContext } from "../../../contexts/UserContext.jsx";

const InicioSesion = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { setUserId, setToken, setRole } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!correo || !contrasena) {
      setError("Por favor, llena ambos campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = { Email: correo, Password: contrasena };

      // Llamar al service login
      const { userId, token, role } = await login(userData);

      if (userId && token && role) {
        // Actualizar el contexto
        setUserId(userId);
        setToken(token);
        setRole(role);

        // Navegar según el rol
        switch (role) {
          case "Administrador":
            navigate("/inicio-admin");
            break;
          case "Oficial de Tránsito":
            navigate("/pagina-oficial");
            break;
          case "Juez de Tránsito":
            navigate("/pagina-juez");
            break;
          case "Usuario Final":
            navigate("/pagina-usuario");
            break;
          default:
            setError("Rol no reconocido.");
        }
      } else {
        setError("Error al obtener la información de usuario.");
      }
    } catch (err) {
      setError("Credenciales incorrectas o error al iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pagina-inicio-sesion">
      <header>
        <InvitadoNavbar />
      </header>

      <div className="contenedor-principal">
        <div className="contenedor-texto">
          <h2>Bienvenido de nuevo. Ingresa tu cuenta para iniciar.</h2>
          <p>
            Una vez que ingreses tu cuenta se te redireccionará a la página que
            corresponda al rol ingresado en el registro.
          </p>
          <div className="links-inicio-sesion">
            <Link to="/recuperar-contraseña">¿Olvidaste tu contraseña?</Link>
            <Link to="/registro-usuario">¿No tienes una cuenta aún?</Link>
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
              placeholder="example@email.com"
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
            <button type="submit" className="boton-iniciar-sesion" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
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
