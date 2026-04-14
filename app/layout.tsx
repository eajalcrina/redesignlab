import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/animations/CustomCursor'
import PageTransition from '@/components/animations/PageTransition'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://redesignlab.org'),
  title: {
    default: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
    template: '%s | Redesign Lab',
  },
  description:
    'Redesign Lab es el estudio especializado en bioeconomía e inteligencia artificial que transforma modelos de negocio en industrias de alto impacto en América Latina.',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://redesignlab.org',
    siteName: 'Redesign Lab',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@redesignlab',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={jetbrains.variable}>
      <head>
        {/* Mluvka font from CDNFonts — weights 200-800 */}
        <link
          href="https://fonts.cdnfonts.com/css/mluvka"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CustomCursor />
        <Navigation />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  )
}
