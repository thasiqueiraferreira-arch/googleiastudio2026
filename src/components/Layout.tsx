import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, Receipt, User, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export default function Layout() {
  const location = useLocation();
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/orders', icon: Receipt, label: 'Pedidos' },
    { path: '/cart', icon: ShoppingBag, label: 'Carrinho', badge: totalItems },
    { path: '/profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-20">
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight text-amber-500">
            SOPA PREMIUM
          </Link>
          <Link to="/admin" className="text-zinc-400 hover:text-amber-500 transition-colors">
            <ShieldCheck size={20} />
          </Link>
        </div>
      </header>

      <main className="max-w-md mx-auto min-h-[calc(100vh-8rem)]">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-800 pb-safe">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center w-16 h-full transition-colors ${
                  isActive ? 'text-amber-500' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="relative">
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {item.badge ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-amber-500 text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {item.badge}
                    </motion.div>
                  ) : null}
                </div>
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-[1px] left-2 right-2 h-[2px] bg-amber-500 rounded-b-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
