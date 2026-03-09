import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, MapPin, ChevronRight } from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-6 text-center py-12"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle2 size={48} className="text-emerald-500" />
      </motion.div>
      
      <h2 className="text-3xl font-bold text-white mb-2">Pedido Confirmado!</h2>
      <p className="text-zinc-400 mb-8 max-w-xs">
        Seu pedido foi recebido e já está sendo preparado pela nossa equipe.
      </p>

      <div className="w-full bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4 mb-8 text-left">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="text-zinc-400">Número do Pedido</span>
          <span className="text-white font-bold text-lg">#{id}</span>
        </div>
        
        <div className="flex items-center space-x-3 pt-2">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
            <Clock size={20} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Tempo Estimado</p>
            <p className="text-white font-bold">30 - 45 minutos</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <MapPin size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-zinc-400">Endereço de Entrega</p>
            <p className="text-white font-bold text-sm">Av. Paulista, 1000 - Bela Vista</p>
          </div>
        </div>
      </div>

      <button 
        onClick={() => navigate(`/order-tracking/${id}`)}
        className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-2xl h-14 flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-amber-500/20"
      >
        <span>Acompanhar Pedido</span>
        <ChevronRight size={20} />
      </button>
      
      <button 
        onClick={() => navigate('/')}
        className="w-full mt-4 text-zinc-400 hover:text-white font-medium py-3 transition-colors"
      >
        Voltar ao Início
      </button>
    </motion.div>
  );
}
