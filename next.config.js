/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['karpathir.com'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: [{ key: 'X-DNS-Prefetch-Control', value: 'on' }] }]
  },
}

module.exports = nextConfig
