'use client';

import React, { useState, useRef } from 'react';
import { 
  Download, 
  Info, 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { toPng } from 'html-to-image';

export default function CalculadoraROI() {
  const [custo, setCusto] = useState<number>(10000);
  const [ganho, setGanho] = useState<number>(25000);
  const exportRef = useRef<HTMLDivElement>(null);

  const roi = ((ganho - custo) / custo) * 100;
  const lucro = ganho - custo;

  const data = [
    { name: 'Custo', valor: custo },
    { name: 'Ganho Total', valor: ganho },
    { name: 'Lucro Líquido', valor: lucro },
  ];

  const exportImage = async () => {
    if (exportRef.current === null) return;
    const dataUrl = await toPng(exportRef.current, { cacheBust: true, pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = 'pmtoolkit-roi-analysis.png';
    link.href = dataUrl;
    link.click();
  };

  const getFeedback = () => {
    if (roi < 0) return {
      msg: "ROI Negativo: O investimento excede o retorno. Segundo Pressman, a viabilidade econômica deve ser reavaliada precocemente no ciclo de vida.",
      color: "text-red-400",
      icon: <AlertCircle className="w-5 h-5" />
    };
    if (roi > 0 && roi < 100) return {
      msg: "ROI Moderado: Comum em fases de aquisição. Benchmarks de SaaS sugerem que a eficiência deve ser buscada via redução de CAC.",
      color: "text-yellow-400",
      icon: <Info className="w-5 h-5" />
    };
    return {
      msg: "ROI Excelente: Acima da média de mercado para projetos de tecnologia. Ian Sommerville destaca que este nível permite reinvestimento em qualidade de software.",
      color: "text-green-400",
      icon: <CheckCircle2 className="w-5 h-5" />
    };
  };

  const feedback = getFeedback();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Container Principal de Inputs e Gráfico */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Coluna de Inputs */}
        <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-purple-500 w-5 h-5" />
            <h2 className="text-xl font-bold">Parâmetros do Investimento</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Custo Total do Projeto (R$)</label>
              <input 
                type="number" 
                value={custo}
                onChange={(e) => setCusto(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-purple-100 focus:border-purple-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Retorno Esperado / Ganho (R$)</label>
              <input 
                type="number" 
                value={ganho}
                onChange={(e) => setGanho(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-purple-100 focus:border-purple-500 outline-none transition"
              />
            </div>
          </div>

          <div className={`p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3 ${feedback.color}`}>
            {feedback.icon}
            <p className="text-xs leading-relaxed">{feedback.msg}</p>
          </div>
        </div>

        {/* Coluna do Gráfico Exportável */}
        <div className="space-y-4">
          <div ref={exportRef} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-[350px]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Resultado da Análise</h3>
                <p className="text-3xl font-black text-white">{roi.toFixed(2)}% <span className="text-sm font-normal text-zinc-400">ROI</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">Lucro Líquido</p>
                <p className="text-lg font-bold text-purple-400">R$ {lucro.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px' }}
                    itemStyle={{ color: '#a78bfa' }}
                  />
                  <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 2 ? '#9333ea' : '#3f3f46'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button 
            onClick={exportImage}
            className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl transition font-medium"
          >
            <Download className="w-4 h-4" /> Download Gráfico em Alta Resolução
          </button>
        </div>
      </div>

      {/* Seção de Referências e Contexto */}
      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <BookOpen className="w-5 h-5" />
            <h4 className="font-bold">Fundamentação Teórica</h4>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed italic">
            "A análise de ROI em Engenharia de Software deve considerar não apenas o retorno financeiro imediato, mas o custo de oportunidade e a redução de débitos técnicos." 
            <br />— Baseado em Sommerville, Software Engineering (10th Edition).
          </p>
          <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg text-xs text-zinc-500">
            <strong>Referência:</strong> PRESSMAN, R. S. Software Engineering: A Practitioner's Approach. McGraw-Hill.
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Info className="w-5 h-5" />
            <h4 className="font-bold">Como interpretar?</h4>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            O ROI mede a eficiência de um investimento. No contexto de produtos digitais, um ROI positivo sustenta a tese de escalabilidade. Se o seu ROI está abaixo dos 40%, considere otimizar o processo de <strong>Discovery</strong> para reduzir desperdício de desenvolvimento.
          </p>
        </div>
      </div>
    </div>
  );
}