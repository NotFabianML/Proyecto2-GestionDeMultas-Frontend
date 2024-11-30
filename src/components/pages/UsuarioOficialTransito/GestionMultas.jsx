import React, { useState, useEffect } from 'react';
import './StylesOficial.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Select from 'react-select';
import { getMultasPorOficialId, getMultaById, updateMulta, deleteMulta} from '../../../services/multaServices.js'; // Asegúrate de tener la función getMultaPorId
import { useUserContext } from '../../../contexts/UserContext.jsx';
import { formatId } from '../../../utils/idFormatUtils.js';


const GestionMultas = () => {
    const [multas, setMultas] = useState([]);
    const [selectedMulta, setSelectedMulta] = useState(null);
    const [multaDetalles, setMultaDetalles] = useState(null);
    const { userId } = useUserContext();

    useEffect(() => {
        // Obtener las multas para el oficial con el ID especificado
        const fetchMultas = async () => {
            try {
                const data = await getMultasPorOficialId(userId);
                setMultas(data);
            } catch (error) {
                console.error('Error al obtener las multas:', error);
            }
        };

        fetchMultas();
    }, [userId]);

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

    const handleActualizarMulta = async (multaActualizada) => {
        try {
            console.log("entro a handle actualizar", multaActualizada);
            await updateMulta(multaActualizada.idMulta, multaActualizada);
            // Actualizar el listado de multas si quieres reflejar el cambio en el select
            const data = await getMultasPorOficialId(userId);
            setMultas(data);
        } catch (error) {
            console.error('Error al actualizar la multa:', error);
        }
    };  

    const handleEliminarMulta = async (multaEliminada) => {
        console.log(multaEliminada);
        if (!multaEliminada || !multaEliminada.idMulta) {
            console.error("La multa o el idMulta no están definidos.");
            return;
        }
        try {
            await deleteMulta(multaEliminada.idMulta);
            const data = await getMultasPorOficialId(userId);
            setMultas(data);
        } catch (error) {
            console.error("Error al eliminar la multa:", error);
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
                            options={multas.map(multa => ({ value: multa.idMulta, label: `Multa N°: ${formatId(multa.idMulta)}` }))}
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
                            onEliminarMulta={handleEliminarMulta}
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
