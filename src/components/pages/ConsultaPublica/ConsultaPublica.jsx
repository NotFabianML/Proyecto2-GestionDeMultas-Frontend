import React, { useState } from "react";
import "./ConsultaPublica.css";
import Button from "../../atoms/Button.jsx";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import { getMultasPorPlaca } from "../../../services/multaServices.js";
import { isoToDateFormatter } from "../../../utils/dateUtils.js";
import { useUserContext } from "../../../contexts/UserContext.jsx";
import OficialNavbar from "../../layouts/Navbar/OficialNavbar.jsx";
import AdminNavbar from "../../layouts/Navbar/AdminNavbar.jsx";
import UsuarioNavbar from "../../layouts/Navbar/UsuarioNavbar.jsx";
import JuezNavbar from "../../layouts/Navbar/JuezNavbar.jsx";

const ConsultaPublica = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);
  const [placa, setPlaca] = useState("");
  const [multas, setMultas] = useState([]);
  const [error, setError] = useState(null);
  const { role } = useUserContext();

  // Función para traducir el estado de la multa
  const traducirEstado = (estado) => {
    switch (estado) {
      case 1:
        return "Pendiente";
      case 2:
        return "En Disputa";
      case 3:
        return "Pagada";
      default:
        return "Desconocido";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9]*$/;

    if (placa.length === 6 && regex.test(placa)) {
      try {
        const data = await getMultasPorPlaca(placa);
        setMultas(data);
        setError(null);
        setMostrarTabla(true);
      } catch (error) {
        setError(`Error: ${error.response?.data || error.message}`);
        setMultas([]);
        setMostrarTabla(false);
      }
    } else {
      setMostrarTabla(false);
      alert(
        "La placa debe tener 6 caracteres y no puede contener caracteres especiales."
      );
    }
  };

  const handleNavbar = () => {
    switch (role) {
      case "Usuario Final":
        return <UsuarioNavbar />;
      case "Oficial de Tránsito":
        return <OficialNavbar />;
      case "Juez de Tránsito":
        return <JuezNavbar />;
      case "Administrador":
        return <AdminNavbar />;
      default:
        return <InvitadoNavbar />;
    }
  };

  return (
    <div className="consulta-publica">
      <header>
        {handleNavbar()}
        {/* <InvitadoNavbar /> */}
      </header>

      <div className="contenido">
        <h2>Realiza una consulta pública de multas</h2>
        <p>Ingresa la placa de tu vehículo con el formato adecuado.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
            maxLength="6"
            placeholder="000000"
            className="input-placa"
          />
          <Button
            id="btnConsultaMulta"
            className="btnConsultaMulta"
            variant="primary"
            size="medium"
            text="Consultar Multas"
          />
        </form>

        {error && <p className="error-message">{error}</p>}

        {mostrarTabla && multas.length > 0 && (
          <table className="tabla-multas">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Infracciones</th>
              </tr>
            </thead>
            <tbody>
              {multas.map((multa, index) => (
                <tr key={index}>
                  <td>{isoToDateFormatter(multa.fechaHora)}</td>
                  <td>{traducirEstado(multa.estado)}</td>
                  <td>
                    {multa.infracciones && multa.infracciones.length > 0
                      ? multa.infracciones.map(
                          (infraccion, infraccionIndex) => (
                            <div key={infraccionIndex}>
                              {infraccion.titulo} -{" "}
                              {infraccion.monto
                                ? `₡${infraccion.monto}`
                                : "Sin monto"}
                            </div>
                          )
                        )
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {mostrarTabla && multas.length === 0 && !error && (
          <p>No se encontraron multas para la placa ingresada.</p>
        )}
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default ConsultaPublica;
