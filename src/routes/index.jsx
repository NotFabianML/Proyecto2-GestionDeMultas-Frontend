import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home.jsx";

import PaginaInicio from "../components/pages/PaginaInicio/PaginaInicio.jsx";
import AdministrarPerfil from "../components/pages/UsuarioAdmin/GestionUsuarios/administarPerfil.jsx";
import InicioSesion from "../components/pages/InicioSesion/InicioSesion.jsx";
import RegistroUsuario from "../components/pages/RegistroUsuario/RegistroUsuario.jsx";
import PasswordRecovery from "../components/pages/PasswordRecovery/PasswordRecovery.jsx";
import PasswordReset from "../components/pages/PasswordReset/PasswordReset.jsx";
import ConsultaPublica from "../components/pages/ConsultaPublica/ConsultaPublica.jsx";
import MapaCalor from "../components/pages/MapaCalor/MapaCalor.jsx";
import Autenticacion2F from "../components/pages/InicioSesion/Autenticacion2F.jsx";

import PaginaUsuarioFinal from "../components/pages/UsuarioFinal/index.jsx";
import MisMultas from "../components/pages/UsuarioFinal/MisMultas.jsx";
import MisDisputas from "../components/pages/UsuarioFinal/MisDisputas.jsx";
import MisVehiculos from "../components/pages/UsuarioFinal/MisVehiculos.jsx";
import Factura from "../components/pages/UsuarioFinal/Factura.jsx";
import DashboardUser from "../components/pages/UsuarioFinal/DashboardUser.jsx";

import InicioAdmin from "../components/pages/UsuarioAdmin/InicioAdmin.jsx";
import RegistrarUsuarioAdmin from "../components/pages/UsuarioAdmin/GestionUsuarios/registrarUsuarioAdmin.jsx";
import ListaUsuarios from "../components/pages/UsuarioAdmin/GestionUsuarios/listaUsuarios.jsx";
import Roles from "../components/pages/UsuarioAdmin/GestionRoles/roles.jsx";
import GestionMultas from "../components/pages/UsuarioOficialTransito/GestionMultas.jsx";
import MultasGrafico from "../components/pages/UsuarioAdmin/EstadoMultas/multasGrafico.jsx";
import Infraccion from "../components/pages/UsuarioAdmin/CatalogoInfracciones/infraccion.jsx";
import DashboardAdmin from "../components/pages/UsuarioAdmin/DashboardAdmin.jsx";

import PaginaOficialTransito from "../components/pages/UsuarioOficialTransito/index.jsx";
import CrearMulta from "../components/pages/UsuarioOficialTransito/CrearMulta.jsx";
import MultasTabla from "../components/pages/UsuarioAdmin/EstadoMultas/multasTabla.jsx";

import PaginaJuez from "../components/pages/UsuarioJuez/index.jsx";
import DisputasJuez from "../components/pages/UsuarioJuez/DisputasJuez.jsx";
import ResolverDisputa from "../components/pages/UsuarioJuez/ResolverDisputa.jsx";



export const MainRouter = () => {
  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* Usuario invitado */}
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/administrar-perfil" element={<AdministrarPerfil />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        <Route path="/registro-usuario" element={<RegistroUsuario />} />
        <Route path="/recuperar-contraseña" element={<PasswordRecovery />} />
        <Route path="/resetear-contraseña" element={<PasswordReset />} />
        <Route path="/consulta-publica" element={<ConsultaPublica />} />
        <Route path="/mapa-calor" element={<MapaCalor />} />
        <Route path="/autenticacion-2f" element={<Autenticacion2F />} /> 

        {/* Usuario Final */}
        <Route path="/pagina-usuario" element={<PaginaUsuarioFinal />} />
        <Route path="/mis-multas" element={<MisMultas />} />
        <Route path="/mis-disputas" element={<MisDisputas />} />
        <Route path="/mis-vehiculos" element={<MisVehiculos />} />
        <Route path="/factura" element={<Factura />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />

        {/* Administrador */}
        <Route path="/inicio-admin" element={<InicioAdmin />} />
        <Route path="/registrar-usuario-admin" element={<RegistrarUsuarioAdmin />} />
        <Route path="/lista-usuarios" element={<ListaUsuarios />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/gestion-multas" element={<GestionMultas />} />
        <Route path="/multas-grafico" element={<MultasGrafico />} />
        <Route path="/infraccion" element={<Infraccion />} />
        <Route path="/administrar-perfil" element={<AdministrarPerfil />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />

        {/* Oficial de Tránsito */}
        <Route path="/pagina-oficial" element={<PaginaOficialTransito />} />
        <Route path="/crear-multa" element={<CrearMulta />} />
        <Route path="/multas-tabla" element={<MultasTabla />} />

        {/* Juez de Tránsito */}
        <Route path="/pagina-juez" element={<DisputasJuez />} />
        <Route path="/disputas-juez" element={<DisputasJuez />} />
        <Route path="/resolver-disputa" element={<ResolverDisputa />} />

      </Routes>
    // </BrowserRouter>
  );
};
