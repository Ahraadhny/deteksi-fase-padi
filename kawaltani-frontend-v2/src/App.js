import React, { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://127.0.0.1:8000/deteksi-fase/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setResult({ error: 'Gagal menghubungi server' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
  };

  const fases = [
    { img: '/images/v1.jpg', title: 'Fase Vegetatif Awal (V1)', desc: 'Tanaman mulai tumbuh daun dan akar dengan pesat (0–35 hari).' },
    { img: '/images/v2.jpg', title: 'Fase Vegetatif Akhir (V2)', desc: 'Tunas baru dan daun bertambah (35–55 hari).' },
    { img: '/images/g1.jpg', title: 'Fase Reproduktif (G1)', desc: 'Malai mulai terbentuk, penting menuju pembungaan (55–85 hari).' },
    { img: '/images/g2.jpg', title: 'Fase Pematangan (G2)', desc: 'Gabah menguning, persiapan panen (85+ hari).' }
  ];

  const getFaseLabel = (faseKey) => {
    switch (faseKey) {
      case 'fase_v1': return 'Fase Vegetatif Awal (V1)';
      case 'fase_v2': return 'Fase Vegetatif Akhir (V2)';
      case 'fase_g1': return 'Fase Reproduktif (G1)';
      case 'fase_g2': return 'Fase Pematangan (G2)';
      default: return faseKey;
    }
  };

  return (
    <div className="App" style={{ display: 'flex', padding: 20, gap: 20, fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Sidebar Kosong */}
      <div style={{
        width: 180,
        backgroundColor: '#f1f3f5',
        borderRadius: 10,
        height: 'calc(100vh - 40px)'
      }} />

      {/* Penjelasan Fase */}
      <div style={{
        width: 260, 
        backgroundColor: '#ffe5b4',
        padding: 15,
        borderRadius: 10,
        height: 'calc(90vh - 40px)',
        overflowY: 'auto',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: 22, textAlign: 'center', color: '#003049', marginBottom: 20 }}>Fase Pertumbuhan</h2>
        {fases.map((fase, index) => (
          <div key={index} style={{
            marginBottom: 20,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <img
              src={fase.img}
              alt={fase.title}
              style={{
                width: '100%',
                height: 100,
                objectFit: 'cover',
                transition: 'transform 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ padding: 8 }}>
              <h4 style={{ fontSize: 15, color: '#003049', marginBottom: 5 }}>{fase.title}</h4>
              <p style={{ fontSize: 12, color: '#003049' }}>{fase.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Konten Tengah */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: 20,
        height: 'calc(97vh - 60px)'
      }}>

        {/* Upload Gambar */}
        <div style={{
          flex: 3,
          backgroundColor: '#ffe5b4',
          padding: 20,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: 22, color: '#003049', marginBottom: 20 }}>🌾 Upload Gambar</h2>

          <div style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #adb5bd',
            borderRadius: 10,
            padding: 10,
            textAlign: 'center',
            minHeight: 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {preview ? (
              <div style={{
                padding: 10, 
                width: '100%',
                height: 300,
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    borderRadius: 8
                  }}
                />
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                textAlign: 'center',
                gap: 12
              }}>
                <label
                  htmlFor="uploadInput"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#38b6a5',
                    color: '#fff',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffe5b4'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#38b6a5'}
                >
                  📷 Pilih Gambar
                </label>
                <input
                  id="uploadInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <p style={{ fontSize: 14, color: '#868e96', maxWidth: 230 }}>
                  Pilih gambar padi untuk dideteksi fase pertumbuhannya 🌾
                </p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button
              onClick={handleUpload}
              disabled={!image || loading || result}
              style={{
                padding: '8px 14px',
                fontSize: 14,
                backgroundColor: (!image || loading || result) ? '#ced4da' : '#38b6a5',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: (!image || loading || result) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Mengirim...' : 'Kirim'}
            </button>

            {preview && (
              <button
                onClick={handleReset}
                style={{
                  padding: '8px 14px',
                  fontSize: 14,
                  backgroundColor: '#ef476f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer'
                }}
              >
                Ganti
              </button>
            )}
          </div>
        </div>

        {/* Hasil Deteksi */}
        <div style={{
          flex: 1,
          backgroundColor: '#d8f3dc',
          padding: 20,
          borderRadius: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: 22, color: '#003049', textAlign: 'center', marginBottom: 5 }}>🌾 Hasil Deteksi:</h2>
          <div style={{
            backgroundColor: '#ffe5b4',
            padding: 15,
            borderRadius: 10,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 15, color: '#003049' }}>
              {result?.fase ? getFaseLabel(result.fase) : '-'}
            </div>
          </div>

          <h2 style={{ fontSize: 22, color: '#003049', textAlign: 'center', margin: '10px 0 0 0' }}>📌 Rekomendasi:</h2>

          <div style={{
            backgroundColor: '#ffe5b4',
            padding: 15,
            borderRadius: 10,
          }}>
            <strong>Pemupukan:</strong>
            <div style={{ marginTop: 10, fontSize: 15, color: '#003049' }}>
              {result?.fase ? (
                {
                  fase_v1: 'Gunakan pupuk NPK seimbang.',
                  fase_v2: 'Tambah pupuk nitrogen.',
                  fase_g1: 'Gunakan pupuk kalium.',
                  fase_g2: 'Kurangi pupuk, fokus pada air.'
                }[result.fase] || '-'
              ) : '-'}
            </div>
          </div>

          <div style={{
            backgroundColor: '#ffe5b4',
            padding: 15,
            borderRadius: 10,
          }}>
            <strong>Penanganan Hama:</strong>
            <div style={{ marginTop: 10, fontSize: 15, color: '#003049' }}>
              {result?.fase ? (
                {
                  fase_v1: 'Pantau wereng dan penggerek batang.',
                  fase_v2: 'Waspada ulat dan hama daun.',
                  fase_g1: 'Walang sangit saat malai terbentuk.',
                  fase_g2: 'Cegah serangan tikus dan burung.'
                }[result.fase] || '-'
              ) : '-'}
            </div>
          </div>

          {result?.error && (
            <p style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
              {result.error}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
