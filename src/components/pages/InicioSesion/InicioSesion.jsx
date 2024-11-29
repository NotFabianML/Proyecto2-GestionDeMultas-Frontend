import React, { useState } from "react";
import "./InicioSesion.css";
import { json, Link, useNavigate } from "react-router-dom";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { login } from "../../../services/authService";
import { useUserContext } from "../../../contexts/UserContext.jsx";
import Button from "../../atoms/Button.jsx";
import { activarAutenticacion2F, validarAutenticacion2F } from "../../../services/autenticacion2FService.js";
import { getUsuarioById } from "../../../services/usuarioService.js";

const InicioSesion = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [dobleFactorData, setDobleFactorData] = useState({});
  const [dobleFactorActivado, setDobleFactorActivado] = useState(false);
  const [codigoAutenticacion, setCodigoAutenticacion] = useState("");

  const navigate = useNavigate();
  const { setUserId, setToken, setRole } = useUserContext();
  const { role } = useUserContext();

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

      // Llamar al servicio de inicio de sesión
      const { userId, token, role } = await login(userData);

      if (userId && token && role) {
        // Actualizar el contexto
        setUserId(userId);
        setToken(token);
        setRole(role);

        // Verificar si el usuario tiene doble factor activado
         const usuario = await getUsuarioById(userId);

         if (usuario?.dobleFactorActivo) {
          setDobleFactorActivado(true); // Activa la sección de doble factor
        } else {
          handleNavegarSegunRol(role); // Navega si no tiene doble factor activado
        }

      } else {
        setError("Error al obtener la información de usuario.");
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavegarSegunRol = (rol) => {
    switch (rol) {
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
  
  }

  const handleActivarAutenticacion2F = () => {
    activarAutenticacion2F(correo, contrasena)
    .then((data) => {
      if (data && data.data) {
        setDobleFactorData(data.data);
      } else {
        setShowPopup(false);
        setError("Credenciales incorrectas");
      }
    })
    .catch((error) => {
      setShowPopup(false);
      setError("Credenciales incorrectas");
      console.error("Error de autenticación 2F:", error);
    });
  };

  const handleValidarAutenticacion2F = () => {
    setIsSubmitting(true);
    validarAutenticacion2F(correo, codigoAutenticacion)
      .then((data) => {
        if (data && data.status === 200) {
          handleNavegarSegunRol(role);
        } else {
          setError("Código de autenticación incorrecto.");
        }
      })
      .catch((error) => {
        setError("Código de autenticación incorrecto.");
        console.error("Error de autenticación 2F:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
            {/* Formulario de inicio de sesión */}
            {!dobleFactorActivado && (
            <>
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="example@email.com"
            />
            <label>Contraseña</label>
            <div className="password-input-container-login">
              <input
                type={showPassword ? "text" : "password"}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                placeholder="Contraseña"
              />
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            {error && <p className="error">{error}</p>}
            <button type="submit" className="boton-iniciar-sesion" disabled={isSubmitting}>
              {isSubmitting ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            </>
            )}

            {dobleFactorActivado && (
            <>  
            <h4>Autenticación en 2 pasos</h4>
            <label>Código de Autenticación</label>
            <div className="fila-2FA">
            <input
              type="text"
              className="input-OTP"
              value={codigoAutenticacion}
              placeholder="XXXXXX"
              onChange={(e) => {
                const valor = e.target.value;
                if (/^\d*$/.test(valor) && valor.length <= 6) {
                  setCodigoAutenticacion(valor);
                }
              }}
            />

            </div>

            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si lo hay */}

            <button
              type="button" // Cambié de "submit" a "button" para evitar que se recargue el formulario
              className="boton-verificar-OTP"
              onClick={handleValidarAutenticacion2F} // Llamamos a la función de verificación OTP
              disabled={isSubmitting} // Deshabilitar mientras se está verificando
            >
              {isSubmitting ? "Verificando..." : "Verificar"}
            </button>
            </>
            )}
          </form>

          {!dobleFactorActivado && (
          <>
          {/* Botón para activar la autenticación en 2 pasos */}
          <div className="link-autenticacion">
            {/* Botón para mostrar el pop-up */}
            {/* <Button
              variant="primary"
              className="boton-popup"
              onClick={() => {
                handleActivarAutenticacion2F();
                setShowPopup(true);
              }}
              text="Activar Verificación en 2 pasos"
            /> */}
          </div>

          <div className="link-autenticacion">
            <Link
              to="#"
              className="boton-popup"
              onClick={(e) => {
                e.preventDefault(); // Evita la navegación predeterminada
                handleActivarAutenticacion2F();
                setShowPopup(true);
              }}
            >
              Activar Verificación en 2 pasos
            </Link>
          </div>
          </>)}

        </div>
      </div>

      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            {/* Botón para cerrar el pop-up */}
            <button
              className="close-button"
              onClick={() => setShowPopup(false)}
            >
              &times;
            </button>
            <h3>Activar Verificación en 2 Pasos</h3>
            <p>Para activar la verificación en dos pasos, escanee el siguiente código QR</p>
            <img src={dobleFactorData?.qrCodeBase64} alt="QR Code" />

          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default InicioSesion;
