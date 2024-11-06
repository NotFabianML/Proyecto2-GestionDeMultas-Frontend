import React from 'react';
import './index.css';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import InicioSesion from './inicio-sesion.jsx';

const Index = () => {
    return (
        <div className="pagina-inicio-sesion">
            <OficialNavbar />
            <InicioSesion />
            <Footer />
        </div>
    );
};

export default Index;
