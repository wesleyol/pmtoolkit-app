'use client';
import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Settings, 
  ChevronRight,
  BookOpen
} from 'lucide-react';

const menuItems = [
  { icon: <TrendingUp size={20} />, label: 'Negócios', category: 'business' },
  { icon: <Zap size={20} />, label: 'Crescimento', category: 'growth' },
  { icon: <BarChart3 size={20} />, label: 'Engenharia', category: 'engineering' },
  { icon: <LayoutDashboard size={20} />, label: 'UX / Produto', category: 'ux' },
  { icon: <BookOpen size={20} />, label: 'Documentação', category: 'docs' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0A0B0E] border-r border-zinc-800 h-screen sticky top-0 hidden md:flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 border-2 border-[#8C3AFF] rounded flex items-center justify-center font-bold text-[#8C3AFF]">PM</div>
        <span className="text-xl font-bold tracking-tighter text-white">PMToolkit</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button 
            key={item.label}
            className="w-full flex items-center justify-between p-3 rounded-lg text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-zinc-800">
        <button className="flex items-center gap-3 p-3 text-zinc-500 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="text-sm font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}