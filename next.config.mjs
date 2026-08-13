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
      {
        // Re. Intelligence -> Rediseña tu negocio (producto fusionado a un solo nivel)
        source: '/re-intelligence',
        destination: '/redisena-tu-negocio',
        permanent: true,
      },
      {
        // Rediseñar el trabajo -> Pon Orden (contenido absorbido en la nueva categoría)
        source: '/redisenar-el-trabajo',
        destination: '/pon-orden',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
