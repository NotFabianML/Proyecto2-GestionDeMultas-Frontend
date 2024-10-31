import React, { useState } from 'react';
import './FormularioMulta.css';
import Button from '../../atoms/Button.jsx';
import Dropdown from '../../molecules/Dropdown.jsx';
import DropdownHora from '../../atoms/DropdownHora.jsx';
import CalendarioFecha from '../../atoms/CalendarioFecha.jsx';

const FormularioMulta = ({ mostrarNumMulta = true, mostrarBotones = true, dosBotones = true, textoBotonPrimario, textoBotonSecundario }) => {
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
                    <div><h2>Multa N°: 12345</h2></div>
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
                        />
                        {placaError && <span className="error">{placaError}</span>}
                    </div>
                </div>


                <p>Lugar de los hechos</p>
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" placeholder="0.000000" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="altitud">Altitud:</label>
                        <input type="text" id="altitud" name="altitud" placeholder="0.000000" />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="hora">Hora:</label>
                        <DropdownHora className="dropdownHora" id="hora" name="hora"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <CalendarioFecha className="fecha"id="fecha" name="fecha"/>
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="infraccion">Infracción cometida:</label>
                        <Dropdown id="infraccion" name="infraccion" />
                    </div>
                    
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="montoInfraccion">Monto de la Infracción:</label>
                        <input type="text" id="montoInfraccion" value={`₡ 300.000,00`} readOnly />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="descripcion">Descripción de los hechos:</label>
                        <textarea id="descripcion" name="descripcion" placeholder="Máximo 255 caracteres" maxLength="255"></textarea>
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
