import React, { useEffect, useState } from 'react';
import './MisMultas.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import Button from '../../atoms/Button.jsx';

const MisMultas = () => {
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({ type: '', title: '', message: '' });
    const [disputeData, setDisputeData] = useState({
        idMulta: '',
        fecha: '',
        vehiculo: '',
        monto: '',
        motivo: '',
    });

    useEffect(() => {
        fetch('https://localhost:7185/api/multas')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta: ${response.statusText}`);
                }
                return response.json();
            })
            .then((multas) => {
                setMultas(multas);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

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
        setDisputeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Datos enviados:', disputeData);
        closePopup(); // Cierra el popup tras el envío
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
                                value={disputeData.idMulta}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </label>
                        <label>
                            Fecha:
                            <input
                                type="date"
                                name="fecha"
                                value={disputeData.fecha}
                                onChange={handleChange}
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
                                value={disputeData.vehiculo}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </label>
                        <label>
                            Monto (Colones):
                            <input
                                type="number"
                                name="monto"
                                value={disputeData.monto}
                                onChange={handleChange}
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
                                name="motivo"
                                value={disputeData.motivo}
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
                <div><span className="close" onClick={closePopup}>&times;</span></div>
                <h2>{popupContent.title}</h2>
                <form>
                    <div className="form-row">
                        <label>
                            ID Multa:
                            <input type="text" name="idMulta" readOnly required />
                        </label>
                        <label>
                            Fecha:
                            <input type="date" name="fecha" readOnly required />
                        </label>
                        <label>
                            Vehículo:
                            <input type="text" name="vehiculo" readOnly required />
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
                                <td>94,340 colones</td>
                            </tr>
                            <tr>
                                <td>Monto Mora</td>
                                <td>0,00 colones</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>94,340 colones</td>
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

            <div className="grid-container">
                {multas.map((multa) => (
                    <div key={multa.id} className="card">
                        <div className="infoMulta">
                            <p><strong>ID Multa:</strong> {multa.idMulta}</p>
                            <p><strong>Vehículo:</strong> {multa.vehiculoId}</p>
                            <p><strong>Fecha:</strong> {multa.fechaHora}</p>
                            <p><strong>Monto:</strong> {multa.monto}</p>
                        </div>

                        <div className="button-container">
                            <Button 
                                onClick={() => openPopup('dispute')} 
                                variant="outline" 
                                size="small" 
                                text="Abrir Disputa" 
                            />
                            <Button 
                                onClick={() => openPopup('payment')} 
                                variant="primary" 
                                size="small" 
                                text="Pagar Multa" 
                            />
                        </div>
                    </div>
                ))}
            </div>

            {popupVisible && popupContent.type === 'dispute' && <DisputePopup />}
            {popupVisible && popupContent.type === 'payment' && <PaymentPopup />}

            <Footer />
        </div>
    );
};

export default MisMultas;
