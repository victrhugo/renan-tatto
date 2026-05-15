"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, writeBatch, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminInput, AdminTextArea, AdminButton } from "@/components/admin/AdminUI";
import { Loader2, GripVertical, Plus, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function FAQEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState<FAQItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const loadedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQItem));
        loadedItems.sort((a, b) => a.order - b.order);
        setItems(loadedItems);
      } catch (error) {
        console.error("Error fetching faqs:", error);
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
    const newItem: FAQItem = {
      id: `new_${Date.now()}`,
      question: "",
      answer: "",
      order: items.length,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = async (idToRemove: string) => {
    if (idToRemove.startsWith("new_")) {
      setItems(items.filter(item => item.id !== idToRemove));
    } else {
      if (confirm("Tem certeza que deseja remover esta pergunta?")) {
        try {
          await deleteDoc(doc(db, "faqs", idToRemove));
          setItems(items.filter(item => item.id !== idToRemove));
        } catch (error) {
          alert("Erro ao remover item.");
        }
      }
    }
  };

  const updateItem = (id: string, field: keyof FAQItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      items.forEach((item) => {
        const docRef = doc(db, "faqs", item.id);
        batch.set(docRef, { question: item.question, answer: item.answer, order: item.order });
      });
      await batch.commit();
      alert("FAQ salvo com sucesso!");
    } catch (error) {
      console.error("Error saving faqs:", error);
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
            Perguntas <span className="text-gradient-gold">Frequentes</span>
          </h1>
          <p className="text-offwhite/50 font-light">Edite o conteúdo do FAQ e arraste para reordenar.</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-6 py-2 border border-gold-dark/50 text-gold-light hover:bg-gold-dark/20 transition-colors uppercase tracking-widest font-[family-name:var(--font-oswald)] text-sm"
        >
          <Plus size={16} /> Nova Pergunta
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="faq-list">
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
                        <AdminInput
                          label="Pergunta"
                          id={`q-${item.id}`}
                          value={item.question}
                          onChange={(e) => updateItem(item.id, "question", e.target.value)}
                        />
                        <AdminTextArea
                          label="Resposta"
                          id={`a-${item.id}`}
                          value={item.answer}
                          onChange={(e) => updateItem(item.id, "answer", e.target.value)}
                          rows={2}
                        />
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
          Salvar FAQ
        </AdminButton>
      </div>
    </div>
  );
}
