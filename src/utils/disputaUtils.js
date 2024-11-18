export const getEstadoDisputa = (estado) => {
    switch (estado) {
        case 1:
            return "En disputa";
        case 2:
            return "Aceptada";
        case 3:
            return "Rechazada";
        default:
            return "Estado desconocido";
    }
};
