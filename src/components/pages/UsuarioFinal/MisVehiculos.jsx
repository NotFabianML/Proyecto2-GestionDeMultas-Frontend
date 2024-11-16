import React, { useEffect, useState } from 'react';
import './MisVehiculos.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { getVehiculosPorUsuario } from '../../../services/vehiculoService';
import FiltroInput from '../../layouts/FiltroInput.jsx';
import Button from '../../atoms/Button.jsx';
import Paginador from '../../layouts/Paginador.jsx';
import { useNavigate } from 'react-router-dom';
import { createVehiculo } from '../../../services/vehiculoService';
import { useUserContext } from '../../../contexts/UserContext.jsx';


const MisVehiculos = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [mostrarModal, setMostrarModal] = useState(false); // Para el modal de creación de vehículos
    const [nuevoVehiculo, setNuevoVehiculo] = useState({ numeroPlaca: '', marca: '', anno: '' }); // Datos del nuevo vehículo
    const elementosPorPagina = 10;
    const navigate = useNavigate();
    
    // Desestructurar funciones de UserContext
    const { userId } = useUserContext();

    console.log(userId);

    useEffect(() => {
        getVehiculosPorUsuario(userId)
        .then((data) => {
            setVehiculos(data);
        })
        .catch((error) => {
            setError(`Error: ${error.message}`);
        });
    }, [userId]);

    const handleVerDetalles = (vehiculo) => {
        navigate(`/detalle-vehiculo`, { state: { idVehiculo: vehiculo.idVehiculo } });
    };

    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleCerrarModal = () => {
        setMostrarModal(false);
        setNuevoVehiculo({ numeroPlaca: '', marca: '', anno: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoVehiculo({ ...nuevoVehiculo, [name]: value });
    };

    const handleAgregarVehiculo = async (e) => {
        e.preventDefault();
        try {
            const vehiculoCreado = await createVehiculo({
                ...nuevoVehiculo,
                userId
            });
            setVehiculos([...vehiculos, vehiculoCreado]); // Agregar el nuevo vehículo a la lista
            handleCerrarModal(); // Cerrar el modal
        } catch (error) {
            setError(`Error al crear el vehículo: ${error.message}`);
        }
    };

    const vehiculosFiltrados = vehiculos.filter(vehiculo =>
        Object.values(vehiculo).some(value =>
            value.toString().toLowerCase().includes(filtro.toLowerCase())
        )
    );

    const indiceUltimoElemento = paginaActual * elementosPorPagina;
    const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
    const vehiculosActuales = vehiculosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

    const totalPaginas = Math.ceil(vehiculosFiltrados.length / elementosPorPagina);

    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
    };

    return (
        <div className="mis-vehiculos">
            <header>
                <UsuarioNavbar />
            </header>

            <main>
                <h1>Mis Vehículos</h1>

                <div className="filtro-container">
                    <FiltroInput 
                        placeholder="Filtrar Vehículos" 
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)} 
                    />
                    <div><i className="fas fa-search search-icon"></i></div>
                </div>

                <div className="contenedor-tabla">
                    <table className="tabla">
                        <thead>
                            <tr className="menu">
                                <th>ID Vehículo</th>
                                <th>Placa</th>
                                <th>Marca</th>
                                <th>Año</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiculosFiltrados.length > 0 ? (
                                vehiculosActuales.map((vehiculo) => (
                                    <tr key={vehiculo.idVehiculo}>
                                        <td>{vehiculo.idVehiculo}</td>
                                        <td>{vehiculo.numeroPlaca}</td>
                                        <td>{vehiculo.marca}</td>
                                        <td>{vehiculo.anno || 'No asignado'}</td>
                                        <td className="buttonLink">
                                            <Button 
                                                variant="secondary" 
                                                size="medium" 
                                                text="Ver detalles" 
                                                onClick={() => handleVerDetalles(vehiculo)} 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>
                                        No tienes vehículos registrados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {vehiculosFiltrados.length > 0 && (
                    <Paginador 
                        totalPaginas={totalPaginas} 
                        paginaActual={paginaActual} 
                        cambiarPagina={cambiarPagina} 
                    />
                )}

                {/* Botón para agregar vehículo */}
                <div className="agregar-vehiculo-container">
                    <Button 
                        variant="primary" 
                        size="medium" 
                        text="Agregar Vehículo" 
                        onClick={handleAbrirModal} 
                    />
                </div>

                {/* Modal para agregar vehículo */}
                {mostrarModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Agregar Nuevo Vehículo</h2>
                            <form onSubmit={handleAgregarVehiculo}>
                                <label>
                                    Placa:
                                    <input
                                        type="text"
                                        name="numeroPlaca"
                                        value={nuevoVehiculo.numeroPlaca}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Marca:
                                    <input
                                        type="text"
                                        name="marca"
                                        value={nuevoVehiculo.marca}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Año:
                                    <input
                                        type="text"
                                        name="anno"
                                        value={nuevoVehiculo.anno}
                                        onChange={handleInputChange}
                                    />
                                </label>
                                <div className="modal-buttons">
                                    <Button type="submit" text="Agregar" variant="primary" />
                                    <Button type="button" text="Cancelar" variant="secondary" onClick={handleCerrarModal} />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MisVehiculos;
