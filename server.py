from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import speech_recognition as sr
import tempfile
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pilot import Pilot


class TranscriptRequest(BaseModel):
    transcription: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes. Cambia "*" por una lista específica si es necesario.
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

@app.post("/transcript")
async def transcript_audio(file: UploadFile = File(...)):
    """
    Endpoint para transcribir un archivo de audio.
    Recibe un archivo de audio en formato multipart/form-data y devuelve la transcripción.
    """
    
    # Guardar el archivo de audio temporalmente
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        # Utilizar SpeechRecognition para transcribir el audio
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_file_path) as source:
            audio_data = recognizer.record(source)  # Lee el contenido del archivo
            try:
                transcription = recognizer.recognize_google(audio_data, language="es-ES")  # Cambiar el idioma si es necesario
            except sr.UnknownValueError:
                raise HTTPException(status_code=422, detail="No se pudo entender el audio.")
            except sr.RequestError as e:
                raise HTTPException(status_code=500, detail=f"Error al conectarse al servicio de reconocimiento de voz: {e}")

        # Devolver la transcripción como JSON
        return JSONResponse(content={"transcription": transcription})

    finally:
        # Eliminar el archivo temporal
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)



@app.post("/talk-to-pilot")
async def talk_to_pilot(request: TranscriptRequest):

    transcription = request.transcription
    
    pilot = Pilot(human_input=transcription)

    pilot_response = pilot.execute()


    # if not pilot_response:
    #     raise HTTPException(status_code=400, detail="Error processing transcription.")

    return {"pilot_response": pilot_response}    