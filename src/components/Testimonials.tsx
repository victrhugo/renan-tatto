"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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
    async function loadData() {
      try {
        const q = query(collection(db, "testimonials"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    }
    loadData();
  }, []);

  return (
    <section className="py-24 md:py-36 bg-graphite-dark relative border-b border-gold-dark/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(20,20,20,1)_0%,rgba(10,10,10,1)_100%)] z-0" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black-deep/80 backdrop-blur-sm p-12 relative group border border-graphite-light hover:border-gold-dark/40 transition-colors duration-700 shadow-xl"
            >
              <div className="text-gold-dark/20 font-serif text-8xl absolute -top-4 -left-2 group-hover:text-gold-muted/30 transition-colors duration-700">
                &ldquo;
              </div>
              <p className="text-offwhite/70 font-light leading-relaxed mb-10 relative z-10 pt-4 text-lg">
                {testimonial.text}
              </p>
              <div className="mt-auto border-t border-graphite-light pt-6 group-hover:border-gold-dark/20 transition-colors duration-700">
                <p className="text-offwhite font-[family-name:var(--font-oswald)] uppercase tracking-[0.2em] text-lg mb-1 group-hover:text-gold-light transition-colors duration-500">
                  {testimonial.author}
                </p>
                <p className="text-gold-dark text-xs uppercase tracking-widest font-bold">
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
