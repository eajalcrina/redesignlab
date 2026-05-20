import type { Metadata } from 'next'
import ProgramHero from '@/components/bbs/ProgramHero'
import ProgramGrid from '@/components/bbs/ProgramGrid'
import HubIntro from './sections/HubIntro'
import HowItWorks from './sections/HowItWorks'
import WhyBBS from './sections/WhyBBS'
import { bbsPrograms } from '@/data/bbs'

export const metadata: Metadata = {
  title: 'Cursos BBS — Programas Ejecutivos',
  description:
    'Programas ejecutivos de Bio Business School: cursos y diplomados en IA aplicada, marcas regenerativas, negocios regenerativos y economía circular. Diseñados por Redesign Lab.',
  keywords: ['programas ejecutivos', 'IA para empresas', 'economía circular', 'negocios regenerativos', 'Bio Business School'],
  alternates: { canonical: '/cursos-bbs' },
}

export default function CursosBBSPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Programas Ejecutivos BBS',
    itemListElement: bbsPrograms.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://redesignlab.org/cursos-bbs/${p.slug}`,
      name: p.title,
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ProgramHero
        tag="MINDSET → CURSOS BBS"
        lines={['No formamos estudiantes.', 'Formamos profesionales que transforman', 'empresas, industrias y territorios.']}
        paragraph="Programas Ejecutivos BBS — diseñados por Redesign Lab, en colaboración con Thousandfold."
      />
      <HubIntro />
      <ProgramGrid />
      <HowItWorks />
      <WhyBBS />
    </>
  )
}
