import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "./MisVehiculos.css";
import UsuarioNavbar from "../../layouts/Navbar/UsuarioNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import {
  getVehiculosPorUsuario,
  createVehiculo,
} from "../../../services/vehiculoService";
import FiltroInput from "../../layouts/FiltroInput.jsx";
import Button from "../../atoms/Button.jsx";
import Paginador from "../../layouts/Paginador.jsx";
import { useUserContext } from "../../../contexts/UserContext.jsx";

const MisVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    numeroPlaca: "",
    marca: "",
    anno: "",
  });
  const elementosPorPagina = 10;

  const { userId, token } = useUserContext();

  useEffect(() => {
    if (!userId || !token) {
      setError("Sesión expirada o usuario no autenticado.");
      return;
    }

    getVehiculosPorUsuario(userId)
      .then((data) => setVehiculos(data))
      .catch((error) =>
        setError(`Error al obtener vehículos: ${error.message}`)
      );
  }, [userId, token]);

  const handleEliminarVehiculo = (idVehiculo) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      setVehiculos((prevVehiculos) =>
        prevVehiculos.filter((vehiculo) => vehiculo.idVehiculo !== idVehiculo)
      );
      alert("Vehículo eliminado con éxito.");
    }
  };

  const handleAbrirModal = () => setMostrarModal(true);

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setNuevoVehiculo({ numeroPlaca: "", marca: "", anno: "" });
    setError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoVehiculo({ ...nuevoVehiculo, [name]: value });
  };

  const handleAgregarVehiculo = async (e) => {
    e.preventDefault();
    if (!nuevoVehiculo.numeroPlaca || !nuevoVehiculo.marca) {
      setError("Placa y Marca son campos obligatorios.");
      return;
    }

    try {
      const vehiculoData = {
        numeroPlaca: nuevoVehiculo.numeroPlaca,
        marca: nuevoVehiculo.marca,
        anno: nuevoVehiculo.anno || null,
        usuarioId: userId,
      };

      const vehiculoCreado = await createVehiculo(vehiculoData);
      setVehiculos((prevVehiculos) => [...prevVehiculos, vehiculoCreado]);
      handleCerrarModal();
      alert("Vehículo agregado con éxito.");
    } catch (error) {
      console.error("Error al crear vehículo:", error);
      setError("Hubo un problema al crear el vehículo. Intente de nuevo.");
    }
  };

  // Filtrar vehículos por placa, marca o año
  const vehiculosFiltrados = vehiculos.filter(
    (vehiculo) =>
      vehiculo.numeroPlaca.toLowerCase().includes(filtro.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(filtro.toLowerCase()) ||
      (vehiculo.anno && vehiculo.anno.toString().includes(filtro))
  );

  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const vehiculosActuales = vehiculosFiltrados.slice(
    indicePrimerElemento,
    indiceUltimoElemento
  );

  const totalPaginas = Math.ceil(
    vehiculosFiltrados.length / elementosPorPagina
  );

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  return (
    <div className="mis-vehiculos">
      <header>
        <UsuarioNavbar />
      </header>

      <main>
        <h1>Mis Vehículos</h1>
        {/* {error && <p className="error">{error}</p>} */}

        <div className="filtro-container">
          <FiltroInput
            placeholder="Buscar"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <div>
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>

        <div className="vehiculos-tabla-contenedor">
          <table className="vehiculos-tabla">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Marca</th>
                <th>Año</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.length > 0 ? (
                vehiculosActuales.map((vehiculo) => (
                  <tr key={vehiculo.idVehiculo}>
                    <td>{vehiculo.numeroPlaca}</td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.anno || "No asignado"}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="medium"
                        text="Eliminar"
                        onClick={() =>
                          handleEliminarVehiculo(vehiculo.idVehiculo)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No tienes vehículos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {vehiculosFiltrados.length > 0 && (
          <Paginador
            totalPaginas={totalPaginas}
            paginaActual={paginaActual}
            cambiarPagina={cambiarPagina}
          />
        )}

        <div className="vehiculos-boton-agregar">
          <Button
            variant="primary"
            size="medium"
            text="Agregar Vehículo"
            onClick={handleAbrirModal}
          />
        </div>

        {mostrarModal && (
          <div className="modal-vehiculos">
            <div className="modal-vehiculos-contenido">
              <button
                className="modal-vehiculos-cerrar"
                onClick={handleCerrarModal}
              >
                X
              </button>
              <h2>Agregar Nuevo Vehículo</h2>
              <form
                className="modal-vehiculos-formulario"
                onSubmit={handleAgregarVehiculo}
              >
                <div className="modal-vehiculos-campo">
                  <label htmlFor="numeroPlaca">Placa</label>
                  <input
                    id="numeroPlaca"
                    type="text"
                    name="numeroPlaca"
                    value={nuevoVehiculo.numeroPlaca}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-vehiculos-campo">
                  <label htmlFor="marca">Marca</label>
                  <input
                    id="marca"
                    type="text"
                    name="marca"
                    value={nuevoVehiculo.marca}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="modal-vehiculos-campo">
                  <label htmlFor="anno">Año</label>
                  <input
                    id="anno"
                    type="text"
                    name="anno"
                    value={nuevoVehiculo.anno}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-vehiculos-botones">
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    text="Agregar"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="medium"
                    text="Cancelar"
                    onClick={handleCerrarModal}
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MisVehiculos;
