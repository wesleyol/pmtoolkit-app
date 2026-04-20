'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'
import type { CalculatorDefinition, Category } from '@/lib/calculators/definitions'

interface CalculatorCardProps {
  calculator: CalculatorDefinition
}

const categoryColors: Record<Category, string> = {
  business: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  growth: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  ux: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  engineering: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
}

export function CalculatorCard({ calculator }: CalculatorCardProps) {
  const t = useTranslations()

  return (
    <Link href={`/calculators/${calculator.slug}`}>
      <Card className="group h-full transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 bg-card">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <Badge 
              variant="outline" 
              className={`text-xs ${categoryColors[calculator.category]}`}
            >
              {t(`categories.${calculator.category}`)}
            </Badge>
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {t(`calculators.${calculator.slug}.name`)}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {t(`calculators.${calculator.slug}.fullName`)}
            </p>
          </div>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">
            {t(`calculators.${calculator.slug}.description`)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
