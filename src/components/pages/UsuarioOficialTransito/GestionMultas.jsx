import React from 'react';
import './StylesOficial.css';
import Dropdown from '../../molecules/Dropdown.jsx';
import OficialNavbar from '../../layouts/Navbar/OficialNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import Select from 'react-select';

const GestionMultas = () => {
    return (
        <div className="estilos-oficial">
            <header>
                <OficialNavbar />
            </header>

            <h1>Gestión de Multas</h1>
            <div className="pantalla-dividida">
                {/* Columna Izquierda */}
                <div className="columna-izquierda">
                    <div className="input-group">
                        <label htmlFor="numeroMulta">Número de multa:</label>
                        <Dropdown id="numeroMulta" name="numeroMulta" />

                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="columna-derecha">
                    <FormularioMulta  mostrarNumMulta={false} mostrarBotones={true} dosBotones={true} textoBotonPrimario='Guardar cambios' textoBotonSecundario='Eliminar multa'/>
                </div>
 
            </div>
                           
            <footer>
                        <Footer />
            </footer>

        </div>
    );
};

export default GestionMultas;
