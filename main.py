from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

# CORS untuk akses dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # sesuaikan jika deploy nanti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model YOLOv8
model = YOLO("model.pt")

@app.post("/deteksi-fase/")
async def deteksi_fase(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    results = model(image)
    kelas = results[0].names
    prediksi = results[0].boxes.cls.tolist()

    if prediksi:
        fase = kelas[int(prediksi[0])]
    else:
        fase = "Tidak terdeteksi"

    return {"fase": fase}
