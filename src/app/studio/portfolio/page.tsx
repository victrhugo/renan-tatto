"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, writeBatch, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AdminCard, AdminInput, AdminButton } from "@/components/admin/AdminUI";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Loader2, GripVertical, Plus, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface PortfolioItem {
  id: string;
  imgUrl: string;
  category: string;
  order: number;
}

export default function PortfolioEditPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const loadedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
        loadedItems.sort((a, b) => a.order - b.order);
        setItems(loadedItems);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
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
    
    // Update order property
    const updatedItems = newItems.map((item, index) => ({ ...item, order: index }));
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    const newItem: PortfolioItem = {
      id: `new_${Date.now()}`,
      imgUrl: "",
      category: "",
      order: items.length,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = async (idToRemove: string) => {
    if (idToRemove.startsWith("new_")) {
      setItems(items.filter(item => item.id !== idToRemove));
    } else {
      if (confirm("Tem certeza que deseja remover esta imagem?")) {
        try {
          await deleteDoc(doc(db, "portfolio", idToRemove));
          setItems(items.filter(item => item.id !== idToRemove));
        } catch (error) {
          alert("Erro ao remover item.");
        }
      }
    }
  };

  const updateItem = (id: string, field: keyof PortfolioItem, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const batch = writeBatch(db);
      items.forEach((item) => {
        // If it's new, it will have new_ prefix, we should generate a proper ID or let Firestore do it.
        // For simplicity, we just use the generated ID as document ID.
        const docRef = doc(db, "portfolio", item.id);
        batch.set(docRef, { imgUrl: item.imgUrl, category: item.category, order: item.order });
      });
      await batch.commit();
      alert("Portfólio salvo com sucesso!");
    } catch (error) {
      console.error("Error saving portfolio:", error);
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
            Galeria do <span className="text-gradient-gold">Portfólio</span>
          </h1>
          <p className="text-offwhite/50 font-light">Adicione, edite categorias e arraste para reordenar (Drag & Drop).</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 px-6 py-2 border border-gold-dark/50 text-gold-light hover:bg-gold-dark/20 transition-colors uppercase tracking-widest font-[family-name:var(--font-oswald)] text-sm"
        >
          <Plus size={16} /> Novo Trabalho
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="portfolio-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-graphite-dark/80 border border-graphite-light p-4 flex gap-6 items-center shadow-lg group relative"
                    >
                      <div {...provided.dragHandleProps} className="text-offwhite/20 hover:text-gold-muted cursor-grab">
                        <GripVertical size={24} />
                      </div>
                      
                      <div className="w-48">
                        <ImageUpload
                          label=""
                          folder="portfolio"
                          value={item.imgUrl}
                          onChange={(url) => updateItem(item.id, "imgUrl", url)}
                        />
                      </div>

                      <div className="flex-1 space-y-4">
                        <AdminInput
                          label="Categoria"
                          id={`cat-${item.id}`}
                          value={item.category}
                          onChange={(e) => updateItem(item.id, "category", e.target.value)}
                          placeholder="Ex: Realismo"
                        />
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-3 text-offwhite/20 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
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
          Salvar Ordem e Galeria
        </AdminButton>
      </div>
    </div>
  );
}
