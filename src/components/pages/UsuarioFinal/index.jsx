import React from 'react';
import '../../../styles/index.css';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import UsuarioNavbar from '../../layouts/Navbar/UsuarioNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const PaginaUsuarioFinal = () => {
    return (
        <div className="indexUsuarios">
            <header>
                <UsuarioNavbar/>
            </header>

            <h1>Bienvenido</h1>

            <p className="texto">Bienvenido a nuestra plataforma. Aquí podrás gestionar y consultar</p>
            <p className="texto">toda la información relacionada con tus vehículos y multas.</p>
            
            <div className="botones">
                
                <br />
                <ButtonLink to="/Mis-Vehiculos" id="btnMisVehiculos" className="btnMisVehiculos" variant= "primary" size="medium" text="Ver mis vehículos"/>
                <ButtonLink to="/Mis-Multas" id="btnMisMultas" className="btnMisMultas" variant= "primary" size="medium" text="Ver mis multas"/>
            </div>

            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default PaginaUsuarioFinal;