import { motion } from 'motion/react';
import { ArrowLeft, Bell, Gift, Info, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileNotifications() {
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
        <h1 className="text-2xl font-bold text-white">Notificações</h1>
      </div>

      <div className="space-y-4">
        {[
          {
            id: 1,
            title: 'Seu pedido foi entregue!',
            description: 'Aproveite sua sopa quentinha. Não esqueça de avaliar seu pedido.',
            time: 'Há 2 horas',
            icon: CheckCircle2,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            unread: true
          },
          {
            id: 2,
            title: 'Novo cupom de desconto!',
            description: 'Você ganhou 15% de desconto na sua próxima compra com o cupom SOPA15.',
            time: 'Ontem',
            icon: Gift,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            unread: false
          },
          {
            id: 3,
            title: 'Novidade no cardápio',
            description: 'Experimente a nova Sopa de Abóbora com Gengibre e Leite de Coco.',
            time: 'Há 3 dias',
            icon: Info,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            unread: false
          }
        ].map((notification) => (
          <div key={notification.id} className={`p-4 rounded-2xl border ${notification.unread ? 'border-amber-500/50 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'} transition-colors relative`}>
            {notification.unread && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-amber-500"></span>
            )}
            <div className="flex items-start space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notification.bg} ${notification.color}`}>
                <notification.icon size={20} />
              </div>
              <div className="flex-1 pr-6">
                <h3 className={`font-bold ${notification.unread ? 'text-white' : 'text-zinc-300'} mb-1`}>{notification.title}</h3>
                <p className="text-sm text-zinc-400 mb-2">{notification.description}</p>
                <p className="text-xs text-zinc-500">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
