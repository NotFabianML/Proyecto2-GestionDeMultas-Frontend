import React, { useEffect, useState } from 'react';
import './MisMultas.css';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import Button from '../../atoms/Button.jsx';
import { getMultasPorCedulaUsuario } from '../../../services/multaServices.js';
import { getUsuarioById } from '../../../services/usuarioService.js';
import { isoToDateFormatter } from '../../../utils/dateUtils.js';   
import { useUserContext } from '../../../contexts/UserContext.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Checkout from './Checkout';
import { formatId } from '../../../utils/idFormatUtils.js';
import { formatCurrency } from '../../../utils/formatCurrency.js';

const initialOptions = {
  "client-id": "Adoww9KeExfepE0evtSMzMHBZqgFYTOitCqUjfQaLt1Np1V7gY9P-v-kPO-FzrBeMt4IsCDw0qC9tzqQ",
  currency: "USD",
  intent: "capture",
};

const MisMultas = () => {
    const [multas, setMultas] = useState([]);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupContent, setPopupContent] = useState({ type: '', title: '', message: '' });
    const [multa, setDataMulta] = useState({
        idMulta: '',
        fechaHora: '',
        numeroPlaca: '',
        montoTotal: 0,
        montoMora: 0
    });

    // Desestructurar funciones de UserContext
    const { userId } = useUserContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUsuarioById(userId);
                setUserData(userData);
                if (!userData.cedula) { 
                    setError("Error: El usuario no tiene cédula registrada.");
                    return;
                }
                const multas = await getMultasPorCedulaUsuario(userData.cedula);
                setMultas(multas);
                
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };
    
        fetchData();
    }, [userId]);
  
    const PaymentPopup = () => (
        <div className="misMultas-popup">
            <div className="misMultas-popup-content">
                <span className="misMultas-close" onClick={() => setPopupVisible(false)}>&times;</span>
                <h2>{popupContent.title}</h2>
                <form>
                    <div className="misMultas-form-row">
                        <label>
                            ID Multa:
                            <input type="text" name="idMulta" value={formatId(multa.idMulta)}  readOnly required />
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
                    <table className="misMultas-payment-summary">
                        <tbody>
                            <tr>
                                <td>Resumen</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Monto Multas</td>
                                <td>{formatCurrency(multa.montoTotal)}</td>
                            </tr>
                            <tr>
                                <td>Monto Mora</td>
                                <td>{formatCurrency(multa?.montoMora || 0)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>{formatCurrency(multa.montoTotal + (multa?.montoMora || 0))}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="misMultas-button-row">
                        <PayPalScriptProvider options={initialOptions}>
                            <Checkout multa={multa} user={userData} />
                        </PayPalScriptProvider>
                    </div>
                </form>
            </div>
        </div>
    );

    const filteredMultas = multas.filter((multa) => multa.estado !== 3);

    return (
        <div className="misMultas-container">
            <UsuarioNavbar />
            <h1>Mis Multas</h1>
            <p className="misMultas-textoIn">Selecciona una multa ...</p>
            
            <div className='misMultas-main-container'>
                <div className="misMultas-grid-container">
                    {filteredMultas.length === 0 ? (
                        <p className="misMultas-no-multas-message">No hay multas disponibles.</p>
                    ) : (
                        filteredMultas.map((multa) => (
                            <div key={multa.id} className="misMultas-card">
                                <div className="misMultas-infoMulta">
                                    <p><strong>ID Multa:</strong> {formatId(multa.idMulta)}</p>
                                    <p><strong>Vehículo:</strong> {multa.numeroPlaca}</p>
                                    <p><strong>Fecha:</strong> {isoToDateFormatter(multa.fechaHora)}</p>
                                    <p><strong>Monto:</strong> {formatCurrency(multa.montoTotal)}</p>
                                </div>
                                <div className="misMultas-button-container">
                                    <Button 
                                        onClick={() => { setPopupVisible(true); setPopupContent({ type: 'payment', title: 'Realizar Pago de Multa' }); setDataMulta(multa); }} 
                                        variant="primary" 
                                        size="small" 
                                        text="Pagar Multa" 
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {popupVisible && popupContent.type === 'payment' && <PaymentPopup />}

            <Footer />
        </div>
    );
};

export default MisMultas;
