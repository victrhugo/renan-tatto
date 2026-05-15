"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminCard, AdminInput, AdminTextArea, AdminButton } from "@/components/admin/AdminUI";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2 } from "lucide-react";

export default function HeroEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    ctaText: "",
    bgImage: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "hero");
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
      await setDoc(doc(db, "content", "hero"), data);
      alert("Configurações da Hero salvas com sucesso!");
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
          Hero <span className="text-gradient-gold">Section</span>
        </h1>
        <p className="text-offwhite/50 font-light">Edite o conteúdo principal da primeira dobra do site.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Textos Principais</h2>
            <AdminInput
              label="Localização / Subtítulo Superior"
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              placeholder="Ex: São José dos Campos"
            />
            
            <AdminTextArea
              label="Título Principal (HTML permitido para quebras, ex: <br />)"
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="ARTE NA PELE. <br/> <span className='text-gradient-gold'>FORÇA E HONRA.</span>"
              rows={3}
            />

            <AdminTextArea
              label="Descrição Secundária"
              id="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Experiência de tatuagem de luxo..."
              rows={3}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Mídia & Call to Action</h2>
            <ImageUpload
              label="Imagem de Fundo (Cinematográfica)"
              folder="hero"
              value={data.bgImage}
              onChange={(url) => setData({ ...data, bgImage: url })}
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
