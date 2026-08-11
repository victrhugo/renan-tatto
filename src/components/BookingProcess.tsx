"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "I",
    title: "Primeiro Contato",
    description: "Envie sua ideia, referências e local do corpo através do nosso canal de atendimento exclusivo no WhatsApp.",
  },
  {
    number: "II",
    title: "Curadoria & Design",
    description: "Após análise, criaremos um projeto exclusivo e sob medida que reflita a sua visão com a nossa estética premium.",
  },
  {
    number: "III",
    title: "A Sessão",
    description: "Em um ambiente privado e confortável no coração de São José dos Campos, a arte ganha vida na sua pele.",
  },
];

export default function BookingProcess() {
  return (
    <section id="booking" className="py-12 sm:py-16 md:py-24 lg:py-36 bg-black-deep relative border-y border-graphite-light/30">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-10 sm:mb-14 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif text-[clamp(2rem,7vw,4rem)] text-offwhite mb-3 sm:mb-4 md:mb-6 uppercase tracking-wider drop-shadow-md leading-tight"
          >
            Processo de <span className="text-gradient-gold">Agendamento</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-offwhite/60 font-light max-w-2xl mx-auto text-[clamp(0.9rem,2.5vw,1.125rem)] leading-relaxed"
          >
            Nossa agenda é limitada para garantir dedicação total a cada projeto. 
            Siga os passos abaixo para iniciar sua experiência.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 lg:gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden sm:block absolute top-12 md:top-14 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold-dark/40 to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-black-deep border border-gold-dark/50 flex items-center justify-center mb-4 sm:mb-5 md:mb-8 shadow-[0_0_30px_rgba(166,106,18,0.18)] group-hover:border-gold-light group-hover:shadow-[0_0_45px_rgba(232,185,35,0.4)] transition-all duration-500 transform group-hover:scale-105 active:scale-100">
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-gradient-gold">{step.number}</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-2xl font-[family-name:var(--font-oswald)] text-offwhite mb-2 md:mb-4 tracking-widest uppercase group-hover:text-gold-light transition-colors duration-500">
                {step.title}
              </h3>
              <p className="text-offwhite/50 font-light leading-relaxed px-2 sm:px-0 text-[clamp(0.8rem,2.5vw,1rem)] group-hover:text-offwhite/80 transition-colors duration-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-14 md:mt-24 flex justify-center w-full px-4 sm:px-0"
        >
          <a
            href="https://wa.me/5512981496972"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto px-6 sm:px-8 md:px-12 py-4 sm:py-4 md:py-6 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base font-[family-name:var(--font-oswald)] font-bold overflow-hidden shadow-[0_0_30px_rgba(232,185,35,0.2)] hover:shadow-[0_0_50px_rgba(232,185,35,0.5)] transition-all duration-500 text-center active:shadow-[0_0_60px_rgba(232,185,35,0.6)] min-h-[44px] md:min-h-auto flex items-center justify-center max-w-xs mx-auto"
          >
            <span className="relative z-10">Iniciar Atendimento</span>
            <div className="absolute inset-0 h-full w-full bg-white/20 transform -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
