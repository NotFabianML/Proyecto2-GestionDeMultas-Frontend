import React from "react";
import { AdminNavbar } from "../../../layouts/Navbar";

const ListaUsuarios = () => {
    const handleClick = () => {
    alert("Boton clickeado");
    };





    return (
        <div>
            <header>
            <AdminNavbar />
            </header>
        <h1>listaUsuarios</h1>
        </div>
    );
    }
    export default ListaUsuarios;