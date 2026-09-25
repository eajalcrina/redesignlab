import CalendarButton from '@/components/ui/CalendarButton'
import { SITE_CONFIG } from '@/lib/constants'

export default function EmpresasClosing() {
  return (
    <section className="section-neutral" data-no-announce>
      <div className="container-rl grid grid-cols-1 items-end gap-6 py-24 md:py-32 lg:grid-cols-12">
        <p className="mb-6 border-b border-border-light pb-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary lg:col-span-12 lg:mb-9">Empresas · Redesign Lab</p>
        <h2 className="font-sans text-[34px] font-normal leading-none tracking-[-0.03em] md:text-[56px] lg:col-span-8">¿Crees que podemos ser un buen socio para tu empresa?</h2>
        <div className="lg:col-span-3 lg:col-start-10">
          <CalendarButton location="empresas_closing">Agendar una conversación</CalendarButton>
          <p className="mt-3.5 text-[13px] text-text-tertiary">
            o escríbenos a <a href={`mailto:${SITE_CONFIG.email}`} className="underline underline-offset-2">{SITE_CONFIG.email}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
