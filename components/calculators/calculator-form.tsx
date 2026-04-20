'use client'

import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calculator, RotateCcw } from 'lucide-react'
import type { CalculatorField } from '@/lib/calculators/definitions'

interface CalculatorFormProps {
  slug: string
  fields: CalculatorField[]
  values: Record<string, number>
  onChange: (key: string, value: number) => void
  onCalculate: () => void
  onReset: () => void // Adicionei a tipagem que faltava para o onReset
  hasResult?: boolean // Coloquei como opcional para não quebrar a página
}

export function CalculatorForm({
  slug,
  fields,
  values,
  onChange,
  onCalculate,
  onReset,
  hasResult
}: CalculatorFormProps) {
  const t = useTranslations()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCalculate()
  }

  return (
    <Card className="bg-zinc-950 border border-zinc-800 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white font-bold">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
            <Calculator className="h-4 w-4 text-purple-400" />
          </div>
          {t('calculator.inputs')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-zinc-300 font-medium text-sm">
                {t(`calculators.${slug}.${field.key}`)}
              </Label>
              <Input
                id={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step || "any"} // 'any' permite que o usuário digite decimais livremente
                // A correção do Zero: Usa '??' no lugar de '||' para não ocultar o 0
                value={values[field.key] ?? ''} 
                onChange={(e) => {
                  const val = e.target.value;
                  // Se apagar tudo, seta como 0 internamente para a fórmula não quebrar com NaN
                  onChange(field.key, val === '' ? 0 : parseFloat(val));
                }}
                className="bg-zinc-900 border-zinc-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-xl py-6"
                placeholder="0"
              />
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 rounded-xl transition-colors"
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t('calculator.calculate')}
            </Button>
            {hasResult && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onReset}
                className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 py-6 px-4 rounded-xl"
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}