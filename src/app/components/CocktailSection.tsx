import { Wine, Plus, Minus, Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';

interface Cocktail {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

interface CocktailSectionProps {
  onTotalChange: (total: number) => void;
  onItemsChange: (items: Array<{ name: string; quantity: number; price: number }>) => void;
  isOwnerMode: boolean;
}

export function CocktailSection({ onTotalChange, onItemsChange, isOwnerMode }: CocktailSectionProps) {
  const [cocktails, setCocktails] = useState<Cocktail[]>([
    { id: 1, name: 'Midnight Martini', price: 18, description: 'Premium vodka with a twist of obsidian elegance', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', quantity: 0 },
    { id: 2, name: 'Amethyst Dream', price: 22, description: 'Gin infused with butterfly pea flower', image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&q=80', quantity: 0 },
    { id: 3, name: 'Golden Elixir', price: 25, description: 'Champagne cocktail with 24k gold flakes', image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80', quantity: 0 },
    { id: 4, name: 'Velvet Obsession', price: 20, description: 'Dark rum with velvet falernum', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&q=80', quantity: 0 },
    { id: 5, name: 'Crystal Paloma', price: 16, description: 'Tequila with grapefruit and crystal clarity', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', quantity: 0 },
    { id: 6, name: 'Royal Negroni', price: 19, description: 'Premium gin, Campari, and sweet vermouth', image: 'https://images.unsplash.com/photo-1621873815234-781259c55de5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuZWdyb25pJTIwY29ja3RhaWx8ZW58MXx8fHwxNzY4NDk5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080', quantity: 0 },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ name: '', price: 0, description: '' });
  const priceRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const total = cocktails.reduce((sum, cocktail) => sum + (cocktail.price * cocktail.quantity), 0);
    onTotalChange(total);
    
    const items = cocktails
      .filter(c => c.quantity > 0)
      .map(c => ({ name: c.name, quantity: c.quantity, price: c.price }));
    onItemsChange(items);
  }, [cocktails, onTotalChange, onItemsChange]);

  const updateQuantity = (id: number, delta: number) => {
    setCocktails(prev => prev.map(cocktail => {
      if (cocktail.id === id) {
        const newQuantity = Math.max(0, cocktail.quantity + delta);
        
        // Trigger flying animation
        if (delta > 0 && priceRefs.current[id]) {
          const priceElement = priceRefs.current[id];
          if (priceElement) {
            const flyingPrice = document.createElement('div');
            flyingPrice.textContent = `+$${cocktail.price}`;
            flyingPrice.className = 'fixed text-[#C39738] font-bold text-xl pointer-events-none z-[200]';
            const rect = priceElement.getBoundingClientRect();
            flyingPrice.style.left = `${rect.left}px`;
            flyingPrice.style.top = `${rect.top}px`;
            document.body.appendChild(flyingPrice);

            setTimeout(() => {
              flyingPrice.style.transition = 'all 1s ease-out';
              flyingPrice.style.transform = 'translateY(-100px)';
              flyingPrice.style.opacity = '0';
            }, 10);

            setTimeout(() => {
              document.body.removeChild(flyingPrice);
            }, 1000);
          }
        }
        
        return { ...cocktail, quantity: newQuantity };
      }
      return cocktail;
    }));
  };

  const startEditing = (cocktail: Cocktail) => {
    setEditingId(cocktail.id);
    setEditForm({ name: cocktail.name, price: cocktail.price, description: cocktail.description });
  };

  const saveEdit = (id: number) => {
    setCocktails(prev => prev.map(c => 
      c.id === id ? { ...c, ...editForm } : c
    ));
    setEditingId(null);
  };

  const deleteCocktail = (id: number) => {
    setCocktails(prev => prev.filter(c => c.id !== id));
  };

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#C39738] to-[#9D50BB] bg-clip-text text-transparent">
            Premium Cocktails
          </h2>
          <p className="font-body text-white/60 text-lg max-w-2xl mx-auto">
            Handcrafted elixirs designed to elevate your evening
          </p>
        </motion.div>

        {/* Cocktail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cocktails.map((cocktail, index) => (
            <motion.div
              key={cocktail.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 rounded-3xl backdrop-blur-[60px] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#9D50BB]/30 transition-all duration-300 shadow-lg hover:shadow-[#9D50BB]/10"
            >
              {/* Image */}
              <div className="relative h-48 mb-4 rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={cocktail.image}
                  alt={cocktail.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
              </div>

              {/* Content */}
              {editingId === cocktail.id && isOwnerMode ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm"
                  />
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-body text-sm resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(cocktail.id)}
                      className="flex-1 px-3 py-2 rounded-lg bg-[#9D50BB]/30 text-white text-sm hover:bg-[#9D50BB]/40"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading text-2xl text-white">{cocktail.name}</h3>
                    <div 
                      ref={(el) => { priceRefs.current[cocktail.id] = el; }}
                      className="text-[#C39738] font-bold text-xl"
                    >
                      ${cocktail.price}
                    </div>
                  </div>
                  <p className="font-body text-white/60 text-sm mb-6">{cocktail.description}</p>

                  {/* Owner Controls */}
                  {isOwnerMode && (
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => startEditing(cocktail)}
                        className="flex-1 px-3 py-2 rounded-lg bg-[#C39738]/20 text-[#C39738] text-sm hover:bg-[#C39738]/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCocktail(cocktail.id)}
                        className="flex-1 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  )}

                  {/* Quantity Controls (Customer Mode Only) */}
                  {!isOwnerMode && (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(cocktail.id, -1)}
                          disabled={cocktail.quantity === 0}
                          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#9D50BB]/20 hover:border-[#9D50BB]/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group/btn"
                        >
                          <Minus className="w-4 h-4 text-white group-hover/btn:text-[#9D50BB]" />
                        </button>
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={cocktail.quantity}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="w-12 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#9D50BB]/20 to-[#C39738]/20 border border-white/10"
                          >
                            <span className="text-white font-bold">{cocktail.quantity}</span>
                          </motion.div>
                        </AnimatePresence>

                        <button
                          onClick={() => updateQuantity(cocktail.id, 1)}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-[#9D50BB]/30 to-[#C39738]/30 border border-white/10 flex items-center justify-center hover:shadow-lg hover:shadow-[#9D50BB]/30 transition-all duration-300 group/btn"
                        >
                          <Plus className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>

                      {cocktail.quantity > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[#C39738] font-bold"
                        >
                          ${cocktail.price * cocktail.quantity}
                        </motion.div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}