'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { calculators, type Category } from '@/lib/calculators/definitions'
import { CalculatorCard } from './calculator-card'
import { CategoryFilter } from './category-filter'
import { SearchInput } from './search-input'

export function CalculatorsGrid() {
  const t = useTranslations()
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCalculators = useMemo(() => {
    return calculators.filter((calc) => {
      const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory
      
      if (!searchQuery) return matchesCategory

      const name = t(`calculators.${calc.slug}.name`).toLowerCase()
      const fullName = t(`calculators.${calc.slug}.fullName`).toLowerCase()
      const description = t(`calculators.${calc.slug}.description`).toLowerCase()
      const query = searchQuery.toLowerCase()
      
      const matchesSearch = name.includes(query) || fullName.includes(query) || description.includes(query)
      
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, t])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
      </div>

      {filteredCalculators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">{t('search.noResults')}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCalculators.map((calculator) => (
            <CalculatorCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      )}
    </div>
  )
}
