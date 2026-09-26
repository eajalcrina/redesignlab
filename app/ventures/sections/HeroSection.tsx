import Tag from '@/components/ui/Tag'
import HeroCarouselBg from './HeroCarouselBg'

export default function HeroSection() {

  return (
    <section className="section-dark min-h-[80vh] flex items-center relative overflow-hidden">
      <HeroCarouselBg />

      <div className="container-rl py-32 md:py-40 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <div data-rise={1}>
            <Tag color="neutral" className="mb-8">Ventures</Tag>
          </div>
          <h1 data-rise={2} className="font-display text-display-xl lg:text-[80px] lg:font-normal lg:leading-[1] text-text-on-dark mb-8">
            Construimos los negocios que el planeta necesita <span className="text-white">hoy.</span>
          </h1>
          <p data-rise={3} className="text-body-lg text-text-muted mb-6 max-w-3xl mx-auto">
            Somos un Venture Studio especializado en el desarrollo de negocios sostenibles que generan impacto real en América Latina y el Caribe. Trabajamos con un número deliberadamente reducido de proyectos: los que tienen el potencial y la solidez para convertirse en referentes globales de su industria.
          </p>
          <p data-rise={4} className="text-body-md text-text-muted/70 max-w-3xl mx-auto">
            Esto no es una convocatoria abierta. Es un ecosistema de construcción selectiva.
          </p>
        </div>
      </div>
    </section>
  )
}
