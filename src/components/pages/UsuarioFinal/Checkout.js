import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Button from '../../atoms/Button';
import { cambiarEstadoMulta } from '../../../services/multaServices';
import Factura from '../../../components/pages/UsuarioFinal/Factura';


const Checkout = ({ multa, user }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState("USD");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    console.log('viene');
    console.log(JSON.stringify(user));
    
    // Extraer amount y multaId desde la prop 'multa'
    const amount = multa.montoTotal;
    const multaId = multa.idMulta;
   
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    };

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: (amount / 515).toFixed(2), // Convierte colones a USD si es necesario
                    },
                },
            ],
        });
    };

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then(async (details) => {
            const name = details.payer.name.given_name;
            try {
                await cambiarEstadoMulta(multaId, 2);
                alert(`Transacción completada exitosamente por ${name}.`);
            } catch (error) {
                setError(`Error al actualizar el estado de la multa: ${error.message}`);
            }
        });
    };
    <Factura multa={multa} user={user} />
    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>

                    {/* <Button 
                        onClick={() => console.log('Pago con Sinpe')} 
                        variant="primary" 
                        size="medium" 
                        text="Pagar con Sinpe"  
                        style={{ backgroundColor: '#18AEBF', color: '#181D23', width: '250px', marginLeft:0, marginRight:0, marginBottom:10 }} 
                    /> */}

                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />

                    <Factura multa={multa} user={user} />

                </>
            )}
        </div>
    );
};

export default Checkout;
