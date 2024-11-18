/**
 * Formatea un ID para que sea más corto y esté en mayúsculas.
 * @param {string} id - El ID completo a formatear.
 * @returns {string} El ID formateado (hasta el primer guion y en mayúsculas).
 */
export const formatId = (id) => {
    // if (typeof id !== "string") {
    //   throw new Error("El ID debe ser una cadena de texto.");
    // }
  
    // Convertir el ID a string en caso de que no lo sea
    const idString = String(id);

    const [shortId] = idString.split("-");
    return shortId.toUpperCase();
  };
  