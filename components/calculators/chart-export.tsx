'use client'

import { useRef, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { toPng } from 'html-to-image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { Download, BarChart3 } from 'lucide-react'
import type { CalculatorDefinition } from '@/lib/calculators/definitions'
import { getFeedbackLevel } from '@/lib/calculators/definitions'

interface ChartExportProps {
  calculator: CalculatorDefinition
  result: number | { primary: number; secondary?: number }
  values: Record<string, number>
}

const COLORS = ['#8C3AFF', '#a855f7', '#c084fc', '#6F6288']

export function ChartExport({ calculator, result, values }: ChartExportProps) {
  const t = useTranslations()
  const chartRef = useRef<HTMLDivElement>(null)

  const primaryValue = typeof result === 'number' ? result : result.primary
  const feedbackLevel = getFeedbackLevel(primaryValue, calculator.benchmarks)

  const handleDownload = useCallback(async () => {
    if (!chartRef.current) return

    try {
      const dataUrl = await toPng(chartRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0A0B0E'
      })
      
      const link = document.createElement('a')
      link.download = `pmtoolkit-${calculator.slug}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    }
  }, [calculator.slug])

  // Prepare chart data based on calculator type
  const getChartData = () => {
    const unit = t(`calculators.${calculator.slug}.unit`)
    
    // For calculators with multiple inputs, show comparison
    if (calculator.slug === 'nps') {
      return {
        type: 'pie',
        data: [
          { name: t(`calculators.${calculator.slug}.promoters`), value: values.promoters || 0 },
          { name: t(`calculators.${calculator.slug}.passives`), value: values.passives || 0 },
          { name: t(`calculators.${calculator.slug}.detractors`), value: values.detractors || 0 }
        ]
      }
    }

    if (calculator.slug === 'churnRate') {
      const retained = (values.startCustomers || 0) - (values.lostCustomers || 0)
      return {
        type: 'pie',
        data: [
          { name: t(`calculators.${calculator.slug}.retentionLabel`), value: retained },
          { name: t(`calculators.${calculator.slug}.resultLabel`), value: values.lostCustomers || 0 }
        ]
      }
    }

    if (calculator.slug === 'mrr') {
      const mrr = typeof result === 'object' ? result.primary : 0
      const arr = typeof result === 'object' && result.secondary ? result.secondary : 0
      return {
        type: 'bar',
        data: [
          { name: 'MRR', value: mrr },
          { name: 'ARR', value: arr }
        ]
      }
    }

    // Default: show result with benchmark comparison
    const benchmarks = calculator.benchmarks
    if (benchmarks) {
      return {
        type: 'bar',
        data: [
          { name: t('feedback.attention'), value: benchmarks.direction === 'higher' ? 0 : benchmarks.good },
          { name: t('feedback.good'), value: benchmarks.good },
          { name: t('feedback.excellent'), value: benchmarks.excellent },
          { name: t('calculator.result'), value: primaryValue, isResult: true }
        ]
      }
    }

    return {
      type: 'bar',
      data: [{ name: t(`calculators.${calculator.slug}.resultLabel`), value: primaryValue }]
    }
  }

  const chartData = getChartData()

  const feedbackColors: Record<string, string> = {
    excellent: '#22c55e',
    good: '#eab308',
    attention: '#ef4444'
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          {t(`calculators.${calculator.slug}.name`)}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
          <Download className="h-4 w-4" />
          {t('calculator.downloadChart')}
        </Button>
      </CardHeader>
      <CardContent>
        <div 
          ref={chartRef} 
          className="rounded-lg bg-background p-4"
          style={{ minHeight: 300 }}
        >
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              {t(`calculators.${calculator.slug}.fullName`)}
            </h3>
            <p className="text-sm text-muted-foreground">PMToolkit</p>
          </div>
          
          <ResponsiveContainer width="100%" height={250}>
            {chartData.type === 'pie' ? (
              <PieChart>
                <Pie
                  data={chartData.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12131a', 
                    border: '1px solid #2a2b35',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2b35" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6F6288" 
                  tick={{ fill: '#6F6288', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#6F6288"
                  tick={{ fill: '#6F6288', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#12131a', 
                    border: '1px solid #2a2b35',
                    borderRadius: '8px',
                    color: '#F6F7F9'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={(entry as { isResult?: boolean }).isResult ? feedbackColors[feedbackLevel] : COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
          
          <div className="mt-4 text-center text-xs text-muted-foreground">
            {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
