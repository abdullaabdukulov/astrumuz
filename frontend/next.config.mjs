/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['libraryapp5.pythonanywhere.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'libraryapp5.pythonanywhere.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
