# PRD / Diseño — Sub-página Cursos BBS (Programas Ejecutivos)

**Fecha:** 2026-05-19
**Autor:** Eddie Ajalcriña + Claude
**Estado:** Aprobado para implementación

## 1. Objetivo

Agregar una sección de **Programas Ejecutivos de Bio Business School (BBS)** a redesignlab.org, anclada en el dropdown **Mindset** del header. La sección presenta dos tipos de producto — **cursos** y **diplomados** — en una parrilla (hub) con resumen y precio, donde cada programa enlaza a una sub-página de detalle con su contenido completo y CTA de inscripción.

Fuente de contenido: 6 Google Docs (1 plantilla del hub + 5 programas). Ya extraídos e incorporados al diseño.

## 2. Decisiones tomadas

| Tema | Decisión |
| --- | --- |
| Inscripción ("Inscribirse") | Enlace a **Google Form** externo. URLs aún no disponibles → constante `BBS_FORM_URL` con placeholder `'#'`, override opcional por programa (`enrollUrl`). Eddie comparte los links después. |
| Rutas | Top-level: hub en `/cursos-bbs`, detalle en `/cursos-bbs/[slug]` (consistente con hermanos de Mindset: `/como-pensamos`, `/conocimiento`, `/builders`). |
| Estilo | **Light-dominante**: cuerpo crema, heroes en `rl-dark` como acento editorial. Coherente con páginas de servicio actuales. |
| Alcance | Hub + las **5 páginas de detalle** completas. |
| Captura de correos | Casilla de email en "Próximas cohortes" reutilizando `NewsletterForm` (Supabase `newsletter_subscribers`, `source` = `/cursos-bbs`). |

## 3. Stack y patrones existentes

- Next.js 14 App Router, Tailwind, framer-motion, Supabase. Base body crema `#FAFAF8`.
- Tokens: `rl-red #F32769`, `rl-dark #0D0D0D`, `rl-neutral #F5F3F0`. Display = Mluvka; labels = JetBrains Mono uppercase.
- Utilidades: `.container-rl`, `.section-dark`, `.section-neutral`, `.section-accent`.
- Primitivos reutilizables: `Tag`, `Button`, `SectionReveal`, `Divider`, `NewsletterForm`.
- Nav dropdown definido en `lib/constants.ts → NAV_LINKS` (renderizado por `components/layout/Navigation.tsx`).

## 4. Arquitectura de archivos

```
data/bbs.ts                          # fuente de verdad + tipos (BBSProgram)
lib/constants.ts                     # + item "Cursos BBS" en submenú Mindset; + BBS_FORM_URL
app/cursos-bbs/page.tsx              # hub (server: metadata + JSON-LD); compone secciones
app/cursos-bbs/[slug]/page.tsx       # detalle dinámico (generateStaticParams + generateMetadata + JSON-LD)
app/sitemap.ts                       # + hub y 5 detalles
components/bbs/ProgramHero.tsx       # hero oscuro reutilizable (hub + detalle)
components/bbs/ProgramCard.tsx       # tarjeta de la parrilla
components/bbs/ProgramGrid.tsx       # parrilla agrupada (cursos / diplomados)
components/bbs/ProgramDetail.tsx     # render condicional de secciones de detalle
components/bbs/sections/             # piezas internas: ForWhom, Outcomes, Includes,
                                     #   Curriculum, FrameworkSpotlight, Perks, Faculty, FAQ, PriceBlock
```

## 5. Modelo de datos (`data/bbs.ts`)

```ts
export type ProgramType = 'curso' | 'diplomado'

export interface BBSProgram {
  slug: string
  type: ProgramType
  code: string              // "CURSO EJECUTIVO 01"
  title: string
  tagline: string           // subtítulo en cursiva
  summary: string           // resumen corto para la tarjeta
  audience: string          // "Dirigido a"
  duration: string
  modality: string          // "En vivo · Google Meet + Drive"
  deliverable: string
  price: { usd: string; pen: string }
  startDate: string         // "22 Junio 2026"
  collaborator?: string     // "Thousandfold · thousandfold.la"
  enrollUrl?: string        // override del Google Form (si difiere del global)

  // --- detalle (todas opcionales: render condicional) ---
  hero: { lines: string[]; paragraph: string }
  problem?: { heading: string; body: string[] }      // párrafos
  forWhom?: { title: string; body: string }[]
  notFor?: string                                     // "Este programa no es para..."
  outcomes?: { lead: string; body: string }[]         // "Al terminar habrás..."
  includes?: string[]                                 // "Qué incluye"
  framework?: { heading: string; body: string[] }[]   // RIZOMA / FARA / Re.Intelligence
  curriculum?: { month: string; subtitle?: string; modules: { code: string; title: string; body: string }[] }[]
  perks: { all: string[]; topHeading: string; top: string[] }
  faculty: { name: string; role: string }[]
  faq: { q: string; a: string }[]
}

export const bbsPrograms: BBSProgram[] = [ /* 5 entradas */ ]
export const bbsCourses = bbsPrograms.filter(p => p.type === 'curso')
export const bbsDiplomas = bbsPrograms.filter(p => p.type === 'diplomado')
export const getProgram = (slug: string) => bbsPrograms.find(p => p.slug === slug)
```

### Datos factuales de los 5 programas

| slug | type | code | title | precio | duración | entregable | inicio | colab. |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ia-nuevos-profesionales` | curso | CURSO EJECUTIVO 01 | IA para Nuevos Profesionales | $70 / S/.250 | 4 sem · 4 sesiones 2h | Propuesta de Transformación Corporativa con IA | 22 Jun 2026 | — |
| `ia-pymes-emprendimientos` | curso | CURSO EJECUTIVO 02 | IA para Pymes y Emprendimientos | $150 / S/.540 | 4 sem · 4 sesiones 2h | Plan de Adopción de IA en la empresa | 22 Jun 2026 | — |
| `marcas-regenerativas` | curso | CURSO EJECUTIVO 03 | Construcción de Marcas Regenerativas | $70 / S/.250 | 4 sem · 4 sesiones 2h | Brand Starter Kit Regenerativo | 22 Jun 2026 | Thousandfold |
| `negocios-regenerativos` | diplomado | DIPLOMADO EJECUTIVO 01 | Diseño de Negocios Regenerativos | $297 / S/.1,080 | 3 meses · 12 sesiones · Demo Day | Portafolio de Negocio Regenerativo | 22 Jun 2026 | Thousandfold |
| `economia-circular-industria` | diplomado | DIPLOMADO EJECUTIVO 02 | Economía Circular para la Industria | $297 / S/.1,080 | 3 meses · 12 sesiones · Demo Day | Roadmap de Implementación de Economía Circular | 22 Jun 2026 | — |

El cuerpo completo (problem, forWhom, outcomes, includes, framework, curriculum, perks, faculty, faq) se transcribe desde los 6 Google Docs ya leídos hacia `data/bbs.ts`. Diplomados incluyen `curriculum` de 12 módulos en 3 meses y `framework` (RIZOMA/FARA; Nordic Toolkit/ISO 59000). Cursos 02 y 03 incluyen `framework` (Re. Intelligence; RIZOMA).

## 6. Estructura del HUB (`/cursos-bbs`)

1. **Hero** (`ProgramHero`, oscuro): tag `MINDSET → CURSOS BBS`; título "No formamos estudiantes. Formamos profesionales que transforman empresas, industrias y territorios."; bajada "Programas Ejecutivos BBS · Diseñados por Redesign Lab · En colaboración con Thousandfold".
2. **Introducción** (light): descripción de BBS + 4 principios (Aplicación antes que teoría · Metodologías de frontera curadas para LATAM · Casos internacionales con criterio regional · IA y tecnología en el centro).
3. **Los programas** (`ProgramGrid`, light): dos bloques — **Cursos Ejecutivos** (3 `ProgramCard`) y **Diplomados Ejecutivos** (2 `ProgramCard`).
4. **Cómo funcionan los programas** (light): 5 puntos (sesiones en vivo semanales · todo en Google Workspace · entregable construido semana a semana · sustentación ante comité · comunidad BBS de por vida).
5. **Por qué BBS y Redesign Lab** (light o dark): Eddie + Lorenzo como practitioners; Redesign Lab; Thousandfold (RIZOMA).
6. **¿No sabes por dónde empezar?** (light): tabla perfil → programa (5 filas) + contacto `bbs@redesignlab.org`.
7. **Próximas cohortes** (`section-dark`, CTA): copy de cupos limitados + **casilla de captura de correo** (`NewsletterForm` variant full) + CTA "Regístrate aquí" → `BBS_FORM_URL`.

## 7. Estructura de cada DETALLE (`/cursos-bbs/[slug]`)

Render condicional por `ProgramDetail` según campos presentes:

1. **Breadcrumb**: Inicio → Cursos BBS → [programa].
2. **Hero** (oscuro): `hero.lines` + título + tagline + `hero.paragraph` + CTA "Quiero inscribirme" → enrollUrl/`BBS_FORM_URL`.
3. **Problema / punto de partida** (`problem`).
4. **Para quién es** (`forWhom` en tarjetas + `notFor`).
5. **Al terminar habrás** (`outcomes`).
6. **Qué incluye** (`includes`, checklist).
7. **El recorrido** (`curriculum`, solo diplomados — meses con módulos).
8. **Spotlight de framework** (`framework`, cuando aplica).
9. **Perks** (`perks.all` + bloque destacado `perks.top`).
10. **Los docentes** (`faculty`).
11. **Precio** (`PriceBlock`: precio grande + qué incluye + CTA).
12. **FAQ** (`faq`, acordeón — puede reutilizar patrón de `AccordionSection`).
13. **CTA final** → enrollUrl/`BBS_FORM_URL`.

## 8. Navegación e integración

- `lib/constants.ts`: agregar al submenú de Mindset `{ label: 'Cursos BBS', href: '/cursos-bbs' }`. El componente `Navigation` ya soporta resaltar el ítem activo del submenú.
- `BBS_FORM_URL = '#'` en `lib/constants.ts` (placeholder, reemplazable). Los CTAs que apunten ahí abren en nueva pestaña cuando sea URL externa.
- (Opcional, no bloqueante) agregar "Cursos BBS" a `FOOTER_LINKS.ecosistema`.

## 9. SEO

- **Hub**: `metadata` con title "Cursos BBS — Programas Ejecutivos", description, `alternates.canonical: '/cursos-bbs'`, keywords (programas ejecutivos, IA para empresas, economía circular, negocios regenerativos).
- **Detalle**: `generateMetadata` por programa (title = `title`, description = `summary`, canonical `/cursos-bbs/[slug]`).
- **JSON-LD**: schema `Course` por detalle (name, description, provider = Organization Redesign Lab, hasCourseInstance con startDate/price/courseMode online) + `BreadcrumbList` (Inicio → Cursos BBS → programa). Esto cubre huecos de schema identificados en la auditoría 2026-04-18.
- **Sitemap**: agregar hub + 5 detalles a `app/sitemap.ts` con prioridad coherente.
- `lang=es` ya global; precios en USD y PEN visibles.

## 10. Estilo visual

- Cuerpo crema; secciones alternan `section-neutral` / cream. Heroes `section-dark`.
- Etiquetas de código (CURSO EJECUTIVO 01) en mono rojo; precio en mono rojo.
- `ProgramCard`: borde `border-light`, hover-lift sutil (translate/border rojo), badge curso/diplomado, meta duración · precio, CTA "Inscribirse →".
- Animaciones con `SectionReveal` (consistente con el resto del sitio). Respeta `prefers-reduced-motion`.
- Responsive: grid 1 col mobile / 2 col desktop (igual que `ServiceGridSection`).

## 11. Fuera de alcance (YAGNI)

- Formulario de inscripción propio / backend de pagos (se usa Google Form externo).
- Sistema de cohortes dinámico / fechas administrables (fechas hardcodeadas en datos por ahora).
- Páginas de Thousandfold o Bio Business School como marcas separadas.
- i18n / versión en inglés.

## 12. Criterios de aceptación

- "Cursos BBS" aparece en el dropdown Mindset (desktop + mobile) y resalta cuando está activo.
- `/cursos-bbs` muestra hero, intro+4 principios, parrilla agrupada (3 cursos + 2 diplomados con resumen y precio), cómo funcionan, por qué BBS, guía perfil→programa, y bloque de cohortes con captura de correo funcional.
- Cada tarjeta enlaza a su detalle; el CTA "Inscribirse" apunta a `BBS_FORM_URL`.
- Las 5 páginas de detalle renderizan todo su contenido con secciones condicionales correctas (diplomados muestran currículo de 12 módulos; cursos no).
- Estilo light-dominante con heroes oscuros; sin regresiones de layout en mobile/desktop.
- `npm run build` y `next lint` pasan; JSON-LD válido; sitemap incluye las 6 URLs.
- La casilla de correo inserta en `newsletter_subscribers` con `source=/cursos-bbs`.
