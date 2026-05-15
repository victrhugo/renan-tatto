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
    <footer className="bg-graphite-dark pt-24 pb-12 border-t border-gold-dark/20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
          
          <div className="col-span-1 md:col-span-2 pr-0 md:pr-12">
            <a href="#" className="inline-block mb-8">
              <Image
                src="/logo.png"
                alt="Renan Tattoo Logo"
                width={160}
                height={60}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </a>
            <p className="text-offwhite/50 font-light max-w-sm mb-8 leading-relaxed">
              Estúdio de tatuagem premium em São José dos Campos. 
              Especializado em arte exclusiva, estética dark e experiências imersivas de alto padrão.
            </p>
            <p className="text-gold-dark/80 text-sm font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em]">
              Apenas com horário marcado
            </p>
          </div>

          <div>
            <h4 className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-sm mb-8 drop-shadow-md">Links Rápidos</h4>
            <ul className="space-y-5">
              {['Início', 'O Artista', 'Portfólio', 'Agendamento'].map((item) => (
                <li key={item}>
                  <a href={`#${item === 'Início' ? '' : item.toLowerCase().replace(' ', '')}`} className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-sm font-light uppercase tracking-widest font-[family-name:var(--font-oswald)]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-sm mb-8 drop-shadow-md">Contato</h4>
            <ul className="space-y-5">
              <li>
                <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-sm font-light flex items-center gap-2 uppercase tracking-widest font-[family-name:var(--font-oswald)]">
                  Instagram
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${data.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-sm font-light flex items-center gap-2 uppercase tracking-widest font-[family-name:var(--font-oswald)]">
                  WhatsApp
                </a>
              </li>
              {data.email && (
                <li>
                  <a href={`mailto:${data.email}`} className="text-offwhite/50 hover:text-gold-light transition-colors duration-300 text-sm font-light flex items-center gap-2 uppercase tracking-widest font-[family-name:var(--font-oswald)]">
                    Email
                  </a>
                </li>
              )}
              <li className="pt-4">
                <span className="text-gold-dark/60 text-xs font-light uppercase tracking-[0.2em]">
                  {data.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-graphite-light pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-offwhite/30 text-xs font-light uppercase tracking-[0.1em]">
            &copy; {new Date().getFullYear()} Renan Tattoo. Todos os direitos reservados.
          </p>
          <p className="text-offwhite/30 text-xs font-light uppercase tracking-[0.1em]">
            Experiência por <span className="text-gold-dark hover:text-gold-muted transition-colors cursor-pointer">Antigravity Agency</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
