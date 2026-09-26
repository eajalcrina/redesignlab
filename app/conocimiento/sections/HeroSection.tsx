import Tag from '@/components/ui/Tag'

export default function HeroSection() {

  return (
    <section className="section-dark">
      <div className="container-rl pb-20 pt-36 md:pb-28 md:pt-44">
        <div>
          <div data-rise={1}>
            <Tag color="neutral" className="mb-3">Conocimiento</Tag>
          </div>
          <h1 data-rise={2}
            className="max-w-[1000px] font-sans text-[38px] font-normal leading-none tracking-[-0.04em] text-text-on-dark sm:text-[46px] md:text-[64px]"
          >
            Lo que sabemos, lo compartimos.
          </h1>
          <p data-rise={3} className="mt-7 max-w-[600px] text-[17px] leading-[1.6] text-text-muted md:text-[18px]">
            Recursos, frameworks y datos que usamos internamente, abiertos para el ecosistema.
          </p>
        </div>
      </div>
    </section>
  )
}
