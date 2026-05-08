import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

// O Next.js exige que este arquivo se chame middleware.ts 
// e que a função principal seja exportada como default
export default createMiddleware(routing);

export const config = {
  // Define em quais rotas o middleware de idioma vai atuar
  matcher: ['/', '/(pt|en|es)/:path*']
};