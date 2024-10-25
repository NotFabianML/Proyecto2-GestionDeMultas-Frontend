import React from 'react';
import './CrearMulta.css'; // Importamos el archivo de estilos

const CrearMulta = () => {
    return (
        <div className="crear-multa">
            <h1>Crear Multa</h1>
            <form className="formulario-multa">
                {/* Primera fila: Cedula del infractor y Número de placa */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="cedula">Cédula del infractor:</label>
                        <input type="text" id="cedula" name="cedula" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="placa">Número de placa:</label>
                        <input type="text" id="placa" name="placa" />
                    </div>
                </div>

                {/* Segunda fila: Latitud y Altitud */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text" id="latitud" name="latitud" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="altitud">Altitud:</label>
                        <input type="text" id="altitud" name="altitud" />
                    </div>
                </div>

                {/* Tercera fila: Hora y Fecha */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="hora">Hora:</label>
                        <input type="text" id="hora" name="hora" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="fecha">Fecha:</label>
                        <input type="text" id="fecha" name="fecha" />
                    </div>
                </div>

                {/* Cuarta fila: Infracción cometida */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="infraccion">Infracción cometida:</label>
                        <input type="text" id="infraccion" name="infraccion" />
                    </div>
                </div>

                {/* Quinta fila: Descripción de los hechos */}
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="descripcion">Descripción de los hechos:</label>
                        <textarea id="descripcion" name="descripcion" placeholder="Máximo 255 caracteres" maxLength="255"></textarea>
                    </div>
                </div>

                {/* Botón de Crear Multa */}
                <div className="fila">
                    <button type="submit">Crear Multa</button>
                </div>
            </form>
        </div>
    );
};

export default CrearMulta;
