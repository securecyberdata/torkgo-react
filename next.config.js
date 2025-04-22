/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  
  images: {
    unoptimized: true
  },
  env: {
    BASE_API_URL: 'http://localhost:3000/api'
  },
  publicRuntimeConfig: {
    BASE_API_URL: 'http://localhost:3000/api'
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
}

module.exports = nextConfig
