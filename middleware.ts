import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Filtro robusto que ignora ficheiros de sistema (_next) e foca apenas nas rotas
  matcher: [
    '/',
    '/(pt|en|es)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};