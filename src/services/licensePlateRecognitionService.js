import axios from 'axios';

const GOOGLE_VISION_API_URL = "https://vision.googleapis.com/v1/images:annotate";

export const detectPlacaFromImage = async (base64Image) => {
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

        // Verificar que el texto contiene "COSTA RICA"
        const costaRicaIndex = detectedText.indexOf("COSTA RICA");
        if (costaRicaIndex === -1) {
            throw new Error("No es una placa costarricense.");
        }
        
        // Extraer el texto que sigue después de "COSTA RICA"
        const textAfterCostaRica = detectedText.slice(costaRicaIndex + "COSTA RICA".length);

        // Extraer solo los primeros 6 caracteres alfanuméricos (ignorar guiones)
        const placaMatch = textAfterCostaRica.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);

        if (placaMatch.length === 6) {
            return placaMatch;
        } else {
            throw new Error("No se detectó un número de placa válido.");
        }

    } catch (error) {
        console.error("Error al realizar la solicitud a Google Vision API:", error);
        throw error;
    }
};
