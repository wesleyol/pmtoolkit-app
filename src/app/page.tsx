import React from 'react';
import { Calculator, BarChart3, Globe, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] font-sans">
      {/* Header / Nav */}
      <nav className="border-b border-zinc-800 p-4 flex justify-between items-center bg-[#09090b]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">PM</div>
          <span className="text-xl font-bold tracking-tight">PMToolkit<span className="text-purple-500">.app</span></span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="text-sm hover:text-purple-400 transition">PT</button>
          <button className="text-sm text-zinc-500">EN</button>
          <button className="text-sm text-zinc-500">ES</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        {/* Hero Section para SEO */}
        <section className="py-16 text-center">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Métricas de Produto com Rigor Científico.
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
            Decisões baseadas em dados, fundamentadas por autores como Sommerville e Pressman. Calcule ROI, Churn e LTV com benchmarks de mercado.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-medium transition shadow-lg shadow-purple-500/20">
              Ver Calculadoras
            </button>
            <button className="border border-zinc-700 hover:bg-zinc-800 px-6 py-3 rounded-md font-medium transition">
              Nosso Roadmap
            </button>
          </div>
        </section>

        {/* Grid de Ferramentas */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-purple-500/50 transition cursor-pointer group">
            <Calculator className="text-purple-500 mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-bold mb-2">Calculadora de ROI</h3>
            <p className="text-zinc-400 text-sm">Analise o retorno sobre investimento com feedbacks baseados em benchmarks de mercado.</p>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl opacity-60">
            <BarChart3 className="text-zinc-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-zinc-300">Churn Rate (Breve)</h3>
            <p className="text-zinc-400 text-sm">Em fase de Discovery. Acompanhe o roadmap para lançamento.</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl opacity-60">
            <LayoutDashboard className="text-zinc-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-zinc-300">PRD Generator</h3>
            <p className="text-zinc-400 text-sm">Geração de artefatos de produto otimizados para engenharia.</p>
          </div>
        </div>
      </main>

      {/* Footer / Meta */}
      <footer className="mt-20 border-t border-zinc-800 p-10 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4">O Projeto</h4>
            <ul className="text-sm text-zinc-500 space-y-2">
              <li className="hover:text-purple-400 cursor-pointer">Roadmap de Produto</li>
              <li className="hover:text-purple-400 cursor-pointer">Discovery & Canvas</li>
              <li className="hover:text-purple-400 cursor-pointer">Idealizador</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Metodologia</h4>
            <p className="text-xs text-zinc-500 leading-relaxed italic">
              "Software engineering is not just about producing software, but about producing software in a cost-effective and efficient way." — Ian Sommerville
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}