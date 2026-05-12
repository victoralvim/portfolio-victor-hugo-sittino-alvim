import * as React from "react";
import Link from "next/link";
import ExifTable from "@/components/organisms/ExifTable";
import HeroSection from "@/components/organisms/HeroSection";
import Footer from "@/components/organisms/Footer";
import { ExifField } from "@/types/exif";

// Mock data for examples
const getExampleData = (cam: string): ExifField[] => {
  const baseData = [
    { tag: "MIMEType", value: "image/jpeg" },
    { tag: "ImageWidth", value: 4000 },
    { tag: "ImageHeight", value: 3000 },
    { tag: "ColorSpace", value: "sRGB" },
  ];

  switch (cam) {
    case "canon-40d":
      return [
        { tag: "Make", value: "Canon" },
        { tag: "Model", value: "Canon EOS 40D" },
        { tag: "ExposureTime", value: "1/250" },
        { tag: "FNumber", value: 8.0 },
        { tag: "ISO", value: 100 },
        { tag: "FocalLength", value: "50.0 mm" },
        ...baseData,
      ];
    case "iphone-6":
      return [
        { tag: "Make", value: "Apple" },
        { tag: "Model", value: "iPhone 6" },
        { tag: "ExposureTime", value: "1/30" },
        { tag: "FNumber", value: 2.2 },
        { tag: "ISO", value: 32 },
        { tag: "GPSLatitude", value: "37 deg 19' 39.12\" N" },
        { tag: "GPSLongitude", value: "122 deg 1' 52.80\" W" },
        { tag: "GPSPosition", value: "37.327533, -122.031333" },
        ...baseData,
      ];
    case "nexus-5x":
      return [
        { tag: "Make", value: "LGE" },
        { tag: "Model", value: "Nexus 5X" },
        { tag: "ExposureTime", value: "1/120" },
        { tag: "FNumber", value: 2.0 },
        { tag: "ISO", value: 60 },
        ...baseData,
      ];
    case "oneplus-5":
      return [
        { tag: "Make", value: "OnePlus" },
        { tag: "Model", value: "ONEPLUS A5000" },
        { tag: "ExposureTime", value: "1/1000" },
        { tag: "FNumber", value: 1.7 },
        { tag: "ISO", value: 125 },
        ...baseData,
      ];
    case "pixel-6a":
      return [
        { tag: "Make", value: "Google" },
        { tag: "Model", value: "Pixel 6a" },
        { tag: "ExposureTime", value: "1/500" },
        { tag: "FNumber", value: 1.73 },
        { tag: "ISO", value: 54 },
        ...baseData,
      ];
    default:
      return baseData;
  }
};

export default async function ExamplePage({ params }: { params: Promise<{ cam: string }> }) {
  const { cam } = await params;
  const fields = getExampleData(cam);
  const title = cam.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main className="flex flex-col gap-8">
      <HeroSection />
      
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold text-[#a1b1b6]">Exemplo: {title}</h2>
          <Link href="/" className="text-sm text-[#a1b1b6] hover:text-[#a1b1b6]/80 underline">
            &larr; Analisar um arquivo
          </Link>
        </div>
        
        <ExifTable fields={fields} />
      </section>

      <Footer />
    </main>
  );
}
