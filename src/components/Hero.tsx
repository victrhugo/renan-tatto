"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Hero() {
  const [data, setData] = useState({
    title: "ARTE NA PELE. <br /> <span class='text-gradient-gold'>FORÇA E HONRA.</span>",
    subtitle: "São José dos Campos",
    description: "Experiência de tatuagem de luxo para quem busca a essência pura do underground, aliada à precisão de uma arte monumental e duradoura.",
    bgImage: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2671&auto=format&fit=crop",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "hero");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          if (fetchedData.title) setData((prev) => ({ ...prev, ...fetchedData }));
        }
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    }
    loadData();
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black-deep">
      {/* Background with Vignette and Cinematic overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black-deep/80 via-black-deep/40 to-black-deep z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-20" />
        {data.bgImage && (
          <img
            src={data.bgImage}
            alt="Tattoo Studio Background"
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-6xl mx-auto flex flex-col items-center mt-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-oswald)] text-gold-light uppercase tracking-[0.4em] text-xs md:text-sm mb-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
        >
          {data.subtitle}
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-[7rem] text-offwhite leading-[1.1] mb-8 tracking-wide drop-shadow-2xl font-bold"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-offwhite/60 max-w-2xl mx-auto text-lg md:text-xl font-light mb-12"
        >
          {data.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <a
            href="#portfolio"
            className="px-10 py-4 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] text-sm font-[family-name:var(--font-oswald)] font-medium hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-500"
          >
            Ver Portfólio
          </a>
          <a
            href="https://wa.me/5512999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 border border-gold-dark/40 text-gold-light uppercase tracking-[0.2em] text-sm font-[family-name:var(--font-oswald)] font-medium hover:bg-gold-dark/10 hover:border-gold-muted transition-all duration-500 backdrop-blur-sm"
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
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
      >
        <span className="font-[family-name:var(--font-oswald)] text-offwhite/40 uppercase tracking-[0.3em] text-[10px] mb-4">Explorar</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-gold-dark/0 via-gold-muted/30 to-gold-dark/0 relative overflow-hidden">
          <motion.div
            animate={{ y: [-64, 64] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-8 bg-gradient-gold absolute top-0 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
