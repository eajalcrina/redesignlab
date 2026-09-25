import Tag from '@/components/ui/Tag'
import CalendarButton from '@/components/ui/CalendarButton'
import PhotoStrip from '@/components/ui/PhotoStrip'

export default function EmpresasHero() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-24 pt-36 md:pb-28 md:pt-44">
        <Tag className="mb-3">Empresas</Tag>
        <h1 className="max-w-[1060px] font-sans text-[40px] font-normal leading-none tracking-[-0.04em] md:text-[64px]">
          Diseñamos, escalamos e invertimos en negocios con potencial real,{' '}
          <span className="text-text-muted">para convertirlos en empresas que compitan en los mercados más exigentes.</span>
        </h1>
        <p className="mt-7 max-w-[560px] text-[18px] leading-[1.6] text-text-muted">Buscamos empresas con potencial real para asociarnos y escalar juntos.</p>
        <div className="mt-9">
          <CalendarButton location="empresas_hero">Escalemos juntos</CalendarButton>
        </div>
        <PhotoStrip images={['/assets/hero/hero-08.jpg', '/assets/hero/hero-21.jpg', '/assets/hero/hero-17.jpg', '/assets/hero/hero-19.jpg']} />
      </div>
    </section>
  )
}
