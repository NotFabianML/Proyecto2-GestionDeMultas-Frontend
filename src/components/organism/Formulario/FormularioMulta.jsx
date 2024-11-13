import React, { useState, useEffect } from "react";
import "./FormularioMulta.css";
import Button from "../../atoms/Button.jsx";
import DropdownHora from "../../atoms/DropdownHora.jsx";
import CalendarioFecha from "../../atoms/CalendarioFecha.jsx";
import { getDateFromISO, getTimeFromISO } from "../../../utils/dateUtils.js";
import Select from "react-select";
import { asignarInfraccionAMulta, getInfracciones } from "../../../services/infraccionService.js";
import { createMulta } from "../../../services/multaServices.js";
import MapPopup from "../MapPopUp.jsx";
import { useUserContext } from "../../../contexts/UserContext.jsx";

const FormularioMulta = ({  mostrarNumMulta = true,  mostrarBotones = true,  dosBotones = true,  textoBotonPrimario, textoBotonSecundario,   soloLectura = false,   multa,  onGuardarCambios, onEliminarMulta }) => {

  const { userId } = useUserContext();
  const [cedulaError, setCedulaError] = useState("");
  const [placaError, setPlacaError] = useState("");
  const [latLngError, setLatLngError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [montoTotal, setMontoTotal] = useState(0);
  const [infracciones, setInfracciones] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [position, setPosition] = useState({ lat: null, lng: null });

  const initialMultaState = multa || {
    numeroPlaca: "",
    cedulaInfractor: "",
    usuarioIdOficial: userId,
    fechaHora: new Date().toISOString(),
    latitud: 0,
    longitud: 0,
    comentario: "",
    estado: 1,
    infracciones: [],
  };
  const [nuevaMulta, setNuevaMulta] = useState(initialMultaState);

  useEffect(() => {
    if (!soloLectura) {
      getInfracciones().then((data) => setInfracciones(data));
    }
  }, [soloLectura]);

  useEffect(() => {
    if (multa) {
      setNuevaMulta({
        ...multa,
        latitud: multa.latitud || 0,
        longitud: multa.longitud || 0
    });
        setSelectedOptions(multa.infracciones?.map((infraccion) => ({ value: infraccion, label: infraccion.titulo + " - monto: " + infraccion.monto })));
        setMontoTotal(multa.montoTotal);
        setPosition({ lat: multa.latitud, lng: multa.longitud });
    }
  }, [multa]);

  const handleCedulaChange = (e) => {
    const value = e.target.value;
    setNuevaMulta((prev) => ({ ...prev, cedulaInfractor: value }));
    setCedulaError(
      !/^\d{1}\d{3}\d{5}$/.test(value)
        ? "Ingrese un número de cédula válido"
        : ""
    );
  };

  const handlePlacaChange = (e) => {
    const value = e.target.value;
    setNuevaMulta((prev) => ({ ...prev, numeroPlaca: value }));
    setPlacaError(
      !/^[A-Za-z0-9]+$/.test(value) ? "Ingrese un número de placa válido" : ""
    );
  };

  const handleMapClick = (e) => {
    const lat = parseFloat(e.latLng.lat().toFixed(4));
    const lng = parseFloat(e.latLng.lng().toFixed(4));
    setPosition({ lat, lng });
    setNuevaMulta((prev) => ({ ...prev, latitud: lat, longitud: lng }));
    setLatLngError("");
  };

  const handleClearLocation = () => {
    setPosition({ lat: null, lng: null });
    setNuevaMulta((prev) => ({ ...prev, latitud: 0, longitud: 0 }));
  };

  const handleSelectChange = (selected) => {
    if (!soloLectura) {
      setSelectedOptions(selected || []);
      const totalMonto = selected.reduce((acc, curr) => acc + curr.value.monto, 0);
      setMontoTotal(totalMonto);
      setNuevaMulta((prev) => ({
        ...prev,
        infracciones: selected.map((infraccion) => infraccion.value.idInfraccion),
        montoTotal: totalMonto,
      }));
    }
  };

  const validateForm = () => {
    if (!position.lat || !position.lng) {
      setLatLngError("Debe seleccionar una ubicación.");
      return false;
    }
    return true;
  };

  const handlePrimaryClick = async (e) => {
    e.preventDefault();
    if (textoBotonPrimario === "Guardar cambios") {
      // Lógica para actualizar la multa
      try {
          await onGuardarCambios(nuevaMulta);
          limpiarFormulario();
          alert("Cambios realizados con éxito"); // Mensaje limpio
      } catch (error) {
          console.error("Error al actualizar la multa:", error);
          alert("Hubo un error al actualizar la multa.");
      }
    } else {
      if (!validateForm()) return;

      const multaData = {
        numeroPlaca: nuevaMulta.numeroPlaca,
        cedulaInfractor: nuevaMulta.cedulaInfractor,
        usuarioIdOficial: userId,
        fechaHora: nuevaMulta.fechaHora,
        latitud: nuevaMulta.latitud,
        longitud: nuevaMulta.longitud,
        comentario: nuevaMulta.comentario,
        estado: nuevaMulta.estado,
      };
  
      try {
        const nuevaMultaResponse = await createMulta(multaData);
        const multaId = nuevaMultaResponse.idMulta;
  
        // Asigna cada infracción seleccionada a la multa
        for (const idInfraccion of nuevaMulta.infracciones) {
          await asignarInfraccionAMulta(multaId, idInfraccion);
        }
  
         limpiarFormulario();
        alert("Multa creada con éxito");
      } catch (error) {
        console.error("Error al crear la multa:", error.message || error);
        if (error.response) {
            console.error("Error details:", error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        }
        alert("Hubo un error al crear la multa.");
      }
    }
  };

  const handleSecondaryClick = async (e) => {
    e.preventDefault();
    if (onEliminarMulta) {
      try {
        await onEliminarMulta(nuevaMulta);
        alert("Multa eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la multa:", error);
        alert("Hubo un error al eliminar la multa.");
      }
      limpiarFormulario();
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const limpiarFormulario = () => {
    const multaVacia =  {
      numeroPlaca: "",
      cedulaInfractor: "",
      usuarioIdOficial: userId,
      fechaHora: new Date().toISOString(),
      latitud: 0,
      longitud: 0,
      comentario: "",
      estado: 1,
      infracciones: [],
    };
    setNuevaMulta(multaVacia);
    setSelectedOptions([]);
    setMontoTotal(0);
    setPosition({ lat: null, lng: null });
  }

  return (
    <div className="formulario-container">
      <form className="formulario-multa" onSubmit={handlePrimaryClick}>
        {mostrarNumMulta && (
          <h2>{"Multa N°: " + (multa?.idMulta || "Nueva")}</h2>
        )}

  	    <div className="fila">
          <div className="input-group">
            <label htmlFor="cedula">Cédula del infractor:</label>
            <input
              type="text"
              id="cedula"
              name="cedula"
              value={
                soloLectura
                  ? multa?.cedulaInfractor
                  : nuevaMulta.cedulaInfractor
              }
              onChange={handleCedulaChange}
              placeholder="0-0000-0000"
              readOnly={soloLectura}
            />
            {cedulaError && <span className="error">{cedulaError}</span>}
          </div>
          <div className="input-group">
            <label htmlFor="placa">Número de placa:</label>
            <input
              type="text"
              id="placa"
              name="placa"
              value={soloLectura ? multa?.numeroPlaca : nuevaMulta.numeroPlaca}
              onChange={handlePlacaChange}
              placeholder="xxxxxx"
              readOnly={soloLectura}
            />
            {placaError && <span className="error">{placaError}</span>}
          </div>
        </div>

        <p>Lugar de los hechos</p>
        <div className="fila-botones">
          <Button
            variant="lightGrey"
            text="Eliminar Ubicación"
            onClick={handleClearLocation}
          />
          <Button
            variant="secondary"
            text="Seleccionar Ubicación"
            onClick={() => setIsMapOpen(true)}
          />
        </div>

        <div className="fila">
          <div className="input-group">
            <label htmlFor="latitud">Latitud:</label>
            <input
              type="text"
              id="latitud"
              name="latitud"
              value={position.lat || ""}
              readOnly
            />
          </div>
          <div className="input-group">
            <label htmlFor="longitud">Longitud:</label>
            <input
              type="text"
              id="longitud"
              name="longitud"
              value={position.lng || ""}
              readOnly
            />
          </div>
        </div>
        {latLngError && <span className="error">{latLngError}</span>}

        {isMapOpen && (
          <MapPopup
            onClose={() => setIsMapOpen(false)}
            onMapClick={handleMapClick}
            position={position}
          />
        )}

        <div className="fila">
          <div className="input-group">
            <label htmlFor="hora">Hora:</label>
            <DropdownHora
              className="dropdownHora"
              id="hora"
              name="hora"
              disabled={soloLectura}
              hora={getTimeFromISO(multa?.fechaHora || nuevaMulta.fechaHora)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="fecha">Fecha:</label>
            <CalendarioFecha
              className="fecha"
              id="fecha"
              name="fecha"
              disabled={soloLectura}
              fecha={getDateFromISO(multa?.fechaHora || nuevaMulta.fechaHora)}
            />
          </div>
        </div>

        <div className="fila">
          <div className="input-group">
            <label htmlFor="infraccion">Infracción cometida:</label>
            <Select
              options={infracciones.map((infraccion) => ({
                value: infraccion,
                label: `${infraccion.titulo} - monto: ${infraccion.monto}`,
              }))}
              isMulti
              value={selectedOptions}
              onChange={handleSelectChange}
              placeholder="Seleccione una infracción"
              isDisabled={soloLectura}
            />
          </div>
        </div>

        <div className="fila">
          <div className="input-group">
            <label htmlFor="montoTotal">Monto total:</label>
            <input
              type="text"
              id="montoTotal"
              value={soloLectura ? formatCurrency(multa?.montoTotal) : formatCurrency(montoTotal)}
              readOnly
            />
          </div>
        </div>

        <div className="fila">
          <div className="input-group">
            <label htmlFor="descripcion">Descripción de los hechos:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Máximo 255 caracteres"
              maxLength="255"
              readOnly={soloLectura}
              value={soloLectura ? multa?.comentario : nuevaMulta.comentario}
              onChange={(e) =>
                setNuevaMulta((prev) => ({
                  ...prev,
                  comentario: e.target.value,
                }))
              }
            ></textarea>
          </div>
        </div>

        {mostrarBotones && (
          <div className="fila-botones">
            <Button
              variant="secondary"
              size="medium"
              text={textoBotonPrimario}
              onClick={handlePrimaryClick}
            />
            {dosBotones && (
              <Button
                variant="secondary"
                size="medium"
                text={textoBotonSecundario}
                onClick={handleSecondaryClick}
              />
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default FormularioMulta;
