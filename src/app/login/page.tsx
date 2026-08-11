"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        Cookies.set("studio_auth", "authenticated", { expires: 1 }); // 1 day
        router.push("/studio");
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-black-deep flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(5,5,5,1)_100%)] z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-10 bg-graphite-dark/80 backdrop-blur-md border border-gold-dark/20 relative z-20 shadow-2xl"
      >
        <div className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            alt="Renan Tattoo Logo"
            width={160}
            height={60}
            className="object-contain drop-shadow-[0_0_15px_rgba(232,185,35,0.2)]"
          />
        </div>

        <h1 className="font-serif text-2xl text-offwhite text-center mb-8 uppercase tracking-widest">
          Studio <span className="text-gradient-gold">Access</span>
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Digite a senha de acesso"
              className="w-full bg-black-deep border-b border-graphite-light px-4 py-4 text-offwhite focus:outline-none focus:border-gold-muted transition-colors font-light tracking-widest placeholder:text-offwhite/20"
            />
            {error && (
              <p className="text-red-500/80 text-xs mt-2 font-[family-name:var(--font-oswald)] uppercase tracking-widest">
                Senha incorreta.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-gold text-black-deep uppercase tracking-[0.2em] text-sm font-[family-name:var(--font-oswald)] font-medium hover:shadow-[0_0_20px_rgba(232,185,35,0.3)] transition-all duration-300"
          >
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
