"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminCard, AdminInput, AdminTextArea, AdminButton } from "@/components/admin/AdminUI";
import { Loader2 } from "lucide-react";

export default function SEOEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    title: "Renan Tattoo | Estúdio Premium",
    description: "Estúdio de tatuagem de luxo e estética underground.",
    keywords: "tattoo, tatuagem",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "seo");
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
      await setDoc(doc(db, "content", "seo"), data);
      alert("Configurações de SEO salvas com sucesso!");
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
          Global <span className="text-gradient-gold">SEO</span>
        </h1>
        <p className="text-offwhite/50 font-light">Ajuste os metadados do site para otimização no Google.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Metadados Principais</h2>
            
            <AdminInput
              label="Meta Title (Título da Aba)"
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Renan Tattoo | Estúdio Premium em SJC"
            />
            
            <AdminTextArea
              label="Meta Description (Descrição para o Google)"
              id="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Estúdio de tatuagem de luxo em São José dos Campos..."
              rows={3}
            />
            
            <AdminTextArea
              label="Keywords (Palavras-chave separadas por vírgula)"
              id="keywords"
              value={data.keywords}
              onChange={(e) => setData({ ...data, keywords: e.target.value })}
              placeholder="tattoo, tatuagem, são josé dos campos, realismo, dark art..."
              rows={2}
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
