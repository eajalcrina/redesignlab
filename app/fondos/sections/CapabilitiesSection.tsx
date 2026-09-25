import SectionLabel from '@/components/ui/SectionLabel'

const CAPS = [
  { n: '01', title: 'Experiencia desarrollando negocios en el territorio', text: 'Hemos estado en la planta, en la cadena, en el territorio, no solo en el modelo de Excel. Esa experiencia operativa real es la que sumamos a cada inversión o intervención.' },
  { n: '02', title: 'Ayudamos a los emprendedores a levantar capital', text: 'Los mejores emprendedores de bioeconomía conocen su industria, pero no siempre el lenguaje del capital. Construimos con ellos el investment readiness real que evita que el deal se pierda en la negociación.' },
  { n: '03', title: 'Aportamos inteligencia continua', text: 'Damos seguimiento técnico y operativo continuo a tu portafolio o a tus intervenciones en bioeconomía, con reportes a tiempo y con el contexto de campo que normalmente falta.' },
]

export default function CapabilitiesSection() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="02" tone="dark" className="mb-4">Lo que aportamos</SectionLabel>
        <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">Tres capacidades que sumamos a tu equipo.</h2>
        <ol className="mt-14 border-t border-border-dark">
          {CAPS.map((c) => (
            <li key={c.n} className="grid grid-cols-1 items-baseline gap-3 border-b border-border-dark py-9 md:grid-cols-[90px_420px_1fr] md:gap-8">
              <span className="font-mono text-[10.5px] tracking-[0.15em] text-rl-red">{c.n}</span>
              <h3 className="font-sans text-[24px] font-normal leading-[1.08] tracking-[-0.03em] md:text-[30px]">{c.title}</h3>
              <p className="max-w-[560px] text-[16px] leading-[1.7] text-text-muted">{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
