import SectionLabel from '@/components/ui/SectionLabel'
import CalendarButton from '@/components/ui/CalendarButton'
import StatGrid from '@/components/ui/StatGrid'

export default function PartnerSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="01" className="mb-5">Nuestra propuesta principal</SectionLabel>
        <div className="grid grid-cols-1 items-end gap-8 rounded-[4px] border-t-[3px] border-rl-red bg-white p-8 shadow-[0_0_0_1px_rgba(13,13,13,.1)] md:grid-cols-[1.1fr_.9fr] md:gap-14 md:p-12">
          <div>
            <span className="mb-3.5 block font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">Asociarnos</span>
            <h2 className="font-sans text-[38px] font-normal leading-[0.98] tracking-[-0.045em] md:text-[56px]">¿Necesitas un socio para crecer?</h2>
          </div>
          <div>
            <p className="mb-6 text-[17px] leading-[1.6] text-text-secondary md:text-[18px]">
              Si crees que podemos asociarnos contigo, conversemos sobre lo que significa trabajar con Redesign Lab, con nuestra red y nuestra experiencia detrás de tu empresa.
            </p>
            <CalendarButton location="empresas_asociarnos">Conversemos</CalendarButton>
          </div>
        </div>
        <p className="mb-4 mt-20 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary md:mt-[88px]">Nuestro track record como socios</p>
        <StatGrid tone="light" columns={3} />
      </div>
    </section>
  )
}
