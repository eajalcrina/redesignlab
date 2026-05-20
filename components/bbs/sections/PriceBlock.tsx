'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

interface PriceBlockProps {
  price: { usd: string; pen: string }
  note?: string
  ctaHref: string
}

export default function PriceBlock({ price, note, ctaHref }: PriceBlockProps) {
  const isExternal = ctaHref.startsWith('http')

  return (
    <section className="section-neutral py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Inversión
          </Tag>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="max-w-xl border border-border-light rounded-lg p-10">
            <p className="font-display text-display-lg text-text-primary mb-2">
              {price.usd} · {price.pen}
            </p>
            {note && (
              <p className="text-body-sm text-text-secondary mb-8">{note}</p>
            )}
            {!note && <div className="mb-8" />}
            <Button
              variant="primary"
              href={ctaHref}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              Inscríbete aquí
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
