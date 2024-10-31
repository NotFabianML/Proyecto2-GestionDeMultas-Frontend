import React from 'react';
import './ResolverDisputa.css';
import Button from '../../atoms/Button.jsx';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';

const ResolverDisputa = () => {
    return (
        <div className="resolver-disputa">

            <header>
                <JuezNavbar />
            </header>

            <body>
                <h1>Resolver Disputa</h1>
                <FormularioMulta  mostrarBotones={false} />
            
            
                <div class="resolucion">
                    <h2>Resolución</h2>
                    <label>Comentario de resolución</label>
                    <textarea id="descripcion" name="descripcion" placeholder="Máximo 255 caracteres" maxLength="255"></textarea>

                    <div className="botones">
                        <Button variant="secondary" size="medium" text="Anular multa" />
                        <Button variant="secondary" size="medium" text="Mantener multa" />
                    </div>
                </div>
            </body>
            
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default ResolverDisputa;
