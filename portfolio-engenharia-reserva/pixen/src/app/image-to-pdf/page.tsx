"use client";

import * as React from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";

export default function ImageToPdf() {
  const [images, setImages] = React.useState<{ url: string; file: File }[]>([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));

    setImages(prev => [...prev, ...newImages]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);

    try {
      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = new Image();
        img.src = images[i].url;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;

        if (imgRatio > pdfRatio) {
          finalHeight = pdfWidth / imgRatio;
        } else {
          finalWidth = pdfHeight * imgRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(img, 'JPEG', x, y, finalWidth, finalHeight);
      }

      pdf.save("documento.pdf");
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1>Imagens para PDF</h1>
        </div>
        <p className="subtitle">Converta múltiplas imagens em um único arquivo PDF</p>
        <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
          &larr; Voltar para o Início
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '32px' }}>
        <div 
          className="upload-container"
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer', width: '100%', maxWidth: '600px' }}
        >
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp"
            multiple
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={handleFileUpload}
          />
          <div className="upload-icon">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <h2 className="upload-title">Adicionar Imagens</h2>
          <p className="upload-subtext">Formatos suportados: JPG, PNG, WEBP</p>
        </div>

        {images.length > 0 && (
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
              {images.map((img, index) => (
                <div key={index} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={img.url} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    onClick={() => removeImage(index)}
                    style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <button 
              onClick={generatePDF} 
              disabled={isGenerating}
              className="btn" 
              style={{ width: '100%', marginTop: '16px', opacity: isGenerating ? 0.7 : 1 }}
            >
              {isGenerating ? 'Gerando PDF...' : `Gerar PDF (${images.length} imagens)`}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
