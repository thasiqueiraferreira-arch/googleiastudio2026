import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Star, Clock, Minus, Plus, Heart, CheckCircle2 } from 'lucide-react';
import { useCart, Product as ProductType } from '../context/CartContext';
import { products as mockProducts } from '../data';

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'Pequena' | 'Média' | 'Grande'>('Média');
  const [selectedAddons, setSelectedAddons] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);

  const sizes = [
    { id: 'Pequena', label: 'Pequena (300ml)', priceMultiplier: 0.8 },
    { id: 'Média', label: 'Média (500ml)', priceMultiplier: 1 },
    { id: 'Grande', label: 'Grande (700ml)', priceMultiplier: 1.3 },
  ];

  const addons = [
    { id: 1, name: 'Pão Italiano', price: 4.50 },
    { id: 2, name: 'Queijo Ralado Extra', price: 3.00 },
    { id: 3, name: 'Bacon Crocante', price: 5.50 },
    { id: 4, name: 'Croutons', price: 2.50 }
  ];

  useEffect(() => {
    // Use static data for demo mode
    const found = mockProducts.find(p => p.id === Number(id));
    if (found) {
      setProduct(found);
    } else {
      console.error('Product not found');
      navigate('/');
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const basePrice = product.price * (sizes.find(s => s.id === selectedSize)?.priceMultiplier || 1);
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);
  
  const finalPrice = (basePrice + addonsPrice) * quantity;

  const toggleAddon = (addonId: number) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    // Create a customized product object with the final calculated price
    const customizedProduct = {
      ...product,
      name: product.name,
      price: basePrice + addonsPrice,
      id: parseInt(`${product.id}${selectedSize === 'Pequena' ? 1 : selectedSize === 'Média' ? 2 : 3}${selectedAddons.join('')}`), // Unique ID for this variation
      size: selectedSize,
      addons: selectedAddons.map(id => addons.find(a => a.id === id)?.name || '')
    };
    
    addToCart(customizedProduct, quantity);
    setShowToast(true);
    
    // Auto hide toast and navigate to cart
    setTimeout(() => {
      setShowToast(false);
      navigate('/cart');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 bg-zinc-950 min-h-screen"
    >
      {/* Header Actions */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 max-w-md mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-zinc-950/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="w-10 h-10 rounded-full bg-zinc-950/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
        >
          <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative h-80 w-full">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
      </div>

      {/* Product Details */}
      <div className="px-6 -mt-10 relative z-10 space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold text-white leading-tight max-w-[70%]">
            {product.name}
          </h1>
          <div className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full flex items-center space-x-1 border border-amber-500/20">
            <Star size={14} className="fill-amber-500" />
            <span className="font-bold text-sm">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-zinc-400">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>30-45 min</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
          <span>1.2 km</span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2">Descrição</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Size Selection */}
        <div className="pt-4 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            <span>Tamanho</span>
            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md">Obrigatório</span>
          </h3>
          <div className="space-y-3">
            {sizes.map(size => (
              <label 
                key={size.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer ${
                  selectedSize === size.id 
                    ? 'border-amber-500 bg-amber-500/5' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedSize === size.id ? 'border-amber-500' : 'border-zinc-600'
                  }`}>
                    {selectedSize === size.id && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                  </div>
                  <span className={`text-sm font-medium ${selectedSize === size.id ? 'text-amber-500' : 'text-zinc-300'}`}>
                    {size.label}
                  </span>
                </div>
                <span className="text-zinc-400 text-sm">
                  R$ {(product.price * size.priceMultiplier).toFixed(2)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="pt-4 border-t border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
            <span>Adicionais</span>
            <span className="text-xs font-normal text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md">Opcional</span>
          </h3>
          <div className="space-y-3">
            {addons.map(addon => (
              <label 
                key={addon.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer ${
                  selectedAddons.includes(addon.id)
                    ? 'border-amber-500 bg-amber-500/5' 
                    : 'border-zinc-800 bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedAddons.includes(addon.id) ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
                  }`}>
                    {selectedAddons.includes(addon.id) && <CheckCircle2 size={14} className="text-zinc-950" />}
                  </div>
                  <span className={`text-sm font-medium ${selectedAddons.includes(addon.id) ? 'text-amber-500' : 'text-zinc-300'}`}>
                    {addon.name}
                  </span>
                </div>
                <span className="text-zinc-400 text-sm font-medium">+ R$ {addon.price.toFixed(2)}</span>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => toggleAddon(addon.id)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm"
          >
            <div className="bg-zinc-900 p-8 rounded-3xl flex flex-col items-center shadow-2xl border border-zinc-800">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={40} className="text-emerald-500" />
              </div>
              <span className="text-xl font-bold text-white">Adicionado com sucesso!</span>
              <span className="text-zinc-400 mt-2">Indo para o carrinho...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800 p-4 pb-safe">
        <div className="max-w-md mx-auto flex items-center space-x-4">
          <div className="flex items-center bg-zinc-900 rounded-2xl border border-zinc-800 p-1">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="w-8 text-center font-bold text-white text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center text-amber-500 hover:text-amber-400 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-2xl h-14 flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span className="text-base">Finalizar Pedido</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950/50 mx-1"></span>
            <span className="text-base">R$ {finalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
