import React from 'react'; 
import './PaginaInicio.css';
import { Link } from 'react-router-dom'; 
import InvitadoNavbar from '../../layouts/Navbar/InvitadoNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const PaginaInicio = () => {
    return (
        <div className="pagina-inicio">
            <header>
                <InvitadoNavbar />
            </header>
            
            <div className="pagina-inicio-container">
                <div className="text-section">
                    <h1>Inicia sesión o si no tenés cuenta aún registrate. Bienvenido.</h1>
                    <p>Bienvenido a Nextek, donde simplificamos la consulta de tus multas. Accede de manera rápida y segura a toda la información que necesitas en un solo clic.</p>
                    <div className="buttons">
                        <Link to="/Inicio-Sesion" className="inicio-sesion-button">Iniciar Sesión</Link>
                        <Link to="/Registro-Usuario" className="registrate-button">Regístrate aquí</Link>
                    </div>
                </div>
                <div className="options-section">
                    <h2>Echa un vistazo a otras opciones que te ofrecemos</h2>
                    <p>En nuestra página puedes visualizar nuestro mapa de calor o consultar públicamente tus multas sin necesidad de iniciar sesión.</p>
                    <div className="extra-buttons">
                        <Link to="/Consulta-Publica" className="consulta-multas-button">Consulta de Multas</Link>
                        <Link to="/Mapa-Calor" className="mapa-calor-button">Mapa de Calor</Link>
                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default PaginaInicio;
