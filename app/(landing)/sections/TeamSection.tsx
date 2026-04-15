'use client'

import Link from 'next/link'
import Image from 'next/image'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'
import { team } from '@/data/team'

export default function TeamSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">EL EQUIPO</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            El equipo que lo hace posible.
          </h2>
          <p className="font-display text-display-sm text-text-secondary max-w-3xl mb-6">
            Hemos estado en ambos lados de la mesa. Eso cambia todo.
          </p>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-12">
            Somos un equipo de emprendedores, estrategas e inversionistas. Hemos estado en ambos lados de la mesa — construyendo empresas desde cero y evaluando inversiones con los criterios más exigentes del mercado. Esa perspectiva doble es lo que nos permite hacer algo que pocas firmas pueden: dar criterio estratégico con piel en el juego real.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.1}>
              <div className="group">
                {/* Photo with duotone filter */}
                <div className="relative aspect-[4/5] overflow-hidden rounded mb-6 bg-rl-dark">
                  {member.photo ? (
                    <>
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover grayscale contrast-[1.1] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      />
                      {/* Red tint overlay (fades on hover) */}
                      <div
                        className="absolute inset-0 mix-blend-multiply bg-rl-red/40 transition-opacity duration-500 group-hover:opacity-0"
                        aria-hidden
                      />
                      {/* Dark gradient at bottom for readability */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-rl-dark/40 via-transparent to-transparent"
                        aria-hidden
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-rl-dark/5 flex items-center justify-center">
                      <span className="font-display text-display-lg text-text-primary/[0.06]">
                        {member.name.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-display text-display-sm text-text-primary mb-1">{member.name}</h3>
                <p className="font-mono text-mono-sm text-rl-red mb-4">{member.role}</p>
                <Divider variant="red" className="w-10 mb-4" />
                <p className="text-body-sm text-text-secondary mb-4 whitespace-pre-line">{member.bio}</p>
                {member.quote && (
                  <blockquote className="text-body-sm text-text-primary italic border-l-2 border-rl-red pl-4">
                    &ldquo;{member.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-16 md:mt-20 pt-12 border-t border-border-light">
            <p className="text-body-md text-text-secondary mb-4">
              El equipo se extiende más allá de los fundadores. Expertos senior co-construyen con nosotros los negocios más ambiciosos de bioeconomía en América Latina.
            </p>
            <Link
              href="/builders"
              className="inline-flex items-center gap-2 text-body-lg text-text-primary hover:text-rl-red transition-colors font-medium group"
            >
              Súmate a la Red de Builders
              <span className="text-rl-red transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
