"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminCard, AdminInput, AdminButton } from "@/components/admin/AdminUI";
import { Loader2 } from "lucide-react";

export default function ContactEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    whatsapp: "5512981496972",
    instagram: "https://instagram.com/renantattoo012",
    address: "São José dos Campos, SP",
    email: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "contact");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await setDoc(doc(db, "content", "contact"), data);
      alert("Configurações de Contato salvas com sucesso!");
    } catch (error) {
      console.error("Error saving document:", error);
      alert("Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold-muted" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-offwhite uppercase tracking-wider mb-2">
          Links de <span className="text-gradient-gold">Contato</span>
        </h1>
        <p className="text-offwhite/50 font-light">Gerencie os links sociais e informações do rodapé.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Redes e Atendimento</h2>
            
            <AdminInput
              label="Número do WhatsApp (Ex: 5512999999999)"
              id="whatsapp"
              value={data.whatsapp}
              onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
              placeholder="5512999999999"
            />
            
            <AdminInput
              label="Link do Instagram (URL completa)"
              id="instagram"
              value={data.instagram}
              onChange={(e) => setData({ ...data, instagram: e.target.value })}
              placeholder="https://instagram.com/renantattoo"
            />
            
            <AdminInput
              label="Endereço (Texto curto)"
              id="address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              placeholder="São José dos Campos, SP"
            />

            <AdminInput
              label="Email (Opcional)"
              id="email"
              value={data.email || ""}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="contato@renantattoo.com"
            />
          </div>
        </AdminCard>

        <div className="flex justify-end">
          <AdminButton type="submit" isLoading={isSaving}>
            Salvar Alterações
          </AdminButton>
        </div>
      </form>
    </div>
  );
}
