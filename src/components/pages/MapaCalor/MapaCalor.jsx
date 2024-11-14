import React from 'react';
import './MapaCalor.css';
import InvitadoNavbar from '../../layouts/Navbar/InvitadoNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import MapaCalorImg from '../../../assets/MapaCalorImg.png';

const MapaCalor = () => {
    return (
        <div className="mapa-calor-page">
            <header>
                <InvitadoNavbar />
            </header>

            <main className="mapa-calor-content">
                <div className="texto-contenedor">
                    <h1>Echa un vistazo a nuestro mapa de calor.</h1>
                    <p>Aquí podrás visualizar información importante para los ciudadanos.</p>
                </div>
                <div className="imagen-contenedor">
                    <img 
                        src={MapaCalorImg} 
                        alt="Mapa de calor"
                        className="mapa-calor-image"
                    />
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default MapaCalor;
