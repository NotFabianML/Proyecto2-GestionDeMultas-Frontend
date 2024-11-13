import axios from 'axios';

const GOOGLE_VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate";

export const detectCedulaFromImage = async (base64Image) => {
    try {
        const requestBody = {
            requests: [
                {
                    image: {
                        content: base64Image,
                    },
                    features: [
                        {
                            type: "TEXT_DETECTION",
                        },
                    ],
                },
            ],
        };

        const response = await axios.post(
            `${GOOGLE_VISION_API_URL}?key=${process.env.REACT_APP_GOOGLE_VISION_KEY}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const textAnnotations = response.data.responses[0].textAnnotations;
        if (!textAnnotations) {
            throw new Error("No se detectó texto en la imagen.");
        }

        const detectedText = textAnnotations[0].description;

        // Validar la presencia de "REPÚBLICA DE COSTA RICA"
        if (!detectedText.includes("REPÚBLICA DE COSTA RICA")) {
            throw new Error("No es una cédula costarricense.");
        }

        // Buscar el número de cédula, típicamente un número de 9 dígitos
        const cedulaRegex = /\b\d{1}\s?\d{4}\s?\d{4}\b/;
        const cedulaMatch = detectedText.match(cedulaRegex);

        if (cedulaMatch) {
            return cedulaMatch[0].replace(/\s/g, ''); // Devolver solo los dígitos
        } else {
            throw new Error("No se detectó un número de cédula válido.");
        }

    } catch (error) {
        console.error("Error al realizar la solicitud a Google Vision API:", error);
        throw error;
    }
};
