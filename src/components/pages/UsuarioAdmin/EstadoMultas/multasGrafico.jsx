import React from "react";
import ButtonLink from "../../../atoms/ButtonLink";
import './multasGrafico.css';

const MultasGrafico = () => {
  return (
    <div className="multas-grafico-container">
      <h1>Gráfico Multas</h1>

      <div className="button-container">
        <ButtonLink variant="primary" text="Regresar" to="/inicio-admin" className="btn btn-primary" />
        <ButtonLink variant="secondary" text="Visualizar Tabla" to="/multas-tabla" className="btn btn-secondary" />
      </div>
    </div>
  );
}

export default MultasGrafico;
