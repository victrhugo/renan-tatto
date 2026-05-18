"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Footer() {
  const [data, setData] = useState({
    whatsapp: "5512999999999",
    instagram: "https://instagram.com/renantattoo",
    address: "São José dos Campos, SP",
    email: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          if (fetchedData.whatsapp) setData((prev) => ({ ...prev, ...fetchedData }));
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
      }
    }
    loadData();
  }, []);

  return (
    <footer className="bg-graphite-dark pt-12 sm:pt-16 md:pt-24 pb-8 sm:pb-10 md:pb-12 border-t border-gold-dark/20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20">
          
          <div className="col-span-1 sm:col-span-2 md:col-span-2 pr-0 md:pr-8 lg:pr-12">
            <a href="#" className="inline-block mb-4 sm:mb-5 md:mb-8">
              <Image
                src="/logo.png"
                alt="Renan Tattoo Logo"
                width={160}
                height={60}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-500 w-[120px] sm:w-[140px] md:w-[160px]"
              />
            </a>
            <p className="text-offwhite/50 font-light max-w-sm mb-5 sm:mb-6 md:mb-8 leading-relaxed text-[clamp(0.85rem,2.5vw,0.95rem)]">
              Estúdio de tatuagem premium em São José dos Campos. 
              Especializado em arte exclusiva, estética dark e experiências imersivas de alto padrão.
            </p>
            <p className="text-gold-dark/80 text-[clamp(0.65rem,2vw,0.875rem)] font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Apenas com horário marcado
            </p>
          </div>

          <div>
            <h4 className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm mb-4 sm:mb-5 md:mb-8 drop-shadow-md">Links Rápidos</h4>
            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
              {['Início', 'O Artista', 'Portfólio', 'Agendamento'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'Início' ? '' : item.toLowerCase().replace(' ', '')}`} className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-[clamp(0.75rem,2vw,0.875rem)] font-light uppercase tracking-[0.1em] md:tracking-widest font-[family-name:var(--font-oswald)] active:text-gold-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm mb-4 sm:mb-5 md:mb-8 drop-shadow-md">Contato</h4>
            <ul className="space-y-3 sm:space-y-4 md:space-y-5">
              <li>
                <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-[clamp(0.75rem,2vw,0.875rem)] font-light flex items-center gap-2 uppercase tracking-[0.1em] md:tracking-widest font-[family-name:var(--font-oswald)] active:text-gold-light">
                  Instagram
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${data.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-[clamp(0.75rem,2vw,0.875rem)] font-light flex items-center gap-2 uppercase tracking-[0.1em] md:tracking-widest font-[family-name:var(--font-oswald)] active:text-gold-light">
                  WhatsApp
                </a>
              </li>
              {data.email && (
                <li>
                  <a href={`mailto:${data.email}`} className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-[clamp(0.75rem,2vw,0.875rem)] font-light flex items-center gap-2 uppercase tracking-[0.1em] md:tracking-widest font-[family-name:var(--font-oswald)] active:text-gold-light">
                    Email
                  </a>
                </li>
              )}
              <li className="pt-2 md:pt-4">
                <span className="text-gold-dark/60 text-[clamp(0.65rem,2vw,0.75rem)] font-light uppercase tracking-[0.1em] md:tracking-[0.2em] block">
                  {data.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-graphite-light pt-6 sm:pt-8 md:pt-8 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-offwhite/30 text-[clamp(0.6rem,2vw,0.75rem)] font-light uppercase tracking-[0.1em] order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Renan Tattoo. Todos os direitos reservados.
          </p>
          <p className="text-offwhite/30 text-[clamp(0.6rem,2vw,0.75rem)] font-light uppercase tracking-[0.1em] order-1 sm:order-2">
            Experiência por <span className="text-gold-dark hover:text-gold-muted transition-colors cursor-pointer">Antigravity Agency</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
