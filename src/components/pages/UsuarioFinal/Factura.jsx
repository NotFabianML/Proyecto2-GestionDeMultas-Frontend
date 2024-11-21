import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import { formatId } from "../../../utils/idFormatUtils";
import "./Factura.css";
import { useLocation } from 'react-router-dom';
import Button from "../../atoms/Button";
import { useNavigate } from 'react-router-dom';

const Factura = () => {
    const location = useLocation();
    const { multa, user } = location.state || {};
    const numeroFacturaInicial = 20241124;
    const navigate = useNavigate();

    const getNextFacturaNumber = () => {
        const lastFacturaNumber = parseInt(localStorage.getItem('lastFacturaNumber')) || numeroFacturaInicial;
        const nextFacturaNumber = lastFacturaNumber + 1;
        localStorage.setItem('lastFacturaNumber', nextFacturaNumber); // Guardar el número actualizado
        return nextFacturaNumber;
    };

    const facturaData = {
        idFactura: getNextFacturaNumber(),
        nombreUsuario: `${user?.nombre} ${user?.apellido1} ${user?.apellido2}`,
        identificacion: user?.cedula,
        email: user?.email,
        telefono: user?.telefono,
        fechaFactura: format(new Date(), "dd-MM-yyyy"),
        idMulta: multa?.idMulta,
        infracciones: multa?.infracciones,
        montoTotal: multa?.montoTotal,
    };

    const formattedFacturaNumber = facturaData.idFactura.toString().padStart(7, '0');

    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Factura Electrónica', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text(`Usuario: ${facturaData.nombreUsuario}`, 10, 50);
        doc.text(`Identificación: ${facturaData.identificacion}`, 10, 60);
        doc.text(`Teléfono: ${facturaData.telefono}`, 10, 70);
        doc.text(`Correo Electrónico: ${facturaData.email}`, 10, 80);
        doc.text(`No de Factura: ${formattedFacturaNumber}`, 150, 50);
        doc.text(`Fecha de factura: ${facturaData.fechaFactura}`, 150, 60);

        const infraccionesTexto = facturaData.infracciones
            .map(infraccion => `• ${infraccion.titulo}`)
            .join("\n");

        const columns = ["#", "ID Multa", "Infracciones", "Monto"];
        const data = [
            ["1", formatId(facturaData.idMulta), infraccionesTexto, `CRC ${facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`],
        ];

        data.push(["", "", "Monto", `CRC ${facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`]);

        doc.autoTable({
            startY: 100,
            head: [columns],
            body: data,
            theme: 'grid',
            styles: { fontSize: 10 },
            bodyStyles: { font: "helvetica", textColor: [0, 0, 0] },
            columnStyles: {
                3: { halign: 'right' },
            },
            didParseCell: function (data) {
                if (data.row.index === data.table.body.length - 1) {
                    data.cell.styles.fontStyle = 'bold';
                    data.cell.styles.halign = 'right';
                }
            },
        });

        doc.save(`factura_${formattedFacturaNumber}.pdf`);
    };

    const generarXML = () => {
        const infraccionesXML = facturaData.infracciones
            .map(infraccion => 
                `<Infraccion><Titulo>${infraccion.titulo}</Titulo></Infraccion>`
            )
            .join("");

        const xmlContent = `
        <FacturaElectronica>
            <NoFactura>${formattedFacturaNumber}</NoFactura>
            <FechaFactura>${facturaData.fechaFactura}</FechaFactura>
            <Usuario>
                <Nombre>${facturaData.nombreUsuario}</Nombre>
                <Identificacion>${facturaData.identificacion}</Identificacion>
                <Telefono>${facturaData.telefono}</Telefono>
                <Email>${facturaData.email}</Email>
            </Usuario>
            <DetallesMulta>${infraccionesXML}</DetallesMulta>
            <MontoTotal>₡ ${facturaData.montoTotal.toFixed(2)}</MontoTotal>
        </FacturaElectronica>`;

        const blob = new Blob([xmlContent], { type: "application/xml" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `factura_${formattedFacturaNumber}.xml`;
        link.click();

        URL.revokeObjectURL(url);
    };

    const handleClose = () => {
        navigate("/mis-multas");
    };

    return (
        <div className="factura-container">

            <h1>Factura Electrónica</h1>

            <div className="factura-header">
                <div className="header-left">
                    <div><strong>Usuario:</strong> {facturaData.nombreUsuario}</div>
                    <div><strong>Identificación:</strong> {facturaData.identificacion}</div>
                    <div><strong>Teléfono:</strong> {facturaData.telefono}</div>
                    <div><strong>Correo Electrónico:</strong> {facturaData.email}</div>
                </div>
                <div className="header-right">
                    <div><strong>No de Factura:</strong> {formattedFacturaNumber}</div>
                    <div><strong>Fecha de Factura:</strong> {facturaData.fechaFactura}</div>
                </div>
            </div>
            <div className="factura-table">
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID Multa</th>
                            <th>Infracciones</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>{formatId(facturaData.idMulta)}</td>
                            <td>
                                {facturaData?.infracciones
                                    .map(infraccion => infraccion.titulo)
                                    .join(", ")
                                }
                            </td>
                            <td>CRC {facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}</td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <td  colSpan="3"><strong>Total</strong></td>
                            <td><strong>CRC {facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="factura-actions">

                <Button onClick={generarPDF} variant="outline" text="Descargar PDF" />
                <Button onClick={generarXML} variant="primary" text="Descargar XML" />
                <Button onClick={handleClose} variant="danger" text="Cerrar" />
            </div>
        </div>
    );
};

export default Factura;
