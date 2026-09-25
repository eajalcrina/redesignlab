import type { Metadata } from 'next'
import Link from 'next/link'
import ArrowIcon from '@/components/ui/ArrowIcon'

export const metadata: Metadata = { title: 'Página no encontrada', robots: { index: false } }

const PATHS = [
  { href: '/empresas', label: 'Empresas', text: 'Escalemos tu bionegocio.' },
  { href: '/biobuilders', label: 'Bio/Builders', text: 'Construye un nuevo bionegocio con la red.' },
  { href: '/fondos', label: 'Instituciones', text: 'Fondos de impacto y cooperación.' },
  { href: '/', label: 'Inicio', text: 'Volver a la página principal.' },
]

export default function NotFound() {
  return (
    <section className="section-dark" data-no-announce>
      <div className="container-rl flex min-h-[80vh] flex-col justify-center pb-24 pt-36">
        <p className="mb-8 font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">404 · Página no encontrada</p>
        <h1 className="max-w-[900px] font-sans text-[40px] font-normal leading-none tracking-[-0.04em] md:text-[64px]">
          Esta página no existe <span className="text-text-muted">o cambió de lugar.</span>
        </h1>
        <ul className="mt-14 border-t border-border-dark">
          {PATHS.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="group grid grid-cols-1 gap-1 border-b border-border-dark py-5 md:grid-cols-[260px_1fr_auto] md:items-baseline md:gap-6">
                <span className="text-[22px] tracking-[-0.03em] group-hover:text-rl-red">{p.label}</span>
                <span className="text-[15px] text-text-muted">{p.text}</span>
                <ArrowIcon className="hidden text-rl-red md:inline-block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
