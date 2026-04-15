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
