import type { Metadata } from 'next'
import { pageMetadata, breadcrumbLd, itemListLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import HeroSection from './sections/HeroSection'
import FilterableGrid from './sections/FilterableGrid'
import CtaSection from './sections/CtaSection'
import { projects, getProjectSlug } from '@/data/projects'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Proyectos',
    description:
      'Portafolio de proyectos de consultoría de Redesign Lab en bioeconomía: agroindustria, pesca, acuicultura, cosmética, turismo y biotecnología en América Latina.',
    path: '/proyectos',
  }),
  keywords: ['casos consultoría bioeconomía', 'proyectos LATAM', 'agroindustria pesca acuicultura', 'biocomercio amazónico', 'climate tech LATAM'],
}

export default function ProyectosPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([['Proyectos', '/proyectos']]),
          itemListLd('Proyectos de Redesign Lab', projects.map((x) => ({ name: x.title, path: `/proyectos/${getProjectSlug(x)}` }))),
        ]}
      />
      <HeroSection />
      <FilterableGrid />
      <CtaSection />
    </>
  )
}
