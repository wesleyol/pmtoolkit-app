import createMiddleware from 'next-intl/middleware';
import {routing} from './lib/i18n/routing';

// No Next.js 16, a convenção mudou de 'middleware' para 'proxy'
export const proxy = createMiddleware(routing);

export const config = {
  // Define em quais rotas o proxy de idioma vai atuar
  matcher: ['/', '/(pt|en|es)/:path*']
};