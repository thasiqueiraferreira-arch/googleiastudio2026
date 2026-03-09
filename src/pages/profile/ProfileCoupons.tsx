import { motion } from 'motion/react';
import { ArrowLeft, Ticket, Copy, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProfileCoupons() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="pb-24 pt-4 px-4 space-y-6"
    >
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-white">Cupons de Desconto</h1>
      </div>

      <div className="space-y-4">
        {[
          {
            id: 1,
            title: '15% OFF na Primeira Compra',
            code: 'BEMVINDO15',
            description: 'Válido para pedidos acima de R$ 50,00.',
            expiry: 'Válido até 31/12/2024',
            isAvailable: true
          },
          {
            id: 2,
            title: 'Frete Grátis',
            code: 'FRETEFREE',
            description: 'Válido para pedidos acima de R$ 100,00.',
            expiry: 'Válido até 15/05/2024',
            isAvailable: true
          },
          {
            id: 3,
            title: 'R$ 10 OFF',
            code: 'SOPA10',
            description: 'Válido para pedidos acima de R$ 60,00.',
            expiry: 'Expirado em 01/01/2024',
            isAvailable: false
          }
        ].map((coupon) => (
          <div key={coupon.id} className={`p-4 rounded-2xl border ${coupon.isAvailable ? 'border-amber-500/50 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50 opacity-50'} transition-colors relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
            <div className="flex items-start space-x-4 pl-2">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${coupon.isAvailable ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}>
                <Ticket size={24} />
              </div>
              <div className="flex-1 pr-4">
                <h3 className={`font-bold ${coupon.isAvailable ? 'text-white' : 'text-zinc-400'} mb-1`}>{coupon.title}</h3>
                <p className="text-sm text-zinc-400 mb-2">{coupon.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                    <span className={`font-mono font-bold ${coupon.isAvailable ? 'text-amber-500' : 'text-zinc-500'}`}>{coupon.code}</span>
                    {coupon.isAvailable && (
                      <button 
                        onClick={() => handleCopy(coupon.id, coupon.code)}
                        className="text-zinc-400 hover:text-white transition-colors ml-2"
                      >
                        {copiedId === coupon.id ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                      </button>
                    )}
                  </div>
                  <span className="text-xs text-zinc-500">{coupon.expiry}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
