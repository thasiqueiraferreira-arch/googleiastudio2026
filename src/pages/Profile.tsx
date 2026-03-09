import { motion } from 'motion/react';
import { User, Settings, CreditCard, MapPin, Bell, HelpCircle, LogOut, Award, ChevronRight, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-24 pt-4 px-4 space-y-6"
    >
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 font-bold text-2xl shadow-lg shadow-amber-500/20">
          T
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Thiago</h1>
          <p className="text-zinc-400 text-sm">thiago@example.com</p>
        </div>
      </div>

      {/* Loyalty Card */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg shadow-amber-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold text-lg flex items-center space-x-2">
              <Award size={20} />
              <span>Sopa Premium Club</span>
            </h2>
            <span className="bg-white/20 px-2 py-1 rounded-lg text-xs font-bold text-white backdrop-blur-sm">
              Nível Ouro
            </span>
          </div>
          <div className="flex items-end space-x-2 mb-2">
            <span className="text-4xl font-bold text-white">1.250</span>
            <span className="text-white/80 text-sm pb-1">pontos</span>
          </div>
          <p className="text-white/80 text-sm">Faltam 250 pontos para o Nível Diamante</p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2">
        {[
          { icon: User, label: 'Meus Dados', path: '/profile/data' },
          { icon: MapPin, label: 'Endereços', path: '/profile/addresses' },
          { icon: CreditCard, label: 'Formas de Pagamento', path: '/profile/payment' },
          { icon: Bell, label: 'Notificações', path: '/profile/notifications' },
          { icon: Ticket, label: 'Cupons de Desconto', path: '/profile/coupons' },
          { icon: HelpCircle, label: 'Ajuda e Suporte', path: '/profile/support' },
          { icon: Settings, label: 'Configurações', path: '/profile/settings' },
        ].map((item, index) => (
          <button 
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full flex items-center justify-between p-4 bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-zinc-400">
                <item.icon size={20} />
              </div>
              <span className="font-medium text-white">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-zinc-500" />
          </button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center space-x-2 p-4 text-red-500 font-medium hover:bg-red-500/10 rounded-2xl transition-colors">
        <LogOut size={20} />
        <span>Sair da conta</span>
      </button>
    </motion.div>
  );
}
