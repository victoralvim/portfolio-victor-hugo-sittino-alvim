"use client";

import * as React from "react";
import Link from "next/link";
import QRCode from "qrcode";

export default function QRGenerator() {
  const [text, setText] = React.useState("");
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string | null>(null);

  const generateQR = async () => {
    if (!text) return;
    try {
      const url = await QRCode.toDataURL(text, { width: 300, margin: 2 });
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <h1>Gerador de QR Code</h1>
        </div>
        <p className="subtitle">Crie QR Codes facilmente a partir de textos ou URLs</p>
        <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
          &larr; Voltar para o Início
        </Link>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', marginTop: '32px' }}>
        <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite o texto ou URL aqui..."
            className="url-input"
            style={{ width: '100%' }}
          />
          <button onClick={generateQR} className="btn" style={{ width: '100%' }}>
            Gerar QR Code
          </button>
        </div>

        {qrCodeUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <img src={qrCodeUrl} alt="QR Code Gerado" style={{ borderRadius: '8px' }} />
            <a href={qrCodeUrl} download="qrcode.png" className="btn" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Baixar PNG
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
