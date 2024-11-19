import React, { useState } from "react";
import { resetPassword } from "../../../services/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { validatePassword } from "../../../utils/validationUtils"; // Util para validar contraseñas
import "./PasswordReset.css";
import Footer from "../../layouts/Footer";
import Button from "../../atoms/Button";
import { InvitadoNavbar } from "../../layouts/Navbar";

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Extraer email y token de los parámetros de la URL
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setPasswordError("");

    // Validar contraseñas
    if (!validatePassword(password)) {
      setPasswordError(
        "La contraseña debe tener entre 8 y 16 caracteres, incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llamar al servicio para restablecer la contraseña
      await resetPassword(email, token, password);
      // setMessage("La contraseña se ha restablecido correctamente.");
      alert("La contraseña se ha restablecido correctamente.");
      navigate("/iniciar-sesion");
      // setPassword("");
      // setConfirmPassword("");
    } catch (err) {
      // setError(err.message || "Hubo un error al restablecer la contraseña.");
      alert("Hubo un error al restablecer la contraseña.");
    }
  };

  return (
    <div className="password-reset-page">
      <header>
        <InvitadoNavbar />
      </header>
      <main className="password-reset-container">
        <div className="password-reset-box">
          <h2>Restablecer Contraseña</h2>
          <p className="password-requirements">
            La contraseña debe tener:
            <br />- Entre 8 y 16 caracteres
            <br />- Al menos 1 letra mayúscula
            <br />- Al menos 1 letra minúscula
            <br />- Al menos 1 número
            <br />- Al menos 1 carácter especial
          </p>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          {passwordError && <p className="error-message">{passwordError}</p>}
          <form onSubmit={handleSubmit} className="password-reset-form">
            <div className="input-group-pr">
              <label htmlFor="password">Nueva Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group-pr">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="secondary" text="Restablecer Contraseña" />
          </form>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PasswordReset;
