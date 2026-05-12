"use client";

import * as React from "react";
import Link from "next/link";
import jsQR from "jsqr";

export default function QRReader() {
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          setError("Erro ao processar a imagem.");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(code.data);
        } else {
          setError("Nenhum QR Code encontrado na imagem.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const isUrl = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1>Leitor de QR Code</h1>
        </div>
        <p className="subtitle">Envie uma imagem para decodificar o QR Code</p>
        <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
          &larr; Voltar para o Início
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '32px' }}>
        <div 
          className="upload-container"
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer', width: '100%', maxWidth: '500px' }}
        >
          <input 
            type="file" 
            accept="image/*"
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
          />
          <div className="upload-icon">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h2 className="upload-title">Selecione uma imagem</h2>
          <p className="upload-subtext">Formatos suportados: JPG, PNG, WEBP</p>
        </div>

        {error && (
          <div style={{ padding: '16px', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: '12px', color: '#D00', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {result && (
          <div style={{ width: '100%', maxWidth: '500px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', wordBreak: 'break-all' }}>
            <h3 style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>Resultado:</h3>
            {isUrl(result) ? (
              <a href={result} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
                {result}
              </a>
            ) : (
              <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{result}</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
