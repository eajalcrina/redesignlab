import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AISection() {
  return (
    <section id="ia" className="section-dark scroll-mt-20">
      <div className="container-rl grid grid-cols-1 items-center gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionLabel n="04" tone="dark" className="mb-4">El rol de la IA en nuestros proyectos</SectionLabel>
          <h2 className="mb-7 font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[44px]">Usamos IA para amplificar nuestro criterio y experiencia.</h2>
          <p className="max-w-[540px] text-[17px] leading-[1.7] text-text-muted">
            La usamos para diagnosticar más rápido y decidir con más criterio. Pero el objetivo no es que nosotros trabajemos más rápido, es que tu equipo se quede con algo: instalamos capacidad que tu empresa sigue usando después de que el proyecto termina.
          </p>
          <Link href="/inteligencia-artificial/diagnostico" className="mt-8 flex max-w-[540px] items-center justify-between border-t border-border-dark pt-5 text-[15px] font-medium hover:text-rl-red">
            Haz el diagnóstico de IA de tu empresa <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="rounded-md border border-claude/45 bg-claude/5 p-8 md:p-10 lg:col-span-5 lg:col-start-8">
          <Image src="/assets/partners/claude-logo-white.png" alt="Claude" width={252} height={54} className="h-[46px] w-auto md:h-[54px]" />
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-claude/30 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-claude">Network Partner</span>
            <span className="text-[13px] text-text-muted">Redesign Lab es partner de la red de Claude</span>
          </div>
        </div>
      </div>
    </section>
  )
}
