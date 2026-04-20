export type Category = 'business' | 'growth' | 'ux' | 'engineering'

export interface CalculatorField {
  key: string
  type: 'number' | 'select'
  min?: number
  max?: number
  step?: number
  options?: { value: string; labelKey: string }[]
}

export interface CalculatorDefinition {
  slug: string
  category: Category
  icon: string
  fields: CalculatorField[]
  formula: (values: Record<string, number>) => number | { primary: number; secondary?: number }
  resultKey: string
  secondaryResultKey?: string
  benchmarks?: {
    excellent: number
    good: number
    direction: 'higher' | 'lower'
  }
}

export const categories: { key: Category; icon: string }[] = [
  { key: 'business', icon: 'TrendingUp' },
  { key: 'growth', icon: 'Rocket' },
  { key: 'ux', icon: 'Users' },
  { key: 'engineering', icon: 'Code' }
]

export const calculators: CalculatorDefinition[] = [
  // Business & Viability
  {
    slug: 'roi',
    category: 'business',
    icon: 'TrendingUp',
    fields: [
      { key: 'investment', type: 'number', min: 0 },
      { key: 'return', type: 'number', min: 0 }
    ],
    formula: (v) => ((v.return - v.investment) / v.investment) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 100, good: 20, direction: 'higher' }
  },
  {
    slug: 'cac',
    category: 'business',
    icon: 'DollarSign',
    fields: [
      { key: 'marketingCost', type: 'number', min: 0 },
      { key: 'salesCost', type: 'number', min: 0 },
      { key: 'newCustomers', type: 'number', min: 1 }
    ],
    formula: (v) => (v.marketingCost + v.salesCost) / v.newCustomers,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 50, good: 150, direction: 'lower' }
  },
  {
    slug: 'ltv',
    category: 'business',
    icon: 'Heart',
    fields: [
      { key: 'arpu', type: 'number', min: 0 },
      { key: 'lifespan', type: 'number', min: 1 }
    ],
    formula: (v) => v.arpu * v.lifespan,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 1000, good: 300, direction: 'higher' }
  },
  {
    slug: 'mrr',
    category: 'business',
    icon: 'Calendar',
    fields: [
      { key: 'customers', type: 'number', min: 0 },
      { key: 'avgTicket', type: 'number', min: 0 }
    ],
    formula: (v) => ({
      primary: v.customers * v.avgTicket,
      secondary: v.customers * v.avgTicket * 12
    }),
    resultKey: 'resultLabel',
    secondaryResultKey: 'arrLabel'
  },
  {
    slug: 'grossMargin',
    category: 'business',
    icon: 'PieChart',
    fields: [
      { key: 'revenue', type: 'number', min: 0 },
      { key: 'directCosts', type: 'number', min: 0 }
    ],
    formula: (v) => ((v.revenue - v.directCosts) / v.revenue) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 70, good: 40, direction: 'higher' }
  },
  // Growth & Lifecycle
  {
    slug: 'activationRate',
    category: 'growth',
    icon: 'Zap',
    fields: [
      { key: 'signups', type: 'number', min: 1 },
      { key: 'activations', type: 'number', min: 0 }
    ],
    formula: (v) => (v.activations / v.signups) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 40, good: 20, direction: 'higher' }
  },
  {
    slug: 'churnRate',
    category: 'growth',
    icon: 'UserMinus',
    fields: [
      { key: 'startCustomers', type: 'number', min: 1 },
      { key: 'lostCustomers', type: 'number', min: 0 }
    ],
    formula: (v) => ({
      primary: (v.lostCustomers / v.startCustomers) * 100,
      secondary: 100 - (v.lostCustomers / v.startCustomers) * 100
    }),
    resultKey: 'resultLabel',
    secondaryResultKey: 'retentionLabel',
    benchmarks: { excellent: 2, good: 5, direction: 'lower' }
  },
  {
    slug: 'dauMau',
    category: 'growth',
    icon: 'Activity',
    fields: [
      { key: 'dau', type: 'number', min: 0 },
      { key: 'mau', type: 'number', min: 1 }
    ],
    formula: (v) => (v.dau / v.mau) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 25, good: 10, direction: 'higher' }
  },
  {
    slug: 'kFactor',
    category: 'growth',
    icon: 'Share2',
    fields: [
      { key: 'invitesPerUser', type: 'number', min: 0, step: 0.1 },
      { key: 'conversionRate', type: 'number', min: 0, max: 100 }
    ],
    formula: (v) => v.invitesPerUser * (v.conversionRate / 100),
    resultKey: 'resultLabel',
    benchmarks: { excellent: 1, good: 0.5, direction: 'higher' }
  },
  // UX/Product
  {
    slug: 'nps',
    category: 'ux',
    icon: 'ThumbsUp',
    fields: [
      { key: 'promoters', type: 'number', min: 0 },
      { key: 'passives', type: 'number', min: 0 },
      { key: 'detractors', type: 'number', min: 0 }
    ],
    formula: (v) => {
      const total = v.promoters + v.passives + v.detractors
      return ((v.promoters / total) * 100) - ((v.detractors / total) * 100)
    },
    resultKey: 'resultLabel',
    benchmarks: { excellent: 50, good: 0, direction: 'higher' }
  },
  {
    slug: 'csat',
    category: 'ux',
    icon: 'Smile',
    fields: [
      { key: 'positiveResponses', type: 'number', min: 0 },
      { key: 'totalResponses', type: 'number', min: 1 }
    ],
    formula: (v) => (v.positiveResponses / v.totalResponses) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 90, good: 70, direction: 'higher' }
  },
  {
    slug: 'ttv',
    category: 'ux',
    icon: 'Clock',
    fields: [
      { key: 'totalTime', type: 'number', min: 0 },
      { key: 'userCount', type: 'number', min: 1 }
    ],
    formula: (v) => v.totalTime / v.userCount,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 5, good: 24, direction: 'lower' }
  },
  {
    slug: 'taskSuccessRate',
    category: 'ux',
    icon: 'CheckCircle',
    fields: [
      { key: 'successfulTasks', type: 'number', min: 0 },
      { key: 'totalAttempts', type: 'number', min: 1 }
    ],
    formula: (v) => (v.successfulTasks / v.totalAttempts) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 95, good: 78, direction: 'higher' }
  },
  {
    slug: 'featureAdoption',
    category: 'ux',
    icon: 'Star',
    fields: [
      { key: 'featureUsers', type: 'number', min: 0 },
      { key: 'totalUsers', type: 'number', min: 1 }
    ],
    formula: (v) => (v.featureUsers / v.totalUsers) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 30, good: 10, direction: 'higher' }
  },
  // Engineering & Feasibility
  {
    slug: 'leadTime',
    category: 'engineering',
    icon: 'GitCommit',
    fields: [
      { key: 'avgTime', type: 'number', min: 0, step: 0.1 }
    ],
    formula: (v) => v.avgTime,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 1, good: 24, direction: 'lower' }
  },
  {
    slug: 'deploymentFrequency',
    category: 'engineering',
    icon: 'Rocket',
    fields: [
      { key: 'deploys', type: 'number', min: 0 },
      { key: 'period', type: 'number', min: 1 }
    ],
    formula: (v) => v.deploys / v.period,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 1, good: 0.14, direction: 'higher' }
  },
  {
    slug: 'changeFailureRate',
    category: 'engineering',
    icon: 'AlertTriangle',
    fields: [
      { key: 'failedDeploys', type: 'number', min: 0 },
      { key: 'totalDeploys', type: 'number', min: 1 }
    ],
    formula: (v) => (v.failedDeploys / v.totalDeploys) * 100,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 5, good: 15, direction: 'lower' }
  },
  {
    slug: 'mttr',
    category: 'engineering',
    icon: 'RefreshCw',
    fields: [
      { key: 'totalDowntime', type: 'number', min: 0 },
      { key: 'incidents', type: 'number', min: 1 }
    ],
    formula: (v) => v.totalDowntime / v.incidents,
    resultKey: 'resultLabel',
    benchmarks: { excellent: 60, good: 1440, direction: 'lower' }
  }
]

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return calculators.find(c => c.slug === slug)
}

export function getCalculatorsByCategory(category: Category): CalculatorDefinition[] {
  return calculators.filter(c => c.category === category)
}

export function getFeedbackLevel(
  value: number,
  benchmarks?: CalculatorDefinition['benchmarks']
): 'excellent' | 'good' | 'attention' {
  if (!benchmarks) return 'good'
  
  if (benchmarks.direction === 'higher') {
    if (value >= benchmarks.excellent) return 'excellent'
    if (value >= benchmarks.good) return 'good'
    return 'attention'
  } else {
    if (value <= benchmarks.excellent) return 'excellent'
    if (value <= benchmarks.good) return 'good'
    return 'attention'
  }
}
