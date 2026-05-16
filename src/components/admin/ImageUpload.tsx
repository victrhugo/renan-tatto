"use client";

import { X, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Link da Imagem (URL)" }: ImageUploadProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-offwhite/60 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)]">
        {label}
      </label>
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LinkIcon className="text-offwhite/40" size={16} />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Cole aqui o link da imagem (ex: Unsplash, Imgur...)"
            className="w-full bg-black-deep border border-graphite-light pl-10 pr-4 py-3 text-offwhite focus:outline-none focus:border-gold-muted transition-colors font-light placeholder:text-offwhite/20 text-sm"
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-4 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            title="Limpar imagem"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {value ? (
        <div className="relative group w-full aspect-video mt-2 bg-black-deep border border-graphite-light overflow-hidden flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"; 
            alert("O link fornecido não parece ser uma imagem válida.");
          }} />
        </div>
      ) : (
        <div className="w-full aspect-video mt-2 bg-black-deep border border-dashed border-graphite-light flex flex-col items-center justify-center gap-2">
          <LinkIcon className="text-offwhite/20" size={24} />
          <span className="text-offwhite/40 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)]">
            Sem Imagem
          </span>
        </div>
      )}
    </div>
  );
}

