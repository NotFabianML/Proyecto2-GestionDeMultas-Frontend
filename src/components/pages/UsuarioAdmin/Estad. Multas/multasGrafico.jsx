import React from "react";
import ButtonLink from "../../../atoms/ButtonLink";

const MultasGrafico = () => {
  return (
    <div>
      <h1>multasGrafico</h1>

      <ButtonLink variant="outline" text="Regresar" to="/InicioAdmin" />
      <ButtonLink variant="secondary" text="Visualizar Tabla" to="/MultasTabla" />
    </div>
  );
}

export default MultasGrafico;