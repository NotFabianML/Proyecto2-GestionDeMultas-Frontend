import React from 'react';
import './FormularioMulta.css';
import Button from '../../atoms/Button.jsx';
import Dropdown from '../../molecules/Dropdown.jsx';

const FormularioMulta = ({ mostrarNumMulta = true, mostrarBotones = true, dosBotones = true, textoBotonPrimario, textoBotonSecundario }) => {
    return (
        <div className="formulario-container">
            <form className="formulario-multa">
                {mostrarNumMulta && (
                <div><h2>Multa N°: 12345</h2></div>
                )}

                {/* Primera fila: Cedula del infractor y Número de placa */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="cedula">Cédula del infractor:</label>
                        <input type="text" id="cedula" name="cedula" placeholder="0-0000-0000"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="placa">Número de placa:</label>
                        <input type="text" id="placa" name="placa" placeholder="ABC123"/>
                    </div>
                </div>

                {/* Segunda fila: Latitud y Altitud */}
                <p>Lugar de los hechos</p>
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" placeholder="0.000000"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="altitud">Altitud:</label>
                        <input type="text" id="altitud" name="altitud" placeholder="0.000000"/>
                    </div>
                </div>

                {/* Tercera fila: Hora y Fecha */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="hora">Hora:</label>
                        <input type="text" id="hora" name="hora" placeholder="HH:MM"/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="text" id="fecha" name="fecha"/>
                    </div>
                </div>

                {/* Cuarta fila: Infracción cometida */}
                <div className="fila">
                    
                    <div className="input-group">
                    
                        <label htmlFor="infraccion">Infracción cometida:</label>
                        <Dropdown id="infraccion" name="infraccion" ></Dropdown>
                    </div>
                </div>

                {/* Quinta fila: Descripción de los hechos */}
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
