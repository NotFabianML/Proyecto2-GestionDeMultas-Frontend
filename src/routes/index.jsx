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
import Infraccion from "../components/pages/UsuarioAdmin/CatalogoInfracciones/infraccion.jsx";
import MultasTabla from "../components/pages/UsuarioAdmin/Estad. Multas/multasTabla.jsx";
import ListaUsuarios from "../components/pages/UsuarioAdmin/GestionUsuarios/listaUsuarios.jsx";
import Roles from "../components/pages/UsuarioAdmin/GestionRoles/roles.jsx";
import AdministrarPerfil from "../components/pages/UsuarioAdmin/GestionUsuarios/administarPerfil.jsx";
import RegistrarUsuarioAdmin from "../components/pages/UsuarioAdmin/GestionUsuarios/registrarUsuarioAdmin.jsx";
import MultasGrafico from "../components/pages/UsuarioAdmin/Estad. Multas/multasGrafico.jsx";
import PasswordRecovery from "../components/pages/PasswordRecovery/PasswordRecovery.jsx";
import InicioSesion from "../components/pages/InicioSesion/InicioSesion.jsx";
import RegistroUsuario from "../components/pages/RegistroUsuario/RegistroUsuario.jsx";
import PaginaInicio from "../components/pages/PaginaInicio/PaginaInicio.jsx";
import ConsultaPublica from "../components/pages/ConsultaPublica/ConsultaPublica.jsx";
import PaginaUsuarioFinal from "../components/pages/UsuarioFinal/index.jsx";
import MisMultas from "../components/pages/UsuarioFinal/MisMultas.jsx";
import MisDisputas from "../components/pages/UsuarioFinal/MisDisputas.jsx";
import MisVehiculos from "../components/pages/UsuarioFinal/MisVehiculos.jsx";
import MapaCalor from "../components/pages/MapaCalor/MapaCalor.jsx";



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
        <Route path="/Infraccion" element={<Infraccion />} />
        <Route path="/MultasTabla" element={<MultasTabla />} />
        <Route path="/ListaUsuarios" element={<ListaUsuarios />} />
        <Route path="/Roles" element={<Roles />} />
        <Route path="/AdministrarPerfil" element={<AdministrarPerfil />} />
        <Route path="/RegistrarUsuarioAdmin" element={<RegistrarUsuarioAdmin />} />
        <Route path="/MultasGrafico" element={<MultasGrafico />} />
        <Route path="/Pagina-Inicio" element={<PaginaInicio />} />
        <Route path="/Password-Recovery" element={<PasswordRecovery />} />
        <Route path="/Inicio-Sesion" element={<InicioSesion />} />
        <Route path="/Registro-Usuario" element={<RegistroUsuario />} />
        <Route path="/Consulta-Publica" element={<ConsultaPublica />} />
        <Route path="/Pagina-Usuario" element={<PaginaUsuarioFinal />} />
        <Route path="/Mis-Multas" element={<MisMultas />} />
        <Route path="/Mis-Disputas" element={<MisDisputas />} />
        <Route path="/Mis-Vehiculos" element={<MisVehiculos />} />
        <Route path="/Mapa-Calor" element={<MapaCalor />} />


        
      </Routes>
    </BrowserRouter>
  );
};
