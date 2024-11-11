import React, { useState, useEffect } from 'react';
import './FormularioMulta.css';
import Button from '../../atoms/Button.jsx';
import DropdownHora from '../../atoms/DropdownHora.jsx';
import CalendarioFecha from '../../atoms/CalendarioFecha.jsx';
import { getDateFromISO, getTimeFromISO } from '../../../utils/dateUtils.js';
import Select from 'react-select';
import { getInfracciones } from '../../../services/infraccionService.js';
import { createMulta } from '../../../services/multaServices.js';
import MapPopup from '../MapPopUp.jsx';

const FormularioMulta = ({ mostrarNumMulta = true, mostrarBotones = true, dosBotones = true, textoBotonPrimario, textoBotonSecundario, soloLectura = false, mostrarSeleccionUbicacion = true, multa, onGuardarCambios }) => {
    const [cedulaError, setCedulaError] = useState('');
    const [placaError, setPlacaError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);
    const [infracciones, setInfracciones] = useState([]);
    const [isMapOpen, setIsMapOpen] = useState(false);
    const [position, setPosition] = useState({ lat: null, lng: null });

    const initialMultaState = multa || {
        cedulaInfractor: '',
        numeroPlaca: '',
        latitud: 0,
        longitud: 0,
        fechaHora: new Date().toISOString(),
        infracciones: [],
        montoTotal: 0,
        comentario: '',
        usuarioIdOficial: '8BE6F45C-7ACB-4AED-8A38-7B3A87C969B8',
        estado: 1,
    };
    const [nuevaMulta, setNuevaMulta] = useState(initialMultaState);

    useEffect(() => {
        if (multa) {
            setNuevaMulta(multa);
            setSelectedOptions(multa.infracciones?.map((infraccion) => ({ value: infraccion, label: infraccion.titulo + " - monto: " + infraccion.monto })));
            setMontoTotal(selectedOptions?.reduce((acc, curr) => acc + curr.value.monto, 0));

        }
    }, [multa]);

    const handlePrimaryClick = async (e) => {
        e.preventDefault();
        if (textoBotonPrimario === "Guardar cambios") {
            // Lógica para actualizar la multa
            try {
                await onGuardarCambios(nuevaMulta);
                alert("Cambios realizados con éxito"); // Mensaje limpio
            } catch (error) {
                console.error("Error al actualizar la multa:", error);
                alert("Hubo un error al actualizar la multa.");
            }
        } else {
            // Lógica para crear la multa
            try {
                const data = await createMulta(nuevaMulta);
                setNuevaMulta(initialMultaState); // Restablecer el estado de la multa
                setSelectedOptions([]); // Limpiar las opciones seleccionadas
                setMontoTotal(0); // Restablecer el monto total
                alert("Multa creada con éxito"); // Mensaje limpio
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
    
    useEffect(() => {
        if(!soloLectura){
            getInfracciones().then((data) => {
                setInfracciones(data);
            });
        }
    }, [soloLectura]);
    
    const handleMapClick = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setPosition({ lat, lng });
        setNuevaMulta((prev) => ({ ...prev, latitud: lat, longitud: lng }));
    };

    const handleCedulaChange = (e) => {
        const value = e.target.value;
        setNuevaMulta((prev) => ({ ...prev, cedulaInfractor: e.target.value }));
        const cedulaRegex = /^\d{1}\d{3}\d{5}$/;
        setCedulaError(!cedulaRegex.test(value) ? 'Ingrese un número de cédula válido' : '');
    };

    const handlePlacaChange = (e) => {
        const value = e.target.value;
        setNuevaMulta((prev) => ({ ...prev, numeroPlaca: e.target.value }));
        const placaRegex = /^[A-Za-z0-9]+$/;
        setPlacaError(!placaRegex.test(value) ? 'Ingrese un número de placa válido' : '');
    };

    const handleSelectChange = (selected) => {
        if(!soloLectura) {
            setSelectedOptions(selected || []);
            setMontoTotal(selected.reduce((acc, curr) => acc + curr.value.monto, 0));
            setNuevaMulta((prev) => ({
                ...prev,
                infracciones: selected.map((infraccion) => infraccion.value),
                montoTotal: selected.reduce((acc, curr) => acc + curr.value.monto, 0),
            }));
        }
    };

    const getMultaInfracciones = (selected) => {
        const listaInfracciones = selected.map((infraccion) => ( infraccion.value ));
        setNuevaMulta((prev) => ({ ...prev, infracciones: listaInfracciones }));
    };

    // Función para formatear el monto en colones
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CR', {
            style: 'currency',
            currency: 'CRC',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="formulario-container">
            <form className="formulario-multa" onSubmit={(e) => e.preventDefault()}>
                {mostrarNumMulta && (
                    <div><h2>{"Multa N°: " + multa?.idMulta} </h2></div>
                )}

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="cedula">Cédula del infractor:</label>
                        <input
                            type="text"
                            id="cedula"
                            name="cedula"
                            value={soloLectura ? multa?.cedulaInfractor : nuevaMulta.cedulaInfractor}
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
                            placeholder="ABC123"
                            readOnly={soloLectura}
                        />
                        {placaError && <span className="error">{placaError}</span>}
                    </div>
                </div>

                <p>Lugar de los hechos</p>
                {mostrarSeleccionUbicacion && (
                    <Button variant="primary" text="Seleccionar Ubicación" onClick={() => setIsMapOpen(true)} />
                )}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input
                            type="text"
                            id="latitud"
                            value={position.lat !== null ? position.lat : nuevaMulta.latitud}
                            readOnly
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="longitud">Longitud:</label>
                        <input
                            type="text"
                            id="longitud"
                            value={position.lng !== null ? position.lng : nuevaMulta.longitud}
                            readOnly
                        />
                    </div>
                </div>

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
                        <DropdownHora className="dropdownHora" id="hora" name="hora" disabled={soloLectura} hora={getTimeFromISO(multa?.fechaHora ? multa?.fechaHora : new Date())} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <CalendarioFecha className="fecha" id="fecha" name="fecha" disabled={soloLectura} fecha={getDateFromISO(multa?.fechaHora ? multa?.fechaHora : new Date())} />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="infraccion">Infracción cometida:</label>
                        <Select
                            options={infracciones.map((infraccion) => ({
                                value: infraccion,
                                label: `${infraccion.titulo} - monto: ${infraccion.monto}`
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
                            value={formatCurrency(montoTotal)}
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
                            value={nuevaMulta.comentario}
                            onChange={(e) => setNuevaMulta((prev) => ({ ...prev, comentario: e.target.value }))}
                        ></textarea>
                    </div>
                </div>

                {mostrarBotones && (
                    <div className="fila-botones">
                        <Button variant="secondary" size="medium" text={textoBotonPrimario} onClick={(e) => e.preventDefault()} />
                        {dosBotones && (
                            <Button variant="secondary" size="medium" text={textoBotonSecundario} />
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormularioMulta;
