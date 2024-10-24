import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";
import About from "../components/pages/About";
import Contact from "../components/pages/Contact";
import PaginaOficialTransito from "../components/pages/PaginaOficialTransito";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
          </Routes>

          <PaginaOficialTransito></PaginaOficialTransito>
    </BrowserRouter>
  );
};
