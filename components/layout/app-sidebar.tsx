'use client'

import * as React from "react"
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/lib/i18n/routing'
import {
  Calculator,
  LayoutDashboard,
  User,
  ChevronRight,
  TrendingUp,
  Rocket,
  Users,
  Code
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { categories, calculators } from '@/lib/calculators/definitions'

const categoryIcons: Record<string, React.ElementType> = {
  business: TrendingUp,
  growth: Rocket,
  ux: Users,
  engineering: Code
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations()
  const pathname = usePathname()

  const isActive = (href: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(pt|es|en)/, '')
    return pathWithoutLocale === href || pathWithoutLocale.startsWith(href + '/')
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Calculator className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PMToolkit</span>
                  <span className="truncate text-xs text-muted-foreground">{t('app.tagline')}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Seção Início */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t("nav.dashboard")} isActive={isActive('/')}>
                <Link href="/">
                  <LayoutDashboard className="size-4" />
                  <span>{t("nav.dashboard")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Seção Calculadoras - Título formatado como Tópico Principal */}
        <SidebarGroup>
          <div className="px-2 py-3">
             <h2 className="text-sm font-bold tracking-tight text-foreground/90 uppercase px-2 mb-2">
                {t("nav.calculators")}
             </h2>
          </div>
          
          <SidebarMenu>
            {categories.map((category) => {
              const Icon = categoryIcons[category.key]
              const categoryCalculators = calculators.filter(c => c.category === category.key)

              return (
                <Collapsible key={category.key} asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={t(`categories.${category.key}`)}>
                        {Icon && <Icon />}
                        <span>{t(`categories.${category.key}`)}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {categoryCalculators.map((calc) => (
                          <SidebarMenuSubItem key={calc.slug}>
                            <SidebarMenuSubButton asChild isActive={isActive(`/calculators/${calc.slug}`)}>
                              <Link href={`/calculators/${calc.slug}`}>
                                <span>{t(`calculators.${calc.slug}.name`)}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* Seção Informações */}
        <SidebarGroup className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={t("nav.about")} isActive={isActive('/about')}>
                <Link href="/about">
                  <User className="size-4" />
                  <span>{t("nav.about")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <p className="text-xs text-muted-foreground text-center">
          {t('footer.copyright')}
        </p>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}