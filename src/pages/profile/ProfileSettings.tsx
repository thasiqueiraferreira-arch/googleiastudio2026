import { motion } from 'motion/react';
import { ArrowLeft, Settings, Bell, Lock, Eye, EyeOff, Save, Moon, Sun, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProfileSettings() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailOffersEnabled, setEmailOffersEnabled] = useState(false);
  const [theme, setTheme] = useState('dark');

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
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
      </div>

      <div className="space-y-8">
        {/* Preferências de Sopa */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Settings size={20} className="text-amber-500" />
            <span>Meus Gostos</span>
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Restrições Alimentares</label>
              <div className="flex flex-wrap gap-2">
                {['Sem Glúten', 'Sem Lactose', 'Vegetariano', 'Vegano', 'Sem Cebola', 'Sem Alho'].map((item) => (
                  <button key={item} className="px-3 py-1.5 rounded-full border border-zinc-700 text-sm text-zinc-300 hover:border-amber-500 hover:text-amber-500 transition-colors focus:bg-amber-500/10 focus:border-amber-500 focus:text-amber-500">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Ingredientes Favoritos</label>
              <input 
                type="text" 
                placeholder="Ex: Abóbora, Gengibre, Carne, Queijo..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notificações */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Bell size={20} className="text-amber-500" />
            <span>Notificações</span>
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Notificações Push</h3>
                <p className="text-sm text-zinc-400">Receba alertas sobre seus pedidos e promoções.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
            <div className="h-px bg-zinc-800/50 w-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">Ofertas por E-mail</h3>
                <p className="text-sm text-zinc-400">Receba novidades e cupons exclusivos no seu e-mail.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={emailOffersEnabled}
                  onChange={() => setEmailOffersEnabled(!emailOffersEnabled)}
                />
                <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Tema */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Monitor size={20} className="text-amber-500" />
            <span>Tema do Aplicativo</span>
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-colors ${theme === 'light' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}
            >
              <Sun size={24} />
              <span className="text-sm font-medium">Claro</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-colors ${theme === 'dark' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}
            >
              <Moon size={24} />
              <span className="text-sm font-medium">Escuro</span>
            </button>
            <button 
              onClick={() => setTheme('system')}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center space-y-2 transition-colors ${theme === 'system' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'}`}
            >
              <Monitor size={24} />
              <span className="text-sm font-medium">Sistema</span>
            </button>
          </div>
        </div>

        {/* Segurança */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <Lock size={20} className="text-amber-500" />
            <span>Segurança</span>
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
            <button className="w-full flex items-center justify-between py-2 text-left hover:bg-zinc-800/50 rounded-lg px-2 -mx-2 transition-colors">
              <div>
                <h3 className="font-medium text-white">Alterar Senha</h3>
                <p className="text-sm text-zinc-400">Atualize sua senha de acesso.</p>
              </div>
              <ArrowLeft size={20} className="text-zinc-500 rotate-180" />
            </button>
            <div className="h-px bg-zinc-800/50 w-full"></div>
            <button className="w-full flex items-center justify-between py-2 text-left hover:bg-zinc-800/50 rounded-lg px-2 -mx-2 transition-colors">
              <div>
                <h3 className="font-medium text-white">Excluir Conta</h3>
                <p className="text-sm text-red-500">Ação irreversível.</p>
              </div>
              <ArrowLeft size={20} className="text-zinc-500 rotate-180" />
            </button>
          </div>
        </div>
      </div>

      <button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-colors mt-8">
        <Save size={20} />
        <span>Salvar Configurações</span>
      </button>
    </motion.div>
  );
}
