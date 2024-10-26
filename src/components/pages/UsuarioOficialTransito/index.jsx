import React from 'react';
import './index.css';
import ButtonLink from '../../atoms/ButtonLink.jsx';

const PaginaOficialTransito = () => {
    return (
        <div className="pagina-transito">
            <h1>Módulo del Oficial de Tránsito</h1>

            <p>Aquí puedes crear nuevas multas y consultar multas registradas</p>
            <div className="botones">
                
                <br />
                <ButtonLink to="/Crear-Multa" id="btnCrearMulta" className="btnCrearMulta" variant= "primary" size="medium" text="Crear multa"></ButtonLink>
                <ButtonLink to="/Gestion-Multas" id="btnGestionarMultas" className="btnGestionarMultas" variant= "primary" size="medium" text="Gestionar multas"></ButtonLink>
            </div>

        </div>
    );
};

export default PaginaOficialTransito;