"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, writeBatch, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminInput, AdminTextArea, AdminButton } from "@/components/admin/AdminUI";
import { Loader2, GripVertical, Plus, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role: string;
  order: number;
}

export default function TestimonialsEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState<TestimonialItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        if (querySnapshot.empty) {
          const defaultTestimonials = [
            { id: "1", text: "A experiência é completamente diferente de qualquer outro estúdio. O ambiente, a atenção aos detalhes no design, o resultado final... superou todas as minhas expectativas. É arte pura.", author: "Thiago M.", role: "Colecionador", order: 0 },
            { id: "2", text: "O nível de realismo que o Renan conseguiu no meu fechamento de braço é absurdo. Sofisticação e força na medida certa. O estúdio em São José é um refúgio.", author: "Rafael S.", role: "Cliente VIP", order: 1 },
            { id: "3", text: "Entendi o que é o 'luxo underground' no momento em que pisei no estúdio. Serviço impecável e uma arte sombria, elegante e exclusiva que levo pra vida toda.", author: "Leonardo C.", role: "Empresário", order: 2 }
          ];
          setItems(defaultTestimonials);
        } else {
          const loadedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TestimonialItem));
          loadedItems.sort((a, b) => a.order - b.order);
          setItems(loadedItems);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    
    const updatedItems = newItems.map((item, index) => ({ ...item, order: index }));
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem: TestimonialItem = {
      id: `new_${Date.now()}`,
      text: "",
      author: "",
      role: "",
      order: items.length,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = async (idToRemove: string) => {
    if (idToRemove.startsWith("new_")) {
      setItems(items.filter(item => item.id !== idToRemove));
    } else {
      if (confirm("Tem certeza que deseja remover este depoimento?")) {
        try {
          await deleteDoc(doc(db, "testimonials", idToRemove));
          setItems(items.filter(item => item.id !== idToRemove));
        } catch (error) {
          alert("Erro ao remover item.");
        }
      }
    }
  };

  const updateItem = (id: string, field: keyof TestimonialItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      items.forEach((item) => {
        const docRef = doc(db, "testimonials", item.id);
        batch.set(docRef, { text: item.text, author: item.author, role: item.role, order: item.order });
      });
      await batch.commit();
      alert("Depoimentos salvos com sucesso!");
    } catch (error) {
      console.error("Error saving testimonials:", error);
      alert("Erro ao salvar.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gold-muted" size={48} /></div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl text-offwhite uppercase tracking-wider mb-2">
            Cards de <span className="text-gradient-gold">Depoimentos</span>
          </h1>
          <p className="text-offwhite/50 font-light">Adicione depoimentos de clientes VIP e reordene.</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-6 py-2 border border-gold-dark/50 text-gold-light hover:bg-gold-dark/20 transition-colors uppercase tracking-widest font-[family-name:var(--font-oswald)] text-sm"
        >
          <Plus size={16} /> Novo Depoimento
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="testimonials-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-graphite-dark/80 border border-graphite-light p-6 flex gap-6 shadow-lg group relative"
                    >
                      <div {...provided.dragHandleProps} className="text-offwhite/20 hover:text-gold-muted cursor-grab mt-8">
                        <GripVertical size={24} />
                      </div>

                      <div className="flex-1 space-y-4">
                        <AdminTextArea
                          label="Depoimento (Texto)"
                          id={`t-${item.id}`}
                          value={item.text}
                          onChange={(e) => updateItem(item.id, "text", e.target.value)}
                          rows={3}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <AdminInput
                            label="Nome do Cliente"
                            id={`a-${item.id}`}
                            value={item.author}
                            onChange={(e) => updateItem(item.id, "author", e.target.value)}
                          />
                          <AdminInput
                            label="Ocupação / Título"
                            id={`r-${item.id}`}
                            value={item.role}
                            onChange={(e) => updateItem(item.id, "role", e.target.value)}
                            placeholder="Ex: Colecionador"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-3 text-offwhite/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors self-start mt-4"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex justify-end pt-8">
        <AdminButton onClick={handleSave} isLoading={isSaving}>
          Salvar Depoimentos
        </AdminButton>
      </div>
    </div>
  );
}
