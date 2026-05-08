import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Mantém a otimização para a sua infraestrutura Docker na DigitalOcean
  output: 'standalone', 
  
  // Interceta a rota ANTES do middleware e do next-intl
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pt',
        permanent: true, // Retorna um HTTP 308 (Excelente para SEO)
      },
    ];
  },
};

export default nextConfig;