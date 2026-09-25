import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/animations/CustomCursor'
import PageTransition from '@/components/animations/PageTransition'
import GoogleTagManager, { GoogleTagManagerNoScript } from '@/components/analytics/GoogleTagManager'
import AnnouncementTab from '@/components/ui/AnnouncementTab'
import { DIVISIONS, SITE_CONFIG } from '@/lib/constants'

if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_GTM_ID) {
  console.warn(
    '[analytics] NEXT_PUBLIC_GTM_ID is not set — Google Tag Manager is disabled. ' +
    'Set it in .env.local (see .env.local.example) or in Vercel env settings.'
  )
}

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
    'Venture Studio boutique en América Latina. Diseñamos, escalamos e invertimos en negocios con potencial real para que compitan en los mercados más exigentes.',
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
      'Venture Studio boutique en América Latina. Diseñamos, escalamos e invertimos en negocios con potencial real para que compitan en los mercados más exigentes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
    description:
      'Venture Studio boutique en América Latina. Diseñamos, escalamos e invertimos en negocios con potencial real para que compitan en los mercados más exigentes.',
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
  '@id': 'https://redesignlab.org/#organization',
  name: 'Redesign Lab',
  legalName: 'Redesign Ventures SAC',
  alternateName: 'Redesign Lab — The AI Studio for Bioeconomy Industries',
  url: 'https://redesignlab.org',
  logo: 'https://redesignlab.org/icon.png',
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Roosevelt 5957',
    addressLocality: 'Miraflores, Lima',
    addressCountry: 'PE',
  },
  description:
    'Venture Studio boutique en América Latina. Diseñamos, escalamos e invertimos en negocios con potencial real para que compitan en los mercados más exigentes.',
  areaServed: { '@type': 'Place', name: 'América Latina' },
  foundingDate: '2020',
  knowsAbout: [
    'bioeconomía',
    'bionegocios',
    'venture building',
    'capital de impacto',
    'due diligence en territorio',
    'inteligencia artificial aplicada',
    'agricultura regenerativa',
    'economía circular',
  ],
  founders: [
    { '@type': 'Person', name: 'Eddie Ajalcriña', jobTitle: 'CEO & Co-founder', sameAs: 'https://www.linkedin.com/in/eddieajalcrina' },
    { '@type': 'Person', name: 'Lorenzo Ortiz', jobTitle: 'CIO & Co-founder', sameAs: 'https://www.linkedin.com/in/lorenzoortiz/' },
  ],
  // divisiones con sitio propio (Circular Club queda fuera hasta que su HTTPS funcione)
  subOrganization: DIVISIONS.filter((d) => d.href).map((d) => ({ '@type': 'Organization', name: d.brand, url: d.href })),
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
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
            <GoogleTagManagerNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
          </>
        )}
        <CustomCursor />
        <Navigation />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <AnnouncementTab />
      </body>
    </html>
  )
}
