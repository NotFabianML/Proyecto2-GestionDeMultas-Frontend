import React, { useEffect, useState, useRef } from 'react';
import './MisMultas.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import Button from '../../atoms/Button.jsx';
import { getMultasPorUsuarioId } from '../../../services/multaServices';
import { isoToDateFormatter } from '../../../utils/dateUtils.js';   
import { useUserContext } from '../../../contexts/UserContext.jsx';
import { createDisputa } from '../../../services/disputaService';
import '../../../styles/index.css';

const MisMultas = () => {
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({ type: '', title: '', message: '' });
    const disputeDataRef = useRef({
        multaId: '',
        usuarioId: '',
        motivoReclamo: '',
        DeclaracionOficial: '',
        ResolucionJuez: '',
        estado: 1
    });
    const [multa, setDataMulta] = useState({
        idMulta: '',
        fechaHora: '',
        numeroPlaca: '',
        montoTotal: 0,
        montoMora: 0
    });

       //Solo para pruebas
       const usuarioId = "8BE6F45C-7ACB-4AED-8A38-7B3A87C969B8"; // Id quemado - Hacerlo dinámico
       useEffect(() => {
        getMultasPorUsuarioId(usuarioId)
               .then((data) => {
                   setMultas(data);
               })
               .catch((error) => {
                   setError(`Error: ${error.message}`);
               });
       }, [usuarioId]);



    // Desestructurar funciones de UserContext
    //const { UserId } = useUserContext();
    const UserId = "8BE6F45C-7ACB-4AED-8A38-7B3A87C969B8"; // Id quemado - Hacerlo dinámico

    // useEffect(() => {
    //     getMultaByUsuarioId(UserId)
    //     .then((data) => {
    //         setMultas(data);
    //     })
    //     .catch((error) => {
    //         setError(`Error: ${error.message}`);
    //     });
    // }, [UserId]);


    function openPopup(type) {
        setPopupContent({
            type,
            title: type === 'dispute' ? 'Presentar Disputa' : 'Realizar Pago de Multa',
        });
        setPopupVisible(true);
    }

    function closePopup() {
        setPopupVisible(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        // Update the ref's current value
        disputeDataRef.current = {
            ...disputeDataRef.current,
            [name]: value,
            multaId: multa.idMulta,
            usuarioId: UserId
        };
    }


    function handleSubmit(event) {
        event.preventDefault();
        console.log(disputeDataRef.current);
        createDisputa(disputeDataRef.current).then(() => {
            closePopup();
        });
    }

    const DisputePopup = () => (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h2>{popupContent.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            ID Multa:
                            <input
                                type="text"
                                name="idMulta"
                                value={multa.idMulta}
                                readOnly
                                required
                            />
                        </label>
                        <label>
                            Fecha:
                            <input
                                type="text"
                                name="fecha"
                                value={isoToDateFormatter(multa.fechaHora)}
                                readOnly
                                required
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Vehículo:
                            <input
                                type="text"
                                name="vehiculo"
                                value={multa.numeroPlaca}
                                readOnly
                                required
                            />
                        </label>
                        <label>
                            Monto (Colones):
                            <input
                                type="text"
                                name="monto"
                                value={"₡ " + multa.montoTotal}
                                readOnly
                                required
                                min="0"
                                step="0.01"
                            />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Motivo:
                            <textarea
                                name="motivoReclamo"
                                onChange={handleChange}
                                placeholder="Escribe el motivo aquí"
                                required
                            />
                        </label>
                    </div>
                    <div className="button-row">
                        <Button className="button" type="submit" variant="primary" size="small" text="Enviar" />
                    </div>
                </form>
            </div>
        </div>
    );

    const PaymentPopup = () => (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={closePopup}>&times;</span>
                <h2>{popupContent.title}</h2>
                <form>
                    <div className="form-row">
                        <label>
                            ID Multa:
                            <input type="text" name="idMulta" value={multa.idMulta} readOnly required />
                        </label>
                        <label>
                            Fecha:
                            <input type="text" name="fechaHora"  value={isoToDateFormatter(multa.fechaHora)} readOnly required />
                        </label>
                        <label>
                            Vehículo:
                            <input type="text" name="numeroPlaca" value={multa.numeroPlaca} readOnly required />
                        </label>
                    </div>
                    <table className="payment-summary">
                        <tbody>
                            <tr>
                                <td>Resumen</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Monto Multas</td>
                                <td>{"₡ "} {multa.montoTotal}</td>
                            </tr>
                            <tr>
                                <td>Monto Mora</td>
                                <td>{"₡ "} {(multa?.montoMora || 0)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td> {"₡ "}{multa.montoTotal + (multa?.montoMora || 0)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button-row">
                        <Button onClick={() => console.log('Pago con Sinpe')} variant="primary" size="small" text="Pagar con Sinpe" />
                        <Button onClick={() => console.log('Pago con PayPal')} variant="outline" size="small" text="Pagar con Paypal" />
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <div className="container">
            <UsuarioNavbar />
            <h1>Mis Multas</h1>
            <p className="textoIn">Selecciona una multa ...</p>
            
            <div className='main-container'>
                <div className="grid-container">
                    {multas.map((multa) => (
                        <div key={multa.id} className="card">
                            <div className="infoMulta">
                                <p><strong>ID Multa:</strong> {multa.idMulta}</p>
                                <p><strong>Vehículo:</strong> {multa.numeroPlaca}</p>
                                <p><strong>Fecha:</strong> {isoToDateFormatter(multa.fechaHora)}</p>
                                <p><strong>Monto:</strong> {"₡ " + multa.montoTotal}</p>
                            </div>

                            <div className="button-container">
                                <Button 
                                    onClick={() => {openPopup('dispute'); setDataMulta(multa);}}
                                    variant="outline" 
                                    size="small" 
                                    text="Abrir Disputa" 
                                />
                                <Button 
                                    onClick={() => {openPopup('payment'); setDataMulta(multa);}} 
                                    variant="primary" 
                                    size="small" 
                                    text="Pagar Multa" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {popupVisible && popupContent.type === 'dispute' && <DisputePopup />}
            {popupVisible && popupContent.type === 'payment' && <PaymentPopup />}

            <Footer />
        </div>
    );
};

export default MisMultas;
