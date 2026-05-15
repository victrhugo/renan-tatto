"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
}

export function ImageUpload({ value, onChange, folder, label = "Upload de Imagem" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(p);
      },
      (error) => {
        console.error("Upload error:", error);
        setIsUploading(false);
        alert("Erro ao fazer upload da imagem. Verifique suas regras do Firebase Storage.");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        onChange(downloadURL);
        setIsUploading(false);
      }
    );
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
              <div className="w-48 h-1 bg-graphite-light mt-4 rounded overflow-hidden">
                <div className="h-full bg-gradient-gold transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
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
