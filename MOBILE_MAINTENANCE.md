# 🚀 Guia Rápido - Manutenção Responsiva Mobile-First

## 📌 Checklist ao Adicionar Novos Componentes

### 1. **Estrutura HTML**
```jsx
// ❌ NÃO faça
<div className="px-6 md:px-12">
  <h1 className="text-4xl md:text-6xl">Título</h1>
</div>

// ✅ FAÇA
<div className="px-4 sm:px-6 md:px-12">
  <h1 className="text-[clamp(1.75rem,6vw,3.75rem)]">Título</h1>
</div>
```

### 2. **Tipografia Responsiva**
```jsx
// Use clamp para tamanhos de fonte
className="text-[clamp(0.9rem,3vw,1.125rem)]"

// Rastreamento responsivo também
className="tracking-[0.1em] md:tracking-[0.2em]"
```

### 3. **Espaçamento Responsivo**
```jsx
// Padding/Margin responsivo
className="p-4 sm:p-6 md:p-8"
className="py-12 sm:py-16 md:py-24"

// Ou use a variável
style={{ padding: 'var(--padding-lg)' }}
```

### 4. **Grids Responsivos**
```jsx
// ❌ Sempre 3 colunas
<div className="grid grid-cols-3">

// ✅ Mobile-first
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
```

### 5. **Botões e Inputs**
```jsx
// SEMPRE com min-height 44px no mobile
<button className="py-3 sm:py-4 min-h-[44px] md:min-h-auto">

// Também funciona com Tailwind
<button className="h-11 sm:h-auto">
```

---

## 🎯 Variáveis CSS Disponíveis

### Spacing
```css
--padding-xs   /* 0.75rem - 1rem */
--padding-sm   /* 1rem - 1.5rem */
--padding-md   /* 1.5rem - 2rem */
--padding-lg   /* 2rem - 3rem */
--padding-xl   /* 2.5rem - 4rem */
--padding-2xl  /* 3rem - 6rem */
```

### Font Sizes
```css
--text-xs    /* 0.7rem - 0.75rem */
--text-sm    /* 0.8rem - 0.875rem */
--text-base  /* 0.9rem - 1rem */
--text-lg    /* 1rem - 1.125rem */
--text-xl    /* 1.15rem - 1.25rem */
--text-2xl   /* 1.3rem - 1.5rem */
--text-3xl   /* 1.5rem - 1.875rem */
--text-4xl   /* 2rem - 2.25rem */
--text-5xl   /* 2.5rem - 3rem */
```

---

## 📏 Tamanhos Mínimos Touch

- **Botões:** min-height 44px, min-width 44px
- **Ícones:** size 20px (24px no desktop)
- **Links:** py-2 ou superior

---

## 🔍 Teste Antes de Commitar

### Mobile (375px - iPhone SE)
- [ ] Sem overflow horizontal
- [ ] Texto legível (min 14px)
- [ ] Botões tocáveis (44px+)
- [ ] Imagens não cortadas

### Tablet (768px)
- [ ] Layouts intermediários funcionando
- [ ] Media queries `sm:` e `md:` aplicadas
- [ ] Proporções mantidas

### Desktop (1920px+)
- [ ] Max-width respeitado
- [ ] Espaçamento generoso
- [ ] Efeitos hover funcionando

---

## 💡 Dicas Práticas

### Remover Fixed Widths
```jsx
// ❌
width: 1200px

// ✅
max-w-7xl (1280px)
max-w-6xl (1152px)
max-w-5xl (1024px)
```

### Problemas Comuns

1. **Overflow Horizontal**
   - Checar `max-width: 100vw` em container pai
   - Adicionar `overflow-x-hidden` na main

2. **Texto Ilegível**
   - Aumentar min font-size com clamp()
   - Aumentar line-height em mobile

3. **Botões Muito Pequenos**
   - Adicionar `min-h-[44px]`
   - Aumentar padding: `py-3 sm:py-4`

4. **Gaps Inconsistentes**
   - Usar `gap-4 sm:gap-6 md:gap-8`
   - Evitar gaps fixos maiores que padding

---

## 🎨 Classes Úteis Adicionadas

```jsx
// Prevent overflow
className="max-w-full overflow-x-hidden"

// Touch friendly
className="active:bg-graphite-light/20 active:scale-95"

// Responsive containers
className="px-4 sm:px-6 md:px-12"  // 16px, 24px, 48px

// Fluid typography
className="text-[clamp(1.5rem,5vw,3rem)]"

// Grid responsivo universal
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
```

---

## 📚 Referência Rápida de Media Queries

```jsx
// Mobile first (padrão)
className="text-sm"

// Small screens (640px+)
className="sm:text-base"

// Medium screens (768px+) - Tablets
className="md:text-lg"

// Large screens (1024px+)
className="lg:text-xl"

// Extra large screens (1280px+)
className="xl:text-2xl"

// 2XL screens (1536px+)
className="2xl:text-3xl"
```

---

## 🚀 Performance Checklist

- [ ] Sem hardcoded pixels em spans >= 768px
- [ ] Clamp() usado para escalabilidade fluida
- [ ] Min-height 44px em todos botões/links
- [ ] Sem overflow horizontal
- [ ] Grid responsivo em todas listas
- [ ] Font sizes com clamp() ou media queries
- [ ] Padding/margin responsivo com clamp()
- [ ] Imagens com aspect-ratio ou cover
- [ ] Animações respeitam prefers-reduced-motion
- [ ] Hover vs Active vs Focus states

---

## 🔧 Build e Deploy

```bash
# Verificar erros antes de fazer push
npm run build

# Testar em produção
npm run preview

# Ver erros específicos
npm run lint
```

---

**Última atualização:** Maio 2026  
**Versão:** Mobile-First Responsive  
**Status:** ✅ Produção
