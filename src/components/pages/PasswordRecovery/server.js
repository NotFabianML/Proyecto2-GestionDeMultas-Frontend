const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Configurar el transportador de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Puedes usar otro servicio
    auth: {
        user: 'tu_correo@gmail.com', // Tu correo
        pass: 'tu_contraseña', // Tu contraseña (puedes usar un App Password si tienes activada la verificación en dos pasos)
    },
});

// Ruta para manejar la recuperación de contraseña
app.post('/api/recover-password', (req, res) => {
    const { email } = req.body;

    const newPassword = generateRandomPassword();

    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Recuperación de Contraseña',
        text: `Tu nueva contraseña es: ${newPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo');
        }
        res.status(200).send('Correo enviado con éxito');
    });
});

// Función para generar contraseña aleatoria
const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
