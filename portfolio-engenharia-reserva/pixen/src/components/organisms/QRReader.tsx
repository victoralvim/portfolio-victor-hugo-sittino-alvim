'use client';

import React, { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { Scan, UploadCloud } from 'lucide-react';

export default function QRReader() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(code.data);
        } else {
          setError("Não foi possível detectar um QR Code nesta imagem.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-[var(--bg-component)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-8 shadow-[0_8px_32px_var(--shadow-blue)]">
      <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3 text-[var(--text-primary)]">
        <Scan className="text-[var(--accent-primary)]" size={28} />
        Leitor de QR Code
      </h3>
      
      <div className="flex flex-col gap-6">
        <div 
          className="border-2 border-dashed border-[var(--accent-secondary)] rounded-[var(--radius-lg)] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all hover:bg-[rgba(0,229,255,0.05)] hover:scale-[1.01]"
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
          />
          <UploadCloud size={48} className="text-[var(--accent-primary)]" />
          <p className="font-syne font-bold text-lg text-[var(--text-primary)] text-center">
            Clique para carregar imagem com QR Code
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-dm-sans text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-6 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-sm">
            <h4 className="font-syne font-bold text-lg mb-2 text-[var(--text-secondary)]">Resultado:</h4>
            {isUrl(result) ? (
              <a 
                href={result} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline break-all font-dm-sans"
              >
                {result}
              </a>
            ) : (
              <p className="text-[var(--text-primary)] break-all font-dm-sans">{result}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
