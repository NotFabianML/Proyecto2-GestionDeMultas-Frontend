import React from 'react';
import './CrearMulta.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';

const CrearMulta = () => {
    return (
        <div className="crear-multa">

            <header>
                <OficialNavbar />
            </header>

            <h1>Crear Multa</h1>
            <FormularioMulta  mostrarNumMulta={false} mostrarBotones={true} dosBotones={false} textoBotonPrimario='Crear multa'/>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default CrearMulta;
