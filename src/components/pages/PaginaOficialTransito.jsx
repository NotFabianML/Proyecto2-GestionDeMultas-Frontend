import React from 'react';
import './PaginaOficialTransito.css';

const PaginaOficialTransito = () => {
    return (
        <div className="pagina-transito">
            <h1>M�dulo Oficial de Tr�nsito</h1>
            <div className="botones">
                <button onClick={() => alert('Crear multa')}>Crear Multa</button>
                <button onClick={() => alert('Gestionar multas')}>Gestionar Multas</button>
            </div>
        </div>
    );
};

export default PaginaOficialTransito;