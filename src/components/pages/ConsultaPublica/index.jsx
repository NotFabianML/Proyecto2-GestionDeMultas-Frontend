import React from 'react';
import './index.css';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import ConsultaPublica from './ConsultaPublica.jsx';

const Index = () => {
    return (
        <div className="pagina-consulta-publica">
            <header>
                <OficialNavbar />
            </header>

            <h1>Página para consulta pública de multas</h1>
            <p className="texto">Aquí puedes visualizar públicamente multas asociadas a tu placa.</p>

            <ConsultaPublica />

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Index;
