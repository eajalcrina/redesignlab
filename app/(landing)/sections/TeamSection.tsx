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
          <Tag color="red" className="mb-4">LOS FUNDADORES</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Eddie y Lorenzo fundaron Redesign Lab.
          </h2>
          <p className="font-display text-display-sm text-text-secondary max-w-3xl mb-6">
            En estos años construimos la red de expertos y aliados que hace posible el portafolio.
          </p>
          <p className="text-body-lg text-text-secondary max-w-3xl mb-12">
            Somos dos fundadores con trayectorias complementarias (emprendimiento, estrategia, operaciones e inversión) que hemos estado en ambos lados de la mesa. Sobre esa base hemos articulado una red activa de expertos senior, científicos, operadores en territorio, fondos y marcas globales que hoy co-construye con nosotros los proyectos más ambiciosos de bioeconomía en América Latina. Esa red es el verdadero equipo de Redesign Lab.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {team.map((member, i) => (
            <SectionReveal key={member.name} delay={i * 0.1}>
              <div className="group">
                {/* Header row: smaller portrait + name/role */}
                <div className="flex items-start gap-5 mb-5">
                  {member.photo ? (
                    <div className="relative w-[88px] h-[112px] sm:w-[100px] sm:h-[128px] flex-shrink-0 overflow-hidden rounded bg-rl-dark">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="100px"
                        className="object-cover grayscale contrast-[1.05] transition-all duration-500 group-hover:grayscale-0"
                      />
                      <div
                        className="absolute inset-0 mix-blend-multiply bg-rl-red/40 transition-opacity duration-500 group-hover:opacity-0"
                        aria-hidden
                      />
                    </div>
                  ) : (
                    <div className="w-[88px] h-[112px] sm:w-[100px] sm:h-[128px] flex-shrink-0 rounded bg-rl-dark/5 flex items-center justify-center">
                      <span className="font-display text-display-md text-text-primary/[0.10]">
                        {member.name.split(' ').map(w => w[0]).join('')}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col pt-1">
                    <h3 className="font-display text-[28px] md:text-display-sm leading-tight text-text-primary mb-1">{member.name}</h3>
                    <p className="font-mono text-mono-sm text-rl-red mb-3">{member.role}</p>
                    <Divider variant="red" className="w-8" />
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn de ${member.name}`}
                        className="mt-3 inline-flex items-center justify-center w-8 h-8 rounded text-text-secondary hover:text-rl-red hover:bg-rl-dark/5 transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

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
