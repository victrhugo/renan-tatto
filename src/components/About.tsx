"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function About() {
  const [data, setData] = useState({
    title: "O Artista",
    subtitle: "Renan Tattoo — São José dos Campos",
    paragraph1: "Com mais de uma década de experiência, desenvolvi um estilo único que mescla a agressividade do underground com a precisão do design premium.",
    paragraph2: "Minha abordagem não é apenas sobre desenhar na pele, mas criar uma obra de arte exclusiva que reflita força, história e sofisticação. Cada projeto é concebido de forma única para cada cliente, garantindo um resultado que impressiona e dura para a vida toda.",
    paragraph3: "Trabalho em um ambiente privado e exclusivo, desenhado para oferecer a melhor experiência possível. Do café premium à curadoria musical, tudo é pensado para o seu conforto.",
    experienceYears: "10+",
    projectCount: "1k+",
    imageUrl: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2576&auto=format&fit=crop",
  });

  useEffect(() => {
    const docRef = doc(db, "content", "about");
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setData((prev) => ({ ...prev, ...fetchedData }));
        }
      },
      (error) => {
        console.error("Error listening about:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 lg:py-36 bg-black-deep relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-[radial-gradient(circle_at_center,rgba(166,106,18,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative order-2 md:order-1"
          >
            <div className="aspect-square md:aspect-[3/4] relative z-10 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-graphite-light bg-graphite-dark">
              {data.imageUrl && (
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="w-full h-full object-cover saturate-125 contrast-110 hover:scale-105 transition-transform duration-1000"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 via-transparent to-transparent" />
            </div>
            {/* Cinematic Decorative frame */}
            <div className="hidden md:block absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 w-full h-full border-b-2 border-r-2 border-gold-dark/40 z-0" />
            <div className="hidden md:block absolute -top-6 md:-top-8 -left-6 md:-left-8 w-1/2 h-1/2 border-t-2 border-l-2 border-gold-dark/20 z-0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 md:order-2"
          >
            <h2 className="font-serif text-[clamp(2rem,7vw,4rem)] text-offwhite mb-2 sm:mb-3 md:mb-4 lg:mb-6 uppercase tracking-wider leading-tight">
              {data.title.split(" ").map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-gradient-gold">{word}</span> : `${word} `
              )}
            </h2>
            <h3 className="text-xs sm:text-sm md:text-lg font-[family-name:var(--font-oswald)] text-gold-muted/80 mb-6 sm:mb-8 md:mb-10 tracking-[0.15em] md:tracking-[0.3em] uppercase">
              {data.subtitle}
            </h3>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6 text-offwhite/70 font-light leading-relaxed text-[clamp(0.9rem,2.5vw,1.125rem)]">
              {data.paragraph1 && <p>{data.paragraph1}</p>}
              {data.paragraph2 && <p>{data.paragraph2}</p>}
              {data.paragraph3 && <p>{data.paragraph3}</p>}
            </div>

            <div className="mt-8 sm:mt-10 md:mt-16 flex items-center gap-6 sm:gap-8 md:gap-12 justify-center md:justify-start">
              <div className="text-center">
                <span className="block font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl text-gold-light mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(232,185,35,0.4)]">{data.experienceYears}</span>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] text-offwhite/50">Anos de Exp.</span>
              </div>
              <div className="w-[1px] h-10 sm:h-12 md:h-16 bg-gradient-to-b from-transparent via-gold-dark/50 to-transparent" />
              <div className="text-center">
                <span className="block font-[family-name:var(--font-oswald)] text-3xl sm:text-4xl md:text-5xl text-gold-light mb-1 md:mb-2 drop-shadow-[0_0_10px_rgba(232,185,35,0.4)]">{data.projectCount}</span>
                <span className="text-[9px] sm:text-[10px] md:text-xs font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] text-offwhite/50">Projetos</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
