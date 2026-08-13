import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'

interface IABlurbSectionProps {
  iaBlurb: string
}

export default function IABlurbSection({ iaBlurb }: IABlurbSectionProps) {
  return (
    <section className="section-dark border-t border-border-dark py-16 md:py-20">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Integración con IA</Tag>
          <p className="text-body-lg text-text-muted max-w-2xl">{iaBlurb}</p>
        </SectionReveal>
      </div>
    </section>
  )
}
