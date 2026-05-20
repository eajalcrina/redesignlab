import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allProgramSlugs, getProgram } from '@/data/bbs'
import ProgramDetail from '@/components/bbs/ProgramDetail'

export function generateStaticParams() {
  return allProgramSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const program = getProgram(params.slug)
  if (!program) return {}
  return {
    title: program.title,
    description: program.summary,
    alternates: { canonical: `/cursos-bbs/${program.slug}` },
  }
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgram(params.slug)
  if (!program) notFound()

  const priceNumeric = program.price.usd.replace(/[^0-9.]/g, '')
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    provider: { '@type': 'Organization', name: 'Redesign Lab', sameAs: 'https://redesignlab.org' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      startDate: '2026-06-22',
      offers: { '@type': 'Offer', price: priceNumeric, priceCurrency: 'USD' },
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
      { '@type': 'ListItem', position: 2, name: 'Cursos BBS', item: 'https://redesignlab.org/cursos-bbs' },
      { '@type': 'ListItem', position: 3, name: program.title, item: `https://redesignlab.org/cursos-bbs/${program.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProgramDetail program={program} />
    </>
  )
}
