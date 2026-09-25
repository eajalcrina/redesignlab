import SectionLabel from '@/components/ui/SectionLabel'
import FillPanel from '@/components/ui/FillPanel'

export default function ProposalSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl flex min-h-[92vh] flex-col justify-center pb-28 pt-24 md:pb-[168px] md:pt-[136px]">
        <SectionLabel n="02" className="mb-4">Nuestra propuesta</SectionLabel>
        <h2 className="mb-11 max-w-[900px] font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[46px]">
          Por eso hacemos Venture Building: construimos negocios nuevos, y escalamos los que ya existen.
        </h2>
        <div className="grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
          <FillPanel href="/empresas" tone="light" kicker="Para escalar" title="Empresas" cta="Ver cómo trabajamos con empresas">
            Si ya tienes un bionegocio, te ayudamos a escalarlo a nivel comercial, operativo y financiero.
          </FillPanel>
          <FillPanel href="/biobuilders" tone="graphite" kicker="Para construir" title="Bio/Builders" cta="Conoce Bio/Builders">
            Si quieres construir un nuevo bionegocio, te conectamos con la red de desarrolladores de negocio.
          </FillPanel>
        </div>
      </div>
    </section>
  )
}
