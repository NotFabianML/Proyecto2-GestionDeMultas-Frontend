import React from "react";
import ButtonLink from "../atoms/ButtonLink";
import Button from "../atoms/Button";
import { useState } from "react";
import {getUsuarioPorCedula} from "../../services/usuarioService";
import {
  InvitadoNavbar,
  UsuarioNavbar,
  AdminNavbar,
  JuezNavbar,
  OficialNavbar,
} from "../layouts/Navbar";
import { set } from "date-fns";

const Home = () => {
  const handleClick = () => {
    alert("Boton clickeado");
  };
/*

--------------> Meter aqui CSS y JavaScript

*/

const [cedula, setCedula] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null); // Limpiar el mensaje de error previo
      setCedula("518860349")
      const userData = await getUsuarioPorCedula("618860349");
      setUsuario(userData);
      console.log(usuario);
    } catch (err) {
      setError(err.message);
    }
  };

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

      <Button variant="primary" text="Boton 1" onClick={handleSearch} />
      <Button variant="secondary" text="Boton 2" onClick={handleClick} />
      <Button variant="alternative" text="Boton 3" onClick={handleClick} />
      <Button variant="outline" text="Boton 4" onClick={handleClick} />

      <Button />
    </div>
  );
};

export default Home;
