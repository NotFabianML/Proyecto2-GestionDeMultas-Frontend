import React, { useState } from 'react';

const DropdownHora = ({ disabled = false, hora = '' }) => {
    const [horaSeleccionada, setHoraSeleccionada] = useState(hora);

    const generarHoras = () => {
        const horas = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const formatoHora = `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
                horas.push(formatoHora);
            }
        }
        return horas;
    };

    const horas = generarHoras();

    const manejarSeleccion = (event) => {
        setHoraSeleccionada(event.target.value);
    };

    const estilos = {
        dropdown: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: 'white',
            color: 'black',
            appearance: 'none',
            backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\'><polyline points=\'6 9 12 15 18 9\' /></svg>")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            backgroundSize: '12px',
            opacity: disabled ? 1 : undefined, 
        },
    };

    return (
        <div>
            <select
                id="hora-dropdown"
                value={horaSeleccionada}
                onChange={manejarSeleccion}
                style={estilos.dropdown}
                disabled={disabled}
            >
                <option value="" disabled>Selecciona una hora</option>
                {horas.map((hora, index) => (
                    <option key={index} value={hora}>{hora}</option>
                ))}
            </select>
        </div>
    );
};

export default DropdownHora;
