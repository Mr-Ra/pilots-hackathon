import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { sendTranscriptToAPI } from "../../utils/api";
import "./VoiceChatbot.css";

const VoiceChatbot = () => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([]);
  const [concatenatedTranscript, setConcatenatedTranscript] = useState("");
  const [previousWords, setPreviousWords] = useState(new Set()); // Usamos un Set para evitar duplicados
  const [isResolving, setIsResolving] = useState(false); // Estado para saber si estamos esperando la respuesta

  const messagesEndRef = useRef(null); // Ref para el final del chat

  const suggestions = [
    "Estima la distribución de costos en porcentajes según los modos de transporte",
    "Indicame cuales son los productos que requieran pronta reposición, tomando en cuenta lead times y un análisis de la demanda",
    "Envía un correo al departamento de contabilidad indicando la distribución de costos en porcentajes según los modos de transporte",
    "Indica cuáles son los productos de mayor demanda con el lead time más bajo y envía el reporte al equipo de comercio exterior",
    "Dame un reporte sobre los productos de menor demanda y envialo a los proveedores",
  ];

  // Función para iniciar/detener la grabación
  const toggleListening = () => {
    if (isListening) {
      // Detener el micrófono
      SpeechRecognition.stopListening();

      // Enviar la última transcripción concatenada a la API, solo si no está vacía
      if (concatenatedTranscript.trim()) {
        setIsResolving(true); // Indicamos que estamos resolviendo la respuesta
        const fetchResponse = async () => {
          const response = await sendTranscriptToAPI(concatenatedTranscript);
          setMessages((prev) => [...prev, { user: false, text: response }]); // Mostrar la respuesta del bot
          setIsResolving(false); // Indicamos que la respuesta ya ha llegado
        };
        fetchResponse();

        // Resetear la transcripción manualmente después de hacer la petición
        resetTranscription(); // Limpiar todas las variables relacionadas con la transcripción
        resetTranscript(); // Limpiar el estado de la transcripción de `useSpeechRecognition`
      }
    } else {
      // Si comienza a grabar de nuevo, reiniciar la concatenación
      resetTranscription(); // Limpiar transcripción y estado previo al reiniciar
      resetTranscript(); // Limpiar el estado de la transcripción de `useSpeechRecognition`
      SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    }
    setIsListening(!isListening);
  };

  // Resetear transcripción y palabras previas
  const resetTranscription = () => {
    setConcatenatedTranscript(""); // Limpiar transcripción acumulada
    setPreviousWords(new Set()); // Reiniciar el set de palabras anteriores
  };

  // Manejar clic en las sugerencias
  const handleSuggestionClick = (suggestion) => {
    setConcatenatedTranscript(suggestion); // La sugerencia se considera la transcripción final
    setMessages((prev) => [
      ...prev,
      { user: true, text: suggestion },
    ]); // Mostrar la sugerencia como mensaje del usuario
  };

  // Eliminar duplicados en la transcripción
  const removeDuplicates = (text) => {
    const words = text.trim().split(" "); // Dividir la transcripción en palabras
    const uniqueWords = words.filter(word => {
      if (!previousWords.has(word.toLowerCase())) {
        previousWords.add(word.toLowerCase()); // Agregar palabra al Set
        return true; // Si no está en el Set, agregarla
      }
      return false; // Si la palabra ya está, omitirla
    });
    return uniqueWords.join(" "); // Regresar el texto sin duplicados
  };

  // Concatenar las transcripciones eliminando duplicados
  useEffect(() => {
    if (transcript) {
      const cleanedTranscript = removeDuplicates(transcript);
      if (cleanedTranscript) {
        setConcatenatedTranscript(prev => prev + " " + cleanedTranscript);
      }
    }
  }, [transcript]);

  // Desplazar hacia el final cuando el estado isResolving cambia
  useEffect(() => {
    if (isResolving) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isResolving]);

  if (!browserSupportsSpeechRecognition) {
    return <p>Este navegador no soporta reconocimiento de voz.</p>;
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Piloto de Cadenas de Suministro</h2>
        <button onClick={toggleListening} className="microphone-btn">
          {isListening ? "Detener Micrófono" : "Iniciar Micrófono"}
        </button>
      </div>
      <div className="instruction-box">
        <p>
            Presiona el botón <strong>"Iniciar Micrófono"</strong> y ordena operaciones o consultas. Puedes dictar al piloto alguna de las sugerencias de consulta que aparecen abajo.
        </p>
    </div>      

      <div className="chatbot-body">
        {/* Sugerencias */}
        <div className="suggestions-box">
          <h4>Sugerencias:</h4>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {/* Mostrar solo la respuesta del bot */}
        <div className="messages-container">
          {messages.length > 0 && (
            <div className={`message bot-message`}>
              {messages[messages.length - 1].text}
            </div>
          )}

          {/* Mostrar "Resolviendo" mientras se espera la respuesta */}
          {isResolving && (
            <div className="message bot-message">
              Resolviendo...
            </div>
          )}
          
          {/* Ref para el final del chat */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default VoiceChatbot;
