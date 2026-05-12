import * as React from "react";
import Link from "next/link";
import { getResult } from "@/lib/storage";
import ExifTable from "@/components/organisms/ExifTable";
import HeroSection from "@/components/organisms/HeroSection";
import Footer from "@/components/organisms/Footer";

export default async function DetailPage({ params }: { params: Promise<{ hash: string }> }) {
  const { hash } = await params;
  const result = await getResult(hash);

  return (
    <main className="flex flex-col gap-8">
      <HeroSection />
      
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-[#a1b1b6]">Resultado da Análise</h2>
          <Link href="/" className="text-sm text-[#a1b1b6] hover:text-[#a1b1b6]/80 underline">
            &larr; Analisar outro arquivo
          </Link>
        </div>
        
        {!result ? (
          <div className="p-8 text-center text-[#a1b1b6]/70 border border-[#a1b1b6]/30 bg-[#556d78]">
            Resultado não encontrado ou expirado. Resultados são mantidos por 72 horas.
          </div>
        ) : (
          <ExifTable fields={result.fields} />
        )}
      </section>

      <Footer />
    </main>
  );
}
