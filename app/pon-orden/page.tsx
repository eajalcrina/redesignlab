import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import AuthoritySection from '@/components/sections/services/AuthoritySection'
import CrossLinks from '@/components/sections/services/CrossLinks'
import IABlurbSection from '@/components/sections/services/IABlurbSection'
import ServiceCta from '@/components/sections/services/ServiceCta'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['pon-orden']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/pon-orden' },
}

export default function PonOrdenPage() {
  return (
    <>
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />
      <AuthoritySection stats={content.authorityStats} />
      <CrossLinks currentSlug="pon-orden" />
      <IABlurbSection iaBlurb={content.iaBlurb} />
      <ServiceCta ctaLabel={content.ctaLabel} defaultServiceInterest="Ruta: Pon Orden" />
    </>
  )
}
