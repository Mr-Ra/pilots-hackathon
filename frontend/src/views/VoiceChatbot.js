import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceChatbot = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]); 
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      // Activamos el reconocimiento de voz continuo
      SpeechRecognition.startListening({ continuous: true, language: 'es-ES' });
    }
    setIsListening(!isListening);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Fix: Toggle minimization correctly
  };

  const sendTranscriptToAPI = async (transcript) => {
    if (!transcript || transcript.trim() === '') {
      return 'Por favor, di algo para poder procesarlo.';
    }

    try {
      const response = await fetch('http://' + window.location.hostname +':8000/talk-to-pilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcription: transcript }), // Asegúrate de que este campo es el esperado por la API
      });

      // Verificar el estado de la respuesta
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data?.response || 'No se recibió respuesta de la API';
    } catch (error) {
      console.error('Error al enviar el mensaje a la API:', error);
      return `Hubo un error al procesar la solicitud: ${error.message}`;
    }
  };

  useEffect(() => {
    if (transcript) {
      console.log("Texto reconocido:", transcript);

      // Agregar mensaje del usuario
      setMessages((prevMessages) => [...prevMessages, { user: true, text: transcript }]);

      let response = '';

      // Lógica condicional para respuestas predefinidas
      if (transcript.toLowerCase().includes('hola')) {
        response = '¡Hola! ¿Cómo puedo ayudarte?';
      } else if (transcript.toLowerCase().includes('adiós')) {
        response = '¡Hasta luego!';
      } else if (transcript.toLowerCase().includes('abrir página')) {
        response = 'Abriendo la página...';
      } else if (transcript.toLowerCase().includes('qué hora es')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `La hora actual es: ${currentTime}`;
      } else {
        // Si no se encuentra ninguna respuesta predefinida, se envía la transcripción a la API
        const fetchResponse = async () => {
          const apiResponse = await sendTranscriptToAPI(transcript);
          setMessages((prevMessages) => [...prevMessages, { user: false, text: apiResponse }]);
        };
        fetchResponse();
      }

      // Si hay una respuesta predefinida, la muestra
      if (response) {
        setMessages((prevMessages) => [...prevMessages, { user: false, text: response }]);
      }

      resetTranscript(); // Limpiar la transcripción
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Este navegador no soporta el reconocimiento de voz.</p>;
  }

  return (
    <div className={`voice-chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-box">
        {/* Mostrar los mensajes solo cuando no esté minimizado */}
        {!isMinimized && (
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.user ? 'user-message' : 'bot-message'}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        )}
        <div className="chat-controls">
          <button onClick={toggleListening} className="chatbot-btn">
            {isListening ? "Detener Escuchar" : "Iniciar Escuchar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
