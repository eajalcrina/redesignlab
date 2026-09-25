import Tag from '@/components/ui/Tag'
import CalendarButton from '@/components/ui/CalendarButton'
import PhotoStrip from '@/components/ui/PhotoStrip'

export default function InstitucionesHero() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-24 pt-36 md:pb-28 md:pt-44">
        <Tag className="mb-3">Instituciones · Fondos y cooperación</Tag>
        <h1 className="max-w-[1060px] font-sans text-[38px] font-normal leading-none tracking-[-0.04em] md:text-[58px]">
          Invertir e intervenir en bioeconomía tiene un riesgo que la asistencia técnica tradicional no resuelve.{' '}
          <span className="text-text-muted">Nuestra experiencia real en el territorio, sí.</span>
        </h1>
        <p className="mt-7 max-w-[640px] text-[17px] leading-[1.6] text-text-muted md:text-[18px]">
          Ponemos nuestra experiencia desarrollando negocios en el territorio a tu disposición, para que tus inversiones o tus proyectos de cooperación generen resultados reales, y que esos resultados permanezcan aún cuando el capital o el financiamiento se retiren.
        </p>
        <div className="mt-9">
          <CalendarButton location="instituciones_hero">Iniciar conversación</CalendarButton>
        </div>
        <PhotoStrip images={['/assets/hero/hero-09.jpg', '/assets/hero/hero-07.jpg', '/assets/hero/hero-13.jpg', '/assets/hero/hero-20.jpg']} />
      </div>
    </section>
  )
}
