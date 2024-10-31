import React from "react";
import ButtonLink from "../atoms/ButtonLink";
import Button from "../atoms/Button";
import {
  InvitadoNavbar,
  UsuarioNavbar,
  AdminNavbar,
  JuezNavbar,
  OficialNavbar,
} from "../layouts/Navbar";

const Home = () => {
  const handleClick = () => {
    alert("Boton clickeado");
  };
/*

--------------> Meter aqui CSS y JavaScript

*/
  return (
    <div>
      <header>
        <InvitadoNavbar />
        <UsuarioNavbar />
        <AdminNavbar />
        <JuezNavbar />
        <OficialNavbar />
      </header>

      <ButtonLink variant="primary" text="Iniciar Sesion" to="/Usuario" />
      <ButtonLink variant="secondary" text="Consulta de Multas" to="/about" />
      <ButtonLink variant="alternative" text="Registrate aqui" to="/contact" />
      <ButtonLink variant="outline" text="Iniciar Sesion" to="/" />

      <Button variant="primary" text="Boton 1" onClick={handleClick} />
      <Button variant="secondary" text="Boton 2" onClick={handleClick} />
      <Button variant="alternative" text="Boton 3" onClick={handleClick} />
      <Button variant="outline" text="Boton 4" onClick={handleClick} />

      <Button />
    </div>
  );
};

export default Home;
