import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/animations/CustomCursor'
import PageTransition from '@/components/animations/PageTransition'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
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
    'El primer AI Studio de América Latina dedicado a transformar industrias cuya ventaja competitiva depende de regenerar los sistemas naturales. Estrategia, IA aplicada y construcción de ventures en bioeconomía.',
  keywords: [
    'AI Studio LATAM',
    'bioeconomía',
    'inteligencia artificial bioeconomía',
    'venture studio',
    'consultoría estratégica',
    'agricultura regenerativa',
    'economía circular',
    'capital de impacto',
    'fondos de impacto',
    'biocomercio amazónico',
    'Redesign Lab',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://redesignlab.org',
    siteName: 'Redesign Lab',
    title: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
    description:
      'Estudio especializado en bioeconomía e inteligencia artificial. Transformamos industrias regenerativas en ventajas competitivas verificables.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
    description:
      'Estudio de IA para industrias de bioeconomía en América Latina.',
    creator: '@redesignlab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
}

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Redesign Lab',
  alternateName: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
  url: 'https://redesignlab.org',
  logo: 'https://redesignlab.org/icon.png',
  email: 'hello@redesignlab.org',
  description:
    'El primer AI Studio de América Latina dedicado a transformar industrias cuya ventaja competitiva depende de regenerar los sistemas naturales.',
  areaServed: 'Latin America',
  foundingDate: '2020',
  founders: [
    { '@type': 'Person', name: 'Eddie Ajalcriña', sameAs: 'https://www.linkedin.com/in/eddieajalcrina' },
    { '@type': 'Person', name: 'Lorenzo Ortiz', sameAs: 'https://www.linkedin.com/in/lorenzoortiz/' },
  ],
  sameAs: [
    'https://www.linkedin.com/company/redesignlab',
  ],
}

const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Redesign Lab',
  url: 'https://redesignlab.org',
  inLanguage: 'es-PE',
  publisher: { '@type': 'Organization', name: 'Redesign Lab' },
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
        {/* Structured data — Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
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
