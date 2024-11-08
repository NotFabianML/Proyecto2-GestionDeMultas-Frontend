import React from 'react';
import './StylesOficial.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Dropdown from '../../molecules/Dropdown.jsx';

const CrearMulta = () => {
    return (
        <div className="estilos-oficial">

            <header>
                <OficialNavbar />
            </header>

            <h1>Crear Multa</h1>
            {/* Contenedor Izquierda */}
            <div className="columna-izquierda">
                <div className="input-group">
                    <label htmlFor="numeroMulta">Número de multa:</label>
                    <Dropdown id="numeroMulta" name="numeroMulta" />
                </div>
            </div>
                {/* Conenedor Derecha */}
                <div className="columna-derecha">
                    <FormularioMulta  mostrarNumMulta={false} mostrarBotones={true} dosBotones={false} textoBotonPrimario='Crear multa' soloLectura={false}/>
                </div>


            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default CrearMulta;
