import React, { useState } from "react";
import Button from "../atoms/Button";
import { verificarCorreoUnico } from "../../services/usuarioService";
import { createUserWithRole } from "../../services/authService";
import { validateCedula, validateTelefono } from "../../utils/validationUtils";
import { formatFechaNacimiento } from "../../utils/dateUtils";

const FormAdminCrearUsuario = ({ usuario, onChange, roles, onSuccess }) => {
  const [correoGenerado, setCorreoGenerado] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correoGenerado) {
      setError("Debe generar y validar un correo antes de crear el usuario.");
      return;
    }

    try {
      const usuarioEnviado = await createUserWithRole(
        {
          cedula: usuario.cedula,
          nombre: usuario.nombre,
          apellido1: usuario.apellido1,
          apellido2: usuario.apellido2 || null,
          email: correoGenerado,
          fechaNacimiento: formatFechaNacimiento(usuario.fechaNacimiento),
          telefono: usuario.telefono,
        },
        usuario.roleName // Enviar el nombre del rol
      );

      console.log("Usuario creado:", usuarioEnviado);
      onSuccess();
      alert("Usuario creado con éxito");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setError("Hubo un problema al crear el usuario. Intente de nuevo.");
    }
  };

  const handleGenerateEmail = async () => {
    const email = `${usuario.nombre?.charAt(0).toLowerCase() || ""}${
      usuario.apellido1?.toLowerCase() || ""
    }${usuario.apellido2?.charAt(0).toLowerCase() || ""}@nextek.com`;
    setCorreoGenerado(email);

    const result = await verificarCorreoUnico(email);
    if (result.Existe) {
      console.log(`ID del usuario existente: ${result.IdUsuario}`);
      setError(
        "El correo ya está en uso, intente con un nombre o apellido diferente."
      );
    } else {
      setError("");
    }
  };

  const handleRoleChange = (e) => {
    onChange("roleName", e.target.value); // Enviar el nombre del rol en lugar del ID
  };

  const handleChange = (field, value) => {
    onChange(field, value);

    if (field === "cedula" && !validateCedula(value)) {
      setError("La cédula no es válida.");
    } else if (field === "telefono" && !validateTelefono(value)) {
      setError("Número de teléfono no válido.");
    } else {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-text">{error}</p>}
      <div className="filas">
        <label>Cédula</label>
        <input
          type="text"
          value={usuario.cedula || ""}
          onChange={(e) => handleChange("cedula", e.target.value)}
          required
        />
      </div>
      <div className="filas">
        <label>Nombre</label>
        <input
          type="text"
          value={usuario.nombre || ""}
          onChange={(e) => handleChange("nombre", e.target.value)}
          required
        />
      </div>
      <div className="filas">
        <label>Apellido 1</label>
        <input
          type="text"
          value={usuario.apellido1 || ""}
          onChange={(e) => handleChange("apellido1", e.target.value)}
          required
        />
      </div>
      <div className="filas">
        <label>Apellido 2</label>
        <input
          type="text"
          value={usuario.apellido2 || ""}
          onChange={(e) => handleChange("apellido2", e.target.value)}
        />
      </div>
      <div className="filas">
        <label>Correo</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input type="email" value={correoGenerado} readOnly />
          <Button
            type="button"
            variant="secondary"
            size="small"
            text="Generar Correo"
            onClick={handleGenerateEmail}
          />
        </div>
      </div>
      <div className="filas">
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          value={usuario.fechaNacimiento || ""}
          onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
          required
        />
      </div>
      <div className="filas">
        <label>Teléfono</label>
        <input
          type="tel"
          value={usuario.telefono || ""}
          onChange={(e) => handleChange("telefono", e.target.value)}
          required
        />
      </div>
      <div className="filas">
        <label>Rol</label>
        <select
          value={usuario.roleName || ""}
          onChange={handleRoleChange}
          required
        >
          <option value="">Seleccione un rol</option>
          {roles.map((role) => (
            <option key={role.idRol} value={role.nombreRol}>
              {role.nombreRol}
            </option>
          ))}
        </select>
      </div>

      <div className="botones-modal">
        <Button
          type="submit"
          variant="primary"
          size="medium"
          text="Crear Usuario"
        />
      </div>
    </form>
  );
};

export default FormAdminCrearUsuario;
