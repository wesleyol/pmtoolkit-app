'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/lib/i18n/routing'
import { Separator } from '@/components/ui/separator'
import { 
  Calculator, 
  Map, 
  FileText, 
  LayoutTemplate, 
  User, 
  BookOpen,
  ExternalLink
} from 'lucide-react'

const footerLinks = [
  { key: 'roadmap', icon: Map, href: '#roadmap' },
  { key: 'prds', icon: FileText, href: '#prds' },
  { key: 'canvas', icon: LayoutTemplate, href: '#canvas' }
]

const referenceBooks = [
  { title: 'Inspired', author: 'Marty Cagan', href: '#' },
  { title: 'The Lean Startup', author: 'Eric Ries', href: '#' },
  { title: 'Hooked', author: 'Nir Eyal', href: '#' },
  { title: 'Continuous Discovery Habits', author: 'Teresa Torres', href: '#' }
]

export function Footer() {
  const t = useTranslations()

  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About PMToolkit */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Calculator className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">PMToolkit</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.aboutDesc')}
            </p>
          </div>

          {/* Documentation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">{t('footer.about')}</h3>
            <ul className="space-y-3">
              {footerLinks.map(({ key, icon: Icon, href }) => (
                <li key={key}>
                  <Link 
                    href={href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {t(`footer.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Creator */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <User className="h-4 w-4" />
              {t('footer.creator')}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.creatorDesc')}
            </p>
            <div className="flex gap-2">
              <a 
                href="#linkedin" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#github" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* References */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              {t('footer.references')}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('footer.referencesDesc')}
            </p>
            <ul className="space-y-2">
              {referenceBooks.map((book) => (
                <li key={book.title}>
                  <a 
                    href={book.href}
                    className="flex items-center justify-between text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span>
                      <span className="font-medium">{book.title}</span>
                      <span className="text-xs"> - {book.author}</span>
                    </span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  )
}
