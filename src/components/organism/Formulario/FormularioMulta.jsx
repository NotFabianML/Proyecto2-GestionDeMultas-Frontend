import React, { useState } from 'react';
import './FormularioMulta.css';
import Button from '../../atoms/Button.jsx';
import Dropdown from '../../molecules/Dropdown.jsx';
import DropdownHora from '../../atoms/DropdownHora.jsx';
import CalendarioFecha from '../../atoms/CalendarioFecha.jsx';
import { getDateFromISO, getTimeFromISO } from '../../../utils/dateUtils.js';

const FormularioMulta = ({ mostrarNumMulta = true, mostrarBotones = true, dosBotones = true, textoBotonPrimario, textoBotonSecundario, soloLectura = false, multa }) => {
    const [cedula, setCedula] = useState('');
    const [placa, setPlaca] = useState('');

    const [cedulaError, setCedulaError] = useState('');
    const [placaError, setPlacaError] = useState('');

    const handleCedulaChange = (e) => {
        const value = e.target.value;
        setCedula(value);
        const cedulaRegex = /^\d{1}\d{3}\d{5}$/;
        if (!cedulaRegex.test(value)) {
            setCedulaError('Ingrese un número de cédula válido');
        } else {
            setCedulaError('');
        }
    };

    const handlePlacaChange = (e) => {
        const value = e.target.value;
        setPlaca(value);
        const placaRegex = /^[A-Za-z0-9]+$/;
        if (!placaRegex.test(value)) {
            setPlacaError('Ingrese un número de placa válido');
        } else {
            setPlacaError('');
        }
    };

    return (
        <div className="formulario-container">
            <form className="formulario-multa">
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
                            value={cedula}
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
                            value={placa}
                            onChange={handlePlacaChange}
                            placeholder="ABC123"
                            readOnly={soloLectura}
                        />
                        {placaError && <span className="error">{placaError}</span>}
                    </div>
                </div>

                <p>Lugar de los hechos</p>
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" placeholder="0.000000" readOnly={soloLectura} value={multa?.latitud} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="altitud">Longitud:</label>
                        <input type="text" id="altitud" name="altitud" placeholder="0.000000" readOnly={soloLectura} value={multa?.longitud} />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="hora">Hora:</label>
                        <DropdownHora className="dropdownHora" id="hora" name="hora" disabled={soloLectura} hora={getTimeFromISO(multa?.fechaHora ? multa?.fechaHora : new Date() )} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <CalendarioFecha className="fecha" id="fecha" name="fecha" disabled={soloLectura} fecha={getDateFromISO(multa?.fechaHora ? multa?.fechaHora : new Date() )} />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="infraccion">Infracción cometida:</label>
                        <Dropdown id="infraccion" name="infraccion" disabled={soloLectura} />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="montoInfraccion">Monto de la Infracción:</label>
                        <input type="text" id="montoInfraccion" value={ multa?.montoTotal ?  multa?.montoTotal :  `₡ 300.000,00`} readOnly />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="descripcion">Descripción de los hechos:</label>
                        <textarea id="descripcion" name="descripcion" placeholder="Máximo 255 caracteres" maxLength="255" readOnly={soloLectura} value={multa?.comentario}></textarea>
                    </div>
                </div>

                {/* Botones */}
                {mostrarBotones && (
                    <div className="fila">
                        <Button variant="secondary" size="medium" text={textoBotonPrimario} />
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
