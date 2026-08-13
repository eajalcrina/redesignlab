import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import ServiceCta from '@/components/sections/services/ServiceCta'
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
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />

      {content.credentialsLine && (
        <div className="section-neutral border-t border-border-light py-10">
          <div className="container-rl">
            <p className="font-mono text-mono-sm text-text-tertiary uppercase tracking-[0.18em]">
              {content.credentialsLine}
            </p>
          </div>
        </div>
      )}

      <ServiceCta
        category={content.category}
        ctaLabel={content.ctaLabel}
        messagePlaceholder={content.messagePlaceholder}
        iaBlurb={content.iaBlurb}
      />
    </>
  )
}
