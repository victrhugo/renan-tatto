"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#" },
    { name: "O Artista", href: "#about" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Agendamento", href: "#booking" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b",
        isScrolled
          ? "bg-black-deep/95 backdrop-blur-xl py-2 md:py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-gold-dark/20"
          : "bg-gradient-to-b from-black-deep/80 to-transparent py-3 md:py-5 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 flex justify-between items-center h-16 md:h-20">
        <a href="#" className="flex items-center relative z-50 group flex-shrink-0">
          <div className="absolute -inset-2 bg-gold-muted/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
          <Image
            src="/logo.png"
            alt="Renan Tattoo Logo"
            width={180}
            height={70}
            className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500 w-[100px] sm:w-[120px] md:w-[160px]"
            priority
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[clamp(0.7rem,2vw,0.875rem)] font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-offwhite/80 hover:text-offwhite relative group transition-colors duration-300"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-gradient-gold group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://wa.me/5512981496972"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 lg:px-8 py-2.5 border border-gold-dark/50 text-gold-light hover:border-gold-muted transition-all duration-300 uppercase tracking-[0.2em] text-sm font-[family-name:var(--font-oswald)] relative overflow-hidden group shadow-[0_0_15px_rgba(138,90,25,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:text-black-deep"
          >
            <span className="relative z-10 font-medium">Agendar</span>
            <div className="absolute inset-0 bg-gradient-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-offwhite relative z-50 p-2 -mr-2 active:bg-graphite-light/20 rounded transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={28} className="text-gold-muted" /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="md:hidden fixed inset-0 bg-black-deep/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-4 z-40 pt-24 pb-8"
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-lg sm:text-xl font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-offwhite hover:text-gradient-gold transition-all duration-300 py-2"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-gold-dark/40 to-transparent my-4" />
          <a
            href="https://wa.me/5512981496972"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 sm:py-4 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] text-sm sm:text-base font-[family-name:var(--font-oswald)] font-medium shadow-[0_0_30px_rgba(212,175,55,0.2)] w-full max-w-xs text-center active:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-shadow rounded-sm"
          >
            Agendar Sessão
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
