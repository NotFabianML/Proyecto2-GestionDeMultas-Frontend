import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './RegistroUsuario.css';
import NavbarRegistro from '../../layouts/Navbar/NavbarRegistro.jsx';
import Footer from '../../layouts/Footer.jsx';

const RegistroUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [correo, setCorreo] = useState('');
    const [placa, setPlaca] = useState('');
    const [password, setPassword] = useState('');
    const [fotoCedula, setFotoCedula] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [cedulaTexto, setCedulaTexto] = useState('');

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            if (['image/png', 'image/jpeg'].includes(file.type) && file.size <= 5 * 1024 * 1024) {
                setFile(file);
                if (setFile === setFotoCedula) {
                    readCedulaText(file);
                }
            } else {
                alert('El archivo debe ser .png o .jpg y no debe exceder los 5 MB.');
            }
        }
    };

    const readCedulaText = (file) => {
        Tesseract.recognize(
            file,
            'eng',
            {
                logger: info => console.log(info)
            }
        ).then(({ data: { text } }) => {
            setCedulaTexto(text);
            console.log('Texto leído:', text);
        });
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/g.test(password);
        const hasNumber = /\d/g.test(password);
        return password.length >= minLength && hasSpecialChar && hasNumber;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nombre || !apellido1 || !apellido2 || !correo || !placa || !password || !fotoCedula || !fotoPerfil) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        if (!validatePassword(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, 1 número y 1 carácter especial.');
            return;
        }
        console.log('Formulario enviado:', { nombre, apellido1, apellido2, correo, placa, password, cedulaTexto });
    };

    return (
        <div className="pagina-registro">
            <header>
                <NavbarRegistro />
            </header>

            <div className="registro-usuario-container">
                <div className="texto-izquierda">
                    <h1>¿Nuevo en nuestro sistema? ¡Regístrate ahora!</h1>
                    <p>Antes de acceder a los servicios, es necesario que te registres para poder consultar tu información.</p>
                    <ul className="lista-registro">
                        <li><strong>1. Completa tus datos.</strong></li>
                        <li><strong>2. Crea tu contraseña.</strong></li>
                        <li><strong>3. Finaliza tu registro.</strong></li>
                    </ul>
                </div>
                <div className="formulario-derecha">
                    <form className="formulario-registro-usuario" onSubmit={handleSubmit}>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="apellido1">Apellido 1</label>
                                <input type="text" id="apellido1" value={apellido1} onChange={(e) => setApellido1(e.target.value)} placeholder="Apellido" />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="apellido2">Apellido 2</label>
                                <input type="text" id="apellido2" value={apellido2} onChange={(e) => setApellido2(e.target.value)} placeholder="Apellido" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="correo">Correo</label>
                                <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="example@email.com" />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="placa">Número de placa</label>
                                <input type="text" id="placa" value={placa} onChange={(e) => setPlaca(e.target.value)} placeholder="000000" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="fotoCedula">Adjuntar foto cédula</label>
                                <input type="file" id="fotoCedula" accept=".png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, setFotoCedula)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="fotoPerfil">Adjuntar foto perfil</label>
                                <input type="file" id="fotoPerfil" accept=".png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, setFotoPerfil)} />
                            </div>
                        </div>
                        <button type="submit" className="btn-registrarse">Registrarse</button>
                    </form>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RegistroUsuario;
