import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileAddresses() {
  const navigate = useNavigate();

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
        <h1 className="text-2xl font-bold text-white">Endereços</h1>
      </div>

      <div className="space-y-4">
        {[
          {
            id: 1,
            title: 'Casa',
            street: 'Rua das Flores, 123',
            complement: 'Apto 45, Bloco B',
            neighborhood: 'Jardim Primavera',
            city: 'São Paulo - SP',
            zip: '01234-567',
            isDefault: true
          },
          {
            id: 2,
            title: 'Trabalho',
            street: 'Av. Paulista, 1000',
            complement: 'Conjunto 102',
            neighborhood: 'Bela Vista',
            city: 'São Paulo - SP',
            zip: '01310-100',
            isDefault: false
          }
        ].map((address) => (
          <div key={address.id} className={`p-4 rounded-2xl border ${address.isDefault ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900'} transition-colors relative`}>
            {address.isDefault && (
              <span className="absolute top-4 right-4 text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg">
                Principal
              </span>
            )}
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${address.isDefault ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
                <MapPin size={20} />
              </div>
              <div className="flex-1 pr-16">
                <h3 className="font-bold text-white mb-1">{address.title}</h3>
                <p className="text-sm text-zinc-400">{address.street}</p>
                <p className="text-sm text-zinc-400">{address.complement}</p>
                <p className="text-sm text-zinc-400">{address.neighborhood}</p>
                <p className="text-sm text-zinc-400">{address.city} • {address.zip}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-zinc-800/50">
              <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                <Edit2 size={18} />
              </button>
              <button className="p-2 text-red-500 hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full bg-zinc-900 border border-dashed border-zinc-700 hover:border-amber-500 text-zinc-400 hover:text-amber-500 font-medium py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors mt-8">
        <Plus size={20} />
        <span>Adicionar Novo Endereço</span>
      </button>
    </motion.div>
  );
}
