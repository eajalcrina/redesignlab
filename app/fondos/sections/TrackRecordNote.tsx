import SectionLabel from '@/components/ui/SectionLabel'
import StatGrid from '@/components/ui/StatGrid'
import ArrowIcon from '@/components/ui/ArrowIcon'

export default function TrackRecordNote() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="04" tone="dark" className="mb-8">Nuestro track record</SectionLabel>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7"><StatGrid tone="dark" columns={2} /></div>
          <aside className="self-start rounded-[4px] border border-border-dark p-7 lg:col-span-4 lg:col-start-9">
            <span className="mb-4 block font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">Nota</span>
            <p className="text-[15px] leading-[1.7] text-text-muted">
              Este trabajo complementa, no reemplaza: el de fondos de inversión más grandes, y el de agencias de cooperación en territorio. Redesign Lab, además, opera su propio fondo privado de inversión de impacto desde 2022, que invierte directamente en las empresas de nuestro portafolio con el mismo criterio de diagnóstico técnico que aplicamos para nuestros clientes. Esa experiencia como gestores de capital, no solo como asesores, es lo que hace distinto nuestro trabajo: sabemos lo que es tomar la decisión de inversión, no solo informarla.
            </p>
            <a href="https://fondodeimpacto.pe" target="_blank" rel="noopener noreferrer" className="group mt-6 flex justify-between border-t border-border-dark pt-4 text-[15px] font-medium">
              fondodeimpacto.pe <ArrowIcon />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
