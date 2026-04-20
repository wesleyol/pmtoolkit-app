import { notFound } from 'next/navigation'
import { getCalculatorBySlug, calculators } from '@/lib/calculators/definitions'
import { CalculatorPage } from '@/components/calculators/calculator-page'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export default async function CalculatorRoute({ params }: Props) {
  const { slug } = await params
  const calculator = getCalculatorBySlug(slug)

  if (!calculator) {
    notFound()
  }

  return <CalculatorPage calculator={calculator} />
}

export function generateStaticParams() {
  return calculators.map((calc) => ({
    slug: calc.slug
  }))
}
