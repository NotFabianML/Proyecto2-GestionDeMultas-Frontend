import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import PaginaOficialTransito from "../components/pages/UsuarioOficialTransito/index.jsx";
import CrearMulta from "../components/pages/UsuarioOficialTransito/CrearMulta.jsx";
import GestionMultas from "../components/pages/UsuarioOficialTransito/GestionMultas.jsx";
import PasswordRecovery from "../components/pages/PasswordRecovery/PasswordRecovery.jsx";
import InicioSesion from "../components/pages/InicioSesion/InicioSesion.jsx";
import RegistroUsuario from "../components/pages/RegistroUsuario/RegistroUsuario.jsx";
import PaginaInicio from "../components/pages/PaginaInicio/PaginaInicio.jsx";
import ConsultaPublica from "../components/pages/ConsultaPublica/ConsultaPublica.jsx";



export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Pagina-Oficial-Transito" element={<PaginaOficialTransito />} />
        <Route path="/Gestion-Multas" element={<GestionMultas />} />
        <Route path="/Crear-Multa" element={<CrearMulta />} />
        <Route path="/Pagina-Inicio" element={<PaginaInicio />} />
        <Route path="/Password-Recovery" element={<PasswordRecovery />} />
        <Route path="/Inicio-Sesion" element={<InicioSesion />} />
        <Route path="/Registro-Usuario" element={<RegistroUsuario />} />
        <Route path="/Consulta-Publica" element={<ConsultaPublica />} />
        
      </Routes>
    </BrowserRouter>
  );
};
