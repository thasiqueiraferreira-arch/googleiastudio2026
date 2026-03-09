import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Users, ShoppingBag, Store, Settings, TrendingUp, DollarSign, Package } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalOrders: 156,
    revenue: 12450.50,
    activeUsers: 89,
    stores: 2
  });

  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'orders', icon: ShoppingBag, label: 'Pedidos' },
    { id: 'stores', icon: Store, label: 'Lojas' },
    { id: 'users', icon: Users, label: 'Usuários' },
    { id: 'settings', icon: Settings, label: 'Configurações' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pb-24 pt-4 px-4 space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-zinc-950 font-bold">
          A
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-amber-500 text-zinc-950' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dashboard Content */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-3">
                <DollarSign size={20} />
              </div>
              <p className="text-zinc-400 text-xs font-medium mb-1">Faturamento</p>
              <h3 className="text-xl font-bold text-white">R$ {stats.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
              <div className="flex items-center space-x-1 text-emerald-500 text-xs mt-2">
                <TrendingUp size={12} />
                <span>+12.5%</span>
              </div>
            </div>
            
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                <ShoppingBag size={20} />
              </div>
              <p className="text-zinc-400 text-xs font-medium mb-1">Pedidos</p>
              <h3 className="text-xl font-bold text-white">{stats.totalOrders}</h3>
              <div className="flex items-center space-x-1 text-emerald-500 text-xs mt-2">
                <TrendingUp size={12} />
                <span>+8.2%</span>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3">
                <Users size={20} />
              </div>
              <p className="text-zinc-400 text-xs font-medium mb-1">Clientes Ativos</p>
              <h3 className="text-xl font-bold text-white">{stats.activeUsers}</h3>
              <div className="flex items-center space-x-1 text-emerald-500 text-xs mt-2">
                <TrendingUp size={12} />
                <span>+5.1%</span>
              </div>
            </div>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
                <Store size={20} />
              </div>
              <p className="text-zinc-400 text-xs font-medium mb-1">Lojas Ativas</p>
              <h3 className="text-xl font-bold text-white">{stats.stores}</h3>
              <div className="flex items-center space-x-1 text-zinc-500 text-xs mt-2">
                <span>Estável</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
            <h3 className="font-bold text-white mb-4 flex items-center space-x-2">
              <Package size={18} className="text-amber-500" />
              <span>Últimos Pedidos</span>
            </h3>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 font-bold text-sm">
                      #{1000 + i}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">João Silva</p>
                      <p className="text-xs text-zinc-500">Há {i * 15} min</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-500">R$ 85,90</p>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-amber-500/10 text-amber-500">
                      Preparando
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Ver todos os pedidos
            </button>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'dashboard' && (
        <div className="flex flex-col items-center justify-center h-64 bg-zinc-900 rounded-2xl border border-zinc-800 text-center p-6">
          <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
            {tabs.find(t => t.id === activeTab)?.icon({ size: 32 })}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Módulo em Desenvolvimento</h3>
          <p className="text-zinc-400 text-sm">Esta funcionalidade estará disponível na próxima atualização do sistema.</p>
        </div>
      )}
    </motion.div>
  );
}
