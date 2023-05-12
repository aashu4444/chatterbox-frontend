/** @type {import('next').NextConfig} */
const { createProxyMiddleware } = require('http-proxy-middleware')

const nextConfig = {
  reactStrictMode: true,
  async serverMiddleware() {
    this.express.use(
      '',
      createProxyMiddleware({
        target: 'http://54.91.94.172',
        changeOrigin: true,
      })
    )
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
