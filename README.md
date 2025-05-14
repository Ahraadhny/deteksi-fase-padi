# Deteksi Fase Pertumbuhan Padi Menggunakan YOLOv8

Proyek ini mengembangkan fitur deteksi visual fase pertumbuhan padi berbasis citra menggunakan algoritma YOLOv8. Fitur ini diintegrasikan ke dalam platform KawalTani.id dan digunakan untuk membantu petani mengenali fase vegetatif dan generatif tanaman padi berdasarkan gambar.

## 🔧 Fitur

- Upload gambar sawah untuk dideteksi fasenya (V1, V2, G1, G2)
- Visualisasi hasil deteksi di dashboard
- Integrasi dengan YOLOv8 sebagai backend detektor
- Interface berbasis React (kawaltani-frontend-v2)

## 📦 Requirements

Untuk menjalankan aplikasi, pastikan Anda telah menginstall dependensi berikut:

### Python (Backend)
Lihat [`requirements.txt`](./requirements.txt) untuk detail.

```bash
pip install -r requirements.txt
```

### Node.js (Frontend)
```bash
cd kawaltani-frontend-v2
npm install
```

## 🚀 Menjalankan Aplikasi

### Backend
```bash
python main.py
```

### Frontend
```bash
cd kawaltani-frontend-v2
npm run dev
```

## 📁 Struktur Folder

```
.
├── main.py
├── model.pt (tidak disimpan di repo, silakan unduh dari link)
├── kawaltani-frontend-v2/
│   └── src/
│   └── public/
├── UploadForm.js
├── DeteksiFasePadi.jsx
├── requirements.txt
└── README.md
```

## 📌 Catatan

- Model YOLOv8 (`model.pt`) tidak disertakan dalam repo ini. Unduh dari: [Google Drive link here]
