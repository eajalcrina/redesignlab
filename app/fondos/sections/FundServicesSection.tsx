'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ServiceCard from '@/components/ui/ServiceCard'
import Tag from '@/components/ui/Tag'

const services = [
  {
    name: 'Technical Due Diligence',
    duration: 'Por empresa evaluada',
    price: '',
    description: 'El Technical Due Diligence aplica el BIRF — Bionegocio Investment Readiness Framework — como herramienta de diagnóstico estructurado, combinado con visita de campo y entrevistas con todos los actores clave de la cadena.',
    includes: [
      'Aplicación del BIRF',
      'Visita de campo (según alcance)',
      'Entrevistas estructuradas con actores clave',
      'Reporte técnico con puntaje y clasificación',
      'Recomendaciones de condiciones de inversión',
    ],
  },
  {
    name: 'Pre-Investment Venture Building',
    duration: '3 a 6 meses',
    price: '',
    description: 'Cuando el Technical Due Diligence identifica un bionegocio con potencial real pero con brechas que impiden el desembolso responsable, hay dos opciones: rechazar la inversión o acompañar el cierre de esas brechas antes de comprometer el capital principal.',
    includes: [
      'Plan de fortalecimiento basado en brechas BIRF identificadas',
      'Acompañamiento técnico mensual',
      'Hitos verificables por dimensión',
      'Reporte de avance para el fondo',
      'Evaluación de cierre al finalizar el programa',
    ],
  },
  {
    name: 'BIRF para portafolios',
    duration: 'Por proceso de selección',
    price: '',
    description: 'Para fondos que necesitan evaluar un número significativo de candidatos en un proceso de selección, Redesign Lab licencia el uso del BIRF como herramienta de diagnóstico estandarizado.',
    includes: [
      'Licencia de uso del BIRF para el proceso de selección',
      'Diagnóstico por empresa según alcance definido',
      'Reporte consolidado de portafolio candidato',
      'Ranking de priorización por nivel de madurez',
      'Recomendaciones de siguiente paso por empresa',
    ],
  },
]

export default function FundServicesSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Los servicios</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            Herramientas diseñadas para fondos que invierten en bioeconomía.
          </h2>
        </SectionReveal>
        <div className="max-w-3xl">
          {services.map((service, i) => (
            <SectionReveal key={service.name} delay={i * 0.05}>
              <ServiceCard {...service} />
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
