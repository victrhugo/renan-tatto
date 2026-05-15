import React from "react";
import { cn } from "@/lib/utils";

export function AdminCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-graphite-dark/80 backdrop-blur-sm border border-gold-dark/20 p-8 shadow-xl relative overflow-hidden group", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-gold-dark/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function AdminInput({ label, id, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-offwhite/60 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)]">
        {label}
      </label>
      <input
        id={id}
        className="bg-black-deep border-b border-graphite-light px-4 py-3 text-offwhite focus:outline-none focus:border-gold-muted transition-colors font-light placeholder:text-offwhite/20"
        {...props}
      />
    </div>
  );
}

export function AdminTextArea({ label, id, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-offwhite/60 text-xs uppercase tracking-widest font-[family-name:var(--font-oswald)]">
        {label}
      </label>
      <textarea
        id={id}
        className="bg-black-deep border border-graphite-light px-4 py-3 text-offwhite focus:outline-none focus:border-gold-muted transition-colors font-light placeholder:text-offwhite/20 min-h-[120px] resize-y"
        {...props}
      />
    </div>
  );
}

export function AdminButton({ children, isLoading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isLoading?: boolean }) {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={cn(
        "px-8 py-3 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] text-sm font-[family-name:var(--font-oswald)] font-medium transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed",
        props.className
      )}
    >
      {isLoading ? "Salvando..." : children}
    </button>
  );
}
