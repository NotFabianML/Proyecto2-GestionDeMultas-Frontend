import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const CalendarioFecha = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    const manejarFecha = (fecha) => {
        setFechaSeleccionada(fecha);
    };

    const formatoFecha = (fecha) => {
        return fecha ? format(fecha, 'dd-MM-yyyy', { locale: es }) : ''; 
    };

    const estilos = {
        datePicker: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: 'white',
            cursor: 'pointer',
        },
    };

    return (
        <div>
            <DatePicker
                selected={fechaSeleccionada}
                onChange={manejarFecha}
                dateFormat="dd-MM-yyyy"
                placeholderText="Selecciona una fecha" 
                style={estilos.datePicker}
                popperPlacement="bottom" 
                locale={es} 
                className="date-picker" 
            />
            {fechaSeleccionada && <p>Fecha seleccionada: {formatoFecha(fechaSeleccionada)}</p>}
        </div>
    );
};

export default CalendarioFecha;
