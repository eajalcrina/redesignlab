/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.redesignlab.org' }],
        destination: 'https://redesignlab.org/:path*',
        permanent: true,
      },
      {
        // Evita que /index sea indexado como duplicado del home
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
