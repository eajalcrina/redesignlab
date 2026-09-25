import SectionLabel from '@/components/ui/SectionLabel'
import FillPanel from '@/components/ui/FillPanel'
import { SITE_CONFIG } from '@/lib/constants'

export default function HelpSection() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="02" tone="dark" className="mb-4">Asesoría y capital</SectionLabel>
        <h2 className="max-w-[900px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">¿Prefieres solo ayuda, sin asociarte?</h2>
        <div className="mt-12 grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
          <FillPanel href={SITE_CONFIG.calendarUrl} external trackLocation="empresas_asesoria" tone="ink" kicker="Asesoría" title="¿Necesitas resolver lo urgente?" cta="Agenda una conversación" titleClassName="text-[30px] md:text-[36px] leading-[1.02]">
            Identificamos el incendio más urgente de tu empresa, lo apagamos primero, y eso desbloquea ventas y acceso a capital.
          </FillPanel>
          <FillPanel href={SITE_CONFIG.calendarUrl} external trackLocation="empresas_capital" tone="ink" kicker="Capital" title="¿Necesitas capital para invertir?" cta="Agenda una conversación" titleClassName="text-[30px] md:text-[36px] leading-[1.02]">
            Te acompañamos desde el modelo financiero hasta el levantamiento de fondos, nacionales, internacionales o propios.
          </FillPanel>
        </div>
      </div>
    </section>
  )
}
