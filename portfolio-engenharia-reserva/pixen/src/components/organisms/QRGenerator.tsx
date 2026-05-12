'use client';

import React, { useState, useRef, useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, QrCode } from 'lucide-react';
import { db, storage, analytics } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { logEvent } from 'firebase/analytics';
import { AuthContext } from '@/components/AuthProvider';
import HistoryList from './HistoryList';

export default function QRGenerator() {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);

  const handleGenerate = async () => {
    if (text.trim() && user) {
      setGeneratedText(text.trim());
      
      // FIREBASE: Firestore
      await addDoc(collection(db, 'qrcodes'), {
        uid: user.uid,
        type: 'generated',
        content: text.trim(),
        createdAt: serverTimestamp(),
      });

      // FIREBASE: Analytics
      if (analytics) {
        logEvent(analytics, 'qrcode_generated', { uid: user.uid, content_type: 'text' });
      }
    }
  };

  const handleDownload = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'qrcode.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-[var(--bg-component)] backdrop-blur-xl border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-8 shadow-[0_8px_32px_var(--shadow-blue)]">
      <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3 text-[var(--text-primary)]">
        <QrCode className="text-[var(--accent-primary)]" size={28} />
        Gerador de QR Code
      </h3>
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-dm-sans text-sm text-[var(--text-secondary)]">Texto ou URL</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o conteúdo aqui..."
            className="w-full rounded-[var(--radius-pill)] border-[1.5px] border-[var(--border-subtle)] px-6 py-3 font-dm-sans bg-[var(--bg-primary)] shadow-[0_4px_16px_var(--shadow-blue)] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-secondary)] focus:shadow-[0_0_0_4px_var(--accent-glow)]"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full md:w-auto self-start bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-[var(--radius-pill)] px-8 py-3 font-syne font-bold transition-all hover:shadow-[0_0_24px_var(--accent-glow)] hover:scale-[1.02]"
        >
          Gerar QR Code
        </button>

        {generatedText && (
          <div className="mt-8 flex flex-col items-center gap-6 p-8 border border-[var(--border-subtle)] rounded-[var(--radius-lg)] bg-[var(--bg-primary)]">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <QRCodeSVG 
                value={generatedText} 
                size={200} 
                level="H"
                ref={svgRef}
              />
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white border-2 border-[var(--border-subtle)] text-[var(--text-primary)] rounded-[var(--radius-pill)] px-6 py-2 font-syne font-bold transition-all hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
            >
              <Download size={18} />
              Baixar PNG
            </button>
          </div>
        )}
        
        {user && <HistoryList collectionName="qrcodes" />}
      </div>
    </div>
  );
}
