import * as React from "react";
import Link from "next/link";
import HeroSection from "@/components/organisms/HeroSection";
import Footer from "@/components/organisms/Footer";

export default function SupportedFilesPage() {
  const fileTypes = [
    "Imagens: JPEG, PNG, GIF, TIFF, BMP, WEBP, HEIC, RAW (CR2, NEF, ARW, DNG, etc.)",
    "Vídeo: MP4, MOV, AVI, MKV, FLV, WMV, WEBM",
    "Áudio: MP3, WAV, FLAC, M4A, OGG, AAC",
    "Documentos: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX",
    "Outros: ZIP, RAR, 7Z, EPUB"
  ];

  return (
    <main className="flex flex-col gap-8">
      <HeroSection />
      
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-[#a1b1b6]">Tipos de Arquivo Suportados</h2>
          <Link href="/" className="text-sm text-[#a1b1b6] hover:text-[#a1b1b6]/80 underline">
            &larr; Voltar ao início
          </Link>
        </div>
        
        <div className="p-8 border border-[#a1b1b6]/30 bg-[#556d78]">
          <p className="mb-6 text-[#a1b1b6]/90">
            O Pixen usa o ExifTool, que suporta a leitura de metadados de uma vasta gama de formatos de arquivo. Aqui estão alguns dos tipos suportados mais comuns:
          </p>
          
          <ul className="list-disc pl-6 flex flex-col gap-3 text-[#a1b1b6]">
            {fileTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
          
          <p className="mt-8 text-sm text-[#a1b1b6]/70">
            Para uma lista completa e exaustiva de todos os tipos de arquivo suportados, consulte a{" "}
            <Link href="https://exiftool.org/#supported" target="_blank" rel="noopener noreferrer">
              documentação oficial do ExifTool
            </Link>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
