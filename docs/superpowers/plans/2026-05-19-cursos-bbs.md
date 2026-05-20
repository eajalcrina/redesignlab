# Cursos BBS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la sección de Programas Ejecutivos de Bio Business School (BBS) anclada en el dropdown Mindset: un hub `/cursos-bbs` con parrilla de cursos y diplomados, y 5 sub-páginas de detalle `/cursos-bbs/[slug]`.

**Architecture:** Next.js 14 App Router. Una fuente de datos tipada (`data/bbs.ts`) alimenta un hub (server component con metadata + JSON-LD) y páginas de detalle dinámicas (`generateStaticParams` + `generateMetadata` + JSON-LD). Componentes de presentación en `components/bbs/`. Estilo light-dominante con heroes oscuros, reutilizando tokens y primitivos existentes (`Tag`, `Button`, `SectionReveal`, `NewsletterForm`, utilidades `container-rl`/`section-*`).

**Tech Stack:** Next.js 14.2, React 18, TypeScript, TailwindCSS, framer-motion, Supabase (solo para la casilla de correo, ya implementada en `NewsletterForm`).

**Verificación (sin harness de tests):** El proyecto no tiene jest/vitest. Cada tarea se verifica con `npx tsc --noEmit` (tipos), y al final con `npm run build` + `npm run lint` + checklist de preview en `npm run dev`. Spec de referencia: `docs/superpowers/specs/2026-05-19-cursos-bbs-design.md`.

**Contenido fuente:** Los 6 Google Docs ya fueron leídos y su contenido está resumido en el spec. El cuerpo completo de cada programa se transcribe a `data/bbs.ts` desde esos docs (IDs en el mensaje original del usuario). El plan define la estructura exacta; el texto largo proviene de los docs.

---

## File Structure

```
data/bbs.ts                              # CREATE — tipos BBSProgram + 5 programas + helpers
lib/constants.ts                         # MODIFY — nav Mindset + BBS_FORM_URL
components/bbs/ProgramHero.tsx            # CREATE — hero oscuro (hub + detalle)
components/bbs/ProgramCard.tsx            # CREATE — tarjeta de parrilla
components/bbs/ProgramGrid.tsx           # CREATE — parrilla agrupada cursos/diplomados
components/bbs/sections/ForWhom.tsx      # CREATE
components/bbs/sections/Outcomes.tsx     # CREATE
components/bbs/sections/Includes.tsx     # CREATE
components/bbs/sections/Curriculum.tsx   # CREATE
components/bbs/sections/FrameworkSpotlight.tsx  # CREATE
components/bbs/sections/Perks.tsx        # CREATE
components/bbs/sections/Faculty.tsx      # CREATE
components/bbs/sections/ProgramFAQ.tsx   # CREATE
components/bbs/sections/PriceBlock.tsx   # CREATE
components/bbs/ProgramDetail.tsx         # CREATE — compone secciones de detalle
app/cursos-bbs/page.tsx                  # CREATE — hub
app/cursos-bbs/sections/HubIntro.tsx     # CREATE — intro + 4 principios
app/cursos-bbs/sections/HowItWorks.tsx   # CREATE — cómo funcionan (5 puntos)
app/cursos-bbs/sections/WhyBBS.tsx       # CREATE — por qué BBS + guía perfil→programa + cohortes
app/cursos-bbs/[slug]/page.tsx           # CREATE — detalle dinámico
app/sitemap.ts                           # MODIFY — + hub y 5 detalles
```

---

## Task 1: Constantes y navegación

**Files:**
- Modify: `lib/constants.ts`

- [ ] **Step 1: Agregar `BBS_FORM_URL` y el ítem de nav**

En `lib/constants.ts`, dentro de `SITE_CONFIG` o como export independiente, agregar el placeholder del formulario (Eddie lo reemplazará luego):

```ts
// Placeholder del Google Form de inscripción BBS (reemplazar cuando esté disponible).
export const BBS_FORM_URL = '#'
```

En `NAV_LINKS`, dentro del objeto con `label: 'Mindset'`, agregar al final del array `submenu`:

```ts
      { label: 'Cursos BBS', href: '/cursos-bbs' },
```

El submenú de Mindset queda: Cómo pensamos, Conocimiento, Builders, Cursos BBS.

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores. `NAV_LINKS` usa `as const`; el nuevo objeto sigue el mismo shape (`{ label, href }`).

- [ ] **Step 3: Commit**

```bash
git add lib/constants.ts
git commit -m "feat(bbs): add Cursos BBS nav item and form URL constant"
```

---

## Task 2: Modelo de datos y contenido (`data/bbs.ts`)

**Files:**
- Create: `data/bbs.ts`

- [ ] **Step 1: Definir tipos y helpers**

Crear `data/bbs.ts` con la interfaz exacta:

```ts
export type ProgramType = 'curso' | 'diplomado'

export interface CurriculumMonth {
  month: string                 // "MES 1 — TERRITORIO Y OPORTUNIDAD"
  subtitle?: string             // "Aprender a ver lo que otros no pueden ver"
  modules: { code: string; title: string; body: string }[]
}

export interface BBSProgram {
  slug: string
  type: ProgramType
  code: string                  // "CURSO EJECUTIVO 01"
  title: string
  tagline: string
  summary: string               // resumen corto para la tarjeta
  audience: string              // "Dirigido a"
  duration: string
  modality: string
  deliverable: string
  price: { usd: string; pen: string }
  startDate: string
  collaborator?: string
  enrollUrl?: string            // override del Google Form

  hero: { lines: string[]; paragraph: string }
  problem?: { heading: string; body: string[] }
  forWhom?: { title: string; body: string }[]
  notFor?: string
  outcomes?: { lead: string; body: string }[]
  includes?: string[]
  framework?: { heading: string; body: string[] }[]
  curriculum?: CurriculumMonth[]
  perks: { all: string[]; topHeading: string; top: string[] }
  faculty: { name: string; role: string }[]
  faq: { q: string; a: string }[]
}

export const bbsPrograms: BBSProgram[] = [
  // 5 entradas — ver Step 2..6
]

export const bbsCourses = bbsPrograms.filter((p) => p.type === 'curso')
export const bbsDiplomas = bbsPrograms.filter((p) => p.type === 'diplomado')
export const getProgram = (slug: string): BBSProgram | undefined =>
  bbsPrograms.find((p) => p.slug === slug)
export const allProgramSlugs = (): string[] => bbsPrograms.map((p) => p.slug)
```

- [ ] **Step 2: Programa 1 — `ia-nuevos-profesionales` (curso)**

Agregar al array `bbsPrograms` el objeto del Curso 01. Datos factuales (de la tabla del spec):
`slug:'ia-nuevos-profesionales'`, `type:'curso'`, `code:'CURSO EJECUTIVO 01'`, `title:'IA para Nuevos Profesionales'`, `tagline:'Rediseña tu camino en el mundo corporativo'`, `duration:'4 semanas · 4 sesiones en vivo de 2h'`, `modality:'En vivo · Google Meet + Drive'`, `deliverable:'Propuesta de Transformación Corporativa con IA'`, `price:{usd:'$70 USD', pen:'S/. 250'}`, `startDate:'22 Junio 2026'`.
Campos de detalle (`hero`, `problem` = "EL PUNTO DE PARTIDA", `forWhom` = 2 perfiles senior/joven, `outcomes` = 6 viñetas "Al terminar habrás", `includes` = 6 items "Qué incluye", `perks` = todos + 2 mejores, `faculty` = Eddie, Lorenzo, + Especialista invitado, `faq` = 5 preguntas) se transcriben **verbatim** desde el doc `1CkV5OuvMhqr9bh8LJ7b-RzWNa806TzNEuwaxb_XUERM` (capturado en sesión). Sin `framework`, sin `curriculum`.
`summary`: usar el copy del hero/intro del hub para este programa: "Aprende las herramientas de IA más demandadas — y el mindset para liderar la transformación corporativa, no solo ejecutarla."
`audience`: "Profesionales en entornos corporativos que buscan liderar la transformación con IA".

- [ ] **Step 3: Programa 2 — `ia-pymes-emprendimientos` (curso)**

Doc `16FRRC2lvHqR-Cc9ea1fXzTAqeqgKWcBRq3zQGsaKZjM`. `price:{usd:'$150 USD', pen:'S/. 540'}`, `deliverable:'Plan de Adopción de IA en la empresa'`. `problem` = "EL PROBLEMA REAL", `forWhom` = 4 perfiles, `notFor` = "Fundadores en etapa cero...", `outcomes` = 5, `includes` = 6, `framework` = bloque "RE. INTELLIGENCE — EL SIGUIENTE NIVEL", `perks`, `faculty`, `faq` = 5. `summary`: "Las herramientas de IA para empresas reales — y el plan estratégico para que funcionen en tus productos, procesos y equipo."

- [ ] **Step 4: Programa 3 — `marcas-regenerativas` (curso)**

Doc `1hJlG3QSzvhMBmVKcnVUsOuX9npjiEPDH4jBbOtz7MQw`. `price:{usd:'$70 USD', pen:'S/. 250'}`, `deliverable:'Brand Starter Kit Regenerativo'`, `collaborator:'Thousandfold · thousandfold.la'`. `problem` = "EL PROBLEMA TIENE NOMBRE Y TIENE COSTO", `forWhom` = 4 perfiles, `notFor`, `outcomes` = 5, `includes` = 6, `framework` = bloque "RIZOMA — EL FRAMEWORK QUE LO HACE POSIBLE", `perks`, `faculty`, `faq` = 5. `summary`: "Construye una marca regenerativa que captura el valor real de tu producto — con el framework RIZOMA de Thousandfold."

- [ ] **Step 5: Programa 4 — `negocios-regenerativos` (diplomado)**

Doc `1yqcpCbY5njQ-9xj4BZw6S3ZxPm5QsZV8P3hzxFP1Ra0`. `price:{usd:'$297 USD', pen:'S/. 1,080'}`, `duration:'3 meses · 12 sesiones en vivo de 2h · Demo Day final'`, `deliverable:'Portafolio de Negocio Regenerativo'`, `collaborator:'Thousandfold · thousandfold.la'`. `problem`, `forWhom` = 4 perfiles, `outcomes` = 6, `includes` = 6, `curriculum` = 3 meses × 4 módulos (12 módulos: MES 1 Territorio y Oportunidad, MES 2 Modelo y Estructura, MES 3 Capital y Escala — transcribir code/title/body de cada módulo), `framework` = bloques RIZOMA + FARA + "Estándares internacionales", `perks`, `faculty`, `faq` = 5. `summary`: "El método RIZOMA + FARA para diseñar negocios regenerativos rentables, invertibles y escalables desde el territorio."

- [ ] **Step 6: Programa 5 — `economia-circular-industria` (diplomado)**

Doc `1jVB-cBTmfLFl5_fcuVkZd73SoQjIQQeRUX4_GVbcoIs`. `price:{usd:'$297 USD', pen:'S/. 1,080'}`, `duration:'3 meses · 12 sesiones en vivo de 2h · Demo Day final'`, `deliverable:'Roadmap de Implementación de Economía Circular'`. `problem`, `forWhom` = 4 perfiles, `notFor`, `outcomes` = 5, `includes` = 6, `curriculum` = 3 meses × 4 módulos (MES 1 Diagnóstico y Fundamentos, MES 2 Diseño e Implementación, MES 3 Roadmap y Ejecución), `framework` = "LOS REFERENTES METODOLÓGICOS" (Nordic Toolkit, ISO 59000, WBCSD, Ellen MacArthur), `perks`, `faculty`, `faq` = 5. `summary`: "De la teoría al Roadmap de Economía Circular que tu empresa puede ejecutar — con Nordic Toolkit e ISO 59000."

- [ ] **Step 7: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores. Cada objeto cumple `BBSProgram`; los 5 slugs son únicos; diplomados tienen `curriculum`, cursos no.

- [ ] **Step 8: Commit**

```bash
git add data/bbs.ts
git commit -m "feat(bbs): add program data model and content for 5 programs"
```

---

## Task 3: Componente `ProgramHero`

**Files:**
- Create: `components/bbs/ProgramHero.tsx`

- [ ] **Step 1: Implementar el hero oscuro**

```tsx
'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

interface ProgramHeroProps {
  tag: string
  lines: string[]
  paragraph?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function ProgramHero({ tag, lines, paragraph, ctaLabel, ctaHref }: ProgramHeroProps) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: STAGGER.slow } } }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }
  const external = ctaHref?.startsWith('http')

  return (
    <section className="section-dark min-h-[60vh] flex items-center relative">
      <div className="container-rl py-32 md:py-40 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-8">{tag}</Tag>
          </motion.div>
          {lines.map((line, i) => (
            <motion.h1
              key={i}
              variants={item}
              className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[1.0] lg:font-normal text-text-on-dark max-w-5xl"
            >
              {line}
            </motion.h1>
          ))}
          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } } }}
            className="h-0.5 bg-rl-red w-24 my-6"
          />
          {paragraph && (
            <motion.p variants={item} className="mt-2 text-body-xl text-text-muted max-w-2xl">
              {paragraph}
            </motion.p>
          )}
          {ctaLabel && ctaHref && (
            <motion.div variants={item} className="mt-10">
              <Button variant="primary" href={ctaHref} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                {ctaLabel}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar que `Button` acepta `target`/`rel`**

Run: `npx tsc --noEmit`
Expected: si `Button` no acepta `target`/`rel`, ajustar `components/ui/Button.tsx` para pasar props extra a su `<a>` (spread de `...rest`) — leer el archivo y añadir soporte mínimo. Si ya los acepta, sin cambios. Sin errores de tipos al terminar.

- [ ] **Step 3: Commit**

```bash
git add components/bbs/ProgramHero.tsx components/ui/Button.tsx
git commit -m "feat(bbs): add ProgramHero component"
```

---

## Task 4: Componente `ProgramCard`

**Files:**
- Create: `components/bbs/ProgramCard.tsx`

- [ ] **Step 1: Implementar la tarjeta**

La tarjeta completa enlaza al detalle; el CTA "Inscribirse" abre el form sin navegar (stopPropagation, ya que va dentro de un Link).

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { BBSProgram } from '@/data/bbs'
import { BBS_FORM_URL } from '@/lib/constants'

export default function ProgramCard({ program }: { program: BBSProgram }) {
  const enrollHref = program.enrollUrl || BBS_FORM_URL
  const external = enrollHref.startsWith('http')

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        href={`/cursos-bbs/${program.slug}`}
        className="group flex h-full flex-col border border-border-light rounded p-8 bg-rl-white hover:border-rl-red/40 transition-colors"
      >
        <p className="font-mono text-mono-sm text-rl-red uppercase mb-4">{program.code}</p>
        <h3 className="font-display text-display-sm text-text-primary mb-2">{program.title}</h3>
        <p className="text-body-sm text-text-tertiary italic mb-4">{program.tagline}</p>
        <p className="text-body-sm text-text-secondary mb-6 flex-1">{program.summary}</p>
        <p className="font-mono text-mono-md text-text-primary mb-1">{program.price.usd} · {program.price.pen}</p>
        <p className="text-body-xs text-text-tertiary mb-6">{program.duration}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-label-sm uppercase text-text-tertiary group-hover:text-rl-red transition-colors">
            Ver programa →
          </span>
          <a
            href={enrollHref}
            onClick={(e) => e.stopPropagation()}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-body-sm font-medium text-rl-red hover:underline"
          >
            Inscribirse
          </a>
        </div>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/bbs/ProgramCard.tsx
git commit -m "feat(bbs): add ProgramCard component"
```

---

## Task 5: Componente `ProgramGrid`

**Files:**
- Create: `components/bbs/ProgramGrid.tsx`

- [ ] **Step 1: Implementar la parrilla agrupada**

```tsx
'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import ProgramCard from './ProgramCard'
import { bbsCourses, bbsDiplomas } from '@/data/bbs'

function Group({ tag, title, programs }: { tag: string; title: string; programs: typeof bbsCourses }) {
  return (
    <div className="mb-20 last:mb-0">
      <SectionReveal>
        <Tag color="red" className="mb-4">{tag}</Tag>
        <h2 className="font-display text-display-md md:text-display-lg text-text-primary mb-10">{title}</h2>
      </SectionReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((p, i) => (
          <SectionReveal key={p.slug} delay={i * 0.05}>
            <ProgramCard program={p} />
          </SectionReveal>
        ))}
      </div>
    </div>
  )
}

export default function ProgramGrid() {
  return (
    <section className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <Group tag="Cursos Ejecutivos" title="Cursos Ejecutivos" programs={bbsCourses} />
        <Group tag="Diplomados Ejecutivos" title="Diplomados Ejecutivos" programs={bbsDiplomas} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/bbs/ProgramGrid.tsx
git commit -m "feat(bbs): add ProgramGrid component"
```

---

## Task 6: Secciones del hub (intro, cómo funciona, por qué BBS)

**Files:**
- Create: `app/cursos-bbs/sections/HubIntro.tsx`
- Create: `app/cursos-bbs/sections/HowItWorks.tsx`
- Create: `app/cursos-bbs/sections/WhyBBS.tsx`

- [ ] **Step 1: `HubIntro.tsx` — intro + 4 principios**

Sección `section-neutral`. Párrafo de introducción de BBS + grid de 4 principios (Aplicación antes que teoría · Metodologías de frontera curadas para LATAM · Casos internacionales con criterio regional · IA y tecnología en el centro). Cada principio: título display-sm + body desde el doc plantilla. Grid `md:grid-cols-2 gap-x-12 gap-y-10`. Envolver bloques en `SectionReveal`. Texto verbatim del doc plantilla `1sRArhyAZhEXyw3DDPIXfMZCZkBQvr8t71L09BduATdg`.

- [ ] **Step 2: `HowItWorks.tsx` — cómo funcionan los programas (5 puntos)**

Sección `section-neutral` o cream. Título "Cómo funcionan los programas" + 5 ítems (sesiones en vivo semanales · todo en Google Workspace · entregable construido semana a semana · sustentación ante comité · comunidad BBS de por vida). Lista con número o viñeta roja. Texto verbatim del doc plantilla (limpiar los glifos `ð` corruptos por etiquetas/íconos simples o eliminarlos).

- [ ] **Step 3: `WhyBBS.tsx` — por qué BBS + guía + cohortes**

Tres bloques:
1. "Por qué BBS y Redesign Lab": párrafos sobre Eddie + Lorenzo (practitioners), Redesign Lab, Thousandfold.
2. "¿No sabes por dónde empezar?": tabla de 5 filas (perfil → programa) usando `<table>` o grid de 2 columnas responsivo; cada programa enlaza a su detalle. Contacto `bbs@redesignlab.org` (mailto).
3. "Próximas cohortes": en `section-dark`, copy de cupos limitados + `<NewsletterForm variant="full" />` (importado de `@/components/ui/NewsletterForm`) + `Button` "Regístrate aquí" → `BBS_FORM_URL` (target _blank si externo). Importar `BBS_FORM_URL` de constants.

Cada bloque puede ser su propia `<section>`; mantener `WhyBBS` como composición de los tres para acotar archivos. Envolver en `SectionReveal`.

- [ ] **Step 4: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add app/cursos-bbs/sections/
git commit -m "feat(bbs): add hub sections (intro, how-it-works, why-bbs)"
```

---

## Task 7: Página hub `/cursos-bbs`

**Files:**
- Create: `app/cursos-bbs/page.tsx`

- [ ] **Step 1: Implementar el hub con metadata y JSON-LD**

```tsx
import type { Metadata } from 'next'
import ProgramHero from '@/components/bbs/ProgramHero'
import ProgramGrid from '@/components/bbs/ProgramGrid'
import HubIntro from './sections/HubIntro'
import HowItWorks from './sections/HowItWorks'
import WhyBBS from './sections/WhyBBS'

export const metadata: Metadata = {
  title: 'Cursos BBS — Programas Ejecutivos',
  description:
    'Programas ejecutivos de Bio Business School: cursos y diplomados en IA aplicada, marcas regenerativas, negocios regenerativos y economía circular. Diseñados por Redesign Lab.',
  keywords: ['programas ejecutivos', 'IA para empresas', 'economía circular', 'negocios regenerativos', 'Bio Business School'],
  alternates: { canonical: '/cursos-bbs' },
}

export default function CursosBBSPage() {
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Programas Ejecutivos BBS',
    itemListElement: [
      // generar desde bbsPrograms: { '@type': 'ListItem', position, url, name }
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <ProgramHero
        tag="MINDSET → CURSOS BBS"
        lines={['No formamos estudiantes.', 'Formamos profesionales que transforman', 'empresas, industrias y territorios.']}
        paragraph="Programas Ejecutivos BBS — diseñados por Redesign Lab, en colaboración con Thousandfold."
      />
      <HubIntro />
      <ProgramGrid />
      <HowItWorks />
      <WhyBBS />
    </>
  )
}
```

Completar `itemListElement` mapeando `bbsPrograms` (importar `bbsPrograms`) a `{ '@type':'ListItem', position:i+1, url:'https://redesignlab.org/cursos-bbs/'+p.slug, name:p.title }`.

- [ ] **Step 2: Verificar build de la ruta**

Run: `npx tsc --noEmit`
Expected: sin errores. La página es server component; los hijos client llevan `'use client'`.

- [ ] **Step 3: Preview manual**

Run: `npm run dev`, abrir `http://localhost:3000/cursos-bbs`.
Expected: hero oscuro, intro+4 principios, parrilla con 3 cursos + 2 diplomados (resumen + precio), cómo funcionan, por qué BBS, guía perfil→programa, cohortes con casilla de correo. Dropdown Mindset muestra "Cursos BBS".

- [ ] **Step 4: Commit**

```bash
git add app/cursos-bbs/page.tsx
git commit -m "feat(bbs): add Cursos BBS hub page"
```

---

## Task 8: Secciones de detalle (`components/bbs/sections/`)

**Files:**
- Create: `components/bbs/sections/ForWhom.tsx`, `Outcomes.tsx`, `Includes.tsx`, `Curriculum.tsx`, `FrameworkSpotlight.tsx`, `Perks.tsx`, `Faculty.tsx`, `ProgramFAQ.tsx`, `PriceBlock.tsx`

Todas son client components ligeros que reciben props tipados de `BBSProgram` y envuelven bloques en `SectionReveal`. Patrón común: `<section>` con `container-rl`, `Tag` rojo de eyebrow, título display, contenido. Alternar fondos (`section-neutral` vs cream `bg-rl-white`).

- [ ] **Step 1: `ForWhom.tsx`**

Props: `{ items: {title;body}[]; notFor?: string }`. Eyebrow "Para quién es"; grid `md:grid-cols-2 gap-8` de tarjetas (título display-sm + body). Si `notFor`, párrafo final atenuado "Este programa no es para: …".

- [ ] **Step 2: `Outcomes.tsx`**

Props: `{ items: {lead;body}[] }`. Eyebrow "Al terminar habrás"; lista vertical; cada item: `lead` en display-sm/semibold con flecha roja "→" + `body` en body-md secundario.

- [ ] **Step 3: `Includes.tsx`**

Props: `{ items: string[] }`. Eyebrow "Qué incluye"; lista con viñeta/checkmark rojo (`✦`), 1 col mobile / 2 col desktop.

- [ ] **Step 4: `Curriculum.tsx`**

Props: `{ months: CurriculumMonth[] }`. Eyebrow "El recorrido — 12 módulos en 3 meses". Por cada mes: encabezado (month + subtitle), luego lista de módulos (code mono rojo + title display-sm + body). Numeración visual. Solo se renderiza si hay datos.

- [ ] **Step 5: `FrameworkSpotlight.tsx`**

Props: `{ blocks: {heading;body[]}[] }`. Sección `section-dark` de acento. Eyebrow "El método" / "Los frameworks". Por bloque: heading display-md + párrafos. Render solo si `framework` existe.

- [ ] **Step 6: `Perks.tsx`**

Props: `{ all: string[]; topHeading: string; top: string[] }`. Dos columnas: "Para todos los participantes" (lista `all`) y bloque destacado (`bg-rl-dark` o borde rojo) con `topHeading` + lista `top`.

- [ ] **Step 7: `Faculty.tsx`**

Props: `{ items: {name;role}[] }`. Eyebrow "Los docentes"; grid de tarjetas (name display-sm + role body-sm secundario).

- [ ] **Step 8: `ProgramFAQ.tsx`**

Props: `{ items: {q;a}[] }`. Acordeón con `useState` por item (patrón de `components/sections/AccordionSection.tsx` — leerlo y reutilizar el estilo). Pregunta clickeable + respuesta colapsable con framer-motion.

- [ ] **Step 9: `PriceBlock.tsx`**

Props: `{ price:{usd;pen}; note?: string; ctaHref: string }`. Precio grande (display-lg) en mono/display, nota "Incluye…", `Button` primario "Inscríbete aquí" → ctaHref (target _blank si externo).

- [ ] **Step 10: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores. Importar tipos desde `@/data/bbs`.

- [ ] **Step 11: Commit**

```bash
git add components/bbs/sections/
git commit -m "feat(bbs): add detail section components"
```

---

## Task 9: Composición `ProgramDetail`

**Files:**
- Create: `components/bbs/ProgramDetail.tsx`

- [ ] **Step 1: Componer las secciones condicionalmente**

```tsx
import Link from 'next/link'
import type { BBSProgram } from '@/data/bbs'
import { BBS_FORM_URL } from '@/lib/constants'
import ProgramHero from './ProgramHero'
import ForWhom from './sections/ForWhom'
import Outcomes from './sections/Outcomes'
import Includes from './sections/Includes'
import Curriculum from './sections/Curriculum'
import FrameworkSpotlight from './sections/FrameworkSpotlight'
import Perks from './sections/Perks'
import Faculty from './sections/Faculty'
import ProgramFAQ from './sections/ProgramFAQ'
import PriceBlock from './sections/PriceBlock'

export default function ProgramDetail({ program }: { program: BBSProgram }) {
  const enrollHref = program.enrollUrl || BBS_FORM_URL
  return (
    <>
      <nav aria-label="Breadcrumb" className="section-dark">
        <div className="container-rl pt-24 pb-2 text-body-xs text-text-muted">
          <Link href="/" className="hover:text-rl-red">Inicio</Link> ·{' '}
          <Link href="/cursos-bbs" className="hover:text-rl-red">Cursos BBS</Link> ·{' '}
          <span className="text-text-on-dark">{program.title}</span>
        </div>
      </nav>
      <ProgramHero
        tag={program.code}
        lines={program.hero.lines}
        paragraph={program.hero.paragraph}
        ctaLabel="Quiero inscribirme"
        ctaHref={enrollHref}
      />
      {program.problem && <ProblemSection {...program.problem} />}
      {program.forWhom && <ForWhom items={program.forWhom} notFor={program.notFor} />}
      {program.outcomes && <Outcomes items={program.outcomes} />}
      {program.includes && <Includes items={program.includes} />}
      {program.curriculum && <Curriculum months={program.curriculum} />}
      {program.framework && <FrameworkSpotlight blocks={program.framework} />}
      <Perks {...program.perks} />
      <Faculty items={program.faculty} />
      <PriceBlock price={program.price} note={`Incluye ${program.deliverable.toLowerCase()} y la certificación BBS.`} ctaHref={enrollHref} />
      <ProgramFAQ items={program.faq} />
    </>
  )
}
```

Implementar `ProblemSection` inline (o como pieza en `sections/`): eyebrow = `heading`, párrafos de `body`. Si se hace pieza, crear `components/bbs/sections/Problem.tsx` con props `{ heading; body: string[] }` e importarlo (preferido para consistencia).

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores; todas las props coinciden con las firmas de Task 8.

- [ ] **Step 3: Commit**

```bash
git add components/bbs/ProgramDetail.tsx components/bbs/sections/Problem.tsx
git commit -m "feat(bbs): add ProgramDetail composition"
```

---

## Task 10: Página de detalle `/cursos-bbs/[slug]`

**Files:**
- Create: `app/cursos-bbs/[slug]/page.tsx`

- [ ] **Step 1: Implementar con generateStaticParams, generateMetadata y JSON-LD**

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allProgramSlugs, getProgram } from '@/data/bbs'
import ProgramDetail from '@/components/bbs/ProgramDetail'

export function generateStaticParams() {
  return allProgramSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const program = getProgram(params.slug)
  if (!program) return {}
  return {
    title: program.title,
    description: program.summary,
    alternates: { canonical: `/cursos-bbs/${program.slug}` },
  }
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = getProgram(params.slug)
  if (!program) notFound()

  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: program.title,
    description: program.summary,
    provider: { '@type': 'Organization', name: 'Redesign Lab', sameAs: 'https://redesignlab.org' },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      startDate: '2026-06-22',
      offers: { '@type': 'Offer', price: program.price.usd.replace(/[^0-9.]/g, ''), priceCurrency: 'USD' },
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
      { '@type': 'ListItem', position: 2, name: 'Cursos BBS', item: 'https://redesignlab.org/cursos-bbs' },
      { '@type': 'ListItem', position: 3, name: program.title, item: `https://redesignlab.org/cursos-bbs/${program.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <ProgramDetail program={program} />
    </>
  )
}
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sin errores.

- [ ] **Step 3: Preview manual de las 5 rutas**

Run: `npm run dev`; visitar `/cursos-bbs/ia-nuevos-profesionales`, `/ia-pymes-emprendimientos`, `/marcas-regenerativas`, `/negocios-regenerativos`, `/economia-circular-industria`.
Expected: cada detalle renderiza hero + secciones correctas; diplomados muestran currículo de 12 módulos, cursos no; CTAs apuntan a `BBS_FORM_URL`; breadcrumb funciona. Una ruta inexistente (`/cursos-bbs/foo`) da 404.

- [ ] **Step 4: Commit**

```bash
git add app/cursos-bbs/[slug]/page.tsx
git commit -m "feat(bbs): add dynamic program detail pages"
```

---

## Task 11: Sitemap y verificación final

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Agregar las 6 URLs al sitemap**

Leer `app/sitemap.ts` y añadir, siguiendo el patrón existente, `/cursos-bbs` y las 5 rutas `/cursos-bbs/{slug}` (importar `allProgramSlugs` de `@/data/bbs` para generarlas). Usar `lastModified` y `priority` coherentes con las demás entradas.

- [ ] **Step 2: Build de producción completo**

Run: `npm run build`
Expected: build exitoso; las 5 páginas de detalle aparecen como estáticas (SSG) por `generateStaticParams`; sin errores de tipos ni de prerender.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: sin errores (warnings preexistentes aceptables).

- [ ] **Step 4: Checklist de aceptación (preview manual)**

Verificar contra los criterios del spec §12:
- [ ] "Cursos BBS" en dropdown Mindset (desktop + mobile) y resalta activo.
- [ ] Hub completo (hero, intro+4 principios, parrilla 3+2, cómo funcionan, por qué BBS, guía, cohortes con casilla de correo).
- [ ] Cada tarjeta enlaza a su detalle; CTA "Inscribirse" → `BBS_FORM_URL`.
- [ ] 5 detalles con secciones condicionales correctas.
- [ ] Estilo light-dominante con heroes oscuros; sin regresiones mobile/desktop.
- [ ] Casilla de correo inserta en `newsletter_subscribers` con `source=/cursos-bbs` (verificar en Supabase o consola sin error).

- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(bbs): add Cursos BBS routes to sitemap"
```

---

## Notas de ejecución

- **Form URL:** todos los CTAs usan `BBS_FORM_URL = '#'`. Cuando Eddie comparta los links, reemplazar el constante (o poblar `enrollUrl` por programa en `data/bbs.ts`).
- **Glifos corruptos:** el doc plantilla trae caracteres `ð` (íconos perdidos en la extracción). Sustituir por etiquetas de texto limpias o eliminarlos al transcribir.
- **Contenido verbatim:** respetar el copy de los docs; no parafrasear los textos de marketing.
- **Imágenes:** los programas no traen imágenes en los docs; el diseño es tipográfico (consistente con el sitio). No inventar assets.
```
