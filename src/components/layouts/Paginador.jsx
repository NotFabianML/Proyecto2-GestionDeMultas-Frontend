import React from 'react';
import './Paginador.css';

const Paginador = ({ totalPaginas, paginaActual, cambiarPagina }) => {
  return (
    <div className="paginador">
      {Array.from({ length: totalPaginas }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => cambiarPagina(index + 1)}
          className={paginaActual === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginador;
