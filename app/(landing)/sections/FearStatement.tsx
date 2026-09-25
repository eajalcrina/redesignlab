import { StatementKicker, StatementNote } from '@/components/ui/Statement'

export default function FearStatement() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-[88px] pt-[88px] md:pb-[104px] md:pt-28">
        <StatementKicker>El temor de fondo</StatementKicker>
        <blockquote className="max-w-[1180px] font-sans text-[44px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[84px]">
          Si el fondo se acaba, <em className="not-italic text-rl-red">el bionegocio se cae.</em>
        </blockquote>
        <StatementNote next="Por eso">
          Es lo que escuchamos en cada territorio: negocios con potencial real que dependen de fondos no reembolsables y de la cooperación. Resolver esa dependencia es el punto de partida de todo lo que hacemos.
        </StatementNote>
      </div>
    </section>
  )
}
