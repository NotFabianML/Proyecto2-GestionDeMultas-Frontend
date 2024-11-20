import React, { useState } from 'react';
import './RegistroUsuario.css';
import InvitadoNavbar from '../../layouts/Navbar/InvitadoNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import { detectCedulaFromImage } from '../../../services/imageRecognitionService.js';
import { register } from '../../../services/authService.js';
import { uploadImageToCloudinary } from '../../../services/cloudinaryService.js';
import { useNavigate } from 'react-router-dom';

// Importa las funciones de utilidades
import { validateEmail, validatePassword } from '../../../utils/validationUtils.js';
import { convertToBase64 } from '../../../utils/fileUtils.js';
import { formatFechaNacimiento } from '../../../utils/dateUtils.js';

const RegistroUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [apellido1, setApellido1] = useState('');
    const [apellido2, setApellido2] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [password, setPassword] = useState('');
    const [fotoCedula, setFotoCedula] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [cedulaTexto, setCedulaTexto] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleFileChange = async (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            if (['image/png', 'image/jpeg'].includes(file.type) && file.size <= 5 * 1024 * 1024) {
                if (setFile === setFotoCedula) {
                    const base64Image = await convertToBase64(file);
                    detectCedulaText(base64Image);
                    setFile(file);
                } else if (setFile === setFotoPerfil) {
                    try {
                        const imageUrl = await uploadImageToCloudinary(file);
                        setFotoPerfil(imageUrl);
                    } catch (error) {
                        console.error("Error al cargar la imagen de perfil:", error);
                        setError("Error al cargar la imagen de perfil.");
                    }
                }
            } else {
                alert('El archivo debe ser .png o .jpg y no debe exceder los 5 MB.');
            }
        }
    };

    const detectCedulaText = async (base64Image) => {
        try {
            const cedulaNumber = await detectCedulaFromImage(base64Image);
            setCedulaTexto(cedulaNumber);
            setError('');
        } catch (error) {
            console.error("Error al detectar la cédula:", error);
            setError("No se detectó un número de cédula válido en la imagen.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !apellido1 || !apellido2 || !correo || !telefono || !password || !fechaNacimiento || !cedulaTexto) {
            setError('Todos los campos obligatorios deben completarse.');
            return;
        }

        if (!validateEmail(correo)) {
            setError('El correo no tiene un formato válido.');
            return;
        }

        if (!validatePassword(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, 1 número, 1 carácter especial y 1 mayúscula.');
            return;
        }

        if (!cedulaTexto) {
            setError('Se debe adjuntar una foto de la cédula válida de Costa Rica.');
            return;
        }

        const newUser = {
            cedula: cedulaTexto,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2 || null,
            email: correo,
            password: password,
            fechaNacimiento: formatFechaNacimiento(fechaNacimiento),
            telefono: telefono,
            fotoPerfil: fotoPerfil || null,
            estado: true
        };

        try {
            await register(newUser);
            alert("Registro exitoso. Redirigiendo a la página de inicio de sesión.");
            navigate('/inicio-sesion');
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            setError("Ocurrió un error al registrar el usuario. Intente nuevamente.");
        }
    };

    return (
        <div className="pagina-registro">
            <header>
                <InvitadoNavbar />
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
                        {error && <p className="error-text">{error}</p>}
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="apellido1">Apellido 1</label>
                                <input type="text" id="apellido1" value={apellido1} onChange={(e) => setApellido1(e.target.value)} placeholder="Apellido" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="correo">Correo</label>
                                <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="example@email.com" />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="apellido2">Apellido 2</label>
                                <input type="text" id="apellido2" value={apellido2} onChange={(e) => setApellido2(e.target.value)} placeholder="Apellido" />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Contraseña</label>
                                {/* <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" /> */}
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña"
                                    />
                                    <i
                                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                <input type="date" id="fechaNacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="fotoPerfil">Adjuntar foto perfil (opcional)</label>
                                <input type="file" id="fotoPerfil" accept=".png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, setFotoPerfil)} />
                            </div>
                        </div>
                        <div className="fila-inputs">
                            <div className="input-group">
                                <label htmlFor="fotoCedula">Adjuntar foto cédula</label>
                                <input type="file" id="fotoCedula" accept=".png,.jpg,.jpeg" onChange={(e) => handleFileChange(e, setFotoCedula)} />
                            </div>
                            <div className="input-group">
                                <label htmlFor="cedula">Número de Cédula</label>
                                <input type="number" id="cedula" value={cedulaTexto} readOnly placeholder="Número de cédula detectado" />
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
