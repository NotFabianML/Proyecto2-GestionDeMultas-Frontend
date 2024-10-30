import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import InicioAdmin from "../components/pages/UsuarioAdmin/InicioAdmin.jsx";
import Contact from "../components/pages/Contact";
import PaginaOficialTransito from "../components/pages/UsuarioOficialTransito/index.jsx";
import CrearMulta from "../components/pages/UsuarioOficialTransito/CrearMulta.jsx";
import GestionMultas from "../components/pages/UsuarioOficialTransito/GestionMultas.jsx";
import PaginaJuez from "../components/pages/UsuarioJuez/index.jsx";
import DisputasJuez from "../components/pages/UsuarioJuez/DisputasJuez.jsx";
import ResolverDisputa from "../components/pages/UsuarioJuez/ResolverDisputa.jsx";


export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Pagina-Oficial" element={<PaginaOficialTransito />} />
        <Route path="/Gestion-Multas" element={<GestionMultas />} />
        <Route path="/Crear-Multa" element={<CrearMulta />} />
        <Route path="/Pagina-Juez" element={<PaginaJuez />} />
        <Route path="/Disputas-Juez" element={<DisputasJuez />} />
        <Route path="/Resolver-Disputa" element={<ResolverDisputa />} />
        <Route path="/InicioAdmin" element={<InicioAdmin />} />
      </Routes>
    </BrowserRouter>
  );
};
