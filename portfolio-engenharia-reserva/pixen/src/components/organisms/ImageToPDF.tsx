'use client';

import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Images, X, FileDown } from 'lucide-react';

interface UploadedImage {
  id: string;
  dataUrl: string;
}

export default function ImageToPDF() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, {
            id: Math.random().toString(36).substring(7),
            dataUrl: event.target!.result as string
          }]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);

    try {
      const pdf = new jsPDF();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        
        const imgData = images[i].dataUrl;
        
        const img = new Image();
        img.src = imgData;
        await new Promise(resolve => { img.onload = resolve; });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
        const width = img.width * ratio;
        const height = img.height * ratio;
        const x = (pageWidth - width) / 2;
        const y = (pageHeight - height) / 2;

        pdf.addImage(imgData, 'JPEG', x, y, width, height);
      }

      pdf.save('imagens_convertidas.pdf');
    } catch (error) {
      console.error("Erro ao converter para PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF.");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="bg-[var(--bg-component)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-8 shadow-[0_8px_32px_var(--shadow-blue)]">
      <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3 text-[var(--text-primary)]">
        <FileText className="text-[var(--accent-primary)]" size={28} />
        Conversor de Imagem para PDF
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
            accept="image/jpeg, image/png, image/webp" 
            multiple
            className="hidden" 
          />
          <Images size={48} className="text-[var(--accent-primary)]" />
          <p className="font-syne font-bold text-lg text-[var(--text-primary)] text-center">
            Carregar imagens (JPG, PNG, WEBP)
          </p>
        </div>

        {images.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {images.map(img => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-sm group">
                  <img src={img.dataUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => removeImage(img.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full md:w-auto bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-[var(--radius-pill)] px-8 py-3 font-syne font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_24px_var(--accent-glow)] hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FileDown size={20} />
              {isConverting ? 'Convertendo...' : 'Converter e Baixar PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
