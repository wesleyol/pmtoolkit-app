import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans'
})
const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'PMToolkit - Product Management Tools',
  description: 'Calculadoras e ferramentas essenciais para Product Managers. Calcule ROI, CAC, LTV, NPS, Churn Rate e muito mais.',
  keywords: ['product management', 'calculadoras', 'ROI', 'CAC', 'LTV', 'NPS', 'churn', 'métricas'],
  authors: [{ name: 'PMToolkit' }],
  creator: 'PMToolkit',
  openGraph: {
    title: 'PMToolkit - Product Management Tools',
    description: 'Calculadoras e ferramentas essenciais para Product Managers',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US', 'es_ES']
  }
}

export const viewport: Viewport = {
  themeColor: '#0A0B0E',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
