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
    ]
  },
}

export default nextConfig
