import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trash2, MapPin, CreditCard, ChevronRight, ShoppingBag, Ticket } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | 'debit' | 'wallet'>('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryFee = deliveryType === 'delivery' ? 8.90 : 0;
  const finalTotal = total + deliveryFee - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'SOPA20') {
      setDiscount(total * 0.2);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate API call for demo mode
    setTimeout(() => {
      const mockOrderId = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit order ID
      clearCart();
      navigate(`/order-confirmation/${mockOrderId}`);
      setIsProcessing(false);
    }, 1500); // 1.5 second delay to show processing state
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-6 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
          <ShoppingBag size={32} className="text-zinc-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Seu carrinho está vazio</h2>
        <p className="text-zinc-400 mb-8">Que tal adicionar algumas delícias premium?</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-amber-500 text-zinc-950 font-bold px-8 py-3 rounded-2xl shadow-lg shadow-amber-500/20"
        >
          Explorar Cardápio
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-32 pt-4 px-4 space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Meu Carrinho</h1>
        <span className="bg-zinc-900 text-zinc-400 px-3 py-1 rounded-full text-sm font-medium border border-zinc-800">
          {items.length} itens
        </span>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex gap-4 bg-zinc-900 p-3 rounded-2xl border border-zinc-800">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between flex-1 py-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white text-sm line-clamp-2 pr-4">{item.name}</h3>
                  {item.size && (
                    <p className="text-xs text-amber-500 mt-0.5">Tamanho: {item.size}</p>
                  )}
                  {item.addons && item.addons.length > 0 && (
                    <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
                      + {item.addons.join(', ')}
                    </p>
                  )}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-amber-500 font-bold">R$ {item.price.toFixed(2)}</span>
                <div className="flex items-center bg-zinc-950 rounded-lg border border-zinc-800">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-amber-500"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => navigate('/')}
          className="w-full py-3 border border-dashed border-zinc-700 rounded-xl text-zinc-400 text-sm font-medium hover:text-white hover:border-zinc-500 transition-colors flex items-center justify-center space-x-2"
        >
          <span>+ Adicionar mais itens</span>
        </button>
      </div>

      {/* Coupon */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex items-center space-x-3">
        <Ticket size={20} className="text-amber-500" />
        <input 
          type="text" 
          placeholder="Cupom de desconto" 
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 focus:outline-none text-sm uppercase"
        />
        <button 
          onClick={handleApplyCoupon}
          className="text-amber-500 font-bold text-sm"
        >
          Aplicar
        </button>
      </div>

      {/* Delivery Options */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 space-y-4">
        <h3 className="font-bold text-white flex items-center space-x-2">
          <MapPin size={18} className="text-amber-500" />
          <span>Entrega ou Retirada</span>
        </h3>
        <div className="flex p-1 bg-zinc-950 rounded-xl border border-zinc-800">
          <button 
            onClick={() => setDeliveryType('delivery')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              deliveryType === 'delivery' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'
            }`}
          >
            Entrega
          </button>
          <button 
            onClick={() => setDeliveryType('pickup')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              deliveryType === 'pickup' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'
            }`}
          >
            Retirada
          </button>
        </div>
        
        {deliveryType === 'delivery' && (
          <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">Av. Paulista, 1000</span>
              <span className="text-xs text-zinc-500">Bela Vista, São Paulo - SP</span>
            </div>
            <button className="text-amber-500 text-sm font-medium">Trocar</button>
          </div>
        )}
      </div>

      {/* Payment Options */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 space-y-4">
        <h3 className="font-bold text-white flex items-center space-x-2">
          <CreditCard size={18} className="text-amber-500" />
          <span>Pagamento</span>
        </h3>
        <div className="space-y-2">
          {[
            { id: 'pix', label: 'Pagar em PIX', icon: '💠' },
            { id: 'credit', label: 'Cadastrar Cartão', icon: '💳' },
            { id: 'delivery', label: 'Pagar na Entrega', icon: '🛵' }
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id as any)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-colors ${
                paymentMethod === method.id 
                  ? 'bg-amber-500/10 border-amber-500/50 text-white' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{method.icon}</span>
                <span className="text-sm font-medium">{method.label}</span>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === method.id ? 'border-amber-500' : 'border-zinc-600'
              }`}>
                {paymentMethod === method.id && <div className="w-2 h-2 bg-amber-500 rounded-full" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 space-y-3">
        <h3 className="font-bold text-white mb-2">Resumo de Valores</h3>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Subtotal</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-zinc-400">
          <span>Taxa de Entrega</span>
          <span>{deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2)}`}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-emerald-500">
            <span>Desconto</span>
            <span>- R$ {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="h-px bg-zinc-800 my-2"></div>
        <div className="flex justify-between items-end">
          <span className="font-bold text-white">Total</span>
          <div className="text-right">
            <span className="text-xs text-zinc-500 block">com taxas</span>
            <span className="text-xl font-bold text-amber-500">R$ {finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Fixed Checkout Button */}
      <div className="fixed bottom-[72px] left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-800 p-4">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-zinc-950 font-bold rounded-2xl h-14 flex items-center justify-between px-6 transition-colors shadow-lg shadow-amber-500/20"
          >
            <span className="flex flex-col items-start">
              <span className="text-xs font-medium opacity-80">Confirmar Pedido</span>
              <span className="text-lg">R$ {finalTotal.toFixed(2)}</span>
            </span>
            <div className="flex items-center space-x-2">
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Pagar</span>
                  <ChevronRight size={20} />
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
