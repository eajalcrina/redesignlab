import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import IABlurbSection from '@/components/sections/services/IABlurbSection'
import ServiceCta from '@/components/sections/services/ServiceCta'
import CrossLinks from '@/components/sections/services/CrossLinks'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['consigue-capital']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/consigue-capital' },
}

export default function ConsigueCapitalPage() {
  return (
    <>
      <ServiceHero
        kicker={content.kicker}
        h1={content.h1}
        tagline={content.tagline}
        authorityLine={content.authorityLine}
      />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />
      <IABlurbSection iaBlurb={content.iaBlurb} />
      <ServiceCta ctaLabel={content.ctaLabel} />
      <CrossLinks currentSlug="consigue-capital" />
    </>
  )
}
