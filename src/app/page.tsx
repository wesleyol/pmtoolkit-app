'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import CalculadoraROI from '@/components/CalculadoraROI';
import { Search, Filter } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'business', label: 'Negócios' },
  { id: 'growth', label: 'Crescimento' },
  { id: 'engineering', label: 'Engenharia' },
  { id: 'ux', label: 'UX / Produto' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="flex min-h-screen bg-[#0A0B0E]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-12">
        <header className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
              Toolbox de <span className="text-[#8C3AFF]">Produto</span>
            </h1>
            <p className="text-zinc-500">Selecione a ferramenta ideal para sua tomada de decisão hoje.</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#8C3AFF] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar ferramenta..." 
              className="bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-[#8C3AFF] outline-none w-full md:w-64 transition-all"
            />
          </div>
        </header>

        {/* Filtros por Tags */}
        <section className="max-w-5xl mx-auto mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter size={16} className="text-zinc-600 mr-2" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  activeTab === cat.id 
                    ? 'bg-[#8C3AFF] border-[#8C3AFF] text-white shadow-[0_0_15px_rgba(140,58,255,0.3)]' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Grid de Ferramentas / Área de Trabalho */}
        <div className="max-w-5xl mx-auto">
          {/* Lógica de exibição: Se "Negócios" ou "Todas" estiverem ativos, mostra ROI */}
          {(activeTab === 'all' || activeTab === 'business') && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-[2rem] shadow-2xl">
                 <CalculadoraROI />
              </div>
            </div>
          )}

          {/* Placeholder para futuras calculadoras */}
          {activeTab !== 'all' && activeTab !== 'business' && (
            <div className="py-20 text-center border-2 border-dashed border-zinc-800 rounded-3xl">
              <p className="text-zinc-600">Nenhuma ferramenta de {activeTab} disponível nesta sprint.</p>
              <button className="mt-4 text-xs text-[#8C3AFF] font-bold underline">Acompanhar Backlog</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}