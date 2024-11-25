const API_URL = `http://${window.location.hostname}:8000/talk-to-pilot`;

export const sendTranscriptToAPI = async (text) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcription: text }),
    });
    if (!response.ok) throw new Error(`Error API: ${response.status}`);
    const data = await response.json();
    return data?.pilot_response || "No se recibió respuesta de la API.";
  } catch (error) {
    console.error("Error al enviar la transcripción:", error);
    return "Hubo un error al procesar la solicitud.";
  }
};
