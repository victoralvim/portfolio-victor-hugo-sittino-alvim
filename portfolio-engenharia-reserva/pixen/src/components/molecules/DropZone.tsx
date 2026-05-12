"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

interface DropZoneProps {
  onFileSubmit: (file: File) => void;
  isLoading?: boolean;
  className?: string;
}

export default function DropZone({ onFileSubmit, isLoading = false, className }: DropZoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onFileSubmit(selectedFile);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-2 w-full", className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex gap-2">
        <div 
          className={cn(
            "flex-1 flex items-center bg-[#556d78] cursor-pointer transition-colors border border-transparent",
            isDragging ? "border-[#a1b1b6]" : ""
          )}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <div className="bg-[#a1b1b6] text-[#002d36] font-bold px-4 py-2 border-r border-[#002d36]">
            Escolher arquivo
          </div>
          <div className="px-4 text-[#a1b1b6] truncate">
            {selectedFile ? selectedFile.name : "Nenhum arquivo escolhido"}
          </div>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />
        
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFile || isLoading}
          className="shrink-0 font-bold"
        >
          {isLoading ? "Carregando..." : "Carregar arquivo"}
        </Button>
      </div>
      <p className="text-sm text-[#a1b1b6]">
        Ou simplesmente arraste e solte um arquivo aqui.
      </p>
    </div>
  );
}
