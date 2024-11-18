import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const Factura = ({ multa, user }) => {
    const facturaData = {
        idFactura: 1,
        nombreUsuario: `${user?.nombre} ${user?.apellido1} ${user?.apellido2}`,
        identificacion: user?.cedula,
        email: user?.email,
        telefono: user?.telefono,
        fechaFactura: format(new Date(), "yyyy-MM-dd"),

        idMulta: multa?.idMulta,
        infracciones: multa?.infracciones,
        montoTotal: multa?.montoTotal,
    };

    const generarPDF = () => {
        const doc = new jsPDF();

        // Encabezado
        doc.setFontSize(18);
        doc.text('Factura Electrónica', 105, 20, { align: 'center' });

        // Información del usuario
        doc.setFontSize(12);
        doc.text(`Usuario: ${facturaData.nombreUsuario}`, 10, 50);
        doc.text(`Identificación: ${facturaData.identificacion}`, 10, 60);
        doc.text(`Teléfono: ${facturaData.telefono}`, 10, 70);
        doc.text(`Correo Electrónico: ${facturaData.email}`, 10, 80);

        // Información de la factura
        doc.text(`No de Factura: ${facturaData.idFactura}`, 150, 50);
        doc.text(`Fecha de factura: ${facturaData.fechaFactura}`, 150, 60);

        // Formatear infracciones para la tabla
        const infraccionesTexto = facturaData.infracciones
            .map((infraccion, index) => `${infraccion.titulo}`)
            .join("\n");

        // Tabla de resumen con infracciones
        const columns = ["#", "ID Multa", "Infracciones", "Monto Total"];
        const data = [
            ["1", facturaData.idMulta, infraccionesTexto, `₡ ${facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`],
        ];

        doc.autoTable({
            startY: 100,
            head: [columns],
            body: data,
            theme: 'grid',
            foot: [['', '', 'Total', `₡ ${facturaData.montoTotal.toLocaleString("es-CR", { minimumFractionDigits: 2 })}`]], // Total en la esquina inferior derecha
            footStyles: { halign: 'right' },
        });

        // Guardar el PDF
        doc.save(`factura_${facturaData.idFactura}.pdf`);
    };

    const generarXML = () => {
        const infraccionesXML = facturaData.infracciones
            .map(infraccion => `
                <Infraccion>
                    <Codigo>${infraccion.codigo}</Codigo>
                    <Descripcion>${infraccion.descripcion}</Descripcion>
                    <Monto>₡ ${infraccion.monto.toFixed(2)}</Monto>
                </Infraccion>
            `)
            .join("");

        const xmlContent = `
        <FacturaElectronica>
            <NoFactura>${facturaData.idFactura}</NoFactura>
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
        link.download = `factura_${facturaData.idFactura}.xml`;
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <h1>Factura</h1>
            <button onClick={generarPDF}>Generar PDF</button>
            <button onClick={generarXML}>Descargar XML</button>
        </div>
    );
};

export default Factura;
