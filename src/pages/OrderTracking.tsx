import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Clock, MapPin, Package, MessageCircle, Phone, Star } from 'lucide-react';

export default function OrderTracking() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate order progress
  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 5000);
    const timer2 = setTimeout(() => setCurrentStep(3), 15000);
    const timer3 = setTimeout(() => setCurrentStep(4), 25000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    { id: 1, title: 'Pedido Recebido', description: 'Aguardando confirmação do restaurante', icon: Clock },
    { id: 2, title: 'Em Preparo', description: 'Sua sopa está sendo preparada com carinho', icon: Package },
    { id: 3, title: 'Saiu para Entrega', description: 'O entregador está a caminho', icon: MapPin },
    { id: 4, title: 'Entregue', description: 'Bom apetite!', icon: CheckCircle2 },
  ];

  const handleWhatsApp = () => {
    // Replace with actual WhatsApp API link
    window.open(`https://wa.me/5511999999999?text=Olá, gostaria de saber sobre o meu pedido #${id}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 bg-zinc-950 min-h-screen"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate('/orders')}
          className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white border border-zinc-800"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold text-white">Acompanhar Pedido</h1>
        <div className="w-10 h-10"></div> {/* Spacer */}
      </div>

      <div className="p-6 space-y-8">
        {/* Map Placeholder */}
        <div className="w-full h-48 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden relative">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" 
            alt="Map" 
            className="w-full h-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-400">Previsão de Entrega</p>
              <p className="text-xl font-bold text-amber-500">20:45</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-400">Pedido</p>
              <p className="text-lg font-bold text-white">#{id}</p>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
          <h3 className="text-lg font-bold text-white mb-6">Status do Pedido</h3>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-zinc-800">
            {steps.map((step) => {
              const isCompleted = currentStep >= step.id;
              const isCurrent = currentStep === step.id;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className="relative flex items-start space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-zinc-900 shrink-0 z-10 transition-colors duration-500 ${
                    isCompleted ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'
                  }`}>
                    <Icon size={16} />
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <h4 className={`font-bold text-base transition-colors duration-500 ${
                      isCompleted ? 'text-white' : 'text-zinc-500'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs mt-1 transition-colors duration-500 ${
                      isCurrent ? 'text-amber-500' : 'text-zinc-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courier Info (Mock) */}
        {currentStep >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Courier" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Carlos Silva</p>
                <div className="flex items-center space-x-1 text-xs text-zinc-400">
                  <Star size={12} className="text-amber-500 fill-amber-500" />
                  <span>4.9 (Honda CG 160)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <Phone size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Support Action */}
        <button 
          onClick={handleWhatsApp}
          className="w-full flex items-center justify-center space-x-2 p-4 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 font-medium rounded-2xl transition-colors border border-emerald-500/20"
        >
          <MessageCircle size={20} />
          <span>Falar no WhatsApp</span>
        </button>
      </div>
    </motion.div>
  );
}
