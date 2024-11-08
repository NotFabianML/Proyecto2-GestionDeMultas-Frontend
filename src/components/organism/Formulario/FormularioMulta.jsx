import React, { useState, useEffect } from 'react';
import './FormularioMulta.css';
import Button from '../../atoms/Button.jsx';
import DropdownHora from '../../atoms/DropdownHora.jsx';
import CalendarioFecha from '../../atoms/CalendarioFecha.jsx';
import { getDateFromISO, getTimeFromISO } from '../../../utils/dateUtils.js';
import Select from 'react-select';
import { getInfracciones } from '../../../services/infraccionService.js';
import { createMulta } from '../../../services/multaServices.js';

const FormularioMulta = ({ mostrarNumMulta = true, mostrarBotones = true, dosBotones = true, textoBotonPrimario, textoBotonSecundario, soloLectura = false, multa }) => {
    const [cedulaError, setCedulaError] = useState('');
    const [placaError, setPlacaError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);
    const [infracciones, setInfracciones] = useState([]);
    const initialMultaState = {
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
        if(!soloLectura){
            getInfracciones().then((data) => {
                setInfracciones(data);
            });
        }
    }, [soloLectura]);

    const handleCedulaChange = (e) => {
        const value = e.target.value;
        setNuevaMulta((prev) => ({ ...prev, cedulaInfractor: e.target.value }))
        const cedulaRegex = /^\d{1}\d{3}\d{5}$/;
        if (!cedulaRegex.test(value)) {
            setCedulaError('Ingrese un número de cédula válido');
        } else {
            setCedulaError('');
        }
    };

    const handlePlacaChange = (e) => {
        const value = e.target.value;
        setNuevaMulta((prev) => ({ ...prev, numeroPlaca: e.target.value }))
        const placaRegex = /^[A-Za-z0-9]+$/;
        if (!placaRegex.test(value)) {
            setPlacaError('Ingrese un número de placa válido');
        } else {
            setPlacaError('');
        }
    };

    const getListaInfracciones = () => {
        if(soloLectura){
            return multa?.infracciones?.map((infraccion) => ({
                value: infraccion,
                label: infraccion.titulo + " - monto: " + infraccion.monto
            })) || [];
        } else {
            return infracciones.map((infraccion) => ({
                value: infraccion,
                label: infraccion.titulo + " - monto: " + infraccion.monto
            }));
        }
    };

    const handleSelectChange = (selected) => {
        if(!soloLectura) {
            setSelectedOptions(selected || []);
            setNuevaMulta((prev) => ({ ...prev, montoTotal: selected.reduce((acc, curr) => acc + curr.value.monto, 0)}))
            setMontoTotal(selected.reduce((acc, curr) => acc + curr.value.monto, 0));
            getMultaInfracciones(selected);
        }
    };

    const handlePrimaryClick =  async (e) => {
        e.preventDefault();
        if(soloLectura) {
            // TODO agregar logica del boton primario del juez
        } else {
            try {
                const data = await createMulta(nuevaMulta);
                setNuevaMulta(initialMultaState);
                setSelectedOptions([]);
                setMontoTotal(0);
            } catch (error) {
                console.error("Error al crear la multa:", error.message || error);
                if (error.response) {
                    console.error("Error details:", error.response.data);
                } else if (error.request) {
                    console.error("No response received:", error.request);
                }
            }
        }
    };

    const getMultaInfracciones = (selected) => {
        const listaInfracciones = selected.map((infraccion) => ( infraccion.value ));
        setNuevaMulta((prev) => ({ ...prev, infracciones: listaInfracciones }));
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
                            value={soloLectura ? multa?.cedulaInfractor: nuevaMulta.cedulaInfractor}
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
                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="latitud">Latitud:</label>
                        <input type="text"
                            id="latitud"
                            name="latitud"
                            placeholder="0.000000"
                            readOnly={soloLectura}
                            value={multa?.latitud}
                            //onChange={(e) => setNuevaMulta((prev) => ({ ...prev, latitud: e.target.value }))}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="altitud">Longitud:</label>
                        <input type="text"
                            id="altitud"
                            name="altitud"
                            placeholder="0.000000"
                            readOnly={soloLectura}
                            value={multa?.longitud}
                            //onChange={(e) => setNuevaMulta((prev) => ({ ...prev, longitud: e.target.value }))}
                        />
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
                        <Select
                            options={getListaInfracciones()}
                            isMulti
                            value={soloLectura ? getListaInfracciones() : selectedOptions}
                            onChange={handleSelectChange}
                            placeholder="Seleccione una infracción"
                        />
                        {/* <Dropdown id="infraccion" name="infraccion" disabled={soloLectura} options={soloLectura ? getListaInfracciones() : []} /> */}
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="montoTotal">Monto total:</label>
                        <input type="number"
                            id="montoTotal"
                            value={ soloLectura ?  multa?.montoTotal :  montoTotal }
                            readOnly
                        />
                    </div>
                </div>

                <div className="fila">
                    <div className="input-group">
                        <label htmlFor="descripcion">Descripción de los hechos:</label>
                        <textarea id="descripcion"
                            name="descripcion"
                            placeholder="Máximo 255 caracteres"
                            maxLength="255" readOnly={soloLectura}
                            value={soloLectura ? multa?.comentario : nuevaMulta.comentario} 
                            onChange={(e) => setNuevaMulta((prev) => ({ ...prev, comentario: e.target.value }))}
                        ></textarea>
                    </div>
                </div>

                {/* Botones */}
                {mostrarBotones && (
                    <div className="fila">
                        <Button variant="secondary" size="medium" text={textoBotonPrimario} onClick={handlePrimaryClick} />
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
