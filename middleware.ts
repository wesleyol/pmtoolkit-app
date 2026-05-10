import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';
import { NextRequest } from 'next/server';

// Instancia o middleware original de internacionalização
const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Executa a lógica padrão de roteamento
  const response = intlMiddleware(req);

  // Interceta a resposta para corrigir vazamentos de porta causados pelo Proxy
  if (response.headers.has('location')) {
    const location = response.headers.get('location');
    
    // Remove a porta :3000 caso a infraestrutura a tenha injetado indevidamente
    if (location && location.includes(':3000')) {
      response.headers.set('location', location.replace(':3000', ''));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/(pt|en|es)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};