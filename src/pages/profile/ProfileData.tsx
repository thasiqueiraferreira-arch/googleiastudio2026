import { motion } from 'motion/react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileData() {
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
        <h1 className="text-2xl font-bold text-white">Meus Dados</h1>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Nome Completo</label>
          <input 
            type="text" 
            defaultValue="Thiago Siqueira Ferreira"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">E-mail</label>
          <input 
            type="email" 
            defaultValue="thasiqueiraferreira@gmail.com"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Telefone</label>
          <input 
            type="tel" 
            defaultValue="(11) 98765-4321"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">Data de Cadastro</label>
          <input 
            type="text" 
            defaultValue="15 de Janeiro de 2024"
            disabled
            className="w-full bg-zinc-950 border border-zinc-900 rounded-xl p-4 text-zinc-500 cursor-not-allowed"
          />
        </div>
      </div>

      <button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors mt-8">
        <Save size={20} />
        <span>Salvar Alterações</span>
      </button>
    </motion.div>
  );
}
