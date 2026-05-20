"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

const defaultTestimonials = [
  {
    id: "1",
    text: "A experiência é completamente diferente de qualquer outro estúdio. O ambiente, a atenção aos detalhes no design, o resultado final... superou todas as minhas expectativas. É arte pura.",
    author: "Thiago M.",
    role: "Colecionador"
  },
  {
    id: "2",
    text: "O nível de realismo que o Renan conseguiu no meu fechamento de braço é absurdo. Sofisticação e força na medida certa. O estúdio em São José é um refúgio.",
    author: "Rafael S.",
    role: "Cliente VIP"
  },
  {
    id: "3",
    text: "Entendi o que é o 'luxo underground' no momento em que pisei no estúdio. Serviço impecável e uma arte sombria, elegante e exclusiva que levo pra vida toda.",
    author: "Leonardo C.",
    role: "Empresário"
  }
];

export default function Testimonials() {
  const [items, setItems] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
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
        console.error("Error listening testimonials:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-36 bg-graphite-dark relative border-b border-gold-dark/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] z-0" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 lg:gap-10">
          {items.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black-deep/80 backdrop-blur-sm p-5 sm:p-6 md:p-8 lg:p-10 relative group border border-graphite-light hover:border-gold-dark/40 transition-colors duration-700 shadow-xl active:border-gold-dark/50"
            >
              <div className="text-gold-dark/20 font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl absolute -top-2 md:-top-4 -left-1 md:-left-2 group-hover:text-gold-muted/30 transition-colors duration-700 leading-none">
                &ldquo;
              </div>
              <p className="text-offwhite/70 font-light leading-relaxed mb-6 sm:mb-8 md:mb-10 relative z-10 pt-3 md:pt-4 text-[clamp(0.9rem,2.5vw,1.125rem)]">
                {testimonial.text}
              </p>
              <div className="mt-auto border-t border-graphite-light pt-4 sm:pt-5 md:pt-6 group-hover:border-gold-dark/20 transition-colors duration-700">
                <p className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.15em] md:tracking-[0.2em] text-sm md:text-base lg:text-lg mb-1 group-hover:text-gold-light transition-colors duration-500">
                  {testimonial.author}
                </p>
                <p className="text-gold-dark text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest font-bold">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
