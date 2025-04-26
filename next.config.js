/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    unoptimized: true,
    domains: ['www.sayariglobal.com', 'sayariglobal.com'],
  },
  env: {
    BASE_API_URL: 'https://www.sayariglobal.com/api'
  },
  publicRuntimeConfig: {
    BASE_API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://www.sayariglobal.com/api'
      : 'http://localhost:3000/api'
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://0.0.0.0:3000/api/:path*', // This might not solve the "Failed to fetch" error completely.  The Next.js server needs to be configured to listen on 0.0.0.0.
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://www.sayariglobal.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  }
}

module.exports = nextConfig