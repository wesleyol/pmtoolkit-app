'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { CalculatorForm } from './calculator-form'
import { CalculatorResult } from './calculator-result'
import { ChartExport } from './chart-export'
import { Badge } from '@/components/ui/badge'
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ChevronLeft } from 'lucide-react'
import type { CalculatorDefinition, Category } from '@/lib/calculators/definitions'

interface CalculatorPageProps {
  calculator: CalculatorDefinition
}

const categoryColors: Record<Category, string> = {
  business: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  growth: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ux: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engineering: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
}

export function CalculatorPage({ calculator }: CalculatorPageProps) {
  const t = useTranslations()
  
  const initialValues = calculator.fields.reduce((acc, field) => {
    acc[field.key] = 0
    return acc
  }, {} as Record<string, number>)

  const [values, setValues] = useState<Record<string, number>>(initialValues)
  const [result, setResult] = useState<number | { primary: number; secondary?: number } | null>(null)

  const handleChange = useCallback((key: string, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }, [])

  const handleCalculate = useCallback(() => {
    const calculatedResult = calculator.formula(values)
    setResult(calculatedResult)
  }, [calculator, values])

  const handleReset = useCallback(() => {
    setValues(initialValues)
    setResult(null)
  }, [initialValues])

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ChevronLeft className="h-4 w-4" />
                  {t('nav.home')}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                {t(`calculators.${calculator.slug}.name`)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={categoryColors[calculator.category]}
            >
              {t(`categories.${calculator.category}`)}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {t(`calculators.${calculator.slug}.name`)}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t(`calculators.${calculator.slug}.fullName`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`calculators.${calculator.slug}.description`)}
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Form */}
          <CalculatorForm
            slug={calculator.slug}
            fields={calculator.fields}
            values={values}
            onChange={handleChange}
            onCalculate={handleCalculate}
            onReset={handleReset}
            hasResult={result !== null}
          />

          {/* Result */}
          {result !== null && (
            <CalculatorResult 
              calculator={calculator} 
              result={result} 
            />
          )}
        </div>

        {/* Chart */}
        {result !== null && (
          <ChartExport 
            calculator={calculator} 
            result={result} 
            values={values}
          />
        )}
      </div>
    </div>
  )
}
