import { motion } from 'motion/react';
import { ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProfileSupport() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'Como faço para rastrear meu pedido?',
      answer: 'Você pode rastrear seu pedido na aba "Pedidos" no menu inferior. Lá você encontrará o status atualizado em tempo real.'
    },
    {
      id: 2,
      question: 'Quais são as formas de pagamento aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo), cartões de débito, PIX e vale-refeição (Alelo, Ticket, Sodexo).'
    },
    {
      id: 3,
      question: 'Posso alterar meu endereço de entrega?',
      answer: 'Sim, você pode adicionar ou alterar seus endereços na seção "Endereços" do seu perfil. Certifique-se de selecionar o endereço correto antes de finalizar o pedido.'
    },
    {
      id: 4,
      question: 'O que faço se meu pedido vier errado?',
      answer: 'Pedimos desculpas pelo inconveniente. Entre em contato conosco imediatamente através do chat de suporte ou pelo telefone para que possamos resolver o problema o mais rápido possível.'
    }
  ];

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
        <h1 className="text-2xl font-bold text-white">Ajuda e Suporte</h1>
      </div>

      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Canais de Atendimento</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-amber-500 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <MessageCircle size={24} />
            </div>
            <span className="font-medium text-white">Chat Online</span>
          </button>
          <button className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-amber-500 transition-colors">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Phone size={24} />
            </div>
            <span className="font-medium text-white">Telefone</span>
          </button>
          <button className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col items-center justify-center space-y-2 hover:border-amber-500 transition-colors col-span-2">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Mail size={24} />
            </div>
            <span className="font-medium text-white">suporte@sopapremium.com.br</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white mb-4">Dúvidas Frequentes</h2>
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-colors">
            <button 
              onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
            >
              <span className="font-medium text-white">{faq.question}</span>
              {openFaq === faq.id ? <ChevronUp size={20} className="text-amber-500" /> : <ChevronDown size={20} className="text-zinc-500" />}
            </button>
            {openFaq === faq.id && (
              <div className="p-4 pt-0 text-zinc-400 text-sm border-t border-zinc-800/50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
