'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { categories, type Category } from '@/lib/calculators/definitions'
import { TrendingUp, Rocket, Users, Code, LayoutGrid } from 'lucide-react'

interface CategoryFilterProps {
  selected: Category | 'all'
  onSelect: (category: Category | 'all') => void
}

const categoryIcons: Record<string, React.ElementType> = {
  all: LayoutGrid,
  business: TrendingUp,
  growth: Rocket,
  ux: Users,
  engineering: Code
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const t = useTranslations()

  const allCategories = [
    { key: 'all' as const, icon: 'all' },
    ...categories.map(c => ({ key: c.key, icon: c.key }))
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map(({ key }) => {
        const Icon = categoryIcons[key]
        const isSelected = selected === key
        
        return (
          <Button
            key={key}
            variant={isSelected ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSelect(key)}
            className={`gap-2 ${
              isSelected 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-transparent border-border hover:bg-accent hover:border-primary/50'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{t(`categories.${key}`)}</span>
          </Button>
        )
      })}
    </div>
  )
}
