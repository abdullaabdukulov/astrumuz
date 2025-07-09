/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['astrum-api.abdukulov.uz'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'astrum-api.abdukulov.uz',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
