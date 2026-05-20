"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { cn } from "@/lib/utils";

const defaultFaqs = [
  {
    id: "1",
    question: "Como funciona o processo de criação de arte?",
    answer: "Todos os nossos projetos são exclusivos. Após o contato inicial, agendamos uma conversa para entender sua visão. Com base nas referências, o artista desenvolve o design único que será apresentado no dia da sessão ou em uma consulta prévia."
  },
  {
    id: "2",
    question: "Qual o valor mínimo para uma sessão?",
    answer: "Trabalhamos com um padrão de excelência e exclusividade. Nossos valores variam de acordo com o tamanho e complexidade do projeto, sendo o valor inicial repassado durante o primeiro contato via WhatsApp, após a avaliação da sua ideia."
  },
  {
    id: "3",
    question: "Vocês fazem cobertura (Cover-up)?",
    answer: "Sim, realizamos coberturas dependendo da viabilidade da tatuagem antiga e da sua nova ideia. É necessária uma avaliação criteriosa presencial para garantirmos um resultado final de alto padrão."
  },
  {
    id: "4",
    question: "Onde o estúdio está localizado?",
    answer: "Nosso estúdio está localizado em um espaço privado e exclusivo na região central de São José dos Campos. O endereço exato é enviado aos clientes mediante a confirmação do agendamento, para manter a privacidade e conforto de todos."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<any[]>(defaultFaqs);

  useEffect(() => {
    const q = query(collection(db, "faqs"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setFaqs(fetchedItems);
        } else {
          setFaqs([]);
        }
      },
      (error) => {
        console.error("Error listening faqs:", error);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24 lg:py-36 bg-black-deep relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="text-center mb-10 sm:mb-14 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-[clamp(2rem,7vw,4rem)] text-offwhite mb-3 md:mb-6 uppercase tracking-wider"
          >
            Dúvidas <span className="text-gradient-gold">Frequentes</span>
          </motion.h2>
        </div>

        <div className="space-y-0 sm:space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-b border-graphite-light group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-4 sm:py-5 md:py-6 lg:py-8 flex justify-between items-start md:items-center text-left focus:outline-none active:bg-graphite-light/10 transition-colors"
              >
                <span className={cn(
                  "font-[family-name:var(--font-oswald)] uppercase tracking-[0.1em] text-sm sm:text-base md:text-lg lg:text-xl transition-colors duration-500 pr-3 sm:pr-4 md:pr-6 flex-1",
                  openIndex === index ? "text-gold-light" : "text-offwhite group-hover:text-gold-muted/80"
                )}>
                  {faq.question}
                </span>
                <span className="text-offwhite ml-4 md:ml-6 flex-shrink-0 mt-1 md:mt-0">
                  {openIndex === index ? (
                    <Minus size={20} className="text-gold-light md:w-6 md:h-6 min-w-[20px] md:min-w-[24px]" />
                  ) : (
                    <Plus size={20} className="text-gold-dark/60 group-hover:text-gold-muted/80 transition-colors duration-500 md:w-6 md:h-6 min-w-[20px] md:min-w-[24px]" />
                  )}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 sm:pb-5 md:pb-6 lg:pb-8 text-offwhite/50 font-light leading-relaxed pr-4 sm:pr-6 md:pr-8 text-[clamp(0.85rem,2.5vw,1.125rem)]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
