import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import homeAdmin from  "../components/pages/UsuarioAdmin/homeAdmin.jsx";
import Contact from "../components/pages/Contact";
import PaginaOficialTransito from "../components/pages/UsuarioOficialTransito/index.jsx";
import CrearMulta from "../components/pages/UsuarioOficialTransito/CrearMulta.jsx";
import GestionMultas from "../components/pages/UsuarioOficialTransito/GestionMultas.jsx";

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
        <Route path="/homeAdmin" element={<homeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};
