import React from 'react';
import '../../../styles/index.css';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const PaginaOficialTransito = () => {
    return (
        <div className="indexUsuarios">
            <header>
                <OficialNavbar />
            </header>

            <h1>Módulo del Oficial de Tránsito</h1>

            <p className="texto">Aquí puedes crear nuevas multas y consultar multas registradas</p>
            <div className="botones">
                
                <br />
                <ButtonLink to="/crear-multa" id="btnCrearMulta" className="btnCrearMulta" variant= "primary" size="medium" text="Crear Multa"/>
                <ButtonLink to="/gestion-multas" id="btnGestionarMultas" className="btnGestionarMultas" variant= "primary" size="medium" text="Gestionar Multas"/>
            </div>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default PaginaOficialTransito;