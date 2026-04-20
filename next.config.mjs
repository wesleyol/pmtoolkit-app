import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <-- ESTA É A LINHA QUE RESOLVE O ERRO
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)