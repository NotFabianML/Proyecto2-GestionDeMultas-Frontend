import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResolverDisputa.css";
import Button from "../../atoms/Button.jsx";
import JuezNavbar from "../../layouts/Navbar/JuezNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import FormularioMulta from "../../organism/Formulario/FormularioMulta.jsx";
import { getMultaById, cambiarEstadoMulta } from "../../../services/multaServices.js";
import { getDisputaById, updateDisputa } from "../../../services/disputaService.js";

const ResolverDisputa = () => {
  const [multa, setMulta] = useState({});
  const [disputa, setDisputa] = useState({}); // Estado para almacenar los datos de la disputa
  const [error, setError] = useState(null);
  const [comentario, setComentario] = useState(""); // Estado para el comentario de resolución
  const location = useLocation();
  const navigate = useNavigate(); // Hook para redirección
  const multaId = location.state?.idMulta || "";
  const idDisputa = location.state?.idDisputa || "";

  // Cargar datos de la multa y disputa
  useEffect(() => {
    // Obtener datos de la multa
    getMultaById(multaId)
      .then((data) => {
        setMulta(data);
      })
      .catch((error) => {
        setError(`Error al cargar la multa: ${error.message}`);
      });

    // Obtener datos de la disputa
    getDisputaById(idDisputa)
      .then((data) => {
        setDisputa(data);
        setComentario(data.resolucionJuez || ""); // Cargar la resolución existente, si la hay
      })
      .catch((error) => {
        setError(`Error al cargar la disputa: ${error.message}`);
      });
  }, [multaId, idDisputa]);

  const handleComentarioChange = (e) => {
    setComentario(e.target.value); // Actualizar el estado con el valor del comentario
  };

  const handleResolverDisputa = async (estado) => {
    try {
      // Crear el objeto disputaData antes de la actualización
      const disputaData = {
        idDisputa: disputa.idDisputa,
        multaId: disputa.multaId,
        usuarioId: disputa.usuarioId, // Usuario relacionado con la disputa
        juezId: disputa.juezId, // Juez asignado a la disputa
        numeroPlaca: disputa.numeroPlaca || multa.numeroPlaca || "N/A", // Número de placa
        fechaCreacion: disputa.fechaCreacion || multa.fechaHora, // Fecha de creación
        motivoReclamo: disputa.motivoReclamo || "No especificado", // Motivo del reclamo
        estado, // Estado de la disputa (2: aceptada, 3: rechazada)
        resolucionJuez: comentario || "Sin comentarios", // Resolución del juez
        declaracionOficial: disputa.declaracionOficial || "", // Declaración oficial existente
        fechaResolucion: new Date().toISOString(), // Fecha actual como resolución
      };

      // Llamar a la función de actualización con disputaData
      await updateDisputa(idDisputa, disputaData);
      alert(`La disputa ha sido ${estado === 2 ? "aceptada" : "rechazada"}.`);
      if (estado === 2){
        cambiarEstadoMulta(multaId, 2)}; // Cambiar estado de la multa a "Pagado"

      navigate("/disputas-juez"); // Redirigir a la página de disputas
    } catch (error) {
      setError(`Error al resolver la disputa: ${error.message}`);
    }
  };

  return (
    <div className="resolver-disputa">
      <header>
        <JuezNavbar />
      </header>

      <div>
        <h1>Resolver Disputa</h1>
        <FormularioMulta
          mostrarBotones={false}
          soloLectura={true}
          mostrarSeleccionUbicacion={false}
          multa={multa}
        />

        <div className="resolucion">
          <h2>Resolución</h2>

          <div className="input-group">
            <label htmlFor="motivo">Motivo de la disputa</label>
            <input
              id="motivo"
              name="motivo"
              type="text"
              readOnly
              value={disputa.motivoReclamo || "Cargando..."}
            />
          </div>

          <div>
            <label>Comentario de resolución</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Máximo 255 caracteres"
              maxLength="255"
              value={comentario}
              onChange={handleComentarioChange}
            ></textarea>
          </div>

          <div className="botones">
            <Button
              variant="secondary"
              size="medium"
              text="Aceptar disputa"
              onClick={() => handleResolverDisputa(2)} // Estado 1 para aceptar
            />
            <Button
              variant="alternative"
              size="medium"
              text="Rechazar disputa"
              onClick={() => handleResolverDisputa(3)} // Estado 2 para rechazar
            />
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ResolverDisputa;
