import { useTranslations } from 'next-intl'
import { CalculatorsGrid } from '@/components/calculators/calculators-grid'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  const t = useTranslations()

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <div className="flex-1 p-6 lg:p-8">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {t('app.name')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('app.description')}
            </p>
          </div>
          
          <CalculatorsGrid />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
