import React from 'react';
import '../../../styles/index.css';
import ButtonLink from '../../atoms/ButtonLink.jsx';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';

const PaginaJuez = () => {
    return (
        <div className="indexUsuarios">
            <header>
                <JuezNavbar />
            </header>

                <div className="conenedorIndex">
                    <h1>Módulo del Juez de Tránsito</h1>

                    <p className="texto">Aquí puedes consultar y resolver disputas asignadas</p>
                    <div className="botones">
                        
                        <br />
                        <ButtonLink to="" id="btnDisputaAsignada" className="btnDisputaAsignada" variant= "primary" size="medium" text="Disputas Asignadas"/>
                        <ButtonLink to="" id="btnResolverDisputa" className="btnResolverDisputa" variant="primary" size="medium" text="Resolver Disputas"/>
                    </div>
                </div>
                
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default PaginaJuez;