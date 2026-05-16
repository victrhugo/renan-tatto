"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminCard, AdminInput, AdminTextArea, AdminButton } from "@/components/admin/AdminUI";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2 } from "lucide-react";

export default function AboutEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [data, setData] = useState({
    title: "O Artista",
    subtitle: "Renan Tattoo — São José dos Campos",
    paragraph1: "Com mais de uma década de experiência, desenvolvi um estilo único que mescla a agressividade do underground com a precisão do design premium.",
    paragraph2: "Minha abordagem não é apenas sobre desenhar na pele, mas criar uma obra de arte exclusiva que reflita força, história e sofisticação. Cada projeto é concebido de forma única para cada cliente, garantindo um resultado que impressiona e dura para a vida toda.",
    paragraph3: "Trabalho em um ambiente privado e exclusivo, desenhado para oferecer a melhor experiência possível. Do café premium à curadoria musical, tudo é pensado para o seu conforto.",
    experienceYears: "10+",
    projectCount: "1k+",
    imageUrl: "https://images.unsplash.com/photo-1611558709798-e009c8fd7706?q=80&w=2576&auto=format&fit=crop",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, "content", "about");
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
      await setDoc(doc(db, "content", "about"), data);
      alert("Configurações 'Sobre o Artista' salvas com sucesso!");
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
          O <span className="text-gradient-gold">Artista</span>
        </h1>
        <p className="text-offwhite/50 font-light">Edite sua biografia, foto e estatísticas.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Cabeçalho</h2>
            <AdminInput
              label="Título"
              id="title"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <AdminInput
              label="Subtítulo"
              id="subtitle"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            />
          </div>
        </AdminCard>

        <AdminCard>
          <div className="space-y-6">
            <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Biografia</h2>
            <AdminTextArea
              label="Parágrafo 1"
              id="paragraph1"
              value={data.paragraph1}
              onChange={(e) => setData({ ...data, paragraph1: e.target.value })}
              rows={3}
            />
            <AdminTextArea
              label="Parágrafo 2"
              id="paragraph2"
              value={data.paragraph2}
              onChange={(e) => setData({ ...data, paragraph2: e.target.value })}
              rows={3}
            />
            <AdminTextArea
              label="Parágrafo 3"
              id="paragraph3"
              value={data.paragraph3}
              onChange={(e) => setData({ ...data, paragraph3: e.target.value })}
              rows={3}
            />
          </div>
        </AdminCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AdminCard>
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Estatísticas</h2>
              <AdminInput
                label="Anos de Experiência (Ex: 10+)"
                id="experienceYears"
                value={data.experienceYears}
                onChange={(e) => setData({ ...data, experienceYears: e.target.value })}
              />
              <AdminInput
                label="Projetos (Ex: 1k+)"
                id="projectCount"
                value={data.projectCount}
                onChange={(e) => setData({ ...data, projectCount: e.target.value })}
              />
            </div>
          </AdminCard>

          <AdminCard>
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-gold-muted uppercase tracking-widest mb-6">Mídia</h2>
              <ImageUpload
                label="Foto de Perfil"
                folder="about"
                value={data.imageUrl}
                onChange={(url) => setData({ ...data, imageUrl: url })}
              />
            </div>
          </AdminCard>
        </div>

        <div className="flex justify-end">
          <AdminButton type="submit" isLoading={isSaving}>
            Salvar Alterações
          </AdminButton>
        </div>
      </form>
    </div>
  );
}
