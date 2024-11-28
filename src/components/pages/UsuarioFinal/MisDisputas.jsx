import React, { useEffect, useState } from 'react';
import './MisDisputas.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getDisputasPorUsuario } from '../../../services/disputaService';
import { getUsuarioById } from '../../../services/usuarioService';
import { useUserContext } from '../../../contexts/UserContext.jsx';
import { formatId } from '../../../utils/idFormatUtils.js';
import { getEstadoDisputa } from '../../../utils/disputaUtils.js';
import { sendEmail } from '../../../services/authService.js';


const MisDisputas = () => {
    const [disputas, setDisputas] = useState([]);
    const [juezNombres, setJuezNombres] = useState({}); // Estado para almacenar nombres de jueces
    const [error, setError] = useState(null);

    // Desestructurar funciones de UserContext
    const { userId } = useUserContext();

    console.log(userId);

    // useEffect(() => {
    //     getDisputasPorUsuario(userId)
    //     .then((data) => {
    //         setDisputas(data);
    //     })
    //     .catch((error) => {
    //         setError(`Error: ${error.message}`);
    //     });
    // }, [userId]);

    useEffect(() => {
        getDisputasPorUsuario(userId)
            .then(async (data) => {
                setDisputas(data);
                setError(null);
                // Obtener nombres de jueces
                const nombres = {};
                for (const disputa of data) {
                    if (disputa.juezId) {
                        try {
                            const juez = await getUsuarioById(disputa.juezId);
                            nombres[disputa.juezId] = `${juez.nombre} ${juez.apellido1} ${juez.apellido2 || ''}`.trim();
                            await notificarUsuariosDisputa(disputa, juez);
                        } catch (error) {
                            console.error(`Error al obtener juez con ID ${disputa.juezId}:`, error);
                        }
                    }
                }
                setJuezNombres(nombres);
            })
            .catch((error) => {
                console.error('Error al obtener disputas:', error);
                setError(`Error: ${error.message}`);
            });
    }, [userId]);

    // Función para enviar notificación de disputa
const notificarUsuariosDisputa = async (disputa, juez) => {
    const usuariosInvolucrados = disputa.usuarios || []; // Lista de usuarios en la disputa
    const detallesUsuarios = usuariosInvolucrados
        .map((usuario) => `- ${usuario.nombre} ${usuario.apellido1} ${usuario.apellido2 || ''} (${usuario.email})`)
        .join('\n');

    const juezNombre = `${juez.nombre} ${juez.apellido1} ${juez.apellido2 || ''}`;
    const message = `
    Hola,

    Se te notifica que estás involucrado en una disputa asignada. Aquí tienes los detalles:

    - Número de Disputa: ${disputa.id}
    - Descripción: ${disputa.descripcion || "No especificada"}
    - Juez Asignado: ${juezNombre}
    - Usuarios Involucrados:
    ${detallesUsuarios}
    `;

    try {
        for (const usuario of usuariosInvolucrados) {
            await sendEmail(usuario.email, message);
        }
        console.log('Notificaciones enviadas correctamente.');
    } catch (error) {
        console.error('Error al enviar notificaciones:', error);
    }
};

    return (
        <div className="container-disputas">
            <UsuarioNavbar />
            <h1>Mis Disputas</h1>
            <p className="textoIn">Selecciona una disputa ...</p>

            <div className='main-container'>
                <div className="grid-container">
                    {error ? (
                        <p className="error-message">* No se encontraron disputas para el usuario especificado</p>
                    ) : disputas.length > 0 ? (
                        disputas.map((disputa) => (
                            <div key={disputa.idDisputa} className="card">
                                <div className="infoDisputa">
                                    <p><strong>ID Disputa:</strong> {formatId(disputa.idDisputa)}</p>
                                    <p><strong>ID Multa:</strong> {formatId(disputa.multaId)}</p>
                                    <p><strong>Juez Asignado:</strong> {juezNombres[disputa.juezId] || 'No asignado'}</p>
                                    <p><strong>Fecha de Creación:</strong> {new Date(disputa.fechaCreacion).toLocaleDateString()}</p>
                                    <p><strong>Motivo:</strong> {disputa.motivoReclamo}</p>
                                    <p><strong>Estado:</strong> {getEstadoDisputa(disputa.estado)}</p>
                                    <p><strong>Resolución Juez:</strong> {disputa.resolucionJuez || 'Pendiente'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-disputas-message">El usuario no tiene disputas abiertas.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MisDisputas;
