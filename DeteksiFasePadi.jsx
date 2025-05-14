import React, { useState } from "react";

export default function DeteksiFasePadi() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const penjelasanFase = {
    "V1": "Fase awal pertumbuhan daun dan akar.",
    "V2": "Pertumbuhan tinggi, anakan mulai berkembang.",
    "G1": "Pembentukan malai dan awal pembungaan.",
    "G2": "Pengisian bulir hingga panen."
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/deteksi-fase/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Gagal mengunggah gambar:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Deteksi Fase Padi</h1>

      <input type="file" onChange={handleChange} accept="image/*" />
      <button
        onClick={handleUpload}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Deteksi Fase
      </button>

      {loading && <p className="mt-4 text-blue-500">Memproses gambar...</p>}

      {result && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Hasil Deteksi:</h2>
          <p>Fase: <strong>{result.fase} ({result.label})</strong></p>
          <p className="mt-2">{penjelasanFase[result.fase]}</p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Penjelasan Fase Padi:</h3>
        <ul className="list-disc list-inside mt-2">
          <li><strong>V1 - Vegetatif Awal:</strong> {penjelasanFase.V1}</li>
          <li><strong>V2 - Vegetatif Akhir:</strong> {penjelasanFase.V2}</li>
          <li><strong>G1 - Reproduktif:</strong> {penjelasanFase.G1}</li>
          <li><strong>G2 - Pemasakan:</strong> {penjelasanFase.G2}</li>
        </ul>
      </div>
    </div>
  );
}
