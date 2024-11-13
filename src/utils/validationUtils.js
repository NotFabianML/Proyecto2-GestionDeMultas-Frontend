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
