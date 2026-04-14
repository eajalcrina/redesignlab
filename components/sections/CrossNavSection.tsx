'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'

interface CrossNavLink {
  label: string
  href: string
  description?: string
}

interface CrossNavSectionProps {
  title?: string
  links: CrossNavLink[]
}

export default function CrossNavSection({ title = 'También', links }: CrossNavSectionProps) {
  const hasDescriptions = links.some((link) => link.description)

  return (
    <section className="section-neutral py-12 md:py-16">
      <div className="container-rl">
        <Divider className="mb-8" />
        <SectionReveal>
          {hasDescriptions ? (
            <div className="max-w-3xl">
              <span className="text-label-sm uppercase text-text-tertiary mb-6 block">
                {title}
              </span>
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <Button key={link.href} variant="text" href={link.href} className="text-text-primary text-left">
                    {link.description || link.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <span className="text-label-sm uppercase text-text-tertiary">
                {title}
              </span>
              {links.map((link) => (
                <Button key={link.href} variant="text" href={link.href} className="text-text-primary">
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
