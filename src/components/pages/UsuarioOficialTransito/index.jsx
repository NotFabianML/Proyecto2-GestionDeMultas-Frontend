import React from 'react';
import './index.css';

const PaginaOficialTransito = () => {
    return (
        <div className="pagina-transito">
            <h1>Módulo del Oficial de Tránsito</h1>
            <div className="botones">
                <p>Aquí puedes crear nuevas multas y consultar multas registradas</p>
                <br />
                <button onClick={() => alert('Crear multa')}>Crear Multa</button>
                <button onClick={() => alert('Gestionar multas')}  >Gestionar Multas</button>
            </div>
        </div>
    );
};

export default PaginaOficialTransito;