'use client'

import { useState, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'
import CalendarButton from '@/components/ui/CalendarButton'
import { cn } from '@/lib/utils'

const CASES = [
  {
    tab: 'Soy un fondo de inversión',
    who: 'Fondos de inversión de impacto',
    title: 'Asegurar el retorno en el territorio, no solo colocar el capital.',
    problem: 'Los fondos son buenos gestionando relaciones externas: levantan el capital y lo colocan en las empresas correctas. Pero el de-risking real ocurre en el territorio, en la planta, en la cadena, y ahí la mayoría no tiene capacidad instalada.',
    answer: 'Trabajamos con el fondo para que, una vez colocado el capital, efectivamente genere el retorno o el repago proyectado.',
    location: 'instituciones_fondo',
  },
  {
    tab: 'Soy una agencia u ONG',
    who: 'Agencias de cooperación y ONGs',
    title: 'Que las capacidades instaladas sobrevivan cuando el proyecto termina.',
    problem: 'Años desarrollando asistencia técnica en territorio, con la exigencia de los donantes de mostrar sostenibilidad. Pero el company building real (comercial, gobernanza, acceso a capital) no siempre está entre sus capacidades.',
    answer: 'Trabajamos con la agencia para que sus organizaciones beneficiarias puedan sostener ese crecimiento por su cuenta cuando el financiamiento se retira.',
    location: 'instituciones_agencia',
  },
]

export default function AudienceSwitch() {
  const [k, setK] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const tabCount = CASES.length
    let newIndex = index

    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % tabCount
        e.preventDefault()
        break
      case 'ArrowLeft':
        newIndex = (index - 1 + tabCount) % tabCount
        e.preventDefault()
        break
      case 'Home':
        newIndex = 0
        e.preventDefault()
        break
      case 'End':
        newIndex = tabCount - 1
        e.preventDefault()
        break
      default:
        return
    }

    setK(newIndex)
    setTimeout(() => {
      tabRefs.current[newIndex]?.focus()
    }, 0)
  }

  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="01" className="mb-4">Dos grandes problemas</SectionLabel>
        <h2 className="max-w-[900px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">¿Desde dónde trabajas la bioeconomía?</h2>
        <div role="tablist" aria-label="Tipo de institución" className="mt-11 inline-flex flex-wrap gap-1 rounded-[40px] bg-white p-1 shadow-[0_0_0_1px_rgba(13,13,13,.1)]">
          {CASES.map((c, i) => (
            <button
              key={c.tab}
              type="button"
              role="tab"
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={`aud-tab-${i}`}
              aria-selected={i === k}
              aria-controls={`aud-panel-${i}`}
              tabIndex={i === k ? 0 : -1}
              onClick={() => setK(i)}
              onKeyDown={(e) => handleTabKeyDown(e, i)}
              className={cn('rounded-[30px] px-5 py-3 text-[15px] font-medium transition-colors duration-300', i === k ? 'bg-rl-dark text-white' : 'text-text-secondary hover:text-text-primary')}
            >
              {c.tab}
            </button>
          ))}
        </div>
        <div className="mt-10 grid">
          {CASES.map((c, i) => (
            <div
              key={c.who}
              role="tabpanel"
              id={`aud-panel-${i}`}
              aria-labelledby={`aud-tab-${i}`}
              aria-hidden={i !== k}
              tabIndex={i === k ? 0 : -1}
              className={cn(
                'grid grid-cols-1 gap-10 transition-[opacity,transform] duration-500 [grid-area:1/1] md:grid-cols-[7fr_5fr] md:gap-14',
                i === k ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-3 opacity-0'
              )}
            >
              <div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">{c.who}</span>
                <h3 className="my-5 font-sans text-[32px] font-normal leading-[1.02] tracking-[-0.04em] md:text-[44px]">{c.title}</h3>
                <p className="text-[16px] leading-[1.7] text-text-secondary md:text-[17px]">{c.problem}</p>
              </div>
              <div className="self-start rounded-[4px] border-t-[3px] border-rl-red bg-white p-8 shadow-[0_0_0_1px_rgba(13,13,13,.1)]">
                <span className="mb-3 block font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary">Cómo ayudamos</span>
                <p className="mb-6 text-[18px] leading-[1.5] md:text-[19px]">{c.answer}</p>
                <CalendarButton location={c.location}>Iniciar conversación</CalendarButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
