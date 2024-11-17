import { jsPDF } from "jspdf";

function Factura() {
    const facturaData = {	
        idFactura: 1,
        fecha: '2021-10-01',
        multas: [''],
        nombreUsuario: '',
        total: 100,
    };

    const generardPDF = () => {
        const doc = new jsPDF();

        // Encabezado de la factura
        doc.text('Factura', 95, 20);
        doc.text(`Número de factura: ${facturaData.idFactura}`, 10, 30);
        doc.text(`Fecha: ${facturaData.fecha}`, 10, 40);
        doc.text(`Usuario: ${facturaData.nombreUsuario}`, 10, 50);
        doc.text(`Total: ${facturaData.total}`, 10, 60);


        //Crear una tabla para los detalles de la factura
        const columns = ["ID Multa", "Descripción", "Valor"];

        // Guardar el PDF con un nombre específico
        doc.save(`factura_${facturaData.idFactura}.pdf`);
    };

    return (
        <div>
            <h1>Factura</h1>
            <h4>Logo</h4>
            <p>Número de factura: {facturaData.idFactura}</p>
            <p>Fecha: {facturaData.fecha}</p>
            <p>Usuario: {facturaData.nombreUsuario}</p>
            <p>Multas: {facturaData.multas}</p>
            <p>Total: {facturaData.total}</p>

            <button onClick={generardPDF}>Generar PDF</button>
        </div>
    );
}

export default Factura;
