export const isoToDateFormatter = (isoDate) => {

    const isoDateValue = isoDate ? isoDate : new Date().toISOString();
    const date = new Date(isoDateValue);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

export const getDateFromISO = (isoString) => {
    const isoDateValue = isoString ? isoString : new Date().toISOString();
    const date = new Date(isoDateValue);
    return date.toISOString().split('T')[0];
  }

export const getTimeFromISO = (isoString) => {
    const isoDateValue = isoString ? isoString : new Date().toISOString();
    const date = new Date(isoDateValue);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// Formatea la fecha de nacimiento en formato dd-MM-yyyy
export const formatFechaNacimiento = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
