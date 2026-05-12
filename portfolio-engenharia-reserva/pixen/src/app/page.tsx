import HeroSection from '@/components/organisms/HeroSection';
import AnalyzeSection from '@/components/organisms/AnalyzeSection';
import FAQSection from '@/components/organisms/FAQSection';
import Footer from '@/components/organisms/Footer';

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { analyzeFile } from "@/app/actions/analyzeFile";
import { analyzeURL } from "@/app/actions/analyzeURL";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSubmit = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await analyzeFile(formData);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.hash) {
        router.push(`/detail/${result.hash}`);
      }
    } catch (err: any) {
      setError(err.message || "Falha ao analisar o arquivo.");
      setIsLoading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    if (!url) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeURL(url);
      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result.hash) {
        router.push(`/detail/${result.hash}`);
      }
    } catch (err: any) {
      setError(err.message || "Falha ao analisar a URL.");
      setIsLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="container">
      {/* Loader */}
      <div className="loader-overlay" style={{ display: isLoading ? 'flex' : 'none' }}>
        <div className="loader-rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
          <div className="ring ring-3"></div>
        </div>
        <div className="loader-text">Analisando metadados...</div>
      </div>

      <header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '8px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <h1>Pixen</h1>
        </div>
        <p className="subtitle">Analise os metadados das suas imagens com precisão</p>
        <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
          Login
        </Link>
      </header>

      <main>
        {error && (
          <div style={{ padding: '16px', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: '12px', color: '#D00', marginBottom: '24px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div 
          className="upload-container"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) handleFileSubmit(file);
          }}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: 'pointer' }}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSubmit(file);
            }}
          />
          <div className="upload-icon">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16V8" />
              <path d="M8 12l4-4 4 4" />
            </svg>
          </div>
          <h2 className="upload-title">Arraste sua imagem aqui</h2>
          <p className="upload-subtext">ou clique para selecionar um arquivo</p>
          <button className="btn">Selecionar Arquivo</button>
          <p className="formats">.jpg · .png · .gif · .tiff · .raw</p>
        </div>

        <div className="divider"></div>

        <form onSubmit={handleUrlSubmit}>
          <label className="url-label">Ou analise por URL</label>
          <div className="url-input-group">
            <input 
              name="url"
              type="url" 
              className="url-input" 
              placeholder="https://exemplo.com/imagem.jpg"
              required
            />
            <button type="submit" className="btn">Analisar URL</button>
          </div>
        </form>

        <div className="divider"></div>

        <section style={{ width: '100%', maxWidth: '800px', margin: '0 auto 48px auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)', textAlign: 'center' }}>
            Outras Ferramentas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <Link href="/qr-generator" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
                <rect x="14" y="14" width="3" height="3" />
              </svg>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '500' }}>Gerador de QR Code</h3>
            </Link>
            
            <Link href="/qr-reader" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '500' }}>Leitor de QR Code</h3>
            </Link>

            <Link href="/image-to-pdf" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', transition: 'transform 0.2s', cursor: 'pointer' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '500' }}>Imagens para PDF</h3>
            </Link>
          </div>
        </section>

        <section className="faq-section">
          <h2 className="faq-title">Perguntas Frequentes</h2>
          
          <div className="faq-list">
            {[
              {
                q: "Que site é este?",
                a: "Pixen é uma ferramenta que exibe os metadados normalmente ocultos em arquivos que você carrega. Foca em imagens Pixen (.jpeg), mas extrai metadados de quase todos os formatos comuns incluindo imagens, vídeos, áudio, PDFs e documentos Word."
              },
              {
                q: " O que é Pixen",
                a: "O Exchangeable Image File Format é um padrão que define os formatos de tags de imagem, áudio e metadados usados por câmeras, telefones e outros dispositivos de gravação digital."
              },
              {
                q: "Que tipo de metadados são normalmente incluídos?",
                a: "Dependendo do tipo de arquivo: Data/hora de captura, Coordenadas GPS, Miniatura da imagem, Nome do autor e direitos autorais, Orientação da bússola, Informações do dispositivo, Configurações da câmera e Nome do arquivo original."
              },
              {
                q: "Poderia me dar um exemplo?",
                a: "Você pode testar com imagens de exemplo de câmeras Canon, iPhones ou dispositivos Android para ver a riqueza de detalhes capturados."
              },
              {
                q: "Quais tipos de arquivo são suportados?",
                a: "Suportamos centenas de formatos, incluindo JPEG, PNG, TIFF, HEIC, e diversos formatos RAW, além de vídeos e documentos."
              },
              {
                q: "Como meus arquivos são tratados?",
                a: "O arquivo enviado é processado automaticamente e o original é deletado imediatamente. Os dados gerados ficam armazenados com segurança por até 3 dias e depois são removidos."
              },
              {
                q: "Qual é a ferramenta Pixen subjacente?",
                a: "O Pixen utiliza o poderoso motor ExifTool de Phil Harvey para garantir a máxima precisão na extração de dados."
              }
            ].map((item, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{item.q}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-divider"></div>
        <p className="footer-text">© 2024 Pixen .org</p>
      </footer>
    </div>
  );
}
