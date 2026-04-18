import type { Metadata } from 'next'
import Link from 'next/link'
import MaturityChecker from '@/components/sections/MaturityChecker'

export const metadata: Metadata = {
  title: 'Diagnóstico de Madurez IA',
  description:
    'Evalúa el nivel de madurez de tu organización frente a la inteligencia artificial. Diagnóstico estructurado en 5 dimensiones críticas — 12 preguntas, 4 minutos — con resultado personalizado por industria.',
  keywords: [
    'diagnóstico madurez IA',
    'RE·IA Maturity Checker',
    'autoevaluación IA bioeconomía',
    'nivel de madurez inteligencia artificial',
    'diagnóstico organizacional IA LATAM',
  ],
  alternates: { canonical: '/inteligencia-artificial/diagnostico' },
  openGraph: {
    title: 'Diagnóstico de Madurez IA — Redesign Lab',
    description:
      'Evalúa el nivel de madurez de tu organización frente a la IA. 12 preguntas, 4 minutos, resultado personalizado por industria y plan de 90 días.',
    type: 'article',
    url: '/inteligencia-artificial/diagnostico',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico de Madurez IA — Redesign Lab',
    description:
      'Evalúa el nivel de madurez de tu organización frente a la inteligencia artificial aplicada a la bioeconomía.',
  },
}

export default function DiagnosticoPage() {
  return (
    <>
      {/* H1 accesible para crawlers y lectores de pantalla */}
      <h1 className="sr-only">
        Diagnóstico de Madurez IA para industrias de bioeconomía
      </h1>

      {/* Contenido introductorio indexable — se oculta visualmente encima del checker
          pero alimenta relevancia semántica para Google */}
      <div className="sr-only">
        <p>
          El Diagnóstico de Madurez IA de Redesign Lab evalúa el nivel de preparación
          de tu organización frente a la inteligencia artificial aplicada a la bioeconomía.
          A lo largo de 12 preguntas estructuradas en 5 dimensiones críticas — estrategia,
          datos, talento, procesos y tecnología — identifica en aproximadamente 4 minutos
          el estadio actual de adopción y los vacíos que separan a tu equipo de una operación
          verdaderamente potenciada por IA.
        </p>
        <p>
          El resultado es un diagnóstico personalizado por industria (agroindustria, pesca,
          acuicultura, forestal, cosmética, turismo regenerativo) con un plan accionable de 90 días:
          qué habilitar primero, qué pilotos correr y cómo medir retorno. Diseñado para líderes
          de bioeconomía en América Latina que necesitan pasar del entusiasmo genérico por la IA
          a decisiones verificables sobre dónde invertir.
        </p>
        <p>
          Completar el diagnóstico es gratuito y no requiere registro previo. Al finalizar,
          el equipo de Redesign Lab puede acompañarte en la interpretación de resultados y
          el diseño del roadmap de adopción adaptado a tu cadena de valor.
        </p>
      </div>

      {/* Breadcrumb back link — sits above the checker */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 pointer-events-none">
        <div className="container-rl pt-4 pointer-events-auto">
          <Link
            href="/inteligencia-artificial"
            className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-white transition-colors group"
          >
            <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span>
            Volver a Inteligencia Artificial
          </Link>
        </div>
      </div>
      <MaturityChecker inline />
    </>
  )
}
