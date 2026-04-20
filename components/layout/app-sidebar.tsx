'use client'

import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/lib/i18n/routing'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter
} from '@/components/ui/sidebar'
import { 
  Calculator,
  TrendingUp,
  Rocket,
  Users,
  Code,
  Home
} from 'lucide-react'
import { categories, calculators } from '@/lib/calculators/definitions'

const categoryIcons: Record<string, React.ElementType> = {
  business: TrendingUp,
  growth: Rocket,
  ux: Users,
  engineering: Code
}

export function AppSidebar() {
  const t = useTranslations()
  const pathname = usePathname()

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(pt|es|en)/, '')
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(href + '/')
  }

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Calculator className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground">
              PM<span className="text-primary">Toolkit</span>
            </span>
            <span className="text-xs text-muted-foreground">{t('app.tagline')}</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive('')}>
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    <span>{t('nav.home')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {categories.map((category) => {
          const Icon = categoryIcons[category.key]
          const categoryCalculators = calculators.filter(c => c.category === category.key)
          
          return (
            <SidebarGroup key={category.key}>
              <SidebarGroupLabel className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-4 w-4" />
                {t(`categories.${category.key}`)}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {categoryCalculators.map((calc) => (
                    <SidebarMenuItem key={calc.slug}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={isActive(`/calculators/${calc.slug}`)}
                        className="pl-6"
                      >
                        <Link href={`/calculators/${calc.slug}`}>
                          <span className="text-sm">{t(`calculators.${calc.slug}.name`)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <p className="text-xs text-muted-foreground text-center">
          {t('footer.copyright')}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
