import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Clock, MapPin, Search, ChevronRight } from 'lucide-react';
import { Product } from '../context/CartContext';
import { categories as mockCategories, products as mockProducts, stores as mockStores } from '../data';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Store {
  id: number;
  name: string;
  address: string;
  delivery_radius: number;
  hours: string;
  status: string;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use static data for demo mode
    setCategories(mockCategories);
    setProducts(mockProducts);
    setStores(mockStores);
    setLoading(false);
  }, []);

  const filteredProducts = activeCategory 
    ? products.filter(p => p.category_id === activeCategory)
    : products;

  const bestSellers = products.filter(p => p.rating >= 4.8).slice(0, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentStore = stores[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-24 pt-4 px-4 space-y-8"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-zinc-300">
          <MapPin size={18} className="text-amber-500" />
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500">Entregando em</span>
            <span className="text-sm font-medium truncate max-w-[200px]">
              {currentStore?.address || 'Selecione seu endereço'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
          <Clock size={14} className="text-amber-500" />
          <span className="text-xs font-medium">30-45 min</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
        <input 
          type="text" 
          placeholder="O que você quer comer hoje?" 
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
      </div>

      {/* Promo Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-600 to-orange-500 p-6 shadow-lg shadow-amber-500/20">
        <div className="relative z-10 w-2/3">
          <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-wider text-white mb-2">
            Oferta Especial
          </span>
          <h2 className="text-2xl font-bold text-white leading-tight mb-2">
            20% OFF na primeira compra
          </h2>
          <p className="text-white/80 text-sm mb-4">Use o cupom: SOPA20</p>
          <button className="bg-white text-amber-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
            Resgatar
          </button>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-zinc-100">Categorias</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex flex-col items-center space-y-2 min-w-[72px] ${
              activeCategory === null ? 'opacity-100' : 'opacity-60'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
              activeCategory === null ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}>
              <Star size={24} />
            </div>
            <span className="text-xs font-medium">Todos</span>
          </button>
          
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center space-y-2 min-w-[72px] transition-opacity ${
                activeCategory === cat.id ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-colors ${
                activeCategory === cat.id ? 'border-amber-500' : 'border-transparent'
              }`}>
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Best Sellers (Only show when no category is selected) */}
      {activeCategory === null && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-100">Mais Vendidos</h3>
            <button className="text-amber-500 text-sm font-medium flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {bestSellers.map(product => (
              <Link key={product.id} to={`/product/${product.id}`} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-white">{product.rating}</span>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm text-zinc-100 line-clamp-1 mb-1">{product.name}</h4>
                  <p className="text-amber-500 font-bold">R$ {product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Product List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-zinc-100">
          {activeCategory ? categories.find(c => c.id === activeCategory)?.name : 'Para Você'}
        </h3>
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="flex bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 p-3 gap-4 hover:border-zinc-700 transition-colors">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between py-1 flex-1">
                <div>
                  <h4 className="font-medium text-zinc-100 line-clamp-1">{product.name}</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-amber-500 font-bold">R$ {product.price.toFixed(2)}</p>
                  <div className="flex items-center space-x-1 text-zinc-400">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-xs font-medium">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
