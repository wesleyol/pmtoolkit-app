'use client'

import { useTranslations } from 'next-intl'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react'
import type { CalculatorDefinition } from '@/lib/calculators/definitions'
import { getFeedbackLevel } from '@/lib/calculators/definitions'

interface CalculatorResultProps {
  calculator: CalculatorDefinition
  result: number | { primary: number; secondary?: number }
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
    <Card className={`bg-card border-2 ${feedback.borderColor}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span>{t('calculator.result')}</span>
          <Badge variant="outline" className={`${feedback.bgColor} ${feedback.color} border-0`}>
            <FeedbackIcon className="mr-1 h-3 w-3" />
            {t(`feedback.${feedbackLevel}`)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Primary Result */}
          <div className="flex items-center justify-between rounded-lg bg-background p-4">
            <span className="text-sm text-muted-foreground">
              {t(`calculators.${calculator.slug}.resultLabel`)}
            </span>
            <div className="flex items-center gap-2">
              {calculator.benchmarks?.direction === 'higher' ? (
                <TrendingUp className={`h-5 w-5 ${feedback.color}`} />
              ) : (
                <TrendingDown className={`h-5 w-5 ${feedback.color}`} />
              )}
              <span className={`text-2xl font-bold ${feedback.color}`}>
                {formatValue(primaryValue, unit)}
              </span>
            </div>
          </div>

          {/* Secondary Result (if exists) */}
          {secondaryValue !== undefined && calculator.secondaryResultKey && (
            <div className="flex items-center justify-between rounded-lg bg-background p-4">
              <span className="text-sm text-muted-foreground">
                {t(`calculators.${calculator.slug}.${calculator.secondaryResultKey}`)}
              </span>
              <span className="text-xl font-semibold text-foreground">
                {formatValue(secondaryValue, unit)}
              </span>
            </div>
          )}
        </div>

        {/* Feedback Message */}
        <div className={`rounded-lg p-4 ${feedback.bgColor}`}>
          <div className="flex items-start gap-3">
            <FeedbackIcon className={`h-5 w-5 mt-0.5 ${feedback.color}`} />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`feedback.${feedbackLevel}Desc`)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
