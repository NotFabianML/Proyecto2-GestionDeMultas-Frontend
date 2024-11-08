import React, { useState } from "react";
import ButtonLink from "../atoms/ButtonLink";
import Button from "../atoms/Button";
import Tesseract from "tesseract.js";
import {
  InvitadoNavbar,
  UsuarioNavbar,
  AdminNavbar,
  JuezNavbar,
  OficialNavbar,
} from "../layouts/Navbar";
import { getUsuarioPorCedula } from "../../services/usuarioService";

const Home = () => {
  const [cedula, setCedula] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAnalyzeDocument = () => {
    if (!selectedFile) {
      setError("Por favor, sube una imagen de la cédula.");
      return;
    }

    Tesseract.recognize(selectedFile, "spa", {
      logger: (m) => console.log(m), // Puedes ver el progreso en la consola
    })
      .then(({ data: { text } }) => {
        console.log("Texto leído:", text);
        const cedulaPattern = /\b\d{1} \d{3} \d{4}\b/; // Patrón para encontrar número de cédula
        const match = text.match(cedulaPattern);

        if (match) {
          setCedula(match[0].replace(/\s/g, "")); // Elimina los espacios
          setError(null); // Limpia cualquier error
        } else {
          setError("No se pudo encontrar un número de cédula en la imagen.");
        }
      })
      .catch((err) => setError("Error al analizar la imagen."));
  };

  const handleSearch = async () => {
    try {
      setError(null);
      if (!cedula) {
        setError("Por favor, analiza el documento para obtener la cédula.");
        return;
      }
      const userData = await getUsuarioPorCedula(cedula);
      setUsuario(userData);
      console.log(userData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <header>
        <InvitadoNavbar />
        <UsuarioNavbar />
        <AdminNavbar />
        <JuezNavbar />
        <OficialNavbar />
      </header>

      <ButtonLink variant="primary" text="Iniciar Sesion" to="/Usuario" />
      <ButtonLink variant="secondary" text="Consulta de Multas" to="/about" />
      <ButtonLink variant="alternative" text="Registrate aqui" to="/contact" />
      <ButtonLink variant="outline" text="Iniciar Sesion" to="/" />

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button variant="primary" text="Analizar Documento" onClick={handleAnalyzeDocument} />
      <Button variant="secondary" text="Buscar Usuario" onClick={handleSearch} />

      {cedula && <p>Número de cédula detectado: {cedula}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {usuario && (
        <div>
          <h3>Información del Usuario</h3>
          <p>{JSON.stringify(usuario)}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
