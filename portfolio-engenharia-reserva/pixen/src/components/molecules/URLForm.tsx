"use client";

import * as React from "react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

interface URLFormProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export default function URLForm({ onSubmit, isLoading = false }: URLFormProps) {
  const [url, setUrl] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 items-center bg-[#556d78]">
        <label htmlFor="url-input" className="px-4 font-bold text-[#a1b1b6]">
          URL:
        </label>
        <Input
          id="url-input"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent border-none px-0 focus-visible:ring-0 text-[#a1b1b6]"
          required
          aria-label="URL do arquivo de mídia"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#a1b1b6]">
          Insira a URL de um recurso de mídia.
        </p>
        <Button
          type="submit"
          disabled={!url.trim() || isLoading}
          className="shrink-0 font-bold"
        >
          {isLoading ? "Inspecionando..." : "Inspecionar URL"}
        </Button>
      </div>
    </form>
  );
}
