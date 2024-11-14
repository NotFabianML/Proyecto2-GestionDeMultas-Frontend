// Valida el formato del correo
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Valida la contraseña: 8-16 caracteres, 1 mayúscula, 1 número, 1 carácter especial
export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*]).{8,16}$/;
    return passwordRegex.test(password);
};

// Valida el formato de la cédula costarricense (9 dígitos)
export const validateCedula = (cedula) => {
    const cedulaRegex = /^\d{9}$/; // Ejemplo: 123456789
    return cedulaRegex.test(cedula);
};

// Valida el formato del número de teléfono costarricense (8 dígitos, comienza con 2, 4, 6, 7 o 8)
export const validateTelefono = (telefono) => {
    const telefonoRegex = /^[24678]\d{7}$/; // Ejemplo: 88888888
    return telefonoRegex.test(telefono);
};
