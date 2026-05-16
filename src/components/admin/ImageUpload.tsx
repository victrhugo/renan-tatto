"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { upload } from "@vercel/blob/client";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload de Imagem" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      onChange(newBlob.url);
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar a imagem. Verifique se o Vercel Blob está configurado corretamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-offwhite/60 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)]">
        {label}
      </span>
      
      {value ? (
        <div className="relative group w-full aspect-video bg-black-deep border border-graphite-light overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Uploaded" className="w-full h-full object-cover opacity-80 group-hover:opacity-40 transition-opacity" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
          >
            <div className="bg-black-deep/80 p-3 rounded-full border border-red-500/50">
              <X size={24} />
            </div>
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full aspect-video bg-black-deep border border-dashed border-graphite-light hover:border-gold-dark/50 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors group",
            isUploading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          {isUploading ? (
            <>
              <Loader2 className="animate-spin text-gold-muted" size={32} />
              <span className="text-offwhite/40 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)] mt-2">
                Enviando...
              </span>
            </>
          ) : (
            <>
              <Upload className="text-offwhite/20 group-hover:text-gold-muted transition-colors" size={32} />
              <span className="text-offwhite/40 text-sm group-hover:text-offwhite/80 transition-colors uppercase tracking-widest font-[family-name:var(--font-oswald)]">
                Clique para selecionar
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

