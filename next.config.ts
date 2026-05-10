import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ativa a compilação otimizada para o ambiente Docker/Standalone
  output: 'standalone',
};

export default nextConfig;