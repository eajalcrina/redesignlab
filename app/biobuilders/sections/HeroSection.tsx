import { BIOBUILDERS_FORM_URL } from '@/lib/constants'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

export default function HeroSection() {

  return (
    <section className="section-dark min-h-[70vh] flex items-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(250,250,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,248,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container-rl py-32 md:py-40 relative z-10">
        <div>
          <div data-rise={1}>
            <Tag color="red" className="mb-8">Bio/Builders · Red de desarrolladores de negocio</Tag>
          </div>

          <h1 data-rise={2} className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[0.97] text-text-on-dark max-w-5xl">
            La bioeconomía de América Latina tiene todo, menos quien la escale.
          </h1>

          <div data-rise-line className="h-0.5 bg-rl-red w-24 my-8" />

          <p data-rise={3} className="text-body-xl md:text-body-xl-dt text-text-muted max-w-2xl">
            Bio/Builders es la red que conecta a expertos en escalar empresas con bionegocios que necesitan activar su potencial para competir en el mercado.
          </p>

          <div data-rise={4} className="mt-10">
            <Button size="lg" href={BIOBUILDERS_FORM_URL} target="_blank" rel="noopener noreferrer" arrow>
              Postula a la red
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
