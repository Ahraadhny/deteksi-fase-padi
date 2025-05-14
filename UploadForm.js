import React, { useState } from 'react';

function UploadForm() {
  const [image, setImage] = useState(null);
  const [hasil, setHasil] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Pilih gambar terlebih dahulu');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://127.0.0.1:8000/deteksi-fase/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setHasil(data.fase);
    } catch (error) {
      console.error('Gagal mengirim gambar:', error);
      setHasil('Gagal menghubungi server.');
    }
  };

  return (
    <div>
      <h2>Deteksi Fase Padi</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Deteksi</button>
      </form>
      {hasil && <p>Hasil Deteksi: <strong>{hasil}</strong></p>}
    </div>
  );
}

export default UploadForm;
