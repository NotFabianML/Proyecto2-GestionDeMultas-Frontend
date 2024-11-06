import React, { useState } from 'react';
import './PasswordRecovery.css';
import Button from '../../atoms/Button.jsx';
import NavbarRegistro from '../../layouts/Navbar/NavbarRegistro.jsx';
import Footer from '../../layouts/Footer.jsx';

const PasswordRecovery = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/password-recovery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('Se ha enviado una nueva contraseña a tu correo.');
            } else {
                setMessage('Error al enviar el correo.');
            }
        } catch (error) {
            setMessage('Error de conexión.');
        }
    };

    return (
        <div className="password-recovery-container">
            <header>
                <NavbarRegistro />
            </header>

            <div className="password-recovery-box">
                <h2>¿Olvidaste tu contraseña? <br /> <strong>Aquí te ayudamos.</strong></h2>
                <p>Ingresa tu correo y te enviaremos una nueva contraseña.</p>
                {message && <p className="success-message">{message}</p>}
                <form className="password-recovery-form" onSubmit={handleSubmit}>
                    {/* Campo para ingresar el correo */}
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Botón de Enviar */}
                    <div className="input-group">
                        <Button variant="primary" size="medium" text="Enviar" />
                    </div>
                </form>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default PasswordRecovery;
