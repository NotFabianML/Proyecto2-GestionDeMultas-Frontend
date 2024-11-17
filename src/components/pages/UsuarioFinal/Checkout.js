import React, { useState } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Button from '../../atoms/Button';
import { cambiarEstadoMulta } from '../../../services/multaServices';


const Checkout = ({ amount, multaId }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState("USD");
    const [error, setError] = useState(null);
    
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
                        value: (amount / 515).toFixed(2).toString(), // Convertir 'amount' a cadena si es necesario
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
                alert(`Transaction completed by ${name}`);
            } catch (error) {
                setError(`Error al pagar la multa: ${error.message}`);
            }
        });
    };

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
                </>
            )}
        </div>
    );
};

export default Checkout;
