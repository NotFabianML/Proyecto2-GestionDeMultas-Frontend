import React, { useState, useEffect } from 'react';
import './StylesOficial.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Select from 'react-select';
import { getMultasPorOficialId, getMultaById, updateMulta } from '../../../services/multaServices.js'; // Asegúrate de tener la función getMultaPorId

const GestionMultas = () => {
    const [multas, setMultas] = useState([]);
    const [selectedMulta, setSelectedMulta] = useState(null);
    const [multaDetalles, setMultaDetalles] = useState(null); // Nuevo estado para los detalles de la multa

    // Usar el ID de oficial fijo para la prueba
    const oficialId = '5904AA06-6260-4374-8424-C8CDFD762456';

    useEffect(() => {
        // Obtener las multas para el oficial con el ID especificado
        const fetchMultas = async () => {
            try {
                const data = await getMultasPorOficialId(oficialId);
                setMultas(data);
            } catch (error) {
                console.error('Error al obtener las multas:', error);
            }
        };

        fetchMultas();
    }, [oficialId]);

    // Función para obtener los detalles de la multa seleccionada
    useEffect(() => {
        if (selectedMulta) {
            const fetchMultaDetalles = async () => {
                try {
                    const data = await getMultaById(selectedMulta.value); // Usa el ID de la multa seleccionada
                    setMultaDetalles(data);
                } catch (error) {
                    console.error('Error al obtener los detalles de la multa:', error);
                }
            };

            fetchMultaDetalles();
        }
    }, [selectedMulta]);

    const handleSelectChange = (selectedOption) => {
        setSelectedMulta(selectedOption); // Cambiar multa seleccionada
        setMultaDetalles(null); // Limpiar los detalles de la multa anterior
    };

    // Método para actualizar la multa
    const handleActualizarMulta = async (multaActualizada) => {
        try {
            console.log(multaActualizada);
            await updateMulta(multaActualizada.idMulta, multaActualizada);
            // Opcional: Actualizar el listado de multas si quieres reflejar el cambio en el select
            const data = await getMultasPorOficialId(oficialId);
            setMultas(data);
        } catch (error) {
            console.error('Error al actualizar la multa:', error);
        }
    };  


    return (
        <div className="estilos-oficial">
            <header>
                <OficialNavbar />
            </header>

            <h1>Gestión de Multas</h1>
            <div className="pantalla-dividida">
                {/* Columna Izquierda */}
                <div className="columna-izquierda">
                    <div className="input-group">
                        <label htmlFor="numeroMulta">Número de multa:</label>
                        <Select
                            id="numeroMulta"
                            name="numeroMulta"
                            options={multas.map(multa => ({ value: multa.idMulta, label: `Multa N°: ${multa.idMulta}` }))}
                            value={selectedMulta}
                            onChange={handleSelectChange}
                            placeholder="Seleccione una multa"
                        />
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="columna-derecha">
                    {multaDetalles && (
                        <FormularioMulta
                            mostrarNumMulta={true}
                            mostrarBotones={true}
                            dosBotones={true}
                            textoBotonPrimario="Guardar cambios"
                            textoBotonSecundario="Eliminar multa"
                            multa={multaDetalles} // Pasas los detalles completos de la multa al formulario
                            onGuardarCambios={handleActualizarMulta}
                        />
                    )}
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default GestionMultas;
