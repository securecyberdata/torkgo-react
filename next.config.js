
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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  publicRuntimeConfig: {
    API_URL: process.env.NODE_ENV === 'production' 
      ? 'https://www.sayariglobal.com/api'
      : 'http://0.0.0.0:3000/api'
  }
}

module.exports = nextConfig
