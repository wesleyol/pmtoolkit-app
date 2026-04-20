import { notFound } from 'next/navigation'
import { getCalculatorBySlug, calculators } from '@/lib/calculators/definitions'
import { CalculatorPage } from '@/components/calculators/calculator-page'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export default async function CalculatorRoute({ params }: Props) {
  const { slug } = await params
  
  // Apenas validamos no servidor se ela existe
  const calculator = getCalculatorBySlug(slug)
  if (!calculator) {
    notFound()
  }

  // Passamos APENAS o texto (slug) para o componente cliente, e não o objeto com funções
  return <CalculatorPage slug={slug} />
}

export function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug
  }))
}