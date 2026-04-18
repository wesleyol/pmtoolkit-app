/** @type {import('next').NextConfig} */
const nextConfig = {
  // Isso gera um build otimizado para Docker, criando uma pasta 'standalone'
  output: 'standalone', 
};

export default nextConfig;