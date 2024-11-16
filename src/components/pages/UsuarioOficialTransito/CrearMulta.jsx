import React, { useState, useRef, useEffect } from 'react';
import './StylesOficial.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Button from '../../atoms/Button.jsx';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from "@cloudinary/url-gen/actions/resize";
import { detectPlacaFromImage } from '../../../services/licensePlateRecognitionService.js';
import { uploadImageToCloudinary } from '../../../services/cloudinaryService.js';
import { useNavigate } from 'react-router-dom';

// Importa las funciones de utilidades
import { convertToBase64 } from '../../../utils/fileUtils.js';

const CrearMulta = () => {
    const fileInputRef = useRef(null);
    const [widgetLoaded, setWidgetLoaded] = useState(false);
    const multaPorFoto = { fotoPlaca: '' };
    const [fotoPlaca, setFotoPlaca] = useState(null);
    const [placaTexto, setPlacaTexto] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            if (['image/png', 'image/jpeg'].includes(file.type) && file.size <= 5 * 1024 * 1024) {
                // Crear URL local de la imagen seleccionada
                const objectUrl = URL.createObjectURL(file);
                setFotoPlaca(objectUrl);

                // Convertir imagen a base64 y detectar el texto de la placa
                const base64Image = await convertToBase64(file);
                detectPlacaText(base64Image);
            } else {
                alert('El archivo debe ser .png o .jpg y no debe exceder los 5 MB.');
            }
        }
    };

    const detectPlacaText = async (base64Image) => {
        try {
            const placaNumber = await detectPlacaFromImage(base64Image);
            setPlacaTexto(placaNumber);
            setError('');
        } catch (error) {
            console.error("Error al detectar el número de placa:", error);
            setError("No se detectó un número de placa válido en la imagen.");
        }
    };

    // const cld = new Cloudinary({
    //     cloud: {
    //       cloudName: 'dekwvhxog'
    //     }
    // });

    

    // // Cargar el script de Cloudinary cuando se monta el componente
    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    //     script.onload = () => setWidgetLoaded(true);
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    // // Abrir el widget de carga de Cloudinary
    // const openUploadWidget = () => {
    //     if (widgetLoaded && window.cloudinary) {
    //         window.cloudinary.openUploadWidget(
    //             {
    //                 cloudName: 'dekwvhxog',
    //                 uploadPreset: 'preset_NexTek',
    //                 sources: ['local', 'url'],
    //             },
    //             (error, result) => {
    //                 if (result && result.event === 'success') {
    //                     setFotoPlaca(result.info.secure_url); // Guarda la URL de la imagen cargada
    //                 }
    //             }
    //         );
    //     } else {
    //         console.error("Cloudinary widget no está cargado.");
    //     }
    // };

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
                        <h3 htmlFor="numeroMulta">Generar multa por cámara de transito:</h3>
                        <img 
                            src={fotoPlaca || '/path/to/default-image.jpg'} 
                            className="foto-placa" 
                            alt="Placa del vehículo" 
                        />

                        <input 
                            type="file"  
                            id="fotoPlaca" 
                            accept=".png,.jpg,.jpeg" 
                            onChange={(e) => handleFileChange(e, setFotoPlaca)} 
                        />
                    </div>
                </div>

                {/* Conenedor Derecha */}
                <div className="columna-derecha">
                    <FormularioMulta  mostrarNumMulta={false} mostrarBotones={true} dosBotones={false} textoBotonPrimario='Crear multa' soloLectura={false} placaImagen={placaTexto}/>
                </div>

            </div>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default CrearMulta;
