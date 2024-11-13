import React from 'react'; 
import './PaginaInicio.css';
import { Link } from 'react-router-dom'; 
import InvitadoNavbar from '../../layouts/Navbar/InvitadoNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const PaginaInicio = () => {
    return (
        <div className="paginainicio">
            <header className="paginainicio-header">
                <InvitadoNavbar />
            </header>
            
            <div className="paginainicio-container">
                <div className="paginainicio-text-section">
                    <h1>Inicia sesión o si no tenés cuenta aún registrate. Bienvenido.</h1>
                    <p>Bienvenido a Nextek, donde simplificamos la consulta de tus multas. Accede de manera rápida y segura a toda la información que necesitas en un solo clic.</p>
                    <div className="paginainicio-buttons">
                        <Link to="/inicio-sesion" className="paginainicio-inicio-sesion-button">Iniciar Sesión</Link>
                        <Link to="/registro-usuario" className="paginainicio-registrate-button">Regístrate aquí</Link>
                    </div>
                </div>
                <div className="paginainicio-options-section">
                    <h2>Echa un vistazo a otras opciones que te ofrecemos</h2>
                    <p>En nuestra página puedes visualizar nuestro mapa de calor o consultar públicamente tus multas sin necesidad de iniciar sesión.</p>
                    <div className="paginainicio-extra-buttons">
                        <Link to="/consulta-publica" className="paginainicio-consulta-multas-button">Consulta de Multas</Link>
                        <Link to="/mapa-calor" className="paginainicio-mapa-calor-button">Mapa de Calor</Link>
                    </div>
                </div>
            </div>

            <footer className="paginainicio-footer">
                <Footer />
            </footer>
        </div>
    );
};

export default PaginaInicio;
