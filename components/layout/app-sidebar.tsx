import * as React from "react"
import {
  Calculator,
  LayoutDashboard,
  Settings2,
  User, // Novo ícone importado
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n/routing"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Utilizamos o namespace "common" conforme o padrão do seu projeto
  const t = useTranslations("nav")

  const navMain = [
    {
      title: t("dashboard"),
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: t("calculators"),
      url: "/calculators",
      icon: Calculator,
    },
    {
      title: t("about"),
      url: "/about",
      icon: User,
    },
    {
      title: t("settings"),
      url: "/settings",
      icon: Settings2,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Calculator className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-sidebar-foreground">PMToolkit</span>
                  <span className="truncate text-xs text-sidebar-foreground/60">Product Tools</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-1 px-2">
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          {/* Espaço reservado para futuras ações no rodapé */}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}