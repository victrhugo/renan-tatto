"use client";

import { motion } from "framer-motion";

export default function StudioDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-offwhite uppercase tracking-wider mb-2">
          Visão <span className="text-gradient-gold">Geral</span>
        </h1>
        <p className="text-offwhite/50 font-light text-lg">
          Bem-vindo ao painel de controle premium. Selecione uma seção no menu lateral para editar o conteúdo do site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Hero Section", desc: "Altere os textos principais e imagem de fundo da tela inicial.", href: "/studio/hero" },
          { name: "Portfólio", desc: "Adicione, remova e reordene os trabalhos expostos.", href: "/studio/portfolio" },
          { name: "O Artista", desc: "Atualize sua biografia, anos de experiência e imagem de perfil.", href: "/studio/about" },
        ].map((card, i) => (
          <motion.a
            href={card.href}
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="block p-8 bg-black-deep border border-graphite-light hover:border-gold-dark/40 transition-colors duration-500 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h2 className="font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-xl text-offwhite group-hover:text-gold-light transition-colors duration-500 mb-4 relative z-10">
              {card.name}
            </h2>
            <p className="text-offwhite/50 font-light text-sm relative z-10">
              {card.desc}
            </p>
            <div className="mt-8 w-8 h-[1px] bg-gradient-gold group-hover:w-16 transition-all duration-500 relative z-10" />
          </motion.a>
        ))}
      </div>

      <div className="mt-12 p-8 border border-gold-dark/20 bg-graphite-dark/30 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <h3 className="font-serif text-2xl text-offwhite mb-4">Status do Sistema</h3>
        <p className="text-offwhite/60 font-light mb-2">Conexão com Banco de Dados: <span className="text-green-500 ml-2">Ativa</span></p>
        <p className="text-offwhite/60 font-light mb-2">Conexão com Storage: <span className="text-green-500 ml-2">Ativa</span></p>
        <p className="text-offwhite/60 font-light text-xs mt-6 uppercase tracking-widest text-gold-muted/50">Lembre-se de configurar as regras de segurança no Firebase Console.</p>
      </div>
    </div>
  );
}
