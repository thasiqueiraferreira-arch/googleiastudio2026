import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProfilePayment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cards');

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
        <h1 className="text-2xl font-bold text-white">Formas de Pagamento</h1>
      </div>

      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab('cards')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${activeTab === 'cards' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
        >
          Cartões Salvos
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-colors ${activeTab === 'add' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
        >
          Adicionar Novo
        </button>
      </div>

      {activeTab === 'cards' ? (
        <div className="space-y-4">
          {[
            { id: 1, brand: 'Mastercard', last4: '4321', expiry: '12/28', isDefault: true },
            { id: 2, brand: 'Visa', last4: '9876', expiry: '05/26', isDefault: false },
          ].map((card) => (
            <div key={card.id} className={`p-4 rounded-2xl border ${card.isDefault ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900'} transition-colors relative`}>
              {card.isDefault && (
                <span className="absolute top-4 right-4 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg flex items-center space-x-1">
                  <CheckCircle2 size={12} />
                  <span>Principal</span>
                </span>
              )}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-8 rounded bg-zinc-800 flex items-center justify-center text-zinc-400`}>
                  <CreditCard size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{card.brand} final {card.last4}</h3>
                  <p className="text-sm text-zinc-400">Vence em {card.expiry}</p>
                </div>
                <button className="p-2 text-red-500 hover:text-red-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Número do Cartão</label>
            <input 
              type="text" 
              placeholder="0000 0000 0000 0000"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Nome no Cartão</label>
            <input 
              type="text" 
              placeholder="NOME IMPRESSO NO CARTÃO"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors uppercase"
            />
          </div>
          <div className="flex space-x-4">
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-zinc-400">Validade</label>
              <input 
                type="text" 
                placeholder="MM/AA"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div className="space-y-2 flex-1">
              <label className="text-sm font-medium text-zinc-400">CVV</label>
              <input 
                type="text" 
                placeholder="123"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Apelido do Cartão (Opcional)</label>
            <input 
              type="text" 
              placeholder="Ex: Cartão de Crédito Nubank"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
          <button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors mt-8">
            <Plus size={20} />
            <span>Adicionar Cartão</span>
          </button>
        </div>
      )}
    </motion.div>
  );
}
