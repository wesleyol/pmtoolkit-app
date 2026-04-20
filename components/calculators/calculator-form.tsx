'use client'

import { useState, useEffect } from 'react'
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
  onReset?: () => void
  hasResult?: boolean
}

export function CalculatorForm({ slug, fields, values, onChange, onCalculate, onReset, hasResult }: CalculatorFormProps) {
  const t = useTranslations()
  const [displayValues, setDisplayValues] = useState<Record<string, string>>({})

  // Sincroniza o estado inicial/reset
  useEffect(() => {
    const newDisplay: Record<string, string> = {}
    fields.forEach(f => {
      newDisplay[f.key] = values[f.key] === 0 ? '' : String(values[f.key])
    })
    setDisplayValues(newDisplay)
  }, [fields, values])

  const handleTextChange = (key: string, text: string) => {
    // Permite apenas números e um ponto/vírgula decimal
    const sanitized = text.replace(/[^0-9.,]/g, '').replace(',', '.')
    setDisplayValues(prev => ({ ...prev, [key]: sanitized }))
    
    const num = parseFloat(sanitized)
    onChange(key, isNaN(num) ? 0 : num)
  }

  return (
    <Card className="bg-zinc-950 border-zinc-800 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calculator className="h-5 w-5 text-purple-400" />
          {t('calculator.inputs')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }} className="space-y-6">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-zinc-400">{t(`calculators.${slug}.${field.key}`)}</Label>
              <Input
                type="text"
                inputMode="decimal"
                value={displayValues[field.key] || ''}
                onChange={(e) => handleTextChange(field.key, e.target.value)}
                className="bg-zinc-900 border-zinc-800 text-white text-lg py-6"
                placeholder="0.00"
              />
            </div>
          ))}
          <div className="flex gap-3">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 py-6 text-lg font-bold">
              {t('calculator.calculate')}
            </Button>
            {hasResult && onReset && (
              <Button type="button" variant="outline" onClick={onReset} className="border-zinc-800 py-6">
                <RotateCcw className="h-5 w-5" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}