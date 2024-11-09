import React, { useRef } from 'react';
import './StylesOficial.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Button from '../../atoms/Button.jsx';

const CrearMulta = () => {
    const fileInputRef = useRef(null);

    // Función para abrir el selector de archivos
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Función para manejar la carga del archivo
    const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        console.log("Archivo seleccionado:", file);
        // Puedes agregar lógica para mostrar o procesar la imagen aquí
        }   
    };

    return (
        <div className="estilos-oficial">

            <header>
                <OficialNavbar />
            </header>

            <h1>Crear Multa</h1>
            <div className="pantalla-dividida">
                {/* Contenedor Izquierda */}
                <div className="columna-izquierda">
                    <div className="input-group">
                        <label htmlFor="numeroMulta">Generar multa por cámara de transito:</label>
                        <Button
                            id="btnImgPlaca"
                            name="btnImgPlaca"
                            variant="secondary"
                            size="medium"
                            text="Buscar foto de placa"
                            onClick={handleButtonClick}
                        />
                        {/* Campo de entrada de archivo oculto */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Conenedor Derecha */}
                <div className="columna-derecha">
                    <FormularioMulta  mostrarNumMulta={false} mostrarBotones={true} dosBotones={false} textoBotonPrimario='Crear multa' soloLectura={false}/>
                </div>

            </div>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default CrearMulta;
