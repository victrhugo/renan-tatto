"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultPortfolio = [
  { id: "1", imgUrl: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1000&auto=format&fit=crop", category: "Realismo" },
  { id: "2", imgUrl: "https://images.unsplash.com/photo-1560934898-10332f14debc?q=80&w=1000&auto=format&fit=crop", category: "Blackwork" },
  { id: "3", imgUrl: "https://images.unsplash.com/photo-1620021626781-80f0c05df7dd?q=80&w=1000&auto=format&fit=crop", category: "Dark Art" },
  { id: "4", imgUrl: "https://images.unsplash.com/photo-1589146199347-1f48ed201e74?q=80&w=1000&auto=format&fit=crop", category: "Micro Realismo" },
  { id: "5", imgUrl: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=1000&auto=format&fit=crop", category: "Lettering" },
  { id: "6", imgUrl: "https://images.unsplash.com/photo-1550537687-c91072c4792d?q=80&w=1000&auto=format&fit=crop", category: "Oriental" },
];

export default function Portfolio() {
  const [items, setItems] = useState<any[]>(defaultPortfolio);

  useEffect(() => {
    const q = query(collection(db, "portfolio"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setItems(fetchedItems);
        } else {
          setItems([]);
        }
      },
      (error) => {
        console.error("Error listening portfolio:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-36 bg-graphite-dark relative border-y border-gold-dark/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-20 border-b border-graphite-light pb-6 sm:pb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-[clamp(2rem,7vw,4rem)] text-offwhite mb-2 sm:mb-3 md:mb-6 uppercase tracking-wider drop-shadow-lg">
              O <span className="text-gradient-gold">Portfólio</span>
            </h2>
            <p className="text-offwhite/60 font-light max-w-md text-[clamp(0.9rem,2.5vw,1.125rem)] leading-relaxed">
              Uma seleção de obras criadas com precisão técnica e estética sombria. 
              Cada peça é única e desenvolvida sob medida.
            </p>
          </motion.div>
          
          <motion.a
            href="https://instagram.com/renantattoo012"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-4 md:mt-0 font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-[clamp(0.7rem,2vw,0.875rem)] text-gold-muted hover:text-gold-light transition-colors duration-300 flex items-center gap-2 md:gap-3 group flex-shrink-0"
          >
            Explorar Instagram
            <span className="w-6 md:w-8 h-[1px] bg-gold-muted group-hover:w-10 md:group-hover:w-12 transition-all duration-300" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative aspect-[4/5] overflow-hidden bg-black-deep cursor-pointer border border-transparent hover:border-gold-dark/30 transition-colors duration-500 shadow-2xl active:border-gold-dark/50"
            >
              <img
                src={item.imgUrl}
                alt={`Trabalho de tatuagem categoria ${item.category}`}
                className="w-full h-full object-cover grayscale contrast-125 transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-[20%] will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/60 md:via-black-deep/40 to-transparent opacity-90 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
                <span className="font-[family-name:var(--font-oswald)] text-gold-light uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base lg:text-lg font-medium transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <div className="w-10 md:w-0 h-[2px] bg-gradient-gold mt-2 md:mt-3 lg:mt-4 md:group-hover:w-12 transition-all duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
