import React from 'react';
import { Globe, LayoutDashboard } from 'lucide-react';
import CalculadoraROI from '@/components/CalculadoraROI';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5]">
      {/* Nav Simplificada */}
      <nav className="border-b border-zinc-800 p-4 bg-[#09090b]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-bold">PM</div>
            <span className="text-xl font-bold tracking-tighter">PMToolkit<span className="text-purple-500">.app</span></span>
          </div>
          <div className="flex gap-4 items-center text-sm">
            <button className="text-purple-500 font-bold underline underline-offset-4">PT</button>
            <button className="text-zinc-500 hover:text-zinc-300">EN</button>
            <button className="text-zinc-500 hover:text-zinc-300">ES</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 md:p-12 space-y-20">
        {/* Intro Section */}
        <section className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Calculadora de ROI
          </h1>
          <p className="text-zinc-400 max-w-xl text-lg">
            Valide o retorno financeiro dos seus projetos com embasamento científico e benchmarks de mercado.
          </p>
        </section>

        {/* Componente Isolado da Calculadora */}
        <section className="bg-zinc-950 border border-zinc-800 p-4 md:p-8 rounded-3xl shadow-2xl">
          <CalculadoraROI />
        </section>

        {/* Seção Sobre o Projeto (O seu Roadmap/Idealizador) */}
        <section className="grid md:grid-cols-2 gap-12 py-20 border-t border-zinc-800">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">O Projeto PMToolkit</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Idealizado para elevar o nível de tomada de decisão estratégica em tecnologia. O toolkit utiliza princípios de Engenharia de Software para transformar dados brutos em decisões acionáveis.
            </p>
            <div className="flex gap-3">
              <span className="bg-zinc-800 px-3 py-1 rounded-full text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Discovery</span>
              <span className="bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Delivery</span>
            </div>
          </div>
          <div className="bg-zinc-900/30 p-6 rounded-2xl border border-dashed border-zinc-700 flex flex-col justify-center items-center text-center">
            <LayoutDashboard className="text-purple-500 mb-2" />
            <h4 className="font-bold">Roadmap Público</h4>
            <p className="text-xs text-zinc-500">Acompanhe o desenvolvimento do backlog e as próximas ferramentas.</p>
          </div>
        </section>
      </main>
    </div>
  );
}