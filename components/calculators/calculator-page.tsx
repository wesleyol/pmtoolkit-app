'use client'

import { useState, useCallback, useMemo } from 'react'
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
import { getCalculatorBySlug, type Category } from '@/lib/calculators/definitions'

interface CalculatorPageProps {
  slug: string
}

const categoryColors: Record<Category, string> = {
  business: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  growth: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ux: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engineering: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
}

export function CalculatorPage({ slug }: CalculatorPageProps) {
  const t = useTranslations()
  
  // Recupera a definição da calculadora no lado do cliente para acessar a função 'formula'
  const calculator = useMemo(() => getCalculatorBySlug(slug)!, [slug])
  
  const [values, setValues] = useState<Record<string, number>>(() => 
    calculator.fields.reduce((acc, field) => {
      acc[field.key] = 0
      return acc
    }, {} as Record<string, number>)
  )

  const [result, setResult] = useState<number | { primary: number; secondary?: number } | null>(null)

 const handleCalculate = useCallback(() => {
    const calculatedResult = calculator.formula(values)
    
    // Se o resultado for Infinito (divisão por zero) ou inválido, tratamos como zero
    const safeResult = (typeof calculatedResult === 'number') 
      ? (isFinite(calculatedResult) ? calculatedResult : 0)
      : calculatedResult;

    setResult(safeResult)
  }, [calculator, values])

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">{t('common.home')}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t(`calculators.${slug}.name`)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {t(`calculators.${slug}.name`)}
              </h1>
              <Badge variant="outline" className={categoryColors[calculator.category]}>
                {t(`categories.${calculator.category}`)}
              </Badge>
            </div>
            <p className="text-zinc-400 max-w-2xl">
              {t(`calculators.${slug}.description`)}
            </p>
          </div>
          <Link
            href="/"
            className="hidden md:flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t('common.back')}
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <CalculatorForm
            fields={calculator.fields}
            values={values}
            // A correção: Agora o pai entende a chave e preserva o estado anterior (...prev)
            onChange={(key, value) => setValues(prev => ({ ...prev, [key]: value }))} 
            onCalculate={handleCalculate}
            slug={slug}
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <CalculatorResult
            result={result}
            calculator={calculator}
            values={values}
          />
          
         {result !== null && (
            <ChartExport 
              calculator={calculator} 
              result={result} 
              values={values}
            />
          )}
        </div>
      </div>
    </div>
  )
}