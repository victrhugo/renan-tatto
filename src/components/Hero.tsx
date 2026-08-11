"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Hero() {
  const [data, setData] = useState({
    title: "ARTE NA PELE. <br /> <span class='text-gradient-gold'>FORÇA E HONRA.</span>",
    subtitle: "São José dos Campos",
    description: "Experiência de tatuagem de luxo para quem busca a essência pura do underground, aliada à precisão de uma arte monumental e duradoura.",
    bgImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2671&auto=format&fit=crop",
  });

  useEffect(() => {
    const docRef = doc(db, "content", "hero");
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setData((prev) => ({ ...prev, ...fetchedData }));
        }
      },
      (error) => {
        console.error("Error listening hero:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black-deep pt-20 md:pt-0 pb-12 md:pb-0">
      {/* Background with Vignette and Cinematic overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/80 via-black-deep/40 to-black-deep z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20" />
        {data.bgImage && (
          <img
            src={data.bgImage}
            alt="Tattoo Studio Background"
            className="w-full h-full object-cover saturate-125 contrast-110 opacity-60 scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-oswald)] text-gold-light uppercase tracking-[0.3em] text-[clamp(0.65rem,2.5vw,0.875rem)] mb-4 sm:mb-6 drop-shadow-[0_0_10px_rgba(232,185,35,0.3)]"
        >
          {data.subtitle}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-[clamp(2rem,9vw,6.5rem)] text-offwhite leading-[1.1] mb-4 sm:mb-6 md:mb-8 tracking-wide drop-shadow-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-offwhite/60 max-w-2xl mx-auto text-[clamp(0.9rem,3vw,1.125rem)] font-light mb-6 sm:mb-8 md:mb-10 leading-relaxed"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto px-0 sm:px-0"
        >
          <a
            href="#portfolio"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] text-[clamp(0.8rem,2.5vw,0.875rem)] font-[family-name:var(--font-oswald)] font-medium hover:shadow-[0_0_30px_rgba(232,185,35,0.4)] transition-all duration-500 text-center active:shadow-[0_0_40px_rgba(232,185,35,0.6)] min-h-[44px] md:min-h-auto flex items-center justify-center"
          >
            Ver Portfólio
          </a>
          <a
            href="https://wa.me/5512981496972"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 border border-gold-dark/40 text-gold-light uppercase tracking-[0.2em] text-[clamp(0.8rem,2.5vw,0.875rem)] font-[family-name:var(--font-oswald)] font-medium hover:bg-gold-dark/10 hover:border-gold-muted transition-all duration-500 backdrop-blur-sm text-center active:bg-gold-dark/20 min-h-[44px] md:min-h-auto flex items-center justify-center"
          >
            Agendar Sessão
          </a>
        </motion.div>
      </div>

      {/* Cinematic Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
      >
        <span className="font-[family-name:var(--font-oswald)] text-offwhite/40 uppercase tracking-[0.3em] text-[clamp(0.6rem,2vw,0.75rem)] mb-3 md:mb-4">Explorar</span>
        <div className="w-[1px] h-12 md:h-16 bg-gradient-to-b from-gold-dark/0 via-gold-muted/30 to-gold-dark/0 relative overflow-hidden">
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-8 bg-gradient-gold absolute top-0 shadow-[0_0_10px_rgba(232,185,35,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
