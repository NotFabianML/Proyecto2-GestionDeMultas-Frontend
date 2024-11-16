import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ResolverDisputa.css';
import Button from '../../atoms/Button.jsx';
import JuezNavbar from '../../layouts/Navbar/JuezNavbar.jsx';
import Footer from '../../layouts/Footer.jsx';
import FormularioMulta from '../../organism/Formulario/FormularioMulta.jsx';
import { getMultaById } from '../../../services/multaServices.js';
import { cambiarEstadoDisputa } from '../../../services/disputaService.js';

const ResolverDisputa = () => {
    const [multa, setMulta] = useState({});
    const [error, setError] = useState(null);
    const location = useLocation();
    const motivo = location.state?.motivo || ''; 
    const multaId = location.state?.idMulta || ''; 
    const idDisputa = location.state?.idDisputa || '';

    useEffect(() => {
        getMultaById(multaId)
            .then((data) => {
                setMulta(data);
            })
            .catch((error) => {
                setError(`Error: ${error.message}`);
            });
    }, [multaId]);

    const handleRechazarDisputa = async () => {
        try {
            await cambiarEstadoDisputa(idDisputa, 2); // Estado 2 para "Rechazar disputa"
            alert("La disputa ha sido rechazada");
            setMulta((prev) => ({ ...prev, estadoDisputa: 2 }));
        } catch (error) {
            setError(`Error al rechazar la disputa: ${error.message}`);
        }
    };

    const handleAceptarDisputa = async () => {
        try {
            await cambiarEstadoDisputa(idDisputa, 1); // Estado 1 para "Aceptar disputa"
            alert("La disputa ha sido aceptada");
            setMulta((prev) => ({ ...prev, estadoDisputa: 1 }));
        } catch (error) {
            setError(`Error al aceptar la disputa: ${error.message}`);
        }
    };

    return (
        <div className="resolver-disputa">
            <header>
                <JuezNavbar />
            </header>

            <div>
                <h1>Resolver Disputa</h1>
                <FormularioMulta 
                    mostrarBotones={false} 
                    soloLectura={true} 
                    mostrarSeleccionUbicacion={false}
                    multa={multa} 
                />

                <div className="resolucion">
                    <h2>Resolución</h2>

                    <div className="input-group">
                        <label htmlFor="motivo">Motivo de la disputa</label>
                        <input id="motivo" name="motivo" type="text" readOnly value={motivo} />
                    </div>

                    <div>
                        <label>Comentario de resolución</label>
                        <textarea id="descripcion" name="descripcion" placeholder="Máximo 255 caracteres" maxLength="255"></textarea>
                    </div>

                    <div className="botones">
                        <Button variant="secondary" size="medium" text="Aceptar disputa" onClick={handleAceptarDisputa} />
                        <Button variant="alternative" size="medium" text="Rechazar disputa" onClick={handleRechazarDisputa} />
                    </div>
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default ResolverDisputa;
