'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: 'pesca', label: 'Pesca y acuicultura', icon: '🐟' },
  { id: 'agricultura', label: 'Agricultura y agroindustria', icon: '🌾' },
  { id: 'bosque', label: 'Productos del bosque y biocomercio', icon: '🌳' },
  { id: 'alimentos', label: 'Alimentos y bebidas', icon: '🍫' },
  { id: 'textil', label: 'Textil y confecciones', icon: '🧵' },
  { id: 'turismo', label: 'Turismo y hospitalidad', icon: '🏨' },
  { id: 'multi', label: 'Multiples industrias / Fondo de inversion', icon: '🔄' },
  { id: 'otra', label: 'Otra industria relacionada con bioeconomia', icon: '📋' },
]

const COMPANY_SIZES = [
  { id: 'micro', label: 'Menos de 20 personas' },
  { id: 'small', label: 'Entre 20 y 100 personas' },
  { id: 'medium', label: 'Entre 100 y 500 personas' },
  { id: 'large', label: 'Mas de 500 personas' },
]

const QUESTIONS = [
  { id: 'q1', block: 'A' as const, blockName: 'Datos y Visibilidad', number: 1, question: 'Como captura tu organizacion los datos clave de su operacion — produccion, calidad, logistica?', options: ['Principalmente en papel o en conversaciones verbales. El dato no queda registrado de forma sistematica.', 'En hojas de Excel o sistemas basicos, pero de forma inconsistente — a veces esta, a veces no.', 'En sistemas digitales de forma sistematica en al menos la mitad de las areas criticas.', 'En sistemas digitales integrados en practicamente todas las areas criticas, con acceso en tiempo real.'] },
  { id: 'q2', block: 'A' as const, blockName: 'Datos y Visibilidad', number: 2, question: 'Como se informa tu organizacion sobre los cambios en los mercados donde vende — precios, regulacion, competencia, tendencias?', options: ['A traves de conversaciones con contactos del sector o noticias generales. Sin proceso sistematico.', 'Hay una persona que hace seguimiento, pero de forma manual y con frecuencia irregular.', 'Hay un proceso regular con herramientas basicas — Google Alerts, newsletters sectoriales.', 'Un sistema automatizado monitorea variables de mercado en tiempo real y genera alertas ante cambios relevantes.'] },
  { id: 'q3', block: 'A' as const, blockName: 'Datos y Visibilidad', number: 3, question: 'Cuanto tiempo le tomaria responder a un comprador global que solicita la trazabilidad completa de un lote especifico?', options: ['Mas de una semana — y posiblemente no seria completa.', 'Varios dias, con trabajo manual de multiples personas.', '24 a 48 horas con acceso a los sistemas actuales.', 'Minutos u horas — el sistema lo genera automaticamente.'] },
  { id: 'q4', block: 'B' as const, blockName: 'Operaciones y Eficiencia', number: 4, question: 'Como detecta tu organizacion los problemas en sus operaciones — mermas, fallas de equipo, desviaciones de calidad?', options: ['Cuando el problema ya es visible y costoso — despues de que ocurrio.', 'Con revisiones periodicas del equipo de operaciones — semanal o mensual.', 'Con monitoreo mas frecuente en areas criticas y algunos indicadores de alerta basicos.', 'Con sistemas de monitoreo en tiempo real que generan alertas antes de que el problema se vuelva critico.'] },
  { id: 'q5', block: 'B' as const, blockName: 'Operaciones y Eficiencia', number: 5, question: 'Que hace tu organizacion con los residuos o subproductos de su proceso productivo?', options: ['Los descarta o paga por su disposicion. Son un costo.', 'Hay consciencia de que podrian tener valor, pero ninguna iniciativa formalizada todavia.', 'Ha identificado al menos una aplicacion de valor para sus principales subproductos y la esta explorando.', 'Tiene un modelo activo de valorizacion que genera revenue adicional verificable.'] },
  { id: 'q6', block: 'B' as const, blockName: 'Operaciones y Eficiencia', number: 6, question: 'Como planifica tu organizacion su produccion — volumenes, timing, asignacion de recursos?', options: ['Basandose principalmente en la experiencia del equipo y en lo que se hizo el anio anterior.', 'Con analisis historicos y proyecciones manuales en Excel, actualizadas cuando hay tiempo.', 'Con modelos que incorporan datos historicos y algunas variables externas — clima, precios.', 'Con modelos predictivos que incorporan multiples variables en tiempo real y permiten ajuste dinamico.'] },
  { id: 'q7', block: 'C' as const, blockName: 'Innovacion y Producto', number: 7, question: 'Cuanto tiempo le toma a tu organizacion desarrollar un nuevo producto o adaptar uno existente para un nuevo mercado?', options: ['Mas de 18 meses — con alta incertidumbre sobre el resultado.', 'Entre 12 y 18 meses, con varias iteraciones fisicas necesarias.', 'Entre 6 y 12 meses, con procesos de desarrollo relativamente estructurados.', 'Menos de 6 meses, con herramientas de modelado o simulacion que aceleran las iteraciones.'] },
  { id: 'q8', block: 'C' as const, blockName: 'Innovacion y Producto', number: 8, question: 'Como identifica tu organizacion oportunidades de nuevos productos antes de que el mercado las demande abiertamente?', options: ['Reaccionando a lo que los compradores ya estan pidiendo — cuando la demanda ya es visible.', 'Asistiendo a ferias y leyendo publicaciones del sector para identificar tendencias emergentes.', 'Con analisis sistematico de tendencias de consumo y tecnologia, aunque con recursos limitados.', 'Con herramientas que procesan grandes volumenes de seniales de mercado para anticipar demanda emergente.'] },
  { id: 'q9', block: 'D' as const, blockName: 'Impacto y Reporte', number: 9, question: 'Como mide tu organizacion el impacto ambiental y social de sus operaciones?', options: ['No lo mide de forma sistematica. Hay intencion pero no proceso.', 'Lo mide de forma anual con un proceso manual intensivo.', 'Lo mide trimestralmente con un proceso razonablemente sistematizado y metricas definidas.', 'Lo mide de forma continua con datos automatizados en multiples dimensiones — ambiental, social, gobernanza.'] },
  { id: 'q10', block: 'D' as const, blockName: 'Impacto y Reporte', number: 10, question: 'Que tan preparada esta tu organizacion para responder a exigencias de reporte de compradores globales, fondos de inversion o reguladores europeos?', options: ['No esta preparada. Si llegara esa solicitud, seria un problema serio.', 'Podria responder con un esfuerzo significativo — semanas de trabajo manual.', 'Podria responder con un esfuerzo moderado — dias de trabajo con los sistemas actuales.', 'Puede responder rapidamente con datos verificables y continuos en los principales estandares internacionales.'] },
  { id: 'q11', block: 'E' as const, blockName: 'Organizacion y Liderazgo', number: 11, question: 'Cual es la capacidad interna de tu organizacion para gestionar procesos de inteligencia artificial?', options: ['No hay nadie con conocimiento de IA en el equipo. Es territorio completamente desconocido.', 'Hay una o dos personas con interes y conocimiento basico, pero sin mandato formal ni recursos asignados.', 'Hay un responsable claro con mandato y recursos, aunque con capacidades todavia en desarrollo.', 'Hay un equipo con capacidades solidas de analisis de datos e IA, integrado en la toma de decisiones.'] },
  { id: 'q12', block: 'E' as const, blockName: 'Organizacion y Liderazgo', number: 12, question: 'Como describe mejor la posicion del equipo directivo de tu organizacion frente a la inteligencia artificial?', options: ['Esceptico o no es una prioridad. Hay otras urgencias.', 'Interesado pero sin una decision clara. Esta en la conversacion pero no en el presupuesto.', 'Comprometido. Hay una decision tomada y recursos asignados, aunque el proceso esta en etapas iniciales.', 'Liderando activamente. El equipo directivo usa datos e inteligencia de IA en sus propias decisiones cotidianas.'] },
]

type BlockKey = 'A' | 'B' | 'C' | 'D' | 'E'

const BLOCK_INFO: Record<BlockKey, { name: string; max: number; questions: string[] }> = {
  A: { name: 'Datos y Visibilidad', max: 12, questions: ['q1', 'q2', 'q3'] },
  B: { name: 'Operaciones y Eficiencia', max: 12, questions: ['q4', 'q5', 'q6'] },
  C: { name: 'Innovacion y Producto', max: 8, questions: ['q7', 'q8'] },
  D: { name: 'Impacto y Reporte', max: 8, questions: ['q9', 'q10'] },
  E: { name: 'Organizacion y Liderazgo', max: 8, questions: ['q11', 'q12'] },
}

const LEVELS: Record<number, { name: string; range: [number, number]; tagline: string }> = {
  1: { name: 'Observador', range: [12, 19], tagline: 'Tu organizacion esta en el punto de partida. La ventaja disponible es enorme.' },
  2: { name: 'Experimentador', range: [20, 28], tagline: 'Hay iniciativas. El siguiente paso es profundidad, no mas cantidad.' },
  3: { name: 'Constructor', range: [29, 38], tagline: 'Tienes capacidades reales. El reto ahora es integracion y permanencia.' },
  4: { name: 'Lider', range: [39, 48], tagline: 'Estas entre las mas avanzadas de tu industria en LATAM.' },
}

const levelDescriptions: Record<number, { definition: string; companies: string }> = {
  1: {
    definition: 'Tu organizacion esta en el punto de partida. La IA no es parte de las operaciones ni de las decisiones. La captura de datos es manual o inexistente, y las decisiones se basan en experiencia e intuicion.',
    companies: 'Empresas familiares en transicion, cooperativas agricolas, operadores turisticos locales, pequenos exportadores de productos naturales.',
  },
  2: {
    definition: 'Hay iniciativas aisladas de digitalizacion y algunas herramientas basicas de analisis. El reto es que estas iniciativas no estan conectadas entre si ni con la estrategia de negocio.',
    companies: 'Medianas empresas agroindustriales, procesadoras de alimentos con sistemas ERP basicos, exportadores con trazabilidad parcial.',
  },
  3: {
    definition: 'Tu organizacion tiene capacidades reales instaladas. Las herramientas de IA generan resultados medibles en al menos algunas areas. El reto ahora es integracion y permanencia.',
    companies: 'Empresas con equipos de datos, exportadores con certificaciones internacionales, agroindustrias con monitoreo digital parcial.',
  },
  4: {
    definition: 'La IA es parte del sistema operativo de tu organizacion. Las decisiones se toman con datos, los problemas se anticipan, y el reporte de impacto es continuo.',
    companies: 'Lideres de industria con equipos de ciencia de datos, empresas con trazabilidad end-to-end, organizaciones con reporting automatizado.',
  },
}

const levelRecommendations: Record<number, string[]> = {
  1: [
    'Digitaliza los registros de las 3 operaciones mas criticas.',
    'Configura monitoreo basico de tus mercados clave.',
    'Define quien es el responsable del dato en tu organizacion.',
  ],
  2: [
    'Elige las dos palancas de IA de mayor impacto y desarrollalas con profundidad.',
    'Conecta las iniciativas existentes con metricas de negocio verificables.',
    'Invierte en capacitacion del equipo directivo sobre criterio de IA.',
  ],
  3: [
    'Integra las capacidades de IA existentes en un modelo operativo unificado.',
    'Disena la gobernanza de datos y IA como sistema permanente.',
    'Prepara la documentacion de impacto para acceder a capital de siguiente nivel.',
  ],
  4: [
    'Asegurate de que tu ventaja en IA sea visible para compradores y fondos.',
    'Evalua si puedes escalar tu modelo operativo sin escalar proporcionalmente tu equipo.',
    'Considera Re. Intelligence para mantener ventaja competitiva continua.',
  ],
}

// ── Animations ──────────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
}

const TOTAL_STEPS = 16 // welcome + industry + size + 12 questions + lead + results

// ── Component ───────────────────────────────────────────────────────────────

export default function MaturityChecker() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0) // 0=welcome, 1=industry, 2=size, 3-14=questions, 15=lead, 16=results
  const [dir, setDir] = useState(1)
  const [industry, setIndustry] = useState<string | null>(null)
  const [companySize, setCompanySize] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [lead, setLead] = useState({ name: '', email: '', company: '', cargo: '', consent: false })

  const goTo = useCallback((s: number, direction = 1) => { setDir(direction); setStep(s) }, [])
  const next = useCallback(() => goTo(step + 1, 1), [step, goTo])
  const prev = useCallback(() => goTo(step - 1, -1), [step, goTo])

  const handleAnswer = (qId: string, idx: number) => {
    setAnswers((p) => ({ ...p, [qId]: idx + 1 }))
    setTimeout(() => { setDir(1); setStep((s) => s + 1) }, 500)
  }

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)
  const level = totalScore <= 19 ? 1 : totalScore <= 28 ? 2 : totalScore <= 38 ? 3 : 4

  const blockScores = (Object.keys(BLOCK_INFO) as BlockKey[]).map((k) => {
    const info = BLOCK_INFO[k]
    const score = info.questions.reduce((sum, qId) => sum + (answers[qId] || 0), 0)
    return { key: k, ...info, score }
  })

  const lowestBlocks = [...blockScores].sort((a, b) => a.score / a.max - b.score / b.max).slice(0, 3)

  const progress = Math.min(step / TOTAL_STEPS, 1)

  const reset = () => {
    setStep(0); setIndustry(null); setCompanySize(null); setAnswers({}); setLead({ name: '', email: '', company: '', cargo: '', consent: false })
  }

  // ── Entry card ──────────────────────────────────────────────────────────

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full text-left bg-[#141414] p-8 md:p-12 rounded group transition-all hover:ring-1 hover:ring-rl-red/30"
      >
        <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-3">RE-IA Maturity Checker</p>
        <h3 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-4">
          Descubre en que nivel esta tu organizacion frente a la IA aplicada
        </h3>
        <p className="text-body-lg text-text-muted mb-6 max-w-xl">
          12 preguntas. 5 minutos. Un diagnostico accionable con prioridades claras.
        </p>
        <span className="inline-flex items-center gap-2 text-rl-red font-sans font-medium text-body-md group-hover:gap-3 transition-all">
          Comenzar diagnostico <span aria-hidden>&rarr;</span>
        </span>
      </button>
    )
  }

  // ── Overlay ─────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[100] bg-[#141414] overflow-y-auto">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[101]">
        <motion.div className="h-full bg-rl-red" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.3 }} />
      </div>

      {/* Close */}
      <button
        onClick={() => { setOpen(false); reset() }}
        className="fixed top-5 right-5 z-[102] w-10 h-10 flex items-center justify-center text-text-muted hover:text-white transition-colors"
        aria-label="Cerrar"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>

      {/* Back */}
      {step > 0 && step < TOTAL_STEPS && (
        <button
          onClick={prev}
          className="fixed top-5 left-5 z-[102] flex items-center gap-2 text-text-muted hover:text-white text-body-sm transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Atras
        </button>
      )}

      {/* Step counter */}
      {step > 0 && step < TOTAL_STEPS && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[102] text-text-muted text-mono-sm font-mono">
          {step} / {TOTAL_STEPS - 2}
        </div>
      )}

      {/* Content */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20">
        <AnimatePresence mode="wait" custom={dir}>
          {/* Screen 0: Welcome */}
          {step === 0 && (
            <Screen key="welcome" dir={dir}>
              <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-6">RE-IA Maturity Checker</p>
              <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-6 max-w-2xl">
                Evalua la madurez de tu organizacion frente a la inteligencia artificial aplicada
              </h2>
              <p className="text-body-lg text-text-muted mb-10 max-w-xl">
                12 preguntas sobre 5 dimensiones criticas. Al final recibiras tu nivel, un mapa de fortalezas y debilidades, y las palancas prioritarias para avanzar.
              </p>
              <button onClick={next} className="inline-flex items-center gap-2 bg-rl-red text-white px-8 h-12 rounded font-sans font-medium hover:bg-[#d91f5b] transition-colors">
                Comenzar <span aria-hidden>&rarr;</span>
              </button>
            </Screen>
          )}

          {/* Screen 1: Industry */}
          {step === 1 && (
            <Screen key="industry" dir={dir}>
              <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Contexto</p>
              <h2 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-8">
                En que industria opera tu organizacion?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => { setIndustry(ind.id); setTimeout(next, 400) }}
                    className={cn(
                      'flex items-center gap-3 p-4 rounded border text-left transition-all',
                      industry === ind.id
                        ? 'bg-rl-red/20 border-rl-red text-text-on-dark'
                        : 'border-border-dark text-text-muted hover:border-white/20 hover:text-text-on-dark'
                    )}
                  >
                    <span className="text-xl">{ind.icon}</span>
                    <span className="text-body-md">{ind.label}</span>
                    {industry === ind.id && <CheckIcon />}
                  </button>
                ))}
              </div>
            </Screen>
          )}

          {/* Screen 2: Company size */}
          {step === 2 && (
            <Screen key="size" dir={dir}>
              <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Contexto</p>
              <h2 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-8">
                Cuantas personas trabajan en tu organizacion?
              </h2>
              <div className="flex flex-col gap-3 max-w-lg w-full">
                {COMPANY_SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setCompanySize(s.id); setTimeout(next, 400) }}
                    className={cn(
                      'flex items-center justify-between p-4 rounded border text-left transition-all',
                      companySize === s.id
                        ? 'bg-rl-red/20 border-rl-red text-text-on-dark'
                        : 'border-border-dark text-text-muted hover:border-white/20 hover:text-text-on-dark'
                    )}
                  >
                    <span className="text-body-md">{s.label}</span>
                    {companySize === s.id && <CheckIcon />}
                  </button>
                ))}
              </div>
            </Screen>
          )}

          {/* Screens 3-14: Questions */}
          {step >= 3 && step <= 14 && (() => {
            const q = QUESTIONS[step - 3]
            return (
              <Screen key={q.id} dir={dir}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-label-sm uppercase tracking-[0.18em] text-rl-red">Bloque {q.block}</span>
                  <span className="text-text-muted text-body-sm">/ {q.blockName}</span>
                </div>
                <h2 className="font-display text-display-sm text-text-on-dark mb-8 max-w-2xl">
                  {q.question}
                </h2>
                <div className="flex flex-col gap-3 max-w-2xl w-full">
                  {q.options.map((opt, idx) => {
                    const selected = answers[q.id] === idx + 1
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(q.id, idx)}
                        className={cn(
                          'flex items-start gap-3 p-4 rounded border text-left transition-all',
                          selected
                            ? 'bg-rl-red/20 border-rl-red text-text-on-dark'
                            : 'border-border-dark text-text-muted hover:border-white/20 hover:text-text-on-dark'
                        )}
                      >
                        <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-mono-sm font-mono mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-body-md">{opt}</span>
                        {selected && <CheckIcon className="shrink-0 ml-auto mt-0.5" />}
                      </button>
                    )
                  })}
                </div>
              </Screen>
            )
          })()}

          {/* Screen 15: Lead capture */}
          {step === 15 && (
            <Screen key="lead" dir={dir}>
              <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Casi listo</p>
              <h2 className="font-display text-display-sm md:text-display-md text-text-on-dark mb-2">
                Recibe tu diagnostico completo
              </h2>
              <p className="text-body-lg text-text-muted mb-8 max-w-lg">
                Ingresa tus datos para ver los resultados y recibir una copia por correo.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); if (lead.consent) next() }}
                className="flex flex-col gap-4 max-w-md w-full"
              >
                <input placeholder="Nombre completo" value={lead.name} onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))} required className="bg-white/5 border border-border-dark rounded px-4 h-12 text-text-on-dark placeholder:text-text-muted text-body-md outline-none focus:border-rl-red transition-colors" />
                <input placeholder="Email corporativo" type="email" value={lead.email} onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))} required className="bg-white/5 border border-border-dark rounded px-4 h-12 text-text-on-dark placeholder:text-text-muted text-body-md outline-none focus:border-rl-red transition-colors" />
                <input placeholder="Empresa" value={lead.company} onChange={(e) => setLead((p) => ({ ...p, company: e.target.value }))} required className="bg-white/5 border border-border-dark rounded px-4 h-12 text-text-on-dark placeholder:text-text-muted text-body-md outline-none focus:border-rl-red transition-colors" />
                <input placeholder="Cargo" value={lead.cargo} onChange={(e) => setLead((p) => ({ ...p, cargo: e.target.value }))} className="bg-white/5 border border-border-dark rounded px-4 h-12 text-text-on-dark placeholder:text-text-muted text-body-md outline-none focus:border-rl-red transition-colors" />
                <label className="flex items-start gap-3 text-text-muted text-body-sm cursor-pointer">
                  <input type="checkbox" checked={lead.consent} onChange={(e) => setLead((p) => ({ ...p, consent: e.target.checked }))} className="mt-1 accent-rl-red" />
                  Acepto que Redesign Lab use mis datos para enviarme el resultado y comunicaciones relevantes sobre IA aplicada.
                </label>
                <button
                  type="submit"
                  disabled={!lead.consent || !lead.name || !lead.email || !lead.company}
                  className="mt-2 inline-flex items-center justify-center gap-2 bg-rl-red text-white px-8 h-12 rounded font-sans font-medium hover:bg-[#d91f5b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Ver resultados <span aria-hidden>&rarr;</span>
                </button>
              </form>
            </Screen>
          )}

          {/* Screen 16: Results */}
          {step === 16 && (() => {
            const fodaEntries = blockScores.map((b) => ({
              key: b.key,
              name: b.name,
              score: b.score,
              max: b.max,
              pct: b.score / b.max,
            }))
            const sortedFoda = [...fodaEntries].sort((a, b) => b.pct - a.pct)
            const strengths = sortedFoda.slice(0, 2)
            const weaknesses = sortedFoda.slice(-2).reverse()

            return (
            <Screen key="results" dir={dir}>
              <div className="max-w-2xl w-full">
                {/* 1. Level name + tagline */}
                <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Tu resultado</p>
                <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-2">
                  Nivel {level}: {LEVELS[level].name}
                </h2>
                <p className="text-body-lg text-text-muted mb-8">{LEVELS[level].tagline}</p>

                {/* 2. Level definition + typical companies */}
                <div className="bg-white/5 rounded p-6 mb-8">
                  <h3 className="font-display text-display-xs text-text-on-dark mb-3">
                    Que significa ser {LEVELS[level].name}?
                  </h3>
                  <p className="text-body-md text-text-muted mb-4">{levelDescriptions[level].definition}</p>
                  <p className="text-label-sm uppercase tracking-[0.18em] text-text-muted mb-2">Empresas tipicas en este nivel:</p>
                  <p className="text-body-sm text-text-muted">{levelDescriptions[level].companies}</p>
                </div>

                {/* 3. Total score */}
                <div className="bg-white/5 rounded p-6 mb-8">
                  <div className="flex items-end justify-between mb-3">
                    <span className="text-text-muted text-body-sm">Puntaje total</span>
                    <span className="font-mono text-mono-lg text-text-on-dark">{totalScore} / 48</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-rl-red rounded-full" initial={{ width: 0 }} animate={{ width: `${(totalScore / 48) * 100}%` }} transition={{ duration: 0.8, delay: 0.2 }} />
                  </div>
                </div>

                {/* 4. FODA analysis — strengths & weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/5 rounded p-6">
                    <p className="text-label-sm uppercase tracking-[0.18em] text-emerald-400 mb-4">Fortalezas identificadas</p>
                    <ul className="space-y-4">
                      {strengths.map((s) => (
                        <li key={s.key} className="flex items-start gap-3">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                          <div>
                            <p className="text-body-md text-text-on-dark font-medium">{s.name}</p>
                            <p className="text-body-sm text-text-muted">Puntuacion: {s.score}/{s.max} — tu organizacion muestra solidez en esta dimension.</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 rounded p-6">
                    <p className="text-label-sm uppercase tracking-[0.18em] text-red-400 mb-4">Areas de mejora prioritarias</p>
                    <ul className="space-y-4">
                      {weaknesses.map((w) => (
                        <li key={w.key} className="flex items-start gap-3">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-red-400/20 text-red-400 flex items-center justify-center mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v4M6 9h.005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                          </span>
                          <div>
                            <p className="text-body-md text-text-on-dark font-medium">{w.name}</p>
                            <p className="text-body-sm text-text-muted">Puntuacion: {w.score}/{w.max} — esta dimension tiene el mayor espacio de mejora.</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. Block scores */}
                <div className="space-y-4 mb-10">
                  <p className="text-label-sm uppercase tracking-[0.18em] text-text-muted">Por dimension</p>
                  {blockScores.map((b) => (
                    <div key={b.key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-body-sm text-text-on-dark">{b.key}. {b.name}</span>
                        <span className="font-mono text-mono-sm text-text-muted">{b.score}/{b.max}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-rl-red rounded-full" initial={{ width: 0 }} animate={{ width: `${(b.score / b.max) * 100}%` }} transition={{ duration: 0.6, delay: 0.3 }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* 6. Priority levers */}
                <div className="bg-white/5 rounded p-6 mb-10">
                  <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Palancas prioritarias</p>
                  <p className="text-body-sm text-text-muted mb-4">Basado en tus dimensiones con mayor oportunidad de mejora:</p>
                  <ul className="space-y-3">
                    {lowestBlocks.map((b, i) => (
                      <li key={b.key} className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-rl-red/20 text-rl-red flex items-center justify-center text-mono-sm font-mono">{i + 1}</span>
                        <div>
                          <p className="text-body-md text-text-on-dark font-medium">{b.name}</p>
                          <p className="text-body-sm text-text-muted">Puntaje: {b.score}/{b.max} — esta dimension tiene el mayor espacio de mejora relativo.</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 7. Recommendations */}
                <div className="bg-white/5 rounded p-6 mb-10">
                  <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Que hacer en los proximos 90 dias</p>
                  <ol className="space-y-3">
                    {levelRecommendations[level].map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 text-text-on-dark flex items-center justify-center text-mono-sm font-mono">{i + 1}</span>
                        <p className="text-body-md text-text-muted">{rec}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 8. Recommended resources */}
                <div className="bg-white/5 rounded p-6 mb-10">
                  <p className="text-label-sm uppercase tracking-[0.18em] text-rl-red mb-4">Recursos recomendados</p>
                  <div className="flex flex-col gap-3">
                    <a href="/conocimiento" className="text-body-md text-text-muted hover:text-rl-red transition-colors inline-flex items-center gap-2">
                      Descargar el Framework RE-IA completo <span aria-hidden>&rarr;</span>
                    </a>
                    {level <= 2 && (
                      <a href="/redisenar-el-trabajo" className="text-body-md text-text-muted hover:text-rl-red transition-colors inline-flex items-center gap-2">
                        Explorar el Re. Sprint — tu punto de entrada <span aria-hidden>&rarr;</span>
                      </a>
                    )}
                    {level >= 3 && (
                      <a href="/re-intelligence" className="text-body-md text-text-muted hover:text-rl-red transition-colors inline-flex items-center gap-2">
                        Conocer Re. Intelligence <span aria-hidden>&rarr;</span>
                      </a>
                    )}
                    <a href="mailto:eddie@redesignlab.org" className="inline-flex items-center gap-2 bg-rl-red text-white px-6 h-10 rounded font-sans font-medium hover:bg-[#d91f5b] transition-colors w-fit mt-2">
                      Hablar con el equipo <span aria-hidden>&rarr;</span>
                    </a>
                  </div>
                </div>

                {/* 9. CTA */}
                <div className="text-center">
                  <p className="text-body-lg text-text-muted mb-4">Quieres profundizar en tu diagnostico con nuestro equipo?</p>
                  <a
                    href={`mailto:eddie@redesignlab.org?subject=Diagnostico%20RE-IA%20-%20Nivel%20${level}%20(${LEVELS[level].name})&body=Hola%2C%20complete%20el%20maturity%20checker%20y%20obtuve%20nivel%20${level}%20(${totalScore}/48).%20Me%20gustaria%20conversar%20sobre%20los%20proximos%20pasos.`}
                    className="inline-flex items-center gap-2 bg-rl-red text-white px-8 h-12 rounded font-sans font-medium hover:bg-[#d91f5b] transition-colors"
                  >
                    Agendar conversacion <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </div>
            </Screen>
            )
          })()}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function Screen({ children, dir }: { children: React.ReactNode; dir: number }) {
  return (
    <motion.div
      custom={dir}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.0, 0.0, 0.2, 1.0] }}
      className="flex flex-col items-start w-full max-w-3xl"
    >
      {children}
    </motion.div>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('w-5 h-5 text-rl-red', className)} viewBox="0 0 20 20" fill="none">
      <path d="M5 10l3.5 3.5L15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
