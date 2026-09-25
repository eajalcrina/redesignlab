import SectionLabel from '@/components/ui/SectionLabel'
import PhotoBelt from '@/components/ui/PhotoBelt'

export default function ThesisSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl pb-20 pt-24 md:pb-24">
        <div className="mb-7 flex items-center justify-between border-b border-border-light pb-3.5">
          <SectionLabel n="01">Nuestra tesis</SectionLabel>
          <span className="font-mono text-[10.5px] tracking-[0.15em] text-text-tertiary">01 / 06</span>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-5">
            ¿Por qué los bionegocios en América Latina no escalan?
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.7] text-text-secondary lg:col-span-6 lg:col-start-7">
            <p>En estos años hemos conocido bionegocios con enorme potencial: comunidades nativas, pequeños productores, biodiversidad, buenos productos, plantas de producción ya construidas, incluso con soporte activo de cooperación técnica internacional y soporte financiero.</p>
            <p>Pero eso no basta. Son negocios que no facturan lo suficiente ni son lo bastante sólidos: las plantas están paradas, no hay gobernanza, no hay sistemas de suministro estables. Por eso la mayoría termina siendo negocios de subsistencia, no negocios con escalamiento real. Hoy dependen de fondos no reembolsables y de agencias de cooperación, con el mismo temor de fondo.</p>
          </div>
        </div>
      </div>
      <PhotoBelt />
    </section>
  )
}
