import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, Package, MapPin, ChevronRight, Receipt } from 'lucide-react';

interface Order {
  id: number;
  status: string;
  total: number;
  created_at: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] px-6 text-center">
        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
          <Receipt size={32} className="text-zinc-500" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Nenhum pedido ainda</h2>
        <p className="text-zinc-400">Quando você fizer seu primeiro pedido, ele aparecerá aqui.</p>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Preparando' };
      case 'delivering':
        return { icon: Package, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'A Caminho' };
      case 'completed':
        return { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Entregue' };
      default:
        return { icon: Clock, color: 'text-zinc-500', bg: 'bg-zinc-500/10', label: status };
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-24 pt-4 px-4 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white mb-6">Meus Pedidos</h1>

      <div className="space-y-4">
        {orders.map(order => {
          const status = getStatusConfig(order.status);
          const StatusIcon = status.icon;
          const date = new Date(order.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
          });

          return (
            <div key={order.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status.bg}`}>
                    <StatusIcon size={20} className={status.color} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Pedido #{order.id}</h3>
                    <p className="text-xs text-zinc-400">{date}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${status.bg} ${status.color}`}>
                  {status.label}
                </span>
              </div>

              <div className="h-px bg-zinc-800 my-4"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <MapPin size={16} />
                  <span>Sopa Premium - Paulista</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">R$ {order.total.toFixed(2)}</span>
                  <ChevronRight size={16} className="text-zinc-500" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
