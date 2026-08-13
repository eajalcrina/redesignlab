# Reestructuración de Servicios — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la arquitectura actual de Servicios (`/re-intelligence` Lite/Pro + `/crear-valor` + `/redisenar-el-trabajo` + `/transformar-el-modelo`, 15 servicios con nombre propio) por una nueva arquitectura de 4 páginas: un producto central "Rediseña tu negocio" (S/ 2,000/mes, un solo nivel) + tres puertas de entrada puntuales "Pon Orden", "Consigue Capital", "Vende más" (estructura uniforme Diagnóstico → Sprint → Rediseño y consolidación), preservando exactamente el sistema visual, tipográfico y de animación del sitio actual.

**Architecture:** Next.js 14 App Router, componentes hardcodeados (sin CMS). Se crean 3 componentes compartidos nuevos para las páginas puntuales (mismo patrón visual, contenido distinto vía data file), se adapta la carpeta `app/re-intelligence` a `app/redisena-tu-negocio`, se extiende el pipeline de leads ya existente (`/api/lead` → Brevo + Google Sheets) con un tipo de formulario nuevo, y se actualizan nav/footer/home como fuentes únicas.

**Tech Stack:** Next.js 14.2, TypeScript, Tailwind CSS, Framer Motion, `react-intersection-observer`. Sin test runner en el proyecto (no hay Jest/Vitest configurado) — cada tarea se verifica con `npm run build` (typecheck + lint) y verificación visual en navegador (dev server), no con tests unitarios.

## Global Constraints

- **No tocar `data/services.ts`** — sigue siendo consumido por `/crear-valor` y `/transformar-el-modelo`, que quedan huérfanas del nav pero funcionando (decisión del cliente: redirects de esas dos rutas se definen después con datos de Search Console).
- **No tocar Fondos (`/fondos`) ni Ventures (`/ventures`)** — fuera de alcance explícito del documento fuente.
- **Único precio visible en toda la sección Servicios:** `S/ 2,000 / mes`, solo en Rediseña tu negocio. Ningún precio en USD en las 3 páginas puntuales. Excepción confirmada: mención breve del *fee de éxito* en Consigue Capital (sin cifra ancla de precio fijo).
- **Identidad visual sin cambios:** reutilizar literalmente `Tag`, `Button`, `SectionReveal`, `Divider`, `CollapsibleSection`, `DURATION`/`EASE`/`STAGGER` de `lib/animations.ts`, clases `container-rl`, `section-dark`, `section-neutral`, `font-display`/`font-mono`, tokens de color existentes (`rl-red`, `rl-dark`, `rl-neutral`, `text-*`, `border-*`). No se define ningún color, tipografía o espaciado nuevo.
- **Copy verbatim:** todo el texto de la sección 4 del documento fuente se usa tal cual, sin parafrasear. Los bloques marcados `[PENDIENTE DE VALIDAR]` en el documento se implementan con el valor por defecto acordado con Eddie (ver tabla de decisiones abajo) y quedan señalados con un comentario `{/* PENDIENTE DE VALIDAR: ... */}` en el código — nunca se inventan silenciosamente.
- **Redirects:** solo `/re-intelligence → /redisena-tu-negocio` y `/redisenar-el-trabajo → /pon-orden`. `/crear-valor` y `/transformar-el-modelo` NO se redirigen en este plan — quedan vivas, sin enlazar desde nav/footer/home/ThreePaths, pero **sí se mantienen en `app/sitemap.ts`** como red de seguridad SEO (ver Tarea 14).
- **Formulario de páginas de consultoría puntual:** un componente compartido (`ServiciosConsultoriaForm`) con la categoría pre-fijada por página, reutilizando el pipeline existente `/api/lead` → `lib/lead-notify.ts` (Brevo + Google Sheets, tipo `servicios-consultoria`), no un `mailto:`.
- **Contenido recuperado de `/re-intelligence` para "Rediseña tu negocio"** (pedido explícito de Eddie, más allá del documento original): "El problema que resolvemos" + "Lo que una empresa en crecimiento típicamente no tiene" (`ProblemSection`), "Las cuatro verticales estratégicas" (`FourVerticalsSection`), y "Para quién es" con los 3 arquetipos + "no es para esta empresa" (`ArchetypesSection`, con sus enlaces adaptados a las páginas nuevas). Ver Tarea 10.

### Decisiones confirmadas por Eddie (referencia rápida)

| Punto abierto | Decisión |
|---|---|
| Slugs de URL | Los 4 propuestos, tal cual: `/redisena-tu-negocio`, `/pon-orden`, `/consigue-capital`, `/vende-mas` |
| Redirect de `/crear-valor` y `/transformar-el-modelo` | Diferido — no configurar todavía; se mantienen en el sitemap mientras tanto |
| Formulario por página de consultoría puntual | Uno compartido con campo de categoría, tipo de lead `servicios-consultoria` (no `servicios-puntuales`) |
| Fee de éxito en Consigue Capital | Se mantiene mención breve (sin cifra fija) |
| Límite de 15 empresas activas en Rediseña tu negocio | Se mantiene |
| ThreePaths en el home | Enlaza a las 3 páginas de consultoría puntual nuevas (Tarea 12) |
| Recuperar 4 verticales, "el problema que resolvemos", "lo que no tiene" y "para quién es" | Sí, adaptados a "Rediseña tu negocio" (Tarea 10) |
| Formato operativo (horas/mes, brief mensual, proceso de 5 pasos, onboarding 3 meses) | **Sigue sin confirmar explícitamente por Eddie.** Este plan reutiliza el contenido ya existente de Re. Intelligence Pro (más cercano al alcance del producto fusionado) y lo marca con comentario `PENDIENTE DE VALIDAR` en el código — Tarea 10. Confirmar con Eddie antes de publicar en producción. |

---

## Task 1: Extender el pipeline de leads con el tipo "servicios-consultoria"

**Files:**
- Modify: `lib/lead-notify.ts`
- Modify: `app/api/lead/route.ts`

**Interfaces:**
- Produces: `LeadForm` union ahora incluye `'servicios-consultoria'`. `buildEnvelope` acepta `data: { category, contact_name, company, email, phone, message, source, user_agent, referrer }`.

- [ ] **Step 1: Añadir el tipo al union y al whitelist**

En `lib/lead-notify.ts`, modifica el tipo exportado:

```ts
export type LeadForm =
  | 're-intelligence'
  | 'servicios-consultoria'
  | 'cohort-interest'
  | 'enroll'
  | 'maturity-checker'
  | 'resource-download'
```

En `app/api/lead/route.ts`:

```ts
const KNOWN_FORMS: LeadForm[] = [
  're-intelligence',
  'servicios-consultoria',
  'cohort-interest',
  'enroll',
  'maturity-checker',
  'resource-download',
]
```

- [ ] **Step 2: Añadir el caso al switch de `buildEnvelope` en `lib/lead-notify.ts`**

Insértalo como nuevo `case` dentro de la función `buildEnvelope`, antes del `case 'cohort-interest':` existente:

```ts
    case 'servicios-consultoria':
      return {
        emailSubject: `Nuevo lead · ${data.category || 'Servicios'} — ${data.company || data.contact_name || 'sin nombre'}`,
        emailFields: [
          ['Categoría', data.category],
          ['Nombre', data.contact_name],
          ['Empresa', data.company],
          ['Email', data.email],
          ['Teléfono', data.phone],
          ['Situación', data.message],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Servicios de Consultoría',
        sheetRow: [
          ts,
          data.category || '',
          data.contact_name || '',
          data.company || '',
          data.email || '',
          data.phone || '',
          data.message || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }
```

- [ ] **Step 3: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores de TypeScript ni de ESLint.

- [ ] **Step 4: Commit**

```bash
git add lib/lead-notify.ts app/api/lead/route.ts
git commit -m "feat(leads): add servicios-consultoria lead form type"
```

---

## Task 2: Componente de formulario compartido para las 3 páginas puntuales

**Files:**
- Create: `components/forms/ServiciosConsultoriaForm.tsx`

**Interfaces:**
- Consumes: `POST /api/lead` (Task 1).
- Produces: `<ServiciosConsultoriaForm category="Pon Orden" />` — prop `category: 'Pon Orden' | 'Consigue Capital' | 'Vende más'`, usado por las Tareas 7, 8, 9.

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'
import { DURATION, EASE } from '@/lib/animations'

type State = 'idle' | 'submitting' | 'success' | 'error'
type Category = 'Pon Orden' | 'Consigue Capital' | 'Vende más'

interface FormData {
  contact_name: string
  company: string
  email: string
  phone: string
  message: string
}

const initialData: FormData = {
  contact_name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

interface ServiciosConsultoriaFormProps {
  category: Category
  /** Placeholder de la pregunta abierta, adaptado a cada categoría */
  messagePlaceholder: string
}

export default function ServiciosConsultoriaForm({ category, messagePlaceholder }: ServiciosConsultoriaFormProps) {
  const [data, setData] = useState<FormData>(initialData)
  const [state, setState] = useState<State>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const locked = state === 'submitting' || state === 'success'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (locked) return

    if (!data.contact_name || !data.email || !data.message) {
      setErrorMessage('Faltan campos obligatorios.')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMessage(null)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'servicios-consultoria',
          data: {
            category,
            contact_name: data.contact_name.trim(),
            company: data.company.trim() || null,
            email: data.email.trim().toLowerCase(),
            phone: data.phone.trim() || null,
            message: data.message.trim(),
            source: typeof window !== 'undefined' ? window.location.pathname : null,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          },
        }),
      })

      if (!res.ok) throw new Error('request failed')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[servicios-consultoria] submit failed', err)
      setErrorMessage('No pudimos enviar la solicitud. Intenta de nuevo o escríbenos por correo.')
      setState('error')
      return
    }

    setState('success')
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.normal, ease: EASE.out }}
        className="bg-rl-dark text-text-on-dark rounded p-8 md:p-10"
      >
        <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-4">
          Solicitud recibida · Paso 2 / 2
        </p>
        <p className="font-display text-display-sm text-text-on-dark mb-4">
          Ahora agenda tu conversación de fit.
        </p>
        <p className="text-body-md text-text-muted mb-8">
          Tu información ya llegó al equipo. El siguiente paso es agendar directamente la conversación de 30 minutos. Llegaremos con tu información ya revisada.
        </p>

        <a
          href={SITE_CONFIG.calendarUrlFit}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-12 px-8 bg-rl-red text-white font-medium rounded hover:bg-[#d91f5b] transition-colors"
        >
          Agendar conversación de fit &rarr;
        </a>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-rl-dark text-text-on-dark rounded p-8 md:p-10" noValidate>
      <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
        Formulario · {category}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Nombre de contacto" required>
          <input
            type="text"
            value={data.contact_name}
            onChange={(e) => update('contact_name', e.target.value)}
            placeholder="Tu nombre completo"
            disabled={locked}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Empresa">
          <input
            type="text"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Nombre de tu empresa"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <Field label="Correo electrónico" required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="tu@empresa.com"
            disabled={locked}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Celular">
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+51 9XX XXX XXX"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <div className="md:col-span-2">
          <p className="text-label-sm uppercase text-rl-red mb-2">
            Cuéntanos tu situación <span aria-hidden>*</span>
          </p>
          <textarea
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={messagePlaceholder}
            disabled={locked}
            required
            rows={5}
            className="w-full bg-transparent border border-border-dark rounded p-4 text-body-sm text-text-on-dark placeholder:text-text-muted/60 focus:outline-none focus:border-rl-red transition-colors resize-y disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={locked}
          className="h-12 px-8 bg-rl-red text-white font-medium rounded hover:bg-[#d91f5b] transition-colors disabled:opacity-60 cursor-pointer"
        >
          {state === 'submitting' ? 'Enviando…' : 'Enviar solicitud →'}
        </button>
        <p className="text-body-xs text-text-muted/70">
          Después del envío agendarás la reunión directamente · Tus datos quedan privados.
        </p>
      </div>

      <AnimatePresence>
        {state === 'error' && errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-body-sm text-rl-red"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

const inputCls =
  'w-full bg-transparent border-b border-border-dark py-2 text-body-sm text-text-on-dark placeholder:text-text-muted/60 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-label-sm uppercase text-text-muted mb-2">
        {label} {required && <span className="text-rl-red" aria-hidden>*</span>}
      </p>
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/forms/ServiciosConsultoriaForm.tsx
git commit -m "feat(forms): add shared ServiciosConsultoriaForm component"
```

---

## Task 3: Componente compartido "¿Te suena familiar?"

**Files:**
- Create: `components/sections/services/FamiliarSection.tsx`

**Interfaces:**
- Produces: `<FamiliarSection heading="¿Te suena familiar?" bullets={string[]} closing={string} />`

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

interface FamiliarSectionProps {
  heading: string
  bullets: string[]
  closing: string
}

export default function FamiliarSection({ heading, bullets, closing }: FamiliarSectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="section-neutral border-t border-border-light py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-12">
            {heading}
          </h2>
        </SectionReveal>

        <div ref={ref} className="max-w-3xl space-y-5 mb-10">
          {bullets.map((bullet, i) => (
            <motion.div
              key={bullet}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.normal, ease: EASE.out, delay: i * 0.06 }}
              className="flex items-start gap-4"
            >
              <span className="font-mono text-mono-sm text-rl-red mt-1 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-body-lg text-text-secondary">{bullet}</p>
            </motion.div>
          ))}
        </div>

        <SectionReveal delay={0.2}>
          <p className="text-body-lg text-text-primary italic max-w-2xl border-l-2 border-rl-red pl-6">
            {closing}
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/sections/services/FamiliarSection.tsx
git commit -m "feat(services): add shared FamiliarSection component"
```

---

## Task 4: Componente compartido "Cómo trabajamos" (3 pasos)

**Files:**
- Create: `components/sections/services/ThreeStepProcess.tsx`

**Interfaces:**
- Produces: `<ThreeStepProcess steps={{label: string; body: string}[]} intro?={string} />` (exporta también el tipo `ProcessStep`)

- [ ] **Step 1: Crear el componente**

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

export interface ProcessStep {
  label: string
  body: string
}

interface ThreeStepProcessProps {
  steps: ProcessStep[]
  intro?: string
}

export default function ThreeStepProcess({ steps, intro }: ThreeStepProcessProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section className="section-dark border-t border-border-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Cómo trabajamos
          </h2>
          {intro && <p className="text-body-lg text-text-muted max-w-3xl mb-16">{intro}</p>}
        </SectionReveal>

        <div ref={ref} className="relative mt-16">
          <motion.div
            className="hidden md:block absolute top-0 bottom-0 left-8 w-px bg-rl-red origin-top"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: DURATION.verySlow * 1.5, ease: EASE.out, delay: 0.2 }}
          />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.2 + i * 0.15 }}
                className="relative md:pl-24"
              >
                <div className="hidden md:flex items-center justify-center absolute left-0 top-1 w-16 h-16 rounded-full bg-rl-dark border-2 border-rl-red">
                  <span className="font-mono text-mono-md text-rl-red">0{i + 1}</span>
                </div>
                <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em] md:hidden">
                  Paso {i + 1}
                </span>
                <h3 className="font-display text-display-sm text-text-on-dark mb-3">{step.label}</h3>
                <p className="text-body-md text-text-muted max-w-3xl">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/sections/services/ThreeStepProcess.tsx
git commit -m "feat(services): add shared ThreeStepProcess component"
```

---

## Task 5: Componentes compartidos — Hero y CTA de página puntual

**Files:**
- Create: `components/sections/services/ServiceHero.tsx`
- Create: `components/sections/services/ServiceCta.tsx`

**Interfaces:**
- Produces: `<ServiceHero kicker={string} h1={string} tagline={string} />`
- Produces: `<ServiceCta category={'Pon Orden'|'Consigue Capital'|'Vende más'} ctaLabel={string} messagePlaceholder={string} iaBlurb={string} />` (usa `ServiciosConsultoriaForm` de la Tarea 2)

- [ ] **Step 1: Crear `ServiceHero.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Tag from '@/components/ui/Tag'
import { STAGGER, DURATION, EASE } from '@/lib/animations'

interface ServiceHeroProps {
  kicker: string
  h1: string
  tagline: string
}

export default function ServiceHero({ kicker, h1, tagline }: ServiceHeroProps) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[60vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[820px]">
          <motion.div variants={item} className="mb-6">
            <Tag color="red">{kicker}</Tag>
          </motion.div>
          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark mb-8">
            {h1}
          </motion.h1>
          <motion.p variants={item} className="text-body-xl text-text-muted italic max-w-[640px]">
            {tagline}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Crear `ServiceCta.tsx`**

```tsx
'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ServiciosConsultoriaForm from '@/components/forms/ServiciosConsultoriaForm'

type Category = 'Pon Orden' | 'Consigue Capital' | 'Vende más'

interface ServiceCtaProps {
  category: Category
  ctaLabel: string
  messagePlaceholder: string
  iaBlurb: string
}

export default function ServiceCta({ category, ctaLabel, messagePlaceholder, iaBlurb }: ServiceCtaProps) {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-2xl mb-4">
            {ctaLabel}
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mb-4">
            Conversación de fit de 30 minutos · Sin compromiso
          </p>
          <p className="text-body-sm text-text-muted/70 italic max-w-xl mb-12">
            {iaBlurb}
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-2xl mx-auto">
            <ServiciosConsultoriaForm category={category} messagePlaceholder={messagePlaceholder} />
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores.

- [ ] **Step 4: Commit**

```bash
git add components/sections/services/ServiceHero.tsx components/sections/services/ServiceCta.tsx
git commit -m "feat(services): add shared ServiceHero and ServiceCta components"
```

---

## Task 6: Data file con el copy de las 3 páginas puntuales

**Files:**
- Create: `data/servicios-consultoria.ts`

**Interfaces:**
- Produces: `CONSULTORIA_CATEGORIES: Record<'pon-orden'|'consigue-capital'|'vende-mas', ConsultoriaCategoryContent>`, tipo `ConsultoriaCategoryContent` exportado, consumido por Tareas 7-9.

- [ ] **Step 1: Crear el archivo con el copy verbatim del documento**

```ts
export interface ConsultoriaCategoryContent {
  slug: 'pon-orden' | 'consigue-capital' | 'vende-mas'
  navLabel: string
  category: 'Pon Orden' | 'Consigue Capital' | 'Vende más'
  metaTitle: string
  metaDescription: string
  kicker: string
  h1: string
  tagline: string
  familiarHeading: string
  familiarBullets: string[]
  familiarClosing: string
  processIntro?: string
  steps: { label: 'Diagnóstico' | 'Sprint' | 'Rediseño y consolidación'; body: string }[]
  credentialsLine?: string
  extraSection?: { heading: string; body: string }
  iaBlurb: string
  ctaLabel: string
  messagePlaceholder: string
}

export const CONSULTORIA_CATEGORIES: Record<'pon-orden' | 'consigue-capital' | 'vende-mas', ConsultoriaCategoryContent> = {
  'pon-orden': {
    slug: 'pon-orden',
    navLabel: 'Pon Orden',
    category: 'Pon Orden',
    metaTitle: 'Pon Orden | Redesign Lab',
    metaDescription:
      'Diagnóstico integral, plan de acción inmediato y rediseño de tu operación. Para empresas en crecimiento que sienten que el negocio se les desordenó.',
    kicker: 'SERVICIOS',
    h1: 'Pon Orden',
    tagline: 'Cuando la empresa está desordenada, perdiendo dinero, o el crecimiento tropieza con la propia organización.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Me cuesta pagar la planilla y siento que tengo un equipo muy grande.',
      'Facturo bien, pero casi no me queda ganancia — mis costos se comen el margen.',
      'Tengo demasiado producto en stock y no sé bien por qué.',
      'Mis costos operativos suben cada año y no encuentro dónde recortar sin frenar la operación.',
      'Mi equipo trabaja mucho, pero las cosas igual se demoran más de lo que deberían.',
      'Tengo mucha información del negocio, y nadie la procesa ni la usa para decidir.',
      'Cada vez que algo falla, termino resolviéndolo yo, aunque tenga gente a cargo de eso.',
      'No sé si estoy ganando dinero de verdad hasta que veo el estado de cuenta a fin de mes.',
    ],
    familiarClosing:
      'Ninguna de estas es un problema de esfuerzo. Es un problema de estructura — y la estructura no se arregla mirándola desde adentro.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Analizamos tu negocio completo: modelo de negocio, toma de decisiones, capital humano, finanzas, contabilidad, operaciones, comercial y legal. El síntoma casi nunca está donde parece — miramos el negocio entero para encontrar dónde está realmente el problema.',
      },
      {
        label: 'Sprint',
        body: 'Resolvemos lo urgente primero. Los quick wins no esperan al rediseño completo — mientras se diseña la solución de fondo, ya estás capturando resultado.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Rediseñamos la estructura completa: procesos, flujos de información, gobernanza y sistemas de gestión, con plan de transición y métricas de seguimiento. No es un informe que queda en un cajón. Es la arquitectura que tu equipo opera después de que nos vamos.',
      },
    ],
    iaBlurb: 'En Pon Orden: procesos optimizados para gestionar operaciones de forma más inteligente.',
    ctaLabel: 'Quiero poner orden en mi negocio →',
    messagePlaceholder: '¿Qué parte de tu operación sientes que se desordenó? Cuéntanos qué está pasando.',
  },

  'consigue-capital': {
    slug: 'consigue-capital',
    navLabel: 'Consigue Capital',
    category: 'Consigue Capital',
    metaTitle: 'Consigue Capital | Redesign Lab',
    metaDescription:
      'Diagnóstico de tu capacidad real de financiamiento, mapeo de fondos y acompañamiento hasta el resultado. Fondos no reembolsables, deuda de impacto o venta de acciones.',
    kicker: 'SERVICIOS',
    h1: 'Consigue Capital',
    tagline: 'Cuando el negocio tiene mérito real, pero no sabes cómo estructurar la conversación con quien tiene el dinero.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Sé que mi negocio tiene potencial, pero no sé cómo explicárselo a un inversionista o a un fondo.',
      'He tocado puertas de financiamiento y no consigo respuesta, o me piden cosas que no tengo listas.',
      'No sé si me conviene un fondo, un préstamo o vender parte de mi empresa.',
      'Tengo un proyecto claro, pero necesito capital para desarrollarlo y no sé por dónde empezar.',
      'Escuché de fondos de impacto o cooperación internacional, pero no sé si califico ni cómo acceder.',
      'Ya levanté capital una vez, fue lento y desordenado, y sentí que perdí meses valiosos del negocio en el proceso.',
    ],
    // PENDIENTE DE VALIDAR: redactado por Claude a partir de la lógica de la categoría (no dictado
    // línea por línea por Eddie como Pon Orden). El cliente aprobó el conjunto del documento; si se
    // quiere confirmación explícita línea por línea antes de publicar, es razonable pedirla.
    familiarClosing:
      'Tener un buen negocio no es suficiente. Hay que hablar el idioma correcto con quien tiene el dinero, y llegar a la fuente correcta para tu momento — la diferencia entre levantar capital o quedarte esperando una respuesta que nunca llega.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Evaluamos tus necesidades reales de financiamiento y tu capacidad actual de acceder a él. No todos los negocios están listos para lo mismo, ni necesitan el mismo tipo de capital.',
      },
      {
        label: 'Sprint',
        body: 'Según la fuente correcta para tu caso —fondos no reembolsables, deuda de impacto o venta de acciones— diseñamos la narrativa de inversión y mapeamos los fondos activos que de verdad calzan con tu perfil.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Convertimos tu historia en evidencia que resiste el escrutinio de un fondo exigente. Gestionamos las postulaciones y acompañamos el proceso hasta el resultado. Trabajamos con un fee de éxito solo si hay resultado, no un precio fijo que ancla expectativa sin garantizar nada.',
      },
    ],
    credentialsLine: 'Track record: USD 1.5M levantados para el portafolio; USD 80M acompañados en gran industria.',
    iaBlurb: 'En Consigue Capital: procesos optimizados para el mapeo de fondos y la evaluación de capital de impacto.',
    ctaLabel: 'Quiero explorar cómo conseguir capital →',
    messagePlaceholder: '¿Qué tipo de capital estás buscando y para qué lo necesitas? Cuéntanos tu situación.',
  },

  'vende-mas': {
    slug: 'vende-mas',
    navLabel: 'Vende más',
    category: 'Vende más',
    metaTitle: 'Vende más | Redesign Lab',
    metaDescription: 'Diagnóstico de marca, modelo de ingresos y gestión comercial. Mejora lo que ya vendes o valida un producto nuevo antes de lanzarlo.',
    kicker: 'SERVICIOS',
    h1: 'Vende más',
    tagline: 'Cuando necesitas crecer los ingresos: vender más de lo que ya tienes, o lanzar algo nuevo.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Mis ventas están estancadas y no tengo claro por qué, ni qué hacer para moverlas.',
      'Tengo un buen producto, pero siento que no lo estoy vendiendo como se merece.',
      'Invierto en marketing, y no veo que eso se traduzca en más ventas.',
      'Mi marca no comunica lo que realmente hacemos, y sospecho que eso nos cuesta ventas y precio.',
      'Sé que hay una oportunidad de crecer, pero no sé si está en lo que ya vendo o en algo nuevo.',
      'Tengo una idea de producto nuevo, pero no quiero invertir en producirla sin saber si el mercado la quiere.',
      'Mi equipo comercial no tiene un proceso claro — cada quien vende como puede.',
    ],
    // PENDIENTE DE VALIDAR: misma nota que en Consigue Capital — ver arriba.
    familiarClosing:
      'Crecer los ingresos casi nunca es falta de esfuerzo comercial. Es falta de enfoque: saber exactamente dónde está la oportunidad —en marca, en el modelo de ingresos o en el proceso comercial— antes de gastar tiempo y dinero persiguiéndola a ciegas.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Analizamos tu marca, tu modelo de ingresos y tu gestión comercial actual: cómo te perciben tus clientes, dónde está el techo de lo que ya vendes, y dónde hay una oportunidad que todavía no has capturado.',
      },
      {
        label: 'Sprint',
        body: 'Implementamos mejoras concretas en marca, modelo de ingresos o estrategia comercial — la tracción rápida mientras se diseña la estrategia de fondo.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Rediseñamos marketing, posicionamiento de marca, análisis comercial y estrategia de ingresos de forma integral, con procesos que tu equipo sostiene solo, sin depender de nosotros.',
      },
    ],
    extraSection: {
      heading: 'Creación y lanzamiento de nuevos productos',
      body: 'Lanzar sin haber validado es apostar, no emprender. Diseñamos y validamos el producto o negocio antes de comprometer un sol en producirlo: investigación de mercado, validación, proyección financiera y estrategia de lanzamiento.',
    },
    iaBlurb: 'En Vende más: aplicada a marketing, análisis comercial y estrategia de ingresos.',
    ctaLabel: 'Quiero vender más →',
    messagePlaceholder: '¿Qué quieres vender más: lo que ya tienes, o algo nuevo? Cuéntanos tu situación.',
  },
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores.

- [ ] **Step 3: Commit**

```bash
git add data/servicios-consultoria.ts
git commit -m "feat(services): add content data for the 3 punctual service pages"
```

---

## Task 7: Página "Pon Orden" (`/pon-orden`)

**Files:**
- Create: `app/pon-orden/page.tsx`

**Interfaces:**
- Consumes: `CONSULTORIA_CATEGORIES['pon-orden']` (Task 6), `ServiceHero`/`ServiceCta` (Task 5), `FamiliarSection` (Task 3), `ThreeStepProcess` (Task 4).

- [ ] **Step 1: Crear la página**

```tsx
import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import ServiceCta from '@/components/sections/services/ServiceCta'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['pon-orden']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/pon-orden' },
}

export default function PonOrdenPage() {
  return (
    <>
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />
      <ServiceCta
        category={content.category}
        ctaLabel={content.ctaLabel}
        messagePlaceholder={content.messagePlaceholder}
        iaBlurb={content.iaBlurb}
      />
    </>
  )
}
```

- [ ] **Step 2: Verificar visualmente**

Run: `npm run build` (debe compilar), luego levantar `npm run dev` y navegar a `http://localhost:3000/pon-orden`.
Expected: hero oscuro con kicker "SERVICIOS" y H1 "Pon Orden", sección "¿Te suena familiar?" con 8 bullets numerados, "Cómo trabajamos" con 3 pasos animados (línea roja vertical), CTA con formulario funcional.

- [ ] **Step 3: Commit**

```bash
git add app/pon-orden/page.tsx
git commit -m "feat(pon-orden): add Pon Orden page"
```

---

## Task 8: Página "Consigue Capital" (`/consigue-capital`)

**Files:**
- Create: `app/consigue-capital/page.tsx`

**Interfaces:**
- Consumes: `CONSULTORIA_CATEGORIES['consigue-capital']` (Task 6), mismos componentes de Task 7.

- [ ] **Step 1: Crear la página**

```tsx
import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import ServiceCta from '@/components/sections/services/ServiceCta'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['consigue-capital']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/consigue-capital' },
}

export default function ConsigueCapitalPage() {
  return (
    <>
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />

      {content.credentialsLine && (
        <div className="section-neutral border-t border-border-light py-10">
          <div className="container-rl">
            <p className="font-mono text-mono-sm text-text-tertiary uppercase tracking-[0.18em]">
              {content.credentialsLine}
            </p>
          </div>
        </div>
      )}

      <ServiceCta
        category={content.category}
        ctaLabel={content.ctaLabel}
        messagePlaceholder={content.messagePlaceholder}
        iaBlurb={content.iaBlurb}
      />
    </>
  )
}
```

- [ ] **Step 2: Verificar visualmente**

Run: `npm run build`, luego `npm run dev` y navegar a `http://localhost:3000/consigue-capital`.
Expected: igual estructura que Pon Orden + línea de credenciales de track record antes del CTA.

- [ ] **Step 3: Commit**

```bash
git add app/consigue-capital/page.tsx
git commit -m "feat(consigue-capital): add Consigue Capital page"
```

---

## Task 9: Página "Vende más" (`/vende-mas`)

**Files:**
- Create: `app/vende-mas/page.tsx`

**Interfaces:**
- Consumes: `CONSULTORIA_CATEGORIES['vende-mas']` (Task 6), mismos componentes de Task 7.

- [ ] **Step 1: Crear la página**

```tsx
import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/services/ServiceHero'
import FamiliarSection from '@/components/sections/services/FamiliarSection'
import ThreeStepProcess from '@/components/sections/services/ThreeStepProcess'
import ServiceCta from '@/components/sections/services/ServiceCta'
import SectionReveal from '@/components/animations/SectionReveal'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const content = CONSULTORIA_CATEGORIES['vende-mas']

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDescription,
  alternates: { canonical: '/vende-mas' },
}

export default function VendeMasPage() {
  return (
    <>
      <ServiceHero kicker={content.kicker} h1={content.h1} tagline={content.tagline} />
      <FamiliarSection
        heading={content.familiarHeading}
        bullets={content.familiarBullets}
        closing={content.familiarClosing}
      />
      <ThreeStepProcess steps={content.steps} intro={content.processIntro} />

      {content.extraSection && (
        <section className="section-neutral border-t border-border-light py-24 md:py-32">
          <div className="container-rl">
            <SectionReveal>
              <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-2xl mb-4">
                {content.extraSection.heading}
              </h2>
              <p className="text-body-lg text-text-secondary max-w-2xl">
                {content.extraSection.body}
              </p>
            </SectionReveal>
          </div>
        </section>
      )}

      <ServiceCta
        category={content.category}
        ctaLabel={content.ctaLabel}
        messagePlaceholder={content.messagePlaceholder}
        iaBlurb={content.iaBlurb}
      />
    </>
  )
}
```

- [ ] **Step 2: Verificar visualmente**

Run: `npm run build`, luego `npm run dev` y navegar a `http://localhost:3000/vende-mas`.
Expected: igual estructura + sección "Creación y lanzamiento de nuevos productos" antes del CTA.

- [ ] **Step 3: Commit**

```bash
git add app/vende-mas/page.tsx
git commit -m "feat(vende-mas): add Vende más page"
```

---

## Task 10: Página "Rediseña tu negocio" (`/redisena-tu-negocio`)

**Files:**
- Create: `app/redisena-tu-negocio/page.tsx`
- Create: `app/redisena-tu-negocio/sections/HeroSection.tsx`
- Create: `app/redisena-tu-negocio/sections/ProblemSection.tsx` (recuperado y adaptado de `app/re-intelligence/sections/ForWhomIntroSection.tsx`)
- Create: `app/redisena-tu-negocio/sections/FourVerticalsSection.tsx` (recuperado y adaptado de `app/re-intelligence/sections/RealMonthSection.tsx`)
- Create: `app/redisena-tu-negocio/sections/QuienesSomosSection.tsx`
- Create: `app/redisena-tu-negocio/sections/RelatedServicesLinks.tsx`
- Create: `app/redisena-tu-negocio/sections/ArchetypesSection.tsx` (recuperado y adaptado de `app/re-intelligence/sections/ArchetypesSection.tsx`)
- Create: `app/redisena-tu-negocio/sections/IntegracionIASection.tsx`
- Create: `app/redisena-tu-negocio/sections/ApplicationProcess.tsx` (adaptado de `app/re-intelligence/sections/ApplicationProcess.tsx`)
- Create: `app/redisena-tu-negocio/sections/CtaSection.tsx`
- Reuse unchanged: `app/re-intelligence/sections/ProProcessSection.tsx` → copiar a `app/redisena-tu-negocio/sections/ProProcessSection.tsx` (contenido operativo heredado, ver nota `PENDIENTE DE VALIDAR`)
- Reuse unchanged: `app/re-intelligence/sections/FirstThreeMonthsSection.tsx` → copiar a `app/redisena-tu-negocio/sections/FirstThreeMonthsSection.tsx`
- Reuse unchanged: `app/re-intelligence/sections/WhyFifteenSection.tsx` → copiar a `app/redisena-tu-negocio/sections/WhyFifteenSection.tsx` (mantiene el límite de 15, confirmado)
- Reuse unchanged: `app/re-intelligence/sections/AddonSection.tsx` → copiar a `app/redisena-tu-negocio/sections/AddonSection.tsx`
- Reuse unchanged: `app/re-intelligence/sections/ClosingNoteSection.tsx` → copiar a `app/redisena-tu-negocio/sections/ClosingNoteSection.tsx`
- Reuse unchanged: `components/forms/ReIntelligenceForm.tsx` (sin cambios, se sigue usando desde `ApplicationProcess.tsx`)

**Interfaces:**
- Produces: página completa en `/redisena-tu-negocio`, reemplaza a `/re-intelligence`.

> **Nota importante:** esta tarea reutiliza contenido operativo de Re. Intelligence Pro (proceso de 5 pasos, onboarding de 3 meses, "por qué 15 empresas") porque el documento fuente marca ese contenido como `[PENDIENTE DE VALIDAR]` — no fue parte del copy aprobado explícitamente por Eddie en la conversación que originó el documento. Es la opción de menor riesgo (contenido real ya publicado, no inventado), pero **debe confirmarse con Eddie antes de publicar en producción**. El código deja comentarios `PENDIENTE DE VALIDAR` en los puntos exactos.
>
> **Recuperación de contenido pedida por Eddie (2026-08-12):** además de lo que cubría el documento original, esta tarea recupera 3 bloques que existían en `/re-intelligence` y que Eddie pidió explícitamente traer de vuelta, adaptados a "Rediseña tu negocio": (1) "El problema que resolvemos" + "Lo que una empresa mediana típicamente no tiene" (`ProblemSection.tsx`), (2) "Las cuatro verticales estratégicas" (`FourVerticalsSection.tsx`), y (3) "Para quién es" con los 3 arquetipos y la lista "no es para esta empresa" (`ArchetypesSection.tsx`) — esta última se adapta para que sus enlaces apunten a las páginas nuevas en vez de a `/crear-valor`. Como `ArchetypesSection` ahora cubre "para quién es" en detalle, `QuienesSomosSection` se simplifica para no repetir ese contenido dos veces en la misma página.

- [ ] **Step 1: Copiar las 5 secciones que se mantienen sin cambios de contenido**

```bash
mkdir -p app/redisena-tu-negocio/sections
cp app/re-intelligence/sections/ProProcessSection.tsx app/redisena-tu-negocio/sections/ProProcessSection.tsx
cp app/re-intelligence/sections/FirstThreeMonthsSection.tsx app/redisena-tu-negocio/sections/FirstThreeMonthsSection.tsx
cp app/re-intelligence/sections/WhyFifteenSection.tsx app/redisena-tu-negocio/sections/WhyFifteenSection.tsx
cp app/re-intelligence/sections/AddonSection.tsx app/redisena-tu-negocio/sections/AddonSection.tsx
cp app/re-intelligence/sections/ClosingNoteSection.tsx app/redisena-tu-negocio/sections/ClosingNoteSection.tsx
```

En cada uno de estos 5 archivos copiados, añade este comentario justo debajo de `'use client'` (o al inicio del archivo si no lo tiene):

```tsx
// PENDIENTE DE VALIDAR: contenido operativo heredado de Re. Intelligence Pro.
// No fue parte del copy aprobado explícitamente por Eddie para "Rediseña tu negocio".
// Confirmar antes de publicar en producción (ver docs/superpowers/plans/2026-08-12-servicios-redesign.md, Tarea 10).
```

- [ ] **Step 2: Crear `ProblemSection.tsx`** (recuperado de `ForWhomIntroSection.tsx`, renombrando las menciones de "Re. Intelligence" a "Rediseña tu negocio")

```tsx
'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'

const founderPains = [
  '¿Cómo resuelvo este problema operativo que no termina de arreglarse?',
  '¿Cómo organizo al equipo para que la operación sea más eficiente y no dependa tanto de mí?',
  '¿Cómo ajusto la estrategia comercial para alcanzar las metas del año?',
  '¿Estoy leyendo el mercado bien, o se me está escapando algo?',
  '¿Qué fondos reales puedo conseguir para el próximo paso?',
]

const distinctions = [
  { he: 'Rediseña tu negocio', does: 'Pensamiento, análisis, escenarios, planes accionables.' },
  { he: 'Tu equipo', does: 'La ejecución de los planes, siempre.' },
]

export default function ProblemSection() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">El problema que resolvemos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-16">
            El pensamiento estratégico recae sobre las mismas personas que también gestionan la operación.
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-start">
          <SectionReveal delay={0.1}>
            <div className="max-w-2xl space-y-6 text-body-lg text-text-secondary">
              <p>
                En la empresa en crecimiento que ya funciona (con clientes reales, operación probada y un equipo comprometido) el pensamiento estratégico y el análisis de información recaen sobre las mismas personas que gestionan la operación diaria.
              </p>
              <p className="text-text-primary">
                No es falta de capacidad. Es falta de estructura, tiempo y criterio externo.
              </p>
              <p>
                Rediseña tu negocio es el equipo de gerentes externos de tu empresa. <span className="text-text-primary font-medium">No reemplaza a tu equipo. Lo potencia.</span> Produce el criterio que permite que las decisiones sean mejores, más rápidas y con más claridad de la que el equipo puede generar solo.
              </p>
            </div>

            <div className="max-w-2xl mt-12 border-l-2 border-rl-red pl-6">
              <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-4">
                Las preguntas que llegan cada semana
              </p>
              <ul className="space-y-3 mb-8">
                {founderPains.map((q) => (
                  <li key={q} className="text-body-md text-text-primary italic">
                    {q}
                  </li>
                ))}
              </ul>
              <p className="text-body-md text-text-secondary">
                Muchas veces los fundadores tienen una estrategia clara, pero no siempre es la correcta. Rediseña tu negocio te ayuda a <span className="text-text-primary font-medium">validar, pivotar o mejorar</span> tu estrategia de negocio, con las mejores herramientas disponibles y la experiencia del equipo senior de Redesign Lab.
              </p>
            </div>

            <div className="max-w-2xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {distinctions.map((d) => (
                <div key={d.he} className="border-t border-border-light pt-4">
                  <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-2">
                    {d.he}
                  </p>
                  <p className="text-body-md text-text-primary">{d.does}</p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="bg-rl-dark text-text-on-dark p-8 md:p-10 rounded max-w-md lg:w-[420px]">
              <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
                Lo que una empresa en crecimiento
                <br />
                típicamente no tiene
              </p>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un director de estrategia que procese la información y diseñe el plan de crecimiento</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un analista de mercado que monitoree el ecosistema y detecte oportunidades antes de que sean obvias</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un especialista en financiamiento que mapee fondos y sepa a qué capital puede acceder</span>
                </li>
                <li className="flex items-start gap-3 text-body-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                  <span>Un equipo que resuelva problemas con criterio externo, sin el sesgo de quien está adentro todos los días</span>
                </li>
              </ul>
              <div className="pt-6 border-t border-border-dark">
                <p className="font-display text-display-sm text-text-on-dark">
                  Rediseña tu negocio es todo eso.
                </p>
                <p className="text-body-sm text-text-muted mt-2">
                  Sin contratar a nadie.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Crear `FourVerticalsSection.tsx`** (recuperado de `RealMonthSection.tsx`, quitando la referencia a "Lite y Pro" porque ahora es un solo nivel)

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE } from '@/lib/animations'

interface VerticalBlock {
  heading: string
  body: string
}

interface Vertical {
  number: string
  title: string
  intro?: string
  body?: string
  blocks?: VerticalBlock[]
}

const verticales: Vertical[] = [
  {
    number: 'I',
    title: 'Estrategia de Negocios y Tecnología',
    intro:
      'La estrategia de negocio y la tecnología no son dimensiones separadas. La tecnología es una palanca de la estrategia, no un área de soporte. Este bloque trabaja ambas dimensiones de forma integrada.',
    blocks: [
      {
        heading: 'Negocios',
        body: 'Escenarios de crecimiento, posicionamiento competitivo, validación y evolución del modelo de negocio, identificación de palancas de valor y decisiones de dirección de largo plazo. El eje integrador de todos los demás.',
      },
      {
        heading: 'Tecnología',
        body: 'Diagnóstico del stack tecnológico actual, identificación de oportunidades de automatización e integración, evaluación de herramientas de IA aplicables al negocio, y alineación de las decisiones tecnológicas con la estrategia de crecimiento.',
      },
    ],
  },
  {
    number: 'II',
    title: 'Estrategia de Operaciones y Finanzas',
    intro:
      'Las dos dimensiones de eficiencia y sostenibilidad del modelo. Se analizan juntas porque las decisiones operativas tienen consecuencias financieras directas, y las restricciones financieras definen el espacio de lo operativamente posible.',
    blocks: [
      {
        heading: 'Operaciones',
        body: 'Análisis de eficiencia operativa, detección de ineficiencias sistémicas, diseño de estructuras de proceso, mapeo de capacidades del equipo y cuellos de botella que frenan el escalamiento.',
      },
      {
        heading: 'Finanzas',
        body: 'Análisis de estado financiero, proyecciones, estructura de costos, rentabilidad por línea de negocio, gestión del capital de trabajo y criterios para decisiones de inversión y asignación de recursos.',
      },
    ],
  },
  {
    number: 'III',
    title: 'Estrategia Comercial',
    body: 'Análisis de desempeño comercial, diagnóstico de pipeline y conversión, identificación de oportunidades de mercado, ajuste de propuesta de valor y estrategia de crecimiento de ingresos. Monitoreo del ecosistema competitivo y de los movimientos de los actores más relevantes del sector.',
  },
  {
    number: 'IV',
    title: 'Estrategia de Impacto',
    body: 'Medición y comunicación del impacto generado por la empresa: ambiental, social, económico. Alineación entre la estrategia de negocio y los compromisos de impacto, y su traducción en valor diferencial ante clientes, inversores y aliados. En las industrias de bioeconomía, el impacto no es un reporte de sostenibilidad. Es parte de la tesis de valor.',
  },
]

export default function FourVerticalsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Las cuatro verticales estratégicas</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            Un mismo marco. Cuatro frentes que mueven el negocio.
          </h2>
          <p className="text-body-lg text-text-muted max-w-3xl mb-16">
            Rediseña tu negocio trabaja sobre cuatro verticales estratégicas que cubren el espacio completo de decisiones que mueven una empresa en crecimiento.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verticales.map((v, i) => (
            <SectionReveal key={v.number} delay={i * 0.08}>
              <div
                className="border border-border-dark p-8 rounded cursor-pointer hover:border-rl-red/40 transition-colors h-full"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-mono-sm text-rl-red block mb-2 uppercase tracking-[0.18em]">
                      Vertical {v.number}
                    </span>
                    <h3 className="font-display text-display-sm text-text-on-dark">{v.title}</h3>
                  </div>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-rl-red text-xl flex-shrink-0 mt-1"
                  >
                    +
                  </motion.span>
                </div>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: DURATION.fast, ease: EASE.out }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-border-dark space-y-5">
                        {v.intro && (
                          <p className="text-body-sm text-text-muted italic">{v.intro}</p>
                        )}
                        {v.body && <p className="text-body-sm text-text-muted">{v.body}</p>}
                        {v.blocks?.map((b) => (
                          <div key={b.heading}>
                            <p className="text-label-sm uppercase text-rl-red mb-2">{b.heading}</p>
                            <p className="text-body-sm text-text-muted">{b.body}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Crear `ArchetypesSection.tsx`** (recuperado de `app/re-intelligence/sections/ArchetypesSection.tsx`, adaptado: menciones de "Re. Intelligence" → "Rediseña tu negocio", y el enlace "no es para esta empresa" apunta a las páginas nuevas en vez de a `/crear-valor`)

```tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/animations/SectionReveal'
import { DURATION, EASE } from '@/lib/animations'

const archetypes = [
  {
    title: 'El fundador que opera solo',
    description:
      'Dirige una empresa de bioeconomía que ya funciona, donde todo el pensamiento estratégico recae sobre él. No porque no tenga capacidad. Porque no tiene el tiempo ni el equipo para separar el pensamiento de la operación.',
    fit: 'Rediseña tu negocio le da el equipo de gerentes externos que no puede contratar.',
  },
  {
    title: 'El equipo fundador sin área corporativa',
    description:
      'Dos o tres socios que construyeron una empresa con talento operativo sólido pero sin las posiciones corporativas que las grandes empresas tienen para pensar el negocio: dirección estratégica, análisis de mercado, gestión de financiamiento.',
    fit: 'Rediseña tu negocio es ese equipo corporativo: externo, senior, con IA como motor de análisis.',
  },
  {
    title: 'El director de inversión de un fondo',
    description:
      'Con portafolio en bioeconomía que necesita inteligencia continua sobre el ecosistema y criterio externo para las decisiones de acompañamiento donde la proximidad con las empresas invertidas puede nublar el juicio.',
    fit: 'Rediseña tu negocio le da perspectiva externa con conocimiento territorial real.',
  },
]

// PENDIENTE DE VALIDAR (adaptación no cubierta por el documento fuente): los enlaces de
// "no es para esta empresa" se redirigieron desde /crear-valor (huérfana, sin redirect
// todavía) hacia las 3 páginas puntuales y /ventures, siguiendo la lógica de mapeo de
// contenido de la sección 5 del documento. Confirmar con Eddie antes de publicar.
const notForItems: { text: React.ReactNode }[] = [
  {
    text: (
      <>
        Empresas que todavía están definiendo su modelo de negocio. El punto de partida correcto es{' '}
        <Link href="/ventures" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
          Ventures →
        </Link>
      </>
    ),
  },
  {
    text: (
      <>
        Empresas que necesitan resolver algo puntual con entregable definido, no un acompañamiento continuo:{' '}
        <Link href="/pon-orden" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
          Pon Orden
        </Link>
        ,{' '}
        <Link href="/consigue-capital" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
          Consigue Capital
        </Link>
        {' '}o{' '}
        <Link href="/vende-mas" className="text-rl-red underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">
          Vende más
        </Link>
        .
      </>
    ),
  },
  {
    text: 'Empresas que esperan que Rediseña tu negocio ejecute los planes. Rediseña tu negocio produce el criterio; la ejecución es del equipo de la empresa.',
  },
]

export default function ArchetypesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {archetypes.map((arch, i) => (
          <SectionReveal key={arch.title} delay={i * 0.1}>
            <div
              className="border border-border-light p-8 rounded cursor-pointer hover:border-rl-red/30 transition-colors h-full"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="font-mono text-mono-sm text-rl-red block mb-3">0{i + 1}</span>
              <h3 className="font-display text-display-sm text-text-primary mb-3">{arch.title}</h3>
              <p className="text-body-sm text-text-secondary mb-4">{arch.description}</p>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: DURATION.fast, ease: EASE.out }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border-light">
                      <p className="text-body-sm text-rl-red">{arch.fit}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal delay={0.3}>
        <div className="border-t border-border-light pt-12 max-w-3xl">
          <p className="font-mono text-mono-sm text-text-tertiary uppercase tracking-[0.18em] mb-4">
            No es para esta empresa
          </p>
          <h3 className="font-display text-display-sm text-text-primary mb-6">
            Rediseña tu negocio no es el servicio correcto si…
          </h3>
          <ul className="space-y-4">
            {notForItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-body-md text-text-secondary">
                <span className="text-text-tertiary mt-1">✗</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionReveal>
    </>
  )
}
```

- [ ] **Step 5: Crear `HeroSection.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import { SITE_CONFIG } from '@/lib/constants'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  // PENDIENTE DE VALIDAR: límite de 15 empresas confirmado por Eddie; el contador de
  // "empresas activas" (filledSlots) es heredado de Re. Intelligence Pro — actualizar
  // el número real antes de publicar.
  const totalSlots = 15
  const filledSlots = 3

  return (
    <section className="bg-[#080808] text-text-on-dark min-h-[80vh] flex items-center">
      <div className="container-rl py-32 md:py-40">
        <motion.div initial="hidden" animate="visible" variants={container} className="max-w-[820px]">
          <motion.div variants={item} className="mb-6">
            <Tag color="red">ACOMPAÑAMIENTO ESTRATÉGICO CONTINUO</Tag>
          </motion.div>

          <motion.p variants={item} className="font-mono text-mono-lg text-rl-red mb-6">
            S/ 2,000 / mes
          </motion.p>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl text-text-on-dark mb-8">
            Rediseña tu negocio
          </motion.h1>

          <motion.p variants={item} className="text-body-xl text-text-muted italic mb-10 max-w-[640px]">
            Un equipo de gerentes externos con más de 15 años de experiencia, accesible para empresas en crecimiento que ya funcionan.
          </motion.p>

          <motion.div variants={item} className="mb-12">
            <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrl}>
              Agendar conversación de fit &rarr;
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-2 mb-3">
            {Array.from({ length: totalSlots }).map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  i < filledSlots ? 'bg-rl-red' : 'border border-border-dark'
                }`}
              />
            ))}
          </motion.div>
          <motion.p variants={item} className="font-mono text-mono-sm text-text-muted">
            {filledSlots}/{totalSlots} empresas activas
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Crear `QuienesSomosSection.tsx`** (el detalle de "para quién es" ahora lo cubre `ArchetypesSection` del Step 4, así que aquí solo queda la introducción "cómo trabajamos", sin repetirlo)

```tsx
import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'

export default function QuienesSomosSection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Cómo trabajamos</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-6">
            El mismo rigor de las grandes corporaciones, a tu escala y a tu presupuesto.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="max-w-2xl space-y-6">
            <p className="text-body-lg text-text-muted">
              Ejecutado directamente por Eddie Ajalcriña y Lorenzo Ortiz. Sin intermediarios. Sin junior a cargo. El mismo rigor con el que las grandes corporaciones toman decisiones estratégicas, aplicado a tu negocio, a tu escala y a tu presupuesto.
            </p>
            <p className="text-body-lg text-text-muted">
              No buscamos generar valor estratégico abstracto. Buscamos ahorro y mayor ingreso, identificados mes a mes, con un plan que tu equipo puede ejecutar.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Crear `RelatedServicesLinks.tsx`** (sección "Cómo suele empezar esta relación" con las 3 tarjetas hacia las páginas de consultoría puntual)

```tsx
import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import { CONSULTORIA_CATEGORIES } from '@/data/servicios-consultoria'

const cards = Object.values(CONSULTORIA_CATEGORIES)

export default function RelatedServicesLinks() {
  return (
    <section className="section-neutral border-t border-border-light py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Cómo suele empezar esta relación.
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mb-14">
            Casi nadie empieza aquí. Empieza resolviendo algo puntual — poner orden, conseguir capital o vender más — y se convierte en esto cuando el negocio confía en que hay alguien pensando en todo, no solo en lo urgente de esta semana.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <SectionReveal key={c.slug} delay={i * 0.08}>
              <Link
                href={`/${c.slug}`}
                className="group block p-6 border border-border-light rounded hover:border-rl-red hover:bg-white transition-colors h-full"
              >
                <p className="font-display text-display-sm text-text-primary mb-2">{c.navLabel}</p>
                <p className="text-body-sm text-text-secondary mb-4">{c.tagline}</p>
                <span className="text-body-sm text-rl-red group-hover:underline">Explorar →</span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Crear `IntegracionIASection.tsx`** (bloque transversal completo, sección 4.5 del documento)

```tsx
import Tag from '@/components/ui/Tag'
import SectionReveal from '@/components/animations/SectionReveal'

export default function IntegracionIASection() {
  return (
    <section className="section-dark py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">Integración con IA</Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mb-4">
            Cómo aplicamos inteligencia artificial en cada intervención.
          </h2>
        </SectionReveal>

        <div className="max-w-3xl">
          <SectionReveal delay={0.1}>
            <p className="text-body-lg text-text-muted mb-6">
              No es un servicio aparte. Es parte de cómo trabajamos en cada etapa, en las tres áreas. La usamos para analizar y procesar cada caso más rápido y con más precisión, con las herramientas más novedosas disponibles para cada tipo de problema.
            </p>
            <p className="text-body-lg text-text-on-dark">
              Pero el objetivo no es que nosotros trabajemos más rápido. Es que tu equipo se quede con algo. Diseñamos y entregamos <span className="italic">skills</span> a la medida de tu negocio para que tu equipo los use y los replique después de que el proyecto termina. Cada intervención deja capacidad instalada — no un resultado que se apaga cuando nos vamos.
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Crear `ApplicationProcess.tsx`** (adaptado del original — se elimina la distinción Lite/Pro en el paso de onboarding, ya que ahora es un solo nivel)

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionReveal from '@/components/animations/SectionReveal'
import ReIntelligenceForm from '@/components/forms/ReIntelligenceForm'
import { DURATION, EASE } from '@/lib/animations'

// PENDIENTE DE VALIDAR: "proceso de entrada" heredado de Re. Intelligence — confirmar
// con Eddie si se mantiene igual para "Rediseña tu negocio" (ver Tarea 10 del plan).
export default function ApplicationProcess() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <div ref={ref}>
      <SectionReveal>
        <p className="text-body-lg text-text-secondary max-w-3xl mb-20">
          Desde el contacto inicial hasta la primera sesión de trabajo. El formulario asegura que la primera reunión llegue con contexto real. No se gasta tiempo en presentaciones genéricas.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 mb-24">
          <div>
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-mono-md text-rl-red">01</span>
              <h3 className="font-display text-display-sm text-text-primary">Completar el formulario</h3>
            </div>
            <p className="text-body-md text-text-secondary mb-6">
              El formulario es el punto de partida. Permite que el equipo de Redesign Lab llegue a la primera reunión con contexto real sobre la empresa, sin perder tiempo en presentaciones genéricas.
            </p>
            <p className="text-body-md text-text-secondary border-l-2 border-rl-red pl-4 italic">
              <span className="text-text-primary font-medium">La pregunta que más importa:</span> ¿cuál es el desafío más crítico que enfrenta tu empresa en los próximos seis meses y por qué crees que no puedes resolverlo solo? Esa pregunta no es un trámite. Es el primer filtro real.
            </p>
          </div>

          <ReIntelligenceForm />
        </div>
      </SectionReveal>

      <div className="relative">
        <motion.div
          className="hidden md:block absolute top-8 left-0 right-0 h-px bg-rl-red origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: DURATION.verySlow, ease: EASE.out, delay: 0.3 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.4 }}
          >
            <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />
            <span className="font-mono text-mono-sm text-rl-red block mb-2">02</span>
            <h3 className="font-display text-display-sm text-text-primary mb-3">Agendar la reunión de fit</h3>
            <p className="text-body-md text-text-secondary">
              Inmediatamente después de enviar el formulario, agendas la conversación de <span className="text-text-primary font-medium">30 minutos</span> directamente desde el calendario del equipo. Eddie y Lorenzo llegan con tu información ya revisada. No se gasta tiempo en presentaciones desde cero. Si hay alineación real, se activa el onboarding. Si no la hay, se comunica con claridad en la misma reunión y se sugiere el camino más apropiado.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE.out, delay: 0.55 }}
          >
            <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-rl-neutral border-2 border-rl-red mb-6" />
            <span className="font-mono text-mono-sm text-rl-red block mb-2">03</span>
            <h3 className="font-display text-display-sm text-text-primary mb-3">Onboarding</h3>
            <p className="text-body-md text-text-secondary">
              Onboarding de 3 meses (Inmersión → Definición → Activación) antes de entrar al ciclo mensual estándar.
            </p>
          </motion.div>
        </div>
      </div>

      <SectionReveal delay={0.7}>
        <div className="border-t border-border-light mt-20 pt-8 max-w-3xl">
          <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-3">Compromiso mínimo</p>
          <p className="text-body-md text-text-secondary">
            3 meses. Cancelación después del período mínimo con aviso de 30 días. Sin penalidades.
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
```

- [ ] **Step 10: Crear `CtaSection.tsx`**

```tsx
'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section className="bg-[#080808] py-24 md:py-32">
      <div className="container-rl text-center">
        <SectionReveal>
          <p className="font-mono text-mono-lg text-rl-red mb-6">S/ 2,000 / mes</p>
          <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark max-w-3xl mx-auto mb-6">
            Si ya sabes qué estás construyendo, piensa con nosotros en cómo construirlo mejor.
          </h2>
          <p className="text-body-lg text-text-muted max-w-xl mx-auto mb-12">
            30 minutos de conversación de fit. Sin compromiso.
          </p>
          <Button variant="primary" size="lg" href={SITE_CONFIG.calendarUrl}>
            Agendar conversación de fit &rarr;
          </Button>
        </SectionReveal>
      </div>
    </section>
  )
}
```

- [ ] **Step 11: Crear `page.tsx`**

```tsx
import type { Metadata } from 'next'
import CollapsibleSection from '@/components/sections/CollapsibleSection'
import HeroSection from './sections/HeroSection'
import ProblemSection from './sections/ProblemSection'
import FourVerticalsSection from './sections/FourVerticalsSection'
import QuienesSomosSection from './sections/QuienesSomosSection'
import RelatedServicesLinks from './sections/RelatedServicesLinks'
import ProProcessSection from './sections/ProProcessSection'
import FirstThreeMonthsSection from './sections/FirstThreeMonthsSection'
import WhyFifteenSection from './sections/WhyFifteenSection'
import AddonSection from './sections/AddonSection'
import ArchetypesSection from './sections/ArchetypesSection'
import IntegracionIASection from './sections/IntegracionIASection'
import ApplicationProcess from './sections/ApplicationProcess'
import ClosingNoteSection from './sections/ClosingNoteSection'
import CtaSection from './sections/CtaSection'

export const metadata: Metadata = {
  title: 'Rediseña tu negocio | Redesign Lab',
  description:
    'Un equipo de gerentes externos con más de 15 años de experiencia, para empresas en crecimiento que necesitan pensar su estrategia sin armar un equipo interno. S/ 2,000/mes.',
  keywords: [
    'acompañamiento estratégico Perú',
    'gerentes externos empresa en crecimiento',
    'advisory fundadores Perú',
    'estrategia empresa mediana',
  ],
  alternates: { canonical: '/redisena-tu-negocio' },
}

export default function RedisenaTuNegocioPage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <FourVerticalsSection />
      <QuienesSomosSection />
      <RelatedServicesLinks />

      <CollapsibleSection
        id="como-funciona"
        tag="Cómo funciona · proceso de integración"
        heading="De la información del negocio a un plan que tu equipo puede ejecutar."
        preview="5 pasos: articulación de flujos · procesamiento · traducción · sesiones · ejecución."
        tone="neutral"
      >
        <ProProcessSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="primeros-tres-meses"
        tag="Los primeros tres meses"
        heading="El onboarding que hace posible la integración."
        preview="Inmersión → Definición → Activación."
        tone="neutral"
      >
        <FirstThreeMonthsSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="por-que-quince"
        tag="Sobre el límite de empresas"
        heading="¿Por qué 15 empresas y no más?"
        preview="El límite estructural del servicio, explicado."
        tone="dark"
      >
        <WhyFifteenSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="fundraising"
        tag="Servicio complementario"
        heading="Inversión y Fundraising."
        preview="Add-on disponible · estructura caso a caso según el momento de la empresa."
        tone="neutral"
      >
        <AddonSection />
      </CollapsibleSection>

      <CollapsibleSection
        id="para-quien-es"
        tag="Para quién es Rediseña tu negocio"
        heading="Tres perfiles donde el valor es inmediato."
        preview="3 perfiles donde aplica · 3 situaciones donde no es el servicio correcto."
        tone="neutral"
      >
        <ArchetypesSection />
      </CollapsibleSection>

      <IntegracionIASection />

      <CollapsibleSection
        id="proceso-de-entrada"
        tag="El proceso de entrada"
        heading="Tres pasos. Sin burocracia."
        preview="Formulario → reunión de 30 minutos → onboarding. Compromiso mínimo de 3 meses."
        tone="neutral"
      >
        <ApplicationProcess />
      </CollapsibleSection>

      <ClosingNoteSection />
      <CtaSection />
    </>
  )
}
```

- [ ] **Step 12: Verificar visualmente**

Run: `npm run build`, luego `npm run dev` y navegar a `http://localhost:3000/redisena-tu-negocio`.
Expected: hero con "S/ 2,000 / mes" (no USD, no Lite/Pro), sección "El problema que resolvemos" con las preguntas frecuentes y la tarjeta "lo que una empresa en crecimiento típicamente no tiene", sección "Las cuatro verticales estratégicas" con las 4 tarjetas expandibles, sección "Cómo suele empezar esta relación" con 3 tarjetas hacia `/pon-orden`, `/consigue-capital`, `/vende-mas`, secciones colapsables funcionando igual que en `/re-intelligence` hoy (incluida "Para quién es Rediseña tu negocio" con los 3 arquetipos y los enlaces nuevos en "no es para esta empresa"), sección "Integración con IA" visible, CTA final con precio en soles.

- [ ] **Step 13: Commit**

```bash
git add app/redisena-tu-negocio
git commit -m "feat(redisena-tu-negocio): add Rediseña tu negocio page (single tier, S/ 2,000/mes)"
```

---

## Task 11: Actualizar el bloque compartido (home + `/transformar-el-modelo`) como fuente única

**Files:**
- Modify: `components/sections/ReIntelligenceBlock.tsx`

**Interfaces:**
- Consumes: nada nuevo (mismos imports que ya tiene).
- Produces: mismo componente, contenido actualizado — usado sin cambios de API por `app/(landing)/sections/LandingReIntelligence.tsx` y `app/transformar-el-modelo/page.tsx`.

- [ ] **Step 1: Editar el contenido del bloque**

Reemplaza el archivo completo:

```tsx
'use client'

import Link from 'next/link'
import SectionReveal from '@/components/animations/SectionReveal'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Divider from '@/components/ui/Divider'
import { SITE_CONFIG } from '@/lib/constants'

interface ReIntelligenceBlockProps {
  expanded?: boolean
}

const benefits: React.ReactNode[] = [
  '4 horas de trabajo directo cada mes con los socios fundadores de Redesign Lab',
  'Acompañamiento estratégico continuo sobre las cuatro verticales del negocio',
  <>2 consultas de 30 min con especialistas de la <Link href="/builders" className="underline decoration-rl-red/40 hover:decoration-rl-red transition-colors">red de Builders</Link></>,
  'Acceso anticipado a frameworks, herramientas y publicaciones propias',
  'Prioridad en servicios complementarios de Redesign Lab y su red',
]

export default function ReIntelligenceBlock({
  expanded = false,
}: ReIntelligenceBlockProps) {
  return (
    <section className="bg-[#080808] text-text-on-dark py-24 md:py-32">
      <div className="container-rl">
        <div className="max-w-[720px] mx-auto">
          <SectionReveal>
            <Tag color="red" className="mb-6">
              ACOMPAÑAMIENTO ESTRATÉGICO CONTINUO
            </Tag>

            <h2 className="font-display text-display-md md:text-display-lg text-text-on-dark mb-4">
              Rediseña tu negocio
            </h2>

            <p className="font-display text-display-sm text-rl-red mb-6">
              Un equipo de gerentes externos con más de 15 años de experiencia.
            </p>

            <p className="font-mono text-mono-lg text-text-muted mb-8">
              S/ 2,000 / mes
            </p>

            <Divider variant="red" className="w-16 mb-8" animated />

            <p className="text-body-lg text-text-on-dark mb-6">
              Ejecutado directamente por Eddie Ajalcriña y Lorenzo Ortiz. Sin intermediarios. El mismo rigor con el que las grandes corporaciones toman decisiones estratégicas, aplicado a tu negocio, a tu escala y a tu presupuesto.
            </p>

            <p className="text-body-md text-text-muted mb-4">
              Para fundadores o equipos directivos de empresas en crecimiento en Perú que necesitan un equipo de gerentes externos para contrastar decisiones, validar pivots y sostener el foco en el crecimiento — sin el costo de armar un equipo de estrategia interno.
            </p>

            <p className="text-body-md text-text-on-dark/80 mb-12 italic">
              Solo 15 empresas activas a la vez. Porque con 16, el servicio deja de ser lo que es.
            </p>
          </SectionReveal>

          {expanded && (
            <div className="space-y-4 mb-12">
              {benefits.map((benefit, i) => (
                <SectionReveal key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-3 border-b border-border-dark pb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-rl-red mt-2 flex-shrink-0" />
                    <p className="text-body-md text-text-on-dark">
                      {benefit}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          )}

          <SectionReveal delay={0.3}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <Button variant="primary" size="lg" href="/redisena-tu-negocio">
                Conocer Rediseña tu negocio &rarr;
              </Button>
              <Link
                href="/inteligencia-artificial/diagnostico"
                className="inline-flex items-center gap-2 text-body-md text-text-on-dark hover:text-rl-red transition-colors group"
              >
                <span className="underline underline-offset-4 decoration-text-muted/40 group-hover:decoration-rl-red">
                  Empieza con tu diagnóstico IA
                </span>
                <span className="text-rl-red transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
            <p className="text-body-sm text-text-muted/70 mt-4">
              30 minutos de conversación de fit · Sin compromiso
            </p>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npm run build`
Expected: compila sin errores. `SITE_CONFIG` queda importado pero sin usar directamente en este archivo si no se referencia — revisar y quitar el import si ESLint lo marca como no usado (el bloque ya no usa un link `mailto` propio, así que confirma si `SITE_CONFIG` sigue siendo necesario; si no, elimina la línea de import).

- [ ] **Step 3: Verificar visualmente en las 2 páginas que lo consumen**

Run: `npm run dev`, navega a `http://localhost:3000/` y confirma que el bloque "Rediseña tu negocio" (antes "Re. Intelligence") muestra `S/ 2,000 / mes` y el botón enlaza a `/redisena-tu-negocio`. Repite en `http://localhost:3000/transformar-el-modelo`.

- [ ] **Step 4: Commit**

```bash
git add components/sections/ReIntelligenceBlock.tsx
git commit -m "feat(redisena-tu-negocio): update shared block to single-tier S/ 2,000/mes content"
```

---

## Task 12: Actualizar "Tres formas de trabajar" en el home (`ThreePaths.tsx`)

**Files:**
- Modify: `app/(landing)/sections/ThreePaths.tsx`

**Interfaces:**
- Sin cambios de API — mismo componente, `paths` array actualizado con las 3 categorías nuevas.

> **Hallazgo fuera del documento original:** este archivo no está mencionado explícitamente en el documento fuente, pero enlaza directamente a `/crear-valor`, `/redisenar-el-trabajo` y `/transformar-el-modelo` con los nombres de servicio antiguos — es la sección "Tres formas de trabajar con Redesign Lab" justo antes del bloque de Re. Intelligence en el home. Si no se actualiza, el home seguiría promocionando la arquitectura vieja. Se incluye aquí como parte del checklist "referencias cruzadas a actualizar" del documento (sección 7).
>
> **Decisión confirmada por Eddie (2026-08-12):** las 3 tarjetas enlazan a `/pon-orden`, `/consigue-capital`, `/vende-mas` — la puerta de entrada más visible del home hacia la nueva arquitectura. `/crear-valor` y `/transformar-el-modelo` pierden este enlace (y el del footer, Tarea 13) pero **se mantienen indexables**: siguen en `app/sitemap.ts` (Tarea 14) y no reciben `noindex`, así que Google las sigue rastreando vía sitemap + sus propios backlinks mientras Eddie define el redirect definitivo con datos de Search Console. Riesgo de pérdida de tráfico orgánico: bajo y acotado en el tiempo, no permanente — ver explicación completa dada en el chat.

- [ ] **Step 1: Reemplazar el array `paths` y el heading**

En `app/(landing)/sections/ThreePaths.tsx`, reemplaza el array `paths` y el texto del `<h2>`/`<p>` introductorio:

```tsx
const paths = [
  {
    title: 'Pon Orden',
    description: 'Cuando la empresa está desordenada, perdiendo dinero, o el crecimiento tropieza con la propia organización.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/pon-orden',
  },
  {
    title: 'Consigue Capital',
    description: 'Cuando el negocio tiene mérito real, pero no sabes cómo estructurar la conversación con quien tiene el dinero.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/consigue-capital',
  },
  {
    title: 'Vende más',
    description: 'Cuando necesitas crecer los ingresos: vender más de lo que ya tienes, o lanzar algo nuevo.',
    services: 'Diagnóstico · Sprint · Rediseño y consolidación',
    href: '/vende-mas',
  },
]
```

Y actualiza el heading de la sección:

```tsx
        <SectionReveal>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-4">
            Tres puertas de entrada para trabajar con Redesign Lab.
          </h2>
          <p className="text-body-xl text-text-secondary max-w-2xl mb-12">
            Cada organización tiene un punto de entrada. Solo uno es el correcto en este momento.
          </p>
        </SectionReveal>
```

(El resto del componente —animaciones 3D al hover, grid, botón "Ver todos los proyectos"— no cambia.)

- [ ] **Step 2: Verificar visualmente**

Run: `npm run dev`, navega a `http://localhost:3000/` y confirma que las 3 tarjetas muestran "Pon Orden", "Consigue Capital", "Vende más" y enlazan a las rutas nuevas.

- [ ] **Step 3: Commit**

```bash
git add "app/(landing)/sections/ThreePaths.tsx"
git commit -m "feat(home): update ThreePaths section to new services architecture"
```

---

## Task 13: Actualizar Nav y Footer

**Files:**
- Modify: `lib/constants.ts`

**Interfaces:**
- Sin cambios de tipo — mismos shapes de `NAV_LINKS`, `SERVICE_PATHS`, `FOOTER_LINKS`.

- [ ] **Step 1: Actualizar `NAV_LINKS`**

En `lib/constants.ts`, reemplaza el bloque `Servicios` dentro de `NAV_LINKS`:

```ts
  {
    label: 'Servicios',
    href: '/redisena-tu-negocio',
    hasSubmenu: true,
    submenu: [
      { label: 'Rediseña tu negocio', href: '/redisena-tu-negocio' },
      { label: 'Pon Orden', href: '/pon-orden' },
      { label: 'Consigue Capital', href: '/consigue-capital' },
      { label: 'Vende más', href: '/vende-mas' },
    ]
  },
```

- [ ] **Step 2: Actualizar `SERVICE_PATHS`**

```ts
export const SERVICE_PATHS = [
  { label: 'Rediseña tu negocio', href: '/redisena-tu-negocio' },
  { label: 'Pon Orden', href: '/pon-orden' },
  { label: 'Consigue Capital', href: '/consigue-capital' },
  { label: 'Vende más', href: '/vende-mas' },
] as const
```

- [ ] **Step 3: Actualizar `FOOTER_LINKS.servicios`**

```ts
export const FOOTER_LINKS = {
  servicios: {
    titulo: 'Servicios',
    links: [
      { label: 'Rediseña tu negocio', href: '/redisena-tu-negocio' },
      { label: 'Pon Orden', href: '/pon-orden' },
      { label: 'Consigue Capital', href: '/consigue-capital' },
      { label: 'Vende más', href: '/vende-mas' },
      { label: 'Para fondos', href: '/fondos' },
    ],
  },
  ecosistema: {
    titulo: 'Ecosistema',
    links: [
      { label: 'Ventures', href: '/ventures' },
      { label: 'Builders', href: '/builders' },
      { label: 'Conocimiento', href: '/conocimiento' },
      { label: 'IA para bioeconomía', href: '/inteligencia-artificial' },
      { label: 'Proyectos', href: '/proyectos' },
    ],
  },
  contacto: {
    titulo: 'Contacto',
  },
}
```

(El resto de `lib/constants.ts` — `SITE_CONFIG`, `NEWSLETTER`, `ALLIES`, etc. — no cambia.)

- [ ] **Step 4: Verificar visualmente**

Run: `npm run dev`. Verifica en cualquier página: (a) el nav desktop muestra el submenú "Servicios" con las 4 entradas nuevas, (b) el label "Servicios" enlaza a `/redisena-tu-negocio`, (c) el nav mobile (resize a viewport < 1024px) muestra el mismo submenú colapsable, (d) el footer muestra "Servicios" con las 4 entradas + "Para fondos".

- [ ] **Step 5: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(nav): update navigation and footer to new services architecture"
```

---

## Task 14: Redirects 301, sitemap y limpieza de rutas antiguas

**Files:**
- Modify: `next.config.mjs`
- Modify: `app/sitemap.ts`
- Delete: `app/re-intelligence/` (carpeta completa)
- Delete: `app/redisenar-el-trabajo/` (carpeta completa)

**Interfaces:** N/A (configuración de infraestructura).

> Recordatorio: **no** se toca `app/crear-valor/` ni `app/transformar-el-modelo/` — quedan vivas sin redirect, por decisión de Eddie. Precisamente por eso, **sí se mantienen en `app/sitemap.ts`**: es la red de seguridad SEO que evita que queden huérfanas por completo mientras se decide su redirect (ver explicación dada a Eddie en el chat, 2026-08-12).

- [ ] **Step 1: Añadir los redirects**

En `next.config.mjs`, añade dos entradas al array que retorna `redirects()`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.redesignlab.org' }],
        destination: 'https://redesignlab.org/:path*',
        permanent: true,
      },
      {
        // Evita que /index sea indexado como duplicado del home
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        // Re. Intelligence -> Rediseña tu negocio (producto fusionado a un solo nivel)
        source: '/re-intelligence',
        destination: '/redisena-tu-negocio',
        permanent: true,
      },
      {
        // Rediseñar el trabajo -> Pon Orden (contenido absorbido en la nueva categoría)
        source: '/redisenar-el-trabajo',
        destination: '/pon-orden',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 2: Actualizar `app/sitemap.ts`**

Reemplaza `/re-intelligence` y `/redisenar-el-trabajo` (URLs que ahora redirigen, no deben listarse como canónicas en el sitemap) por las 4 rutas nuevas. `/crear-valor` y `/transformar-el-modelo` **se mantienen tal cual** — siguen siendo URLs vivas y deben seguir siendo descubribles por Google vía sitemap aunque ya no tengan enlaces internos:

```ts
import { MetadataRoute } from 'next'
import { projects, getProjectSlug } from '@/data/projects'
import { ventures, getVentureSlug } from '@/data/ventures'
import { bbsPrograms } from '@/data/bbs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redesignlab.org'

  const staticRoutes = [
    '',
    '/crear-valor',
    '/transformar-el-modelo',
    '/redisena-tu-negocio',
    '/pon-orden',
    '/consigue-capital',
    '/vende-mas',
    '/fondos',
    '/inteligencia-artificial',
    '/inteligencia-artificial/diagnostico',
    '/conocimiento',
    '/ventures',
    '/proyectos',
    '/como-pensamos',
    '/builders',
    '/cursos-bbs',
  ]

  const projectRoutes = projects.map((p) => `/proyectos/${getProjectSlug(p)}`)
  const ventureRoutes = ventures.map((v) => `/ventures/${getVentureSlug(v)}`)
  const bbsRoutes = bbsPrograms.map((p) => `/cursos-bbs/${p.slug}`)

  return [...staticRoutes, ...projectRoutes, ...ventureRoutes, ...bbsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority:
      route === ''
        ? 1
        : route.startsWith('/proyectos/') || route.startsWith('/ventures/') || route.startsWith('/cursos-bbs/')
        ? 0.6
        : 0.8,
  }))
}
```

- [ ] **Step 3: Eliminar las carpetas de rutas ya redirigidas**

```bash
git rm -r app/re-intelligence
git rm -r app/redisenar-el-trabajo
```

- [ ] **Step 4: Verificar el build, el sitemap y los redirects**

Run: `npm run build`
Expected: compila sin errores (sin referencias rotas a `app/re-intelligence` o `app/redisenar-el-trabajo` desde otros archivos — si el build falla por un import roto, revisar qué archivo aún importa desde esas carpetas y corregirlo antes de continuar).

Run: `npm run dev`, luego navega a `http://localhost:3000/re-intelligence` y a `http://localhost:3000/redisenar-el-trabajo`.
Expected: ambas redirigen automáticamente (código 308) a `/redisena-tu-negocio` y `/pon-orden` respectivamente.

Navega a `http://localhost:3000/sitemap.xml`.
Expected: lista `/redisena-tu-negocio`, `/pon-orden`, `/consigue-capital`, `/vende-mas`, `/crear-valor`, `/transformar-el-modelo`; ya no lista `/re-intelligence` ni `/redisenar-el-trabajo`.

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs app/sitemap.ts
git commit -m "feat(routing): redirect /re-intelligence and /redisenar-el-trabajo to new pages, update sitemap, remove old route folders"
```

---

## Task 15: QA sitewide — verificación final

**Files:** ninguno (solo verificación).

- [ ] **Step 1: Grep de referencias cruzadas rotas**

```bash
grep -rn "Re\. Intelligence" app components data lib --include="*.tsx" --include="*.ts" | grep -v node_modules
grep -rn "/re-intelligence\|/crear-valor\|/redisenar-el-trabajo\|/transformar-el-modelo" app components lib --include="*.tsx" --include="*.ts" | grep -v node_modules
cat app/sitemap.ts | grep -A 20 "staticRoutes"
```

Expected: ningún resultado inesperado. Toda mención restante de "Re. Intelligence" debe ser intencional (por ejemplo, dentro de comentarios `PENDIENTE DE VALIDAR`, si se decidió mantener el nombre en algún lugar puntual — de lo contrario, corregir). Las únicas referencias a `/crear-valor` y `/transformar-el-modelo` que deben sobrevivir son: (a) enlaces internos de esas mismas páginas (breadcrumbs, "También" cross-links) — no nav/footer/home/ThreePaths —, y (b) su entrada en `app/sitemap.ts` (intencional, es la red de seguridad SEO). `staticRoutes` en `app/sitemap.ts` no debe contener `/re-intelligence` ni `/redisenar-el-trabajo`.

- [ ] **Step 2: Build completo**

Run: `npm run build`
Expected: 0 errores de TypeScript, 0 errores de ESLint, build de Next.js exitoso.

- [ ] **Step 3: Verificación visual de las 4 páginas nuevas + redirects + home + footer**

Con `npm run dev` activo, para cada URL: cargar, leer el texto renderizado (para confirmar copy exacto) y tomar una captura de pantalla del hero:

- `http://localhost:3000/redisena-tu-negocio` — confirmar `S/ 2,000 / mes`, sin mención a "Lite"/"Pro"/USD
- `http://localhost:3000/pon-orden` — confirmar 8 bullets de "¿Te suena familiar?" y 3 pasos
- `http://localhost:3000/consigue-capital` — confirmar 6 bullets, línea de track record, sin precio fijo (solo mención de fee de éxito)
- `http://localhost:3000/vende-mas` — confirmar 7 bullets y la sección "Creación y lanzamiento de nuevos productos"
- `http://localhost:3000/` — confirmar `ThreePaths` con las 3 categorías nuevas y el bloque `Rediseña tu negocio` con `S/ 2,000 / mes`
- `http://localhost:3000/transformar-el-modelo` — confirmar que el bloque embebido también muestra `S/ 2,000 / mes` (fuente única, Tarea 11)
- `http://localhost:3000/re-intelligence` y `http://localhost:3000/redisenar-el-trabajo` — confirmar redirect 301/308 a las rutas nuevas

- [ ] **Step 4: QA visual de jerarquía (sección 2.1 del documento)**

Confirmar en `http://localhost:3000/redisena-tu-negocio` vs. las 3 páginas puntuales: el hero de Rediseña tu negocio ocupa `min-h-[80vh]` y usa `display-xl`, mientras que los heroes puntuales usan `min-h-[60vh]` y `display-lg` — la diferencia de tamaño debe ser visualmente evidente sin necesidad de leer el texto.

- [ ] **Step 5: Probar el formulario compartido end-to-end (staging/local)**

En `http://localhost:3000/pon-orden`, completar el formulario con datos de prueba y enviarlo. Confirmar en la consola del servidor (`preview_logs` o terminal de `npm run dev`) que no hay errores 500, y que la respuesta es `{ ok: true, ... }`. (El envío real de email/sheet depende de `BREVO_API_KEY` / `GOOGLE_SERVICE_ACCOUNT_EMAIL` configurados en `.env.local` — si no están configurados en local, confirmar al menos que no lanza una excepción no controlada.)

- [ ] **Step 6: Reportar a Eddie los puntos `PENDIENTE DE VALIDAR` antes de mergear a `main`**

No hacer commit/push a `main` de este trabajo sin que Eddie confirme explícitamente:
1. El contenido operativo heredado de Re. Intelligence Pro en `/redisena-tu-negocio` (Tarea 10): proceso de 5 pasos, onboarding de 3 meses, "proceso de entrada".
2. Las líneas de "¿Te suena familiar?" de Consigue Capital y Vende más, redactadas por Claude y solo aprobadas en conjunto (marcadas en `data/servicios-consultoria.ts`).
3. El número real de "empresas activas" en el contador de `/redisena-tu-negocio` (`filledSlots` en `HeroSection.tsx`, hoy heredado como `3` del valor que tenía Re. Intelligence Pro).

---

## Self-Review (completado por quien escribió este plan)

**Cobertura del documento fuente:** las 4 páginas (sección 4.1-4.4), el bloque transversal de IA (4.5), el mapeo de contenido (sección 5 — usado para decidir qué NO reconstruir, ya que `/crear-valor` y `/transformar-el-modelo` quedan vivas sin redirect), el retiro de precios (7.1 — ninguna de las 3 páginas puntuales muestra precio, solo mención de fee de éxito en Consigue Capital), el formulario por categoría (7.2 — Tareas 1-2), nav/footer (checklist), y la fuente única para el bloque de home/transformar-el-modelo (7.4 — Tarea 11) están todos cubiertos por una tarea. Los puntos fuera de alcance (Fondos, Ventures, bloques complementarios, Soft Landing) no se tocan en ninguna tarea.

**Placeholders:** ninguno — cada tarea contiene el archivo completo a crear/modificar, sin "TODO" ni "implementar después". Los `PENDIENTE DE VALIDAR` son señalizaciones explícitas del propio documento fuente, no placeholders de este plan.

**Consistencia de tipos:** `ConsultoriaCategoryContent` (Task 6) se consume idénticamente en Tasks 7, 8, 9 y 10 (`RelatedServicesLinks`); `category: Category` de `ServiciosConsultoriaForm` (Task 2) coincide con `category` de `ServiceCta` (Task 5) y con el tipo `LeadForm`/`data.category` de Task 1.
