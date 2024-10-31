import React, { useState } from 'react';
import './InicioSesion.css';
import { Link } from 'react-router-dom';
import Navbar from '../../layouts/Navbar/Navbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const InicioSesion = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!correo || !contrasena) {
            setError('Por favor, llena ambos campos.');
        } else {
            setError('');
            // Lógica para iniciar sesión
            console.log('Iniciar sesión exitoso');
        }
    };

    return (
        <div className="pagina-inicio-sesion">
            <header>
                <Navbar />
            </header>

            <div className="contenedor-principal">
                <div className="contenedor-texto">
                    <h2>Bienvenido de nuevo. Ingresa tu cuenta para iniciar.</h2>
                    <p>Una vez que ingreses tu cuenta se te redireccionará a la página que corresponda al rol ingresado en el registro.</p>
                    <div className="links-inicio-sesion">
                        <Link to="/Password-Recovery">¿Olvidaste tu contraseña?</Link>
                        <Link to="/Registro-Usuario">¿No tienes una cuenta aún?</Link>
                    </div>
                </div>
                <div className="contenedor-formulario">
                    <form onSubmit={handleSubmit}>
                        <label>Correo</label>
                        <input
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                            placeholder="example@email"
                        />
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                            placeholder="Contraseña"
                        />
                        {error && <p className="error">{error}</p>}
                        <button type="submit" className="boton-iniciar-sesion">Iniciar Sesión</button>
                    </form>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default InicioSesion;
