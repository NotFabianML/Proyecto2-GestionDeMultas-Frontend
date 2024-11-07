import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarioFecha.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarioFecha = ({ disabled = false, fecha =  '' }) => {
    const initialDate = fecha ? new Date(fecha) : null;

    const [fechaSeleccionada, setFechaSeleccionada] = useState(initialDate);

    const manejarFecha = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    return (
        <DatePicker
            selected={fechaSeleccionada}
            onChange={manejarFecha}
            dateFormat="dd-MM-yyyy"
            placeholderText="Selecciona una fecha"
            popperPlacement="bottom"
            locale={es}
            className="date-picker"
            disabled={disabled}
        />
    );
};

export default CalendarioFecha;
