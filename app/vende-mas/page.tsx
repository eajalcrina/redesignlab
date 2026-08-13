import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import AuthoritySection from '@/components/sections/services/AuthoritySection'
import CrossLinks from '@/components/sections/services/CrossLinks'
import IABlurbSection from '@/components/sections/services/IABlurbSection'
import ServiceCta from '@/components/sections/services/ServiceCta'
import SectionReveal from '@/components/animations/SectionReveal'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['vende-mas']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/vende-mas' },
}

export default function VendeMasPage() {
  return (
    <>
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />

      {content.extraSection && (
        <section className="section-neutral border-t border-border-light py-24 md:py-32">
          <div className="container-rl">
            <SectionReveal>
              <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-2xl mb-4">
                {content.extraSection.heading}
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl">
                {content.extraSection.body}
              </p>
            </SectionReveal>
          </div>
        </section>
      )}

      <AuthoritySection stats={content.authorityStats} />
      <CrossLinks currentSlug="vende-mas" />
      <IABlurbSection iaBlurb={content.iaBlurb} />
      <ServiceCta ctaLabel={content.ctaLabel} defaultServiceInterest="Ruta: Vende más" />
    </>
  )
}
