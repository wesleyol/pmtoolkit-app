'use client'

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, AlertCircle, Calculator } from 'lucide-react'
import type { CalculatorDefinition } from '@/lib/calculators/definitions'
import { getFeedbackLevel } from '@/lib/calculators/definitions'

interface CalculatorResultProps {
  calculator: CalculatorDefinition
  // 1. A correção na tipagem: O TypeScript agora sabe que o resultado pode começar nulo
  result: number | { primary: number; secondary?: number } | null
}

const feedbackConfig = {
  excellent: {
    icon: CheckCircle,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  good: {
    icon: Minus,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  attention: {
    icon: AlertTriangle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30'
  }
}

export function CalculatorResult({ calculator, result }: CalculatorResultProps) {
  const t = useTranslations()
  
  // 2. A Blindagem de UX (Empty State): Intercepta o 'null' antes de qualquer cálculo matemático
  if (result === null) {
    return (
      <Card className="bg-[#09090b]/50 border-2 border-dashed border-zinc-800 h-full min-h-[350px] flex items-center justify-center">
        <CardContent className="flex flex-col items-center text-center space-y-4 pt-6">
          <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-2 shadow-inner">
            <Calculator className="w-6 h-6 text-zinc-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white tracking-tight">Aguardando Parâmetros</h3>
            <p className="text-sm text-zinc-500 max-w-[260px] mt-2 leading-relaxed">
              Insira as métricas na calculadora ao lado e gere a análise para visualizar os resultados e benchmarks.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // 3. Execução Segura: Se o código chegou aqui, garantimos que 'result' NÃO é nulo
  const primaryValue = typeof result === 'number' ? result : result.primary
  const secondaryValue = typeof result === 'object' ? result.secondary : undefined
  
  const feedbackLevel = getFeedbackLevel(primaryValue, calculator.benchmarks)
  const feedback = feedbackConfig[feedbackLevel]
  const FeedbackIcon = feedback.icon

  const formatValue = (value: number, unit: string) => {
    const formatted = value.toLocaleString('pt-BR', { 
      minimumFractionDigits: unit === '%' ? 1 : 2,
      maximumFractionDigits: 2 
    })
    return `${formatted}${unit ? ` ${unit}` : ''}`
  }

  const unit = t(`calculators.${calculator.slug}.unit`)

  return (
    <Card className={`bg-zinc-950 border-2 ${feedback.borderColor} shadow-2xl`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span>{t('calculator.result')}</span>
          <Badge variant="outline" className={`${feedback.bgColor} ${feedback.color} border-0 font-bold px-3 py-1`}>
            <FeedbackIcon className="mr-1.5 h-4 w-4" />
            {t(`feedback.${feedbackLevel}`)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {/* Primary Result */}
          <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-5">
            <span className="text-sm font-medium text-zinc-400">
              {t(`calculators.${calculator.slug}.resultLabel`)}
            </span>
            <div className="flex items-center gap-2">
              {calculator.benchmarks?.direction === 'higher' ? (
                <TrendingUp className={`h-6 w-6 ${feedback.color}`} />
              ) : (
                <TrendingDown className={`h-6 w-6 ${feedback.color}`} />
              )}
              <span className={`text-3xl font-black tracking-tight ${feedback.color}`}>
                {formatValue(primaryValue, unit)}
              </span>
            </div>
          </div>

          {/* Secondary Result (if exists) */}
          {secondaryValue !== undefined && calculator.secondaryResultKey && (
            <div className="flex items-center justify-between rounded-xl bg-zinc-900 border border-zinc-800 p-5">
              <span className="text-sm font-medium text-zinc-400">
                {t(`calculators.${calculator.slug}.${calculator.secondaryResultKey}`)}
              </span>
              <span className="text-2xl font-bold text-white tracking-tight">
                {formatValue(secondaryValue, unit)}
              </span>
            </div>
          </div>
          )}
        </div>

        {/* Feedback Message */}
        <div className={`rounded-xl p-5 border ${feedback.borderColor} ${feedback.bgColor}`}>
          <div className="flex items-start gap-3">
            <FeedbackIcon className={`h-5 w-5 mt-0.5 shrink-0 ${feedback.color}`} />
            <p className="text-sm text-zinc-300 leading-relaxed">
              {t(`feedback.${feedbackLevel}Desc`)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}