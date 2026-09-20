'use client'

import SectionReveal from '@/components/animations/SectionReveal'

const profiles = [
  {
    title: 'Trayectoria real liderando negocios',
    body: 'No hablamos de experiencia técnica o de asesoría puntual, hablamos de haber sido fundador, gerente general, o gerente de un área core del negocio: comercial, financiera, operaciones, estrategia.',
    icon: (
      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Ganas de volver a construir',
    body: 'La mayoría de Bio/Builders ya armó algo antes y quiere sentir de nuevo eso de tomar un negocio en etapa temprana y llevarlo lejos.',
    icon: (
      <path d="M12 3v18M12 3l-5 5M12 3l5 5M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Compromiso genuino con el territorio',
    body: 'Un Bio/Builder no ve al territorio como beneficiario, lo ve como socio. Su aporte protege biodiversidad y genera empleo real para comunidades agrícolas, amazónicas y nativas.',
    icon: (
      <path d="M12 21c-4-3-7-6.5-7-10a7 7 0 0114 0c0 3.5-3 7-7 10zM12 8v5M9.5 10.5h5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
]

export default function WhoSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-14">
            Quién es un Bio/Builder
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {profiles.map((p, i) => (
            <SectionReveal key={p.title} delay={i * 0.1}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-rl-red mb-5"
                aria-hidden="true"
              >
                {p.icon}
              </svg>
              <h3 className="font-display text-display-sm text-text-primary mb-3">{p.title}</h3>
              <p className="text-body-md text-text-secondary">{p.body}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
