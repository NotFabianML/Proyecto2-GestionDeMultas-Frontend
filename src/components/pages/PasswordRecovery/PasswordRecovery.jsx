import React, { useState } from "react";
import "./PasswordRecovery.css";
import Button from "../../atoms/Button.jsx";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { forgotPassword } from "../../../services/authService";
import { verificarCorreoUnico } from "../../../services/usuarioService";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Verificar si el correo existe
      const result = await verificarCorreoUnico(email);

      if (!result.idUsuario) {
        setError("El correo ingresado no está registrado.");
        return;
      }

      // Crear el enlace de restablecimiento con token e ID
      const resetUrl = `${window.location.origin}/resetear-contraseña`;

      // Llamar al servicio para enviar el correo
      await forgotPassword(email, resetUrl);

      //   setMessage(
      //     'Si el correo está registrado, se enviará un enlace para restablecer tu contraseña.'
      //   );

      alert(
        "Se enviará un enlace para restablecer tu contraseña."
      );
    } catch (err) {
      // setError(err.message || "Error al enviar el correo de recuperación.");
      alert("Error al enviar el correo de recuperación.");
    }
  };

  return (
    <div className="password-recovery-container">
      <header>
        <InvitadoNavbar />
      </header>

      <div className="password-recovery-box">
        <h2>
          ¿Olvidaste tu contraseña? <br /> <strong>Aquí te ayudamos.</strong>
        </h2>
        <p>Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form className="password-recovery-form" onSubmit={handleSubmit}>
          <div className="input-group-recovery">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group-recovery">
            <Button variant="secondary" size="medium" text="Enviar" />
          </div>
        </form>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PasswordRecovery;
