import React from "react";
import "./MapaCalor.css";
import InvitadoNavbar from "../../layouts/Navbar/InvitadoNavbar.jsx";
import Footer from "../../layouts/Footer.jsx";
import MapaCalorImg from "../../../assets/MapaCalorImg.png";
import { useUserContext } from "../../../contexts/UserContext.jsx";
import OficialNavbar from "../../layouts/Navbar/OficialNavbar.jsx";
import AdminNavbar from "../../layouts/Navbar/AdminNavbar.jsx";
import UsuarioNavbar from "../../layouts/Navbar/UsuarioNavbar.jsx";
import JuezNavbar from "../../layouts/Navbar/JuezNavbar.jsx";

const MapaCalor = () => {
  const { role } = useUserContext();

  const handleNavbar = () => {
    switch (role) {
      case "Usuario Final":
        return <UsuarioNavbar />;
      case "Oficial de Tránsito":
        return <OficialNavbar />;
      case "Juez de Tránsito":
        return <JuezNavbar />;
      case "Administrador":
        return <AdminNavbar />;
      default:
        return <InvitadoNavbar />;
    }
  };

  return (
    <div className="mapa-calor-page">
      <header>
        {handleNavbar()}
        {/* <InvitadoNavbar /> */}
      </header>

      <main className="mapa-calor-content">
        <div className="texto-contenedor">
          <h1>Echa un vistazo a nuestro mapa de calor.</h1>
          <p>
            Aquí podrás visualizar información importante para los ciudadanos.
          </p>
        </div>
        <div className="imagen-contenedor">
          <img
            src={MapaCalorImg}
            alt="Mapa de calor"
            className="mapa-calor-image"
          />
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MapaCalor;
