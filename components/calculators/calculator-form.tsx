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
  onReset: () => void
  hasResult: boolean
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
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Calculator className="h-5 w-5 text-primary" />
          {t('calculator.inputs')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-foreground">
                {t(`calculators.${slug}.${field.key}`)}
              </Label>
              <Input
                id={field.key}
                type="number"
                min={field.min}
                max={field.max}
                step={field.step || 1}
                value={values[field.key] || ''}
                onChange={(e) => onChange(field.key, parseFloat(e.target.value) || 0)}
                className="bg-background border-border"
                placeholder="0"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              <Calculator className="mr-2 h-4 w-4" />
              {t('calculator.calculate')}
            </Button>
            {hasResult && (
              <Button type="button" variant="outline" onClick={onReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
