# Rediseño por audiencias — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar redesignlab.org en tres audiencias (Empresas, Bio/Builders, Instituciones) con Home, `/empresas` y `/fondos` nuevas, el sistema visual aprobado aplicado a todas las subpáginas visibles, redirects y páginas ocultas sin pérdida de SEO.

**Architecture:** Next.js 14 App Router. Primero se construyen las piezas compartidas (constantes, estilos globales, componentes de UI, menú, footer y pestaña de anuncios). Después se componen las tres páginas nuevas, luego se ajustan redirects, sitemap y enlaces, y por último se reestilizan las subpáginas sin tocar su contenido. La lógica pura (selección de anuncios y reglas de enlaces) se prueba con `node:test`. El sitio completo se valida con un script de verificación HTTP contra `next start`.

**Tech Stack:** Next.js 14.2 · React 18 · TypeScript · Tailwind 3.4 · framer-motion (solo donde ya se usa) · Node 24 (`node --test` con type stripping) · Chrome headless (ya usado para las imágenes OG).

**Spec:** `docs/superpowers/specs/2026-09-24-audiencias-redesign-design.md`. Ante cualquier duda de contenido o comportamiento, manda la spec.
**Mockups de referencia (locales, ignorados por git):** `.superpowers/brainstorm/23145-1790287874/content/home-v6.html`, `empresas-v5.html` e `instituciones-v3.html`. Se abren directo en el navegador; las imágenes cargan si se sirven con el servidor del skill de brainstorming.

## Global Constraints

- Rama: `feat/audiencias-redesign` (desde `main`). Un commit por tarea; cada mensaje termina con `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
- Idioma del sitio: español (es-PE). **No se agrega texto nuevo** fuera de los aprobados en la spec (§3 y §7, "Textos nuevos aprobados"). Todo texto nuevo que surja se marca para revisión de Eddie.
- Colores: `#0D0D0D` (oscuro), `#F5F3F0` (crema, `rl-neutral`), `#F32769` (rojo, `rl-red`), `#2A2A2A` (grafito, nuevo `rl-graphite`), `#D97757` (Claude, nuevo `claude`). Como máximo un bloque rojo completo por página.
- Tipografía: Mluvka peso 400 en títulos (`font-sans font-normal`). JetBrains Mono para etiquetas (`font-mono`, 10.5 px, mayúsculas, tracking 0.15em).
- Calendario de todos los CTA de conversación: `SITE_CONFIG.calendarUrl` = `https://calendar.app.google/C8nGhVz5m6SAR61r5`, en pestaña nueva.
- Efectos **prohibidos** (descartados por Eddie): revelado de títulos por línea, menú que se esconde o cambia de color, fotos con recorte (clip-path). Todo movimiento respeta `prefers-reduced-motion` (ya hay una regla global en `app/globals.css`).
- Páginas ocultas (vivas, en el sitemap, sin enlaces internos): `/acelera`, `/pon-orden`, `/consigue-capital`, `/vende-mas`, `/crear-valor`, `/transformar-el-modelo`, `/como-pensamos`, `/inteligencia-artificial/diagnostico` (esta última solo se enlaza desde `/empresas`).
- Redirects nuevos (308): `/inteligencia-artificial` → `/empresas#ia`; `/cursos-bbs` y `/cursos-bbs/:slug` → `https://biobusinessschool.org`. No se borra código de esas rutas.
- `/fondos` conserva su URL; en el menú se llama "Instituciones".
- Verificación mínima de cada tarea: `npx tsc --noEmit` y `npm run lint` sin errores. Con `npm test` cuando la tarea toca lógica probada.

---

## Mapa de archivos

**Nuevos**

| Archivo | Responsabilidad |
|---|---|
| `scripts/verify-site.mjs` | Prueba de aceptación HTTP contra el sitio corriendo |
| `tests/constants.test.ts` | Reglas de menú, footer, divisiones y rutas |
| `tests/announcements.test.ts` | Selección de la campaña vigente |
| `lib/analytics.ts` | `track(event, payload)` → `window.dataLayer` |
| `lib/announcements.ts` | Tipo `Announcement` + `pickAnnouncement()` (pura, sin alias `@/`) |
| `data/announcements.ts` | Campañas (hoy: Bio/Builders 2026) |
| `data/photo-belt.ts` | Lista de fotos del cinturón con su ancho a 84 px de alto |
| `data/track-record.ts` | Las 6 cifras (Empresas e Instituciones) |
| `data/resources.ts` | Recursos de conocimiento (movidos desde `ResourcesList.tsx`) |
| `components/ui/buttonStyles.ts` | Clases de botón compartidas |
| `components/ui/ArrowIcon.tsx` | ↗ con microanimación |
| `components/ui/CalendarButton.tsx` | Botón al calendario + evento `cta_calendar` |
| `components/ui/SectionLabel.tsx` | Etiqueta `01 —— Texto` |
| `components/ui/FillPanel.tsx` | Tarjeta con relleno rojo al pasar el mouse |
| `components/ui/DuotoneImage.tsx` | Imagen en duotono rojo (opcionalmente pasa a color) |
| `components/ui/Statement.tsx` | `StatementKicker` + `StatementNote` para las declaraciones |
| `components/ui/PhotoBelt.tsx` | Cinturón continuo de fotos |
| `components/ui/PhotoStrip.tsx` | Franja de 4 fotos en duotono (heros de Empresas e Instituciones) |
| `components/ui/StatGrid.tsx` | Grilla de cifras (clara u oscura) |
| `components/ui/AnnouncementTab.tsx` | Pestaña lateral de anuncios |
| `app/(landing)/sections/{HomeHero,AlliesLine,ThesisSection,FearStatement,ProposalSection,DivisionsSection,InstitutionsBand,KnowledgeSection,FoundersSection,HomeClosing}.tsx` | Secciones de la Home nueva |
| `app/empresas/page.tsx` + `app/empresas/sections/{EmpresasHero,PartnerSection,HelpSection,StrengthsSection,AISection,EmpresasClosing}.tsx` | Página Empresas |
| `app/fondos/sections/{InstitucionesHero,AudienceSwitch,CapabilitiesSection,ProcessTimeline,TrackRecordNote,InstitucionesClosing}.tsx` | Página Instituciones |
| `app/not-found.tsx` | 404 propia |
| `app/empresas/opengraph-image.png` (+`.alt.txt`, `twitter-image.png`, `twitter-image.alt.txt`), ídem en `app/fondos/` | Imágenes para redes |
| `public/assets/partners/claude-logo-white.png` | Logo oficial de Claude (texto blanco) |

**Modificados:** `package.json`, `tsconfig.json`, `tailwind.config.ts`, `app/globals.css`, `lib/constants.ts`, `components/ui/Button.tsx`, `components/layout/Navigation.tsx`, `components/layout/Footer.tsx`, `components/animations/PageTransition.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/fondos/page.tsx`, `next.config.mjs`, `app/sitemap.ts`, `components/sections/MaturityChecker.tsx`, `app/conocimiento/sections/ResourcesList.tsx`, `data/ventures.ts`, `data/services.ts`, las secciones de `app/biobuilders`, `app/ventures`, `app/proyectos`, `app/conocimiento` y `app/privacidad`, `components/ui/VentureCard.tsx`, `components/ui/ProjectCard.tsx` y `README.md`.

**Sin cambios, a propósito:** el código de `app/inteligencia-artificial/**`, `app/cursos-bbs/**` y las páginas ocultas. Las secciones viejas de `app/(landing)/sections/*` y `app/fondos/sections/*` quedan en el repo sin importar.

---

### Task 1: Prueba de aceptación del sitio y herramientas de test

**Files:**
- Create: `scripts/verify-site.mjs`
- Create: `tests/.gitkeep`
- Modify: `package.json` (scripts)
- Modify: `tsconfig.json` (excluir `tests`)

**Interfaces:**
- Produces: `npm run verify` (con `BASE_URL` opcional, por defecto `http://localhost:3000`) y `npm test` (`node --test "tests/**/*.test.ts"`).

- [ ] **Step 1: Escribir el script de verificación**

`scripts/verify-site.mjs`:

```js
#!/usr/bin/env node
// Prueba de aceptación del rediseño por audiencias.
// Uso: npm run build && npm start (en otra terminal) → npm run verify
// Spec: docs/superpowers/specs/2026-09-24-audiencias-redesign-design.md
const BASE = process.env.BASE_URL || 'http://localhost:3000'
const CAL = 'https://calendar.app.google/C8nGhVz5m6SAR61r5'

const VISIBLE = ['/', '/empresas', '/fondos', '/biobuilders', '/ventures', '/proyectos', '/conocimiento', '/privacidad']
const HIDDEN = [
  '/acelera', '/pon-orden', '/consigue-capital', '/vende-mas',
  '/crear-valor', '/transformar-el-modelo', '/como-pensamos',
  '/inteligencia-artificial/diagnostico',
]
const REDIRECTS = [
  ['/inteligencia-artificial', '/empresas'],
  ['/cursos-bbs', 'https://biobusinessschool.org'],
  ['/cursos-bbs/cualquier-programa', 'https://biobusinessschool.org'],
]
const DIAGNOSTICO = '/inteligencia-artificial/diagnostico'
const FORBIDDEN = [...HIDDEN.filter((p) => p !== DIAGNOSTICO), '/inteligencia-artificial', '/cursos-bbs']

let failures = 0
const ok = (m) => console.log('✓', m)
const fail = (m) => { failures++; console.log('✗', m) }
const get = (path) => fetch(BASE + path, { redirect: 'manual' })
const hrefs = (html) => [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, '&'))
const pathOf = (h) => (h.startsWith(BASE) ? h.slice(BASE.length) : h).split(/[?#]/)[0]

function forbiddenOn(page, h) {
  if (!h.startsWith('/') && !h.startsWith(BASE)) return false
  const p = pathOf(h)
  if (p === DIAGNOSTICO) return page !== '/empresas'
  return FORBIDDEN.some((f) => p === f || p.startsWith(f + '/'))
}

async function main() {
  for (const p of [...VISIBLE, ...HIDDEN]) {
    const r = await get(p)
    r.status === 200 ? ok(`200 ${p}`) : fail(`${p} respondió ${r.status} (esperado 200)`)
  }

  for (const [from, to] of REDIRECTS) {
    const r = await get(from)
    const loc = r.headers.get('location') || ''
    ;[301, 307, 308].includes(r.status) && loc.includes(to)
      ? ok(`${from} → ${loc}`)
      : fail(`${from}: status ${r.status}, location "${loc}" (esperado → ${to})`)
  }

  const nf = await get('/esta-pagina-no-existe')
  const nfHtml = await nf.text()
  nf.status === 404 && nfHtml.includes('Página no encontrada')
    ? ok('404 propia')
    : fail(`404: status ${nf.status}, ¿incluye "Página no encontrada"? ${nfHtml.includes('Página no encontrada')}`)

  const sm = await (await get('/sitemap.xml')).text()
  const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  for (const p of ['/empresas', '/fondos', ...HIDDEN]) {
    locs.includes(p) ? ok(`sitemap incluye ${p}`) : fail(`sitemap no incluye ${p}`)
  }
  for (const p of locs) {
    if (p === '/inteligencia-artificial' || p === '/cursos-bbs' || p.startsWith('/cursos-bbs/')) fail(`sitemap incluye redirigida ${p}`)
  }

  const fichas = [locs.find((p) => p.startsWith('/ventures/')), locs.find((p) => p.startsWith('/proyectos/'))].filter(Boolean)
  for (const page of [...VISIBLE, ...fichas]) {
    const html = await (await get(page)).text()
    const bad = hrefs(html).filter((h) => forbiddenOn(page, h))
    bad.length ? fail(`${page} enlaza a ocultas/redirigidas: ${[...new Set(bad)].join(', ')}`) : ok(`${page} sin enlaces a ocultas`)
    const mails = hrefs(html).filter((h) => h.startsWith('mailto:') && h.includes('subject='))
    mails.length ? fail(`${page} tiene mailto con asunto: ${mails.join(', ')}`) : ok(`${page} sin mailto con asunto`)
  }

  for (const p of ['/', '/empresas', '/fondos', '/proyectos', '/conocimiento']) {
    const html = await (await get(p)).text()
    html.includes(CAL) ? ok(`${p} enlaza al calendario`) : fail(`${p} no enlaza al calendario`)
  }

  const home = await (await get('/')).text()
  home.includes('href="/empresas"') && home.includes('>Instituciones<') ? ok('menú nuevo') : fail('menú sin /empresas o sin "Instituciones"')

  const emp = await (await get('/empresas')).text()
  emp.includes('id="ia"') ? ok('/empresas tiene #ia') : fail('/empresas sin id="ia"')
  emp.includes('claude-logo-white') ? ok('/empresas muestra el logo de Claude') : fail('/empresas sin logo de Claude')

  console.log(failures ? `\n${failures} fallas` : '\nTodo en orden')
  process.exit(failures ? 1 : 0)
}

main().catch((e) => { console.error(e); process.exit(1) })
```

- [ ] **Step 2: Scripts de npm y exclusión de tests**

En `package.json`, dentro de `"scripts"`, agregar:

```json
    "test": "node --test \"tests/**/*.test.ts\"",
    "verify": "node scripts/verify-site.mjs"
```

En `tsconfig.json`, cambiar `"exclude": ["node_modules"]` por:

```json
  "exclude": ["node_modules", "tests"]
```

(Los tests importan con extensión `.ts`, que Node 24 ejecuta con type stripping pero `tsc` rechazaría.)

Crear `tests/.gitkeep` vacío.

- [ ] **Step 3: Ejecutar la verificación contra el sitio actual y confirmar que falla**

```bash
npm run build && (npm start > /tmp/rl-start.log 2>&1 &) && sleep 6 && npm run verify; kill %1 2>/dev/null; pkill -f "next start"
```

Esperado: FALLA. Entre otras, `/empresas respondió 404`, `/inteligencia-artificial: status 200`, `404: status 404, ¿incluye "Página no encontrada"? false`.

- [ ] **Step 4: Commit**

```bash
git add scripts/verify-site.mjs tests/.gitkeep package.json tsconfig.json
git commit -m "test: add site acceptance script and node test runner

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Constantes (menú, footer, divisiones, rutas)

**Files:**
- Modify: `lib/constants.ts`
- Test: `tests/constants.test.ts`

**Interfaces:**
- Produces: `NAV_LINKS` (nueva forma), `FOOTER_LINKS` (`audiencias`, `portafolio`, `contacto`), `HIDDEN_PATHS`, `REDIRECTED_PATHS`, `DIVISIONS: Division[]`, `interface Division { theme: string; brand: string; description: string; href: string | null; domain: string | null; image: string | null }`.

- [ ] **Step 1: Escribir el test que falla**

`tests/constants.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { NAV_LINKS, FOOTER_LINKS, HIDDEN_PATHS, REDIRECTED_PATHS, DIVISIONS, SITE_CONFIG } from '../lib/constants.ts'

const navHrefs = NAV_LINKS.flatMap((l) => ['submenu' in l ? l.submenu.map((s) => s.href) : [], l.href]).flat()
const footerHrefs = [...FOOTER_LINKS.audiencias.links, ...FOOTER_LINKS.portafolio.links].map((l) => l.href)

test('el menú tiene las cinco entradas en orden', () => {
  assert.deepEqual(NAV_LINKS.map((l) => l.label), ['Empresas', 'Bio/Builders', 'Instituciones', 'Proyectos', 'Conocimiento'])
})

test('Instituciones conserva la URL /fondos', () => {
  assert.equal(NAV_LINKS.find((l) => l.label === 'Instituciones')?.href, '/fondos')
})

test('Ventures vive dentro de Bio/Builders', () => {
  const bb = NAV_LINKS.find((l) => l.label === 'Bio/Builders')
  assert.ok(bb && 'submenu' in bb)
  assert.ok(bb.submenu.some((s) => s.href === '/ventures'))
})

test('ni el menú ni el footer enlazan a páginas ocultas o redirigidas', () => {
  for (const h of [...navHrefs, ...footerHrefs]) {
    assert.ok(!HIDDEN_PATHS.includes(h as never), `oculta: ${h}`)
    assert.ok(!REDIRECTED_PATHS.some((r) => h === r || h.startsWith(r + '/')), `redirigida: ${h}`)
  }
})

test('divisiones: seis, la temática va primero y los enlaces son https o null', () => {
  assert.equal(DIVISIONS.length, 6)
  assert.equal(DIVISIONS[0].theme, 'Acceso a capital de impacto')
  for (const d of DIVISIONS) assert.ok(d.href === null || d.href.startsWith('https://'), d.brand)
  assert.equal(DIVISIONS.find((d) => d.brand === 'Circular Club')?.href, null, 'circularclub.la sin HTTPS: sin enlace')
  assert.equal(DIVISIONS[5].href, null, 'IA para Empresas: próximamente')
})

test('el calendario general no cambió', () => {
  assert.equal(SITE_CONFIG.calendarUrl, 'https://calendar.app.google/C8nGhVz5m6SAR61r5')
})
```

- [ ] **Step 2: Ejecutar y ver que falla**

Run: `npm test`
Expected: FAIL, con `SyntaxError: The requested module '../lib/constants.ts' does not provide an export named 'HIDDEN_PATHS'` (o similar).

- [ ] **Step 3: Implementar en `lib/constants.ts`**

Reemplazar el bloque `export const NAV_LINKS = [ … ] as const` completo por:

```ts
export const NAV_LINKS = [
  { label: 'Empresas', href: '/empresas' },
  {
    label: 'Bio/Builders',
    href: '/biobuilders',
    hasSubmenu: true,
    submenu: [
      { label: 'Bio/Builders', href: '/biobuilders' },
      { label: 'Ventures', href: '/ventures' },
    ],
  },
  // La URL se mantiene en /fondos por SEO; en el menú se llama Instituciones.
  { label: 'Instituciones', href: '/fondos' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Conocimiento', href: '/conocimiento' },
] as const

// Páginas vivas y en el sitemap, pero sin enlaces internos (ver spec §2.2).
export const HIDDEN_PATHS = [
  '/acelera',
  '/pon-orden',
  '/consigue-capital',
  '/vende-mas',
  '/crear-valor',
  '/transformar-el-modelo',
  '/como-pensamos',
  '/inteligencia-artificial/diagnostico',
] as const

// Rutas cuyo código se conserva, pero que next.config.mjs redirige.
export const REDIRECTED_PATHS = ['/inteligencia-artificial', '/cursos-bbs'] as const
```

Reemplazar el bloque `export const FOOTER_LINKS = { … }` completo por:

```ts
export const FOOTER_LINKS = {
  audiencias: {
    titulo: 'Trabaja con nosotros',
    links: [
      { label: 'Empresas', href: '/empresas' },
      { label: 'Bio/Builders', href: '/biobuilders' },
      { label: 'Instituciones', href: '/fondos' },
    ],
  },
  portafolio: {
    titulo: 'Portafolio',
    links: [
      { label: 'Proyectos', href: '/proyectos' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'Conocimiento', href: '/conocimiento' },
    ],
  },
  contacto: {
    titulo: 'Contacto',
  },
}
```

Agregar al final del archivo:

```ts
export interface Division {
  theme: string
  brand: string
  description: string
  /** null = sin enlace (sitio caído o división aún sin web) */
  href: string | null
  domain: string | null
  image: string | null
}

export const DIVISIONS: Division[] = [
  {
    theme: 'Acceso a capital de impacto',
    brand: 'Fondo de Impacto',
    description: 'Estudio especializado en facilitar el acceso a capital de impacto y canalizar inversión privada hacia empresas de alto potencial.',
    href: 'https://fondodeimpacto.pe',
    domain: 'fondodeimpacto.pe',
    image: '/assets/hero/hero-17.jpg',
  },
  {
    theme: 'Marcas regenerativas',
    brand: 'ThousandFold',
    description: 'Estudio de branding que construye la identidad y narrativa de marcas con propósito verificable.',
    href: 'https://www.thousandfold.la',
    domain: 'thousandfold.la',
    image: '/assets/ventures/thousandfold.jpg',
  },
  {
    theme: 'Bioeconomía',
    brand: 'Bio Business School',
    description: 'Concentra nuestro conocimiento trabajando con bionegocios en los territorios y lo convierte en consultoría y formación especializada.',
    href: 'https://biobusinessschool.org',
    domain: 'biobusinessschool.org',
    image: '/assets/ventures/bio-business-school.jpg',
  },
  {
    theme: 'Negocios regenerativos',
    brand: 'Regenerative Platform Latam',
    description: 'Plataforma que promueve negocios regenerativos en toda América Latina.',
    href: 'https://regenerativelatam.org',
    domain: 'regenerativelatam.org',
    image: '/assets/hero/hero-07.jpg',
  },
  {
    theme: 'Economía circular',
    brand: 'Circular Club',
    description: 'Comunidad de expertos que diseñan soluciones para la transición circular.',
    // circularclub.la no responde por HTTPS (2026-09-24). Poner 'https://circularclub.la' cuando se arregle.
    href: null,
    domain: 'circularclub.la',
    image: '/assets/hero/hero-08.jpg',
  },
  {
    theme: 'Inteligencia artificial',
    brand: 'IA para Empresas · nueva división',
    description: 'Integramos inteligencia artificial en la operación de empresas de toda América Latina, no solo de bioeconomía.',
    href: null,
    domain: null,
    image: null,
  },
]
```

`SERVICE_PATHS` y `ALLIES*` quedan igual (`SERVICE_PATHS` lo usan las páginas de servicio ocultas).

- [ ] **Step 4: Ejecutar los tests y verificar**

Run: `npm test && npx tsc --noEmit`
Expected: los 6 tests en PASS. `tsc` va a fallar en `components/layout/Footer.tsx` (usa `FOOTER_LINKS.servicios` y `.ecosistema`). Es esperado: se corrige en la Task 5. Para no dejar la rama rota, en este mismo paso reemplazar en `Footer.tsx` `FOOTER_LINKS.servicios` → `FOOTER_LINKS.audiencias` y `FOOTER_LINKS.ecosistema` → `FOOTER_LINKS.portafolio` (4 apariciones), y volver a correr `npx tsc --noEmit` → sin errores.

- [ ] **Step 5: Commit**

```bash
git add lib/constants.ts tests/constants.test.ts components/layout/Footer.tsx
git commit -m "feat(nav): audience-based nav/footer constants, divisions and route rules

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Sistema visual — tokens, estilos globales y componentes base

**Files:**
- Modify: `tailwind.config.ts`, `app/globals.css`, `components/ui/Button.tsx`, `components/animations/PageTransition.tsx`
- Create: `lib/analytics.ts`, `components/ui/buttonStyles.ts`, `components/ui/ArrowIcon.tsx`, `components/ui/CalendarButton.tsx`, `components/ui/SectionLabel.tsx`, `components/ui/FillPanel.tsx`, `components/ui/DuotoneImage.tsx`, `components/ui/Statement.tsx`

**Interfaces:**
- Produces:
  - `track(event: string, payload?: Record<string, string | number | boolean | undefined>): void`
  - `buttonClasses(variant: ButtonVariantRL): string`, con `type ButtonVariantRL = 'primary' | 'outline' | 'outlineInk' | 'dark'`
  - `<ArrowIcon className? />`
  - `<CalendarButton location: string; context?: string; variant?: ButtonVariantRL; className?; children />`
  - `<SectionLabel n: string; tone?: 'light' | 'dark'; className?; children />`
  - `<FillPanel href: string; kicker: string; title: string; cta: string; tone: 'light' | 'graphite' | 'ink'; external?: boolean; trackLocation?: string; titleClassName?: string; className?; children />`
  - `<DuotoneImage src; alt; sizes; hoverColor?: boolean; priority?: boolean; className?; imgClassName? />`, que exige un ancestro `group` para el efecto de hover
  - `<StatementKicker n?: string; children />` y `<StatementNote next: string; children />`
  - `Button` gana la prop opcional `arrow?: boolean`
  - Clases globales: `.arrow-swap`, `.fill-panel`, `.duotone`, `.photo-belt*`, `.hero-slide`, `.hero-progress`, `.timeline*`, `.ann*`; grano en `.section-dark`; `.font-display` pasa a peso 400.

- [ ] **Step 1: Tokens en `tailwind.config.ts`**

Dentro de `theme.extend.colors`, agregar:

```ts
        'rl-graphite': '#2A2A2A',
        'claude': '#D97757',
```

- [ ] **Step 2: Estilos globales en `app/globals.css`**

2a. Reemplazar el bloque de pesos de Mluvka (desde el comentario `/* Font display — base weight…` hasta la regla `.font-display.text-display-2xl { … }` inclusive) por:

```css
  /* Sistema 2026-09: todos los títulos en Mluvka Regular (400). */
  .font-display {
    font-family: 'Mluvka', system-ui, sans-serif;
    font-weight: 400;
  }
```

2b. Reemplazar la regla `.section-dark { @apply bg-rl-dark text-text-on-dark; }` por:

```css
  .section-dark {
    @apply bg-rl-dark text-text-on-dark;
    position: relative;
    isolation: isolate;
  }
  /* Grano analógico casi imperceptible (refinamiento 5) */
  .section-dark::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 4;
    opacity: 0.07;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  }
```

2c. Al final de `@layer components { … }` (antes de su `}` de cierre), agregar:

```css
  /* ↗ que sale por una esquina y entra por la otra (refinamiento 7) */
  .arrow-swap { position: relative; display: inline-block; width: 0.95em; height: 1em; overflow: hidden; vertical-align: -0.12em; }
  .arrow-swap i { position: absolute; inset: 0; font-style: normal; transition: transform 0.45s cubic-bezier(.2,.8,.2,1); }
  .arrow-swap i + i { transform: translate(-110%, 110%); }
  .group:hover .arrow-swap i:first-child { transform: translate(110%, -110%); }
  .group:hover .arrow-swap i + i { transform: none; }

  /* Tarjeta con relleno rojo desde abajo */
  .fill-panel::before { content: ''; position: absolute; inset: 0; z-index: -1; background: #F32769; transform: translateY(101%); transition: transform 0.65s cubic-bezier(.2,.8,.2,1); }
  .fill-panel:hover::before, .fill-panel:focus-visible::before { transform: none; }
  .fill-panel__circ { width: 46px; height: 46px; border-radius: 9999px; border: 1px solid currentColor; display: grid; place-items: center; font-size: 17px; transition: transform 0.55s cubic-bezier(.2,.8,.2,1), background 0.4s, color 0.4s, border-color 0.4s; }
  .fill-panel:hover .fill-panel__circ { transform: rotate(-45deg); background: #fff; color: #F32769; border-color: #fff; }

  /* Duotono rojo */
  .duotone img { filter: grayscale(1) contrast(1.05); transition: filter 0.6s, transform 0.6s cubic-bezier(.2,.8,.2,1); }
  .duotone::after { content: ''; position: absolute; inset: 0; background: #F32769; mix-blend-mode: multiply; opacity: 0.36; pointer-events: none; transition: opacity 0.6s; }
  .group:hover .duotone--hover img { filter: none; }
  .group:hover .duotone--hover::after { opacity: 0; }

  /* Cinturón de fotos continuo */
  .photo-belt { padding: 16px 0 18px; border-top: 1px solid rgba(13,13,13,.08); overflow: hidden;
    -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent); }
  .photo-belt__track { display: flex; width: max-content; animation: photoBelt 150s linear infinite; }
  .photo-belt:hover .photo-belt__track { animation-play-state: paused; }
  .photo-belt__set { display: flex; flex-shrink: 0; }
  .photo-belt__img { height: 84px; width: auto; margin-right: 10px; border-radius: 2px; object-fit: cover; filter: saturate(.88); }
  @keyframes photoBelt { to { transform: translateX(-50%); } }

  /* Hero de la Home: fundido entre fotos + barra de progreso */
  .hero-slide { opacity: 0; transform: scale(1.06); transition: opacity 1.6s ease, transform 9s linear; }
  .hero-slide.is-on { opacity: 1; transform: scale(1); }
  .hero-progress { transform-origin: left; transform: scaleX(0); animation: heroProgress 6s linear forwards; }
  @keyframes heroProgress { to { transform: scaleX(1); } }
```

2d. Justo después del cierre de `@layer components { … }`, agregar el CSS de la pestaña de anuncios y de la línea de tiempo (fuera de capas, para que no las purgue Tailwind):

```css
/* ===== Pestaña de anuncios (spec §4.3) ===== */
.ann { --pw: 300px; --ease: cubic-bezier(.2,.8,.2,1); position: fixed; right: 0; top: 62vh; z-index: 60; display: flex; align-items: stretch;
  transform: translate(calc(100% + 4px), -50%); transition: transform .42s var(--ease); font-family: 'Mluvka', system-ui, sans-serif;
  --bg: #F5F3F0; --fg: #0D0D0D; --sub: rgba(13,13,13,.5); --rule: rgba(13,13,13,.12); }
.ann *, .ann *::before, .ann *::after { box-sizing: border-box; }
.ann[data-state="collapsed"] { transform: translate(var(--pw), -50%); }
.ann[data-state="collapsed"].is-tucked { transform: translate(calc(var(--pw) + 26px), -50%); }
.ann[data-state="open"] { transform: translate(0, -50%); }
.ann[data-tone="dark"] { --bg: #0D0D0D; --fg: #FAFAF8; --sub: rgba(250,250,248,.55); --rule: rgba(250,250,248,.14); }
.ann-h { all: unset; box-sizing: border-box; cursor: pointer; background: var(--bg); color: var(--fg); writing-mode: vertical-rl; transform: rotate(180deg);
  display: flex; align-items: center; gap: 12px; padding: 18px 10px; border-radius: 0 4px 4px 0;
  font-family: var(--font-jetbrains), monospace; font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
  box-shadow: -10px 0 28px rgba(0,0,0,.18); transition: background .35s, color .35s; }
.ann-h:focus-visible { outline: 2px solid #F32769; outline-offset: 2px; }
.ann-dot { width: 7px; height: 7px; border-radius: 50%; background: #F32769; position: relative; flex-shrink: 0; }
.ann-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1px solid #F32769; animation: annPing 2.4s ease-out 3; opacity: 0; }
@keyframes annPing { 0% { transform: scale(.5); opacity: 1; } 100% { transform: scale(1.7); opacity: 0; } }
.ann-p { width: var(--pw); padding: 20px 22px 18px; position: relative; border-left: 1px solid var(--rule); background: var(--bg); color: var(--fg); transition: background .35s, color .35s; }
.ann-k { display: block; font-family: var(--font-jetbrains), monospace; font-size: 10px; letter-spacing: .15em; text-transform: uppercase; color: #F32769; margin-bottom: 10px; }
.ann-t { font-size: 19px; line-height: 1.22; letter-spacing: -.02em; margin: 0 24px 16px 0; }
.ann-a { display: flex; gap: 18px; padding-top: 13px; border-top: 1px solid var(--rule); font-size: 13px; font-weight: 500; }
.ann-a a:first-child { border-bottom: 1px solid #F32769; padding-bottom: 1px; }
.ann-a a:last-child { color: var(--sub); }
.ann-a a:hover { color: #F32769; }
.ann-x { all: unset; cursor: pointer; position: absolute; top: 12px; right: 12px; width: 26px; height: 26px; display: grid; place-items: center; border-radius: 50%; color: var(--sub); font-size: 16px; line-height: 1; }
.ann-x:hover { background: var(--rule); color: var(--fg); }
.ann-x:focus-visible { outline: 2px solid #F32769; }
@media (max-width: 767px) {
  .ann { top: auto; bottom: 16px; right: 16px; flex-direction: column-reverse; align-items: flex-end; gap: 8px; transform: translateY(160%); }
  .ann[data-state="collapsed"], .ann[data-state="open"] { transform: none; }
  .ann[data-state="collapsed"].is-tucked { transform: translateY(160%); }
  .ann[data-state="collapsed"] .ann-p { display: none; }
  .ann-h { writing-mode: horizontal-tb; transform: none; border-radius: 40px; padding: 10px 14px; }
  .ann-p { width: min(88vw, 320px); border-left: 0; border-radius: 6px; box-shadow: 0 18px 40px rgba(0,0,0,.35); }
}

/* ===== Línea de tiempo animada de Instituciones (spec §3.3) ===== */
.timeline { position: relative; }
.timeline__rail, .timeline__prog { position: absolute; background: rgba(13,13,13,.12); }
.timeline__prog { background: #F32769; }
.timeline__dot { width: 39px; height: 39px; border-radius: 50%; background: #F5F3F0; border: 1px solid #0D0D0D; display: grid; place-items: center;
  font-family: var(--font-jetbrains), monospace; font-size: 11px; position: relative; z-index: 1;
  transition: background .7s, color .7s, border-color .7s, transform .7s cubic-bezier(.2,.8,.2,1); }
.timeline__step.is-on .timeline__dot { background: #F32769; border-color: #F32769; color: #fff; transform: scale(1.08); }
.timeline__step h3, .timeline__step p { transition: opacity .9s; }
.timeline.is-running .timeline__step:not(.is-on) h3, .timeline.is-running .timeline__step:not(.is-on) p { opacity: .45; }
/* horizontal (md+): riel a la altura del centro de los puntos */
@media (min-width: 768px) {
  .timeline__rail, .timeline__prog { left: 0; top: 19px; height: 1px; }
  .timeline__rail { right: 0; }
  .timeline__prog { width: 0; height: 2px; margin-top: -.5px; transition: width 2.6s linear; }
}
/* vertical (móvil): riel a la izquierda */
@media (max-width: 767px) {
  .timeline__rail, .timeline__prog { left: 19px; top: 0; width: 1px; }
  .timeline__rail { bottom: 0; }
  .timeline__prog { height: 0; width: 2px; margin-left: -.5px; transition: height 2.6s linear; }
}
```

- [ ] **Step 3: `lib/analytics.ts`**

```ts
type Payload = Record<string, string | number | boolean | undefined>

/** Empuja un evento a GTM. No hace nada en el servidor ni si GTM no cargó. */
export function track(event: string, payload: Payload = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...payload })
}
```

- [ ] **Step 4: `components/ui/buttonStyles.ts` y `components/ui/ArrowIcon.tsx`**

```ts
// components/ui/buttonStyles.ts
import { cn } from '@/lib/utils'

export type ButtonVariantRL = 'primary' | 'outline' | 'outlineInk' | 'dark'

const base =
  'group inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-[3px] text-[14px] font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rl-red'

const variants: Record<ButtonVariantRL, string> = {
  primary: 'bg-rl-red text-white hover:bg-[#d91f5b]',
  outline: 'border border-white/20 text-text-on-dark hover:border-white/50',
  outlineInk: 'border border-rl-dark/20 text-text-primary hover:border-rl-dark/60',
  dark: 'bg-rl-dark text-white hover:bg-black',
}

export function buttonClasses(variant: ButtonVariantRL = 'primary', className?: string): string {
  return cn(base, variants[variant], className)
}
```

```tsx
// components/ui/ArrowIcon.tsx
import { cn } from '@/lib/utils'

/** ↗ que sale por una esquina y entra por la otra al pasar el mouse. Requiere un ancestro con `group`. */
export default function ArrowIcon({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('arrow-swap', className)}>
      <i>↗</i>
      <i>↗</i>
    </span>
  )
}
```

- [ ] **Step 5: `components/ui/CalendarButton.tsx`**

```tsx
'use client'

import { usePathname } from 'next/navigation'
import { SITE_CONFIG } from '@/lib/constants'
import { track } from '@/lib/analytics'
import ArrowIcon from './ArrowIcon'
import { buttonClasses, type ButtonVariantRL } from './buttonStyles'

interface CalendarButtonProps {
  children: React.ReactNode
  /** Identificador del botón para GTM, p. ej. "home_hero_escalemos" */
  location: string
  /** Contexto opcional (nombre del venture o proyecto) */
  context?: string
  variant?: ButtonVariantRL
  className?: string
}

export default function CalendarButton({ children, location, context, variant = 'primary', className }: CalendarButtonProps) {
  const pathname = usePathname()
  return (
    <a
      href={SITE_CONFIG.calendarUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('cta_calendar', { page: pathname, location, context })}
      className={buttonClasses(variant, className)}
    >
      {children}
      <ArrowIcon />
    </a>
  )
}
```

- [ ] **Step 6: `components/ui/SectionLabel.tsx` y `components/ui/Statement.tsx`**

```tsx
// components/ui/SectionLabel.tsx
import { cn } from '@/lib/utils'

interface SectionLabelProps {
  n: string
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/** Etiqueta editorial: número rojo — línea — texto. */
export default function SectionLabel({ n, children, tone = 'light', className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.15em]',
        tone === 'dark' ? 'text-text-on-dark/40' : 'text-text-tertiary',
        className
      )}
    >
      <span className="text-rl-red">{n}</span>
      <span aria-hidden="true" className="inline-block h-px w-[18px] bg-current opacity-60" />
      {children}
    </p>
  )
}
```

```tsx
// components/ui/Statement.tsx
export function StatementKicker({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="mb-10 flex items-center gap-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40">
      <span aria-hidden="true" className="inline-block h-px w-9 bg-rl-red" />
      {n && <span className="text-rl-red">{n}</span>}
      {children}
    </p>
  )
}

export function StatementNote({ next, children }: { next: string; children: React.ReactNode }) {
  return (
    <div className="mt-11 grid grid-cols-1 gap-6 border-t border-border-dark pt-7 md:mt-14 md:grid-cols-12">
      <p className="text-[16px] leading-[1.65] text-text-muted md:col-span-6 md:text-[17px]">{children}</p>
      <span className="self-end font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40 md:col-span-4 md:col-start-9 md:text-right">
        {next} ↓
      </span>
    </div>
  )
}
```

- [ ] **Step 7: `components/ui/FillPanel.tsx` y `components/ui/DuotoneImage.tsx`**

```tsx
// components/ui/FillPanel.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'

interface FillPanelProps {
  href: string
  kicker: string
  title: string
  cta: string
  tone: 'light' | 'graphite' | 'ink'
  external?: boolean
  /** Si se define, el clic envía cta_calendar con esta ubicación */
  trackLocation?: string
  titleClassName?: string
  className?: string
  children: React.ReactNode
}

const tones = {
  light: 'bg-white text-text-primary shadow-[0_0_0_1px_rgba(13,13,13,.1)]',
  graphite: 'bg-rl-graphite text-text-on-dark',
  ink: 'bg-[#1E1E1E] text-text-on-dark shadow-[0_0_0_1px_rgba(250,250,248,.1)]',
}

export default function FillPanel({ href, kicker, title, cta, tone, external, trackLocation, titleClassName, className, children }: FillPanelProps) {
  const pathname = usePathname()
  const classes = cn(
    'fill-panel group relative isolate flex flex-col gap-3.5 overflow-hidden rounded-[4px] p-8 transition-colors duration-[400ms] hover:text-white md:px-9 md:pb-[30px] md:pt-[34px]',
    tones[tone],
    className
  )
  const body = (
    <>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red transition-colors duration-[400ms] group-hover:text-white">
        {kicker}
      </span>
      <h3 className={cn('font-sans text-[40px] font-normal leading-[.95] tracking-[-0.045em] md:text-[54px]', titleClassName)}>{title}</h3>
      <p className="max-w-[420px] text-[16px] leading-[1.55] opacity-75 md:text-[17px]">{children}</p>
      <span className="mt-2.5 flex items-center justify-between text-[14px] font-medium">
        {cta}
        <span className="fill-panel__circ" aria-hidden="true">→</span>
      </span>
    </>
  )
  const onClick = trackLocation ? () => track('cta_calendar', { page: pathname, location: trackLocation }) : undefined
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={classes}>
        {body}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={classes}>
      {body}
    </Link>
  )
}
```

```tsx
// components/ui/DuotoneImage.tsx
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DuotoneImageProps {
  src: string
  alt: string
  sizes: string
  hoverColor?: boolean
  priority?: boolean
  className?: string
  imgClassName?: string
}

/** Foto en duotono rojo. Con hoverColor pasa a color cuando un ancestro `group` recibe hover. */
export default function DuotoneImage({ src, alt, sizes, hoverColor, priority, className, imgClassName }: DuotoneImageProps) {
  return (
    <div className={cn('duotone relative overflow-hidden', hoverColor && 'duotone--hover', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn('object-cover', imgClassName)} />
    </div>
  )
}
```

- [ ] **Step 8: `Button` con flecha opcional y transición de página más pausada**

En `components/ui/Button.tsx`:
- agregar `arrow?: boolean` a `ButtonProps`;
- agregarlo al destructuring (`arrow = false,`);
- importar `ArrowIcon from './ArrowIcon'`;
- cambiar la rama no-`text` de `content` a:

```tsx
    ) : (
      <>
        {children}
        {arrow && <ArrowIcon className="ml-2" />}
      </>
    )
```

- y agregar `'group'` como primera clase en `baseClasses`: `cn('group inline-flex items-center …`.

En `components/animations/PageTransition.tsx`, cambiar `duration: 0.25` por `duration: 0.45`. Es el refinamiento 8: la transición entre páginas que ya existe, más pausada. `@view-transition` no aplica a la navegación del lado del cliente de Next (spec §4.5).

- [ ] **Step 9: Verificar**

Run: `npx tsc --noEmit && npm run lint && npm test`
Expected: sin errores y 6 tests en PASS.
Luego `npm run dev` y revisar `/biobuilders`: los títulos que eran negrita ahora se ven en peso 400 y las secciones oscuras tienen un grano muy sutil. Este cambio es global y se revisa con Eddie en la Task 11.

- [ ] **Step 10: Commit**

```bash
git add tailwind.config.ts app/globals.css lib/analytics.ts components/ui components/animations/PageTransition.tsx
git commit -m "feat(ui): design system primitives — calendar CTA, section label, fill panel, duotone, grain

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Pestaña de anuncios

**Files:**
- Create: `lib/announcements.ts`, `data/announcements.ts`, `components/ui/AnnouncementTab.tsx`
- Test: `tests/announcements.test.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `track` (Task 3), `BIOBUILDERS_FORM_URL` (`lib/constants.ts`)
- Produces: `interface Announcement { id; kicker; title; handleLabel; primary: AnnouncementLink; secondary?: AnnouncementLink; start: string; end: string; excludePaths: string[] }`, `interface AnnouncementLink { label: string; href: string; external?: boolean }`, `pickAnnouncement(list, now: Date, pathname: string): Announcement | null` y el atributo `data-no-announce` para ocultarla sobre una sección.

- [ ] **Step 1: Test que falla**

`tests/announcements.test.ts`:

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickAnnouncement, type Announcement } from '../lib/announcements.ts'

const base: Announcement = {
  id: 'a',
  kicker: 'k',
  title: 't',
  handleLabel: 'h',
  primary: { label: 'p', href: '/x' },
  start: '2026-09-01',
  end: '2026-12-31',
  excludePaths: ['/biobuilders'],
}
const d = (s: string) => new Date(s + 'T12:00:00Z')

test('devuelve la campaña vigente', () => {
  assert.equal(pickAnnouncement([base], d('2026-10-01'), '/')?.id, 'a')
})
test('ignora campañas futuras o vencidas (end es exclusivo)', () => {
  assert.equal(pickAnnouncement([base], d('2026-08-31'), '/'), null)
  assert.equal(pickAnnouncement([base], d('2026-12-31'), '/'), null)
})
test('no se muestra en su página destino ni en sus subrutas', () => {
  assert.equal(pickAnnouncement([base], d('2026-10-01'), '/biobuilders'), null)
  assert.equal(pickAnnouncement([base], d('2026-10-01'), '/biobuilders/algo'), null)
  assert.equal(pickAnnouncement([base], d('2026-10-01'), '/biobuilders-otro')?.id, 'a')
})
test('si hay varias vigentes gana la primera', () => {
  const b = { ...base, id: 'b' }
  assert.equal(pickAnnouncement([b, base], d('2026-10-01'), '/')?.id, 'b')
})
```

- [ ] **Step 2: Ver que falla**

Run: `npm test`
Expected: FAIL con `Cannot find module '…/lib/announcements.ts'`.

- [ ] **Step 3: `lib/announcements.ts` (sin alias `@/`, para poder probarlo con Node)**

```ts
export interface AnnouncementLink {
  label: string
  href: string
  external?: boolean
}

export interface Announcement {
  id: string
  kicker: string
  title: string
  /** Texto vertical de la pestaña */
  handleLabel: string
  primary: AnnouncementLink
  secondary?: AnnouncementLink
  /** ISO yyyy-mm-dd, inclusivo */
  start: string
  /** ISO yyyy-mm-dd, exclusivo */
  end: string
  excludePaths: string[]
}

const day = (iso: string) => new Date(iso + 'T00:00:00Z').getTime()

export function pickAnnouncement(list: Announcement[], now: Date, pathname: string): Announcement | null {
  const t = now.getTime()
  return (
    list.find(
      (a) =>
        t >= day(a.start) &&
        t < day(a.end) &&
        !a.excludePaths.some((p) => pathname === p || pathname.startsWith(p + '/'))
    ) ?? null
  )
}
```

- [ ] **Step 4: Tests en verde**

Run: `npm test`
Expected: PASS (10 tests en total).

- [ ] **Step 5: `data/announcements.ts`**

```ts
import type { Announcement } from '@/lib/announcements'
import { BIOBUILDERS_FORM_URL } from '@/lib/constants'

// Una campaña a la vez: se muestra la primera vigente. Para rotar, agregar otra
// arriba con sus fechas. `end` es exclusivo: ajustarlo al cierre real de la convocatoria.
export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'biobuilders-2026',
    kicker: 'Convocatoria abierta',
    title: 'Súmate a la red de Bio/Builders 2026.',
    handleLabel: 'Bio/Builders 2026',
    primary: { label: 'Postula aquí ↗', href: BIOBUILDERS_FORM_URL, external: true },
    secondary: { label: 'Descubre más →', href: '/biobuilders' },
    start: '2026-09-01',
    end: '2027-01-01',
    excludePaths: ['/biobuilders'],
  },
]
```

- [ ] **Step 6: `components/ui/AnnouncementTab.tsx`**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ANNOUNCEMENTS } from '@/data/announcements'
import { pickAnnouncement, type Announcement } from '@/lib/announcements'
import { track } from '@/lib/analytics'

type TabState = 'hidden' | 'collapsed' | 'open'

const storageKey = (k: string, id: string) => `ann:${k}:${id}`
function readStore(k: string): string | null {
  try { return window.localStorage.getItem(k) } catch { return null }
}
function writeStore(k: string, v: string | null) {
  try { if (v === null) window.localStorage.removeItem(k); else window.localStorage.setItem(k, v) } catch { /* modo privado */ }
}

/** Luminancia del primer fondo opaco bajo un punto → tono de la pestaña. */
function toneAt(x: number, y: number, self: HTMLElement): { tone: 'light' | 'dark'; blocked: boolean } {
  const stack = document.elementsFromPoint(x, y).filter((n) => !self.contains(n))
  const first = stack[0] as HTMLElement | undefined
  if (!first) return { tone: 'light', blocked: false }
  const blocked = !!first.closest('[data-no-announce]')
  for (let n: HTMLElement | null = first; n; n = n.parentElement) {
    const m = getComputedStyle(n).backgroundColor.match(/rgba?\(([^)]+)\)/)
    if (!m) continue
    const [r, g, b, a = '1'] = m[1].split(',').map((s) => s.trim())
    if (parseFloat(a) < 0.5) continue
    const lum = (0.299 * +r + 0.587 * +g + 0.114 * +b) / 255
    // fondo oscuro → pestaña clara; fondo claro o rojo → pestaña oscura
    return { tone: lum < 0.35 ? 'light' : 'dark', blocked }
  }
  return { tone: 'light', blocked }
}

export default function AnnouncementTab() {
  const pathname = usePathname()
  const [ann, setAnn] = useState<Announcement | null>(null)
  useEffect(() => {
    setAnn(pickAnnouncement(ANNOUNCEMENTS, new Date(), pathname))
  }, [pathname])
  if (!ann) return null
  return <Tab key={ann.id + pathname} ann={ann} />
}

function Tab({ ann }: { ann: Announcement }) {
  const el = useRef<HTMLElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const [state, setState] = useState<TabState>('hidden')
  const [tone, setTone] = useState<'light' | 'dark'>('light')
  const [tucked, setTucked] = useState(false)
  const [mini, setMini] = useState(false)
  const s = useRef({ state: 'hidden' as TabState, appeared: false, blocked: false, mini: false })

  const set = (next: TabState) => { s.current.state = next; setState(next) }
  const open = (src?: 'hover' | 'click') => {
    if (s.current.blocked) return
    set('open')
    if (src) track('announcement_open', { campaign: ann.id, via: src })
  }
  const collapse = () => { if (s.current.state === 'open') set('collapsed') }

  useEffect(() => {
    const node = el.current
    if (!node) return
    const isMini = !!readStore(storageKey('minimized', ann.id))
    s.current.mini = isMini
    setMini(isMini)

    let lastY = window.scrollY
    let idle: number | undefined
    const probe = () => {
      const r = node.getBoundingClientRect()
      const { tone: t, blocked } = toneAt(window.innerWidth - 60, r.top + r.height / 2, node)
      setTone(t)
      if (blocked !== s.current.blocked) {
        s.current.blocked = blocked
        if (s.current.appeared) set(blocked ? 'hidden' : 'collapsed')
      }
    }
    const appear = () => {
      if (s.current.appeared) return
      s.current.appeared = true
      set('collapsed')
      track('announcement_view', { campaign: ann.id })
      if (!s.current.mini && !readStore(storageKey('peeked', ann.id))) {
        window.setTimeout(() => {
          if (s.current.state === 'collapsed') {
            set('open')
            window.setTimeout(collapse, 3200)
          }
          writeStore(storageKey('peeked', ann.id), '1')
        }, 900)
      }
    }
    const t0 = window.setTimeout(appear, 2500)
    const onScroll = () => {
      if (!s.current.appeared && window.scrollY > window.innerHeight * 0.2) { window.clearTimeout(t0); appear() }
      const dy = window.scrollY - lastY
      lastY = window.scrollY
      if (s.current.state === 'open' && Math.abs(dy) > 2) collapse()
      if (dy > 4) setTucked(true)
      if (dy < -4) setTucked(false)
      window.clearTimeout(idle)
      idle = window.setTimeout(() => setTucked(false), 550)
      requestAnimationFrame(probe)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') collapse() }
    const onDoc = (e: MouseEvent) => { if (!node.contains(e.target as Node)) collapse() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('click', onDoc)
    probe()
    return () => {
      window.clearTimeout(t0)
      window.clearTimeout(idle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onDoc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ann.id])

  const hoverTimer = useRef<number>()
  const onEnter = () => {
    window.clearTimeout(hoverTimer.current)
    if (s.current.mini) return
    hoverTimer.current = window.setTimeout(() => open('hover'), 140)
  }
  const onLeave = () => {
    window.clearTimeout(hoverTimer.current)
    hoverTimer.current = window.setTimeout(collapse, 450)
  }
  const onHandle = () => {
    if (s.current.state === 'open') return collapse()
    if (s.current.mini) {
      s.current.mini = false
      setMini(false)
      writeStore(storageKey('minimized', ann.id), null)
      track('announcement_restore', { campaign: ann.id })
    }
    open('click')
  }
  const onMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()
    set('collapsed')
    s.current.mini = true
    setMini(true)
    writeStore(storageKey('minimized', ann.id), '1')
    track('announcement_minimize', { campaign: ann.id })
    btn.current?.focus({ preventScroll: true })
  }
  const link = (l: NonNullable<Announcement['secondary']>, ev: string) =>
    l.external ? (
      <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => track(ev, { campaign: ann.id })}>{l.label}</a>
    ) : (
      <Link href={l.href} onClick={() => track(ev, { campaign: ann.id })}>{l.label}</Link>
    )

  return (
    <aside
      ref={el}
      className={`ann${tucked ? ' is-tucked' : ''}${mini ? ' is-mini' : ''}`}
      data-state={state}
      data-tone={tone}
      aria-label="Anuncio"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button ref={btn} className="ann-h" type="button" aria-expanded={state === 'open'} aria-controls="ann-panel" onClick={onHandle}>
        <span className="ann-dot" aria-hidden="true" />
        <span>{ann.handleLabel}</span>
      </button>
      <div className="ann-p" id="ann-panel">
        <button className="ann-x" type="button" aria-label="Minimizar anuncio" title="Minimizar" onClick={onMinimize}>×</button>
        <span className="ann-k">{ann.kicker}</span>
        <p className="ann-t">{ann.title}</p>
        <div className="ann-a">
          {link(ann.primary, 'announcement_click_apply')}
          {ann.secondary && link(ann.secondary, 'announcement_click_more')}
        </div>
      </div>
    </aside>
  )
}
```

- [ ] **Step 7: Montarla en `app/layout.tsx`**

Importar `import AnnouncementTab from '@/components/ui/AnnouncementTab'` y agregarla **después** de `<Footer />`, fuera de `PageTransition` (que aplica `transform` y rompería `position: fixed`):

```tsx
        <Footer />
        <AnnouncementTab />
```

- [ ] **Step 8: Verificar en el navegador**

Run: `npx tsc --noEmit && npm run lint && npm test`, y luego `npm run dev`.
Comprobar en `http://localhost:3000/`:
- la pestaña aparece a los 2,5 s y se asoma sola la primera vez;
- se repliega al bajar y cambia de tono sobre secciones crema y oscuras;
- la × la minimiza y el estado sobrevive a una recarga;
- en `/biobuilders` no aparece;
- con el viewport en 375 px se ve como píldora abajo a la derecha.

En la consola, `dataLayer` recibe `announcement_*`. Para reiniciar la prueba: `Object.keys(localStorage).filter(k=>k.startsWith('ann:')).forEach(k=>localStorage.removeItem(k))`.

- [ ] **Step 9: Commit**

```bash
git add lib/announcements.ts data/announcements.ts components/ui/AnnouncementTab.tsx tests/announcements.test.ts app/layout.tsx
git commit -m "feat(announcements): side tab with campaign rotation, minimize and GTM events

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Menú y footer

**Files:**
- Modify: `components/layout/Navigation.tsx`, `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `FOOTER_LINKS`, `SITE_CONFIG`, `track`, `ArrowIcon`, `CalendarButton`.

- [ ] **Step 1: CTA del menú al calendario y estado activo**

En `components/layout/Navigation.tsx`:

1. Importar `ArrowIcon from '@/components/ui/ArrowIcon'`, `CalendarButton from '@/components/ui/CalendarButton'` y `{ track } from '@/lib/analytics'`. Quitar `Button` si deja de usarse.
2. Reemplazar el bloque `{/* Desktop CTA */}` por:

```tsx
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href={SITE_CONFIG.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('cta_calendar', { page: pathname, location: 'nav' })}
              className="group inline-flex items-center gap-2 text-body-sm text-text-on-dark transition-colors hover:text-rl-red"
            >
              Escribir al equipo <ArrowIcon />
            </a>
          </div>
```

3. En el menú móvil, reemplazar el `<Button variant="primary" href={`mailto:…`}>Escribir al equipo &rarr;</Button>` por:

```tsx
                <CalendarButton location="nav_mobile" className="mt-4">Escribir al equipo</CalendarButton>
```

4. Estado activo también en subrutas: en el `className` del link de escritorio, cambiar `pathname === link.href && 'text-text-on-dark'` por:

```tsx
                      (pathname === link.href || pathname.startsWith(link.href + '/')) && 'text-text-on-dark'
```

- [ ] **Step 2: Footer por audiencias, crédito y exclusión de la pestaña**

En `components/layout/Footer.tsx` (ya renombrado en la Task 2 a `audiencias` y `portafolio`):

1. Agregar `data-no-announce` al `<footer className="section-dark">`: `<footer className="section-dark" data-no-announce>`.
2. Confirmar que los encabezados muestran `FOOTER_LINKS.audiencias.titulo` ("Trabaja con nosotros") y `FOOTER_LINKS.portafolio.titulo` ("Portafolio").
3. Conservar sin cambios el crédito "Diseño y desarrollo por Thousandfold" → `https://www.thousandfold.la/`, el correo, el teléfono, la dirección y `fondodeimpacto.pe`.

- [ ] **Step 3: Verificar**

Run: `npx tsc --noEmit && npm run lint`, y luego `npm run dev`. En escritorio y en 375 px:
- el menú muestra Empresas · Bio/Builders ▾ (con Ventures) · Instituciones · Proyectos · Conocimiento;
- "Escribir al equipo" abre el calendario en una pestaña nueva;
- el footer muestra las columnas nuevas;
- la pestaña de anuncios desaparece al llegar al footer.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navigation.tsx components/layout/Footer.tsx
git commit -m "feat(nav): audience menu, calendar CTA and audience footer

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Home — hero, aliados, tesis, cinturón y "El temor de fondo"

**Files:**
- Create: `data/photo-belt.ts`, `components/ui/PhotoBelt.tsx`, `app/(landing)/sections/HomeHero.tsx`, `AlliesLine.tsx`, `ThesisSection.tsx`, `FearStatement.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `CalendarButton`, `Tag`, `SectionLabel`, `StatementKicker`/`StatementNote`, `ALLIES_FLAT`, `ALLIES_LABEL`.
- Produces: `PHOTO_BELT: { src: string; width: number }[]` y `<PhotoBelt />`.

- [ ] **Step 1: `data/photo-belt.ts`**

```ts
// Todas las fotos del sitio para el cinturón de la Home (spec §3.1).
// width = ancho a 84 px de alto según la proporción real de cada archivo.
export const PHOTO_BELT: { src: string; width: number }[] = [
  { src: '/assets/hero/hero-06.jpg', width: 63 },
  { src: '/assets/hero/hero-20.jpg', width: 149 },
  { src: '/assets/hero/hero-15.jpg', width: 63 },
  { src: '/assets/hero/hero-09.jpg', width: 112 },
  { src: '/assets/conocimiento/blended-finance.jpg', width: 63 },
  { src: '/assets/conocimiento/re-ia.jpg', width: 101 },
  { src: '/assets/ventures/neofibers.jpg', width: 47 },
  { src: '/assets/hero/hero-13.jpg', width: 63 },
  { src: '/assets/ventures/greenprod.jpg', width: 63 },
  { src: '/assets/ventures/thousandfold.jpg', width: 63 },
  { src: '/assets/hero/hero-01.jpg', width: 63 },
  { src: '/assets/conocimiento/innovation-matrix.jpg', width: 112 },
  { src: '/assets/ventures/startups4climate.jpg', width: 63 },
  { src: '/assets/hero/hero-11.jpg', width: 47 },
  { src: '/assets/hero/hero-16.jpg', width: 63 },
  { src: '/assets/conocimiento/comunidades-nativas.jpg', width: 63 },
  { src: '/assets/conocimiento/due-diligence.jpg', width: 63 },
  { src: '/assets/ventures/bio-business-school.jpg', width: 63 },
  { src: '/assets/hero/hero-18.jpg', width: 63 },
  { src: '/assets/hero/hero-22.jpg', width: 63 },
  { src: '/assets/hero/hero-08.jpg', width: 112 },
  { src: '/assets/ventures/ecovive.jpg', width: 63 },
  { src: '/assets/ventures/cotton-nation.jpg', width: 63 },
  { src: '/assets/hero/hero-14.jpg', width: 63 },
  { src: '/assets/hero/hero-03.jpg', width: 126 },
  { src: '/assets/ventures/rare-by.jpg', width: 67 },
  { src: '/assets/conocimiento/birf.jpg', width: 63 },
  { src: '/assets/hero/hero-17.jpg', width: 112 },
  { src: '/assets/hero/hero-02.jpg', width: 149 },
  { src: '/assets/hero/hero-19.jpg', width: 112 },
  { src: '/assets/hero/hero-12.jpg', width: 63 },
  { src: '/assets/hero/hero-07.jpg', width: 63 },
  { src: '/assets/hero/hero-05.jpg', width: 63 },
  { src: '/assets/hero/hero-04.jpg', width: 126 },
  { src: '/assets/ventures/endemics.jpg', width: 167 },
  { src: '/assets/hero/hero-10.jpg', width: 63 },
  { src: '/assets/hero/hero-21.jpg', width: 112 },
]
```

- [ ] **Step 2: `components/ui/PhotoBelt.tsx`**

```tsx
import Image from 'next/image'
import { PHOTO_BELT } from '@/data/photo-belt'

/** Cinturón continuo: dos copias idénticas que se desplazan exactamente una copia (-50%). */
export default function PhotoBelt() {
  const set = PHOTO_BELT.map((p) => (
    <Image key={p.src} src={p.src} alt="" width={p.width} height={84} sizes={`${p.width * 2}px`} className="photo-belt__img" style={{ width: p.width }} />
  ))
  return (
    <div className="photo-belt" aria-hidden="true">
      <div className="photo-belt__track">
        <div className="photo-belt__set">{set}</div>
        <div className="photo-belt__set">{set}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: `app/(landing)/sections/HomeHero.tsx`**

```tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Tag from '@/components/ui/Tag'
import CalendarButton from '@/components/ui/CalendarButton'
import { cn } from '@/lib/utils'

const SLIDES = ['/assets/hero/hero-21.jpg', '/assets/conocimiento/birf.jpg', '/assets/hero/hero-07.jpg', '/assets/hero/hero-04.jpg']
const INTERVAL = 6000
const pad = (n: number) => String(n).padStart(2, '0')

export default function HomeHero() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setInterval(() => setI((v) => (v + 1) % SLIDES.length), INTERVAL)
    return () => window.clearInterval(t)
  }, [])

  return (
    <section className="section-dark">
      <div className="container-rl grid grid-cols-1 items-end gap-10 pb-16 pt-32 md:pb-[72px] md:pt-40 lg:grid-cols-[1.25fr_.75fr] lg:gap-14">
        <div>
          <Tag className="mb-7">The AI Studio for Bioeconomy Industries</Tag>
          <h1 className="font-sans text-[40px] font-normal leading-[1.0] tracking-[-0.035em] md:text-[58px]">
            La bioeconomía de América Latina tiene el potencial.{' '}
            <span className="text-text-muted">Nosotros lo convertimos en negocios que escalan.</span>
          </h1>
          <p className="mb-9 mt-7 max-w-[520px] text-[17px] leading-[1.6] text-text-muted">
            Somos un Venture Studio boutique. Diseñamos, escalamos e invertimos en negocios con potencial real, para convertirlos en empresas que compitan en los mercados más exigentes.
          </p>
          <div className="flex flex-wrap gap-3">
            <CalendarButton location="home_hero_escalemos">Escalemos juntos</CalendarButton>
            <CalendarButton location="home_hero_capital" variant="outline">Accede a capital de impacto</CalendarButton>
          </div>
        </div>
        <figure className="relative h-[320px] overflow-hidden rounded-[3px] md:h-[440px]">
          {SLIDES.map((src, k) => (
            <div key={src} className={cn('hero-slide duotone absolute inset-0', k === i && 'is-on')}>
              <Image src={src} alt="" fill sizes="(min-width: 1024px) 36vw, 100vw" priority={k === 0} className="object-cover" />
            </div>
          ))}
          <figcaption className="absolute bottom-3 left-3.5 right-3.5 z-[3] flex items-center gap-3 font-mono text-[10px] tracking-[0.15em] text-white">
            <span>{pad(i + 1)}</span>
            <span className="relative h-px flex-1 overflow-hidden bg-white/30">
              <i key={i} className="hero-progress absolute inset-0 bg-white" />
            </span>
            <span>{pad(SLIDES.length)}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: `AlliesLine.tsx`, `ThesisSection.tsx` y `FearStatement.tsx`**

```tsx
// app/(landing)/sections/AlliesLine.tsx
import { Fragment } from 'react'
import { ALLIES_FLAT, ALLIES_LABEL } from '@/lib/constants'

export default function AlliesLine() {
  return (
    <section className="section-dark border-t border-border-dark">
      <div className="container-rl grid grid-cols-1 gap-4 py-7 md:grid-cols-[180px_1fr] md:gap-8 md:py-9">
        <p className="pt-1 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-muted">{ALLIES_LABEL}</p>
        <p className="text-[13px] leading-[2.05] text-text-on-dark/40">
          {ALLIES_FLAT.map((a, i) => (
            <Fragment key={a}>
              {i > 0 && <span aria-hidden="true" className="mx-2.5 text-text-on-dark/15">/</span>}
              {a}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
```

```tsx
// app/(landing)/sections/ThesisSection.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import PhotoBelt from '@/components/ui/PhotoBelt'

export default function ThesisSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl pb-20 pt-24 md:pb-24">
        <div className="mb-7 flex items-center justify-between border-b border-border-light pb-3.5">
          <SectionLabel n="01">Nuestra tesis</SectionLabel>
          <span className="font-mono text-[10.5px] tracking-[0.15em] text-text-tertiary">01 / 06</span>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-5">
            ¿Por qué los bionegocios en América Latina no escalan?
          </h2>
          <div className="space-y-4 text-[16px] leading-[1.7] text-text-secondary lg:col-span-6 lg:col-start-7">
            <p>En estos años hemos conocido bionegocios con enorme potencial: comunidades nativas, pequeños productores, biodiversidad, buenos productos, plantas de producción ya construidas, incluso con soporte activo de cooperación técnica internacional y soporte financiero.</p>
            <p>Pero eso no basta. Son negocios que no facturan lo suficiente ni son lo bastante sólidos: las plantas están paradas, no hay gobernanza, no hay sistemas de suministro estables. Por eso la mayoría termina siendo negocios de subsistencia, no negocios con escalamiento real. Hoy dependen de fondos no reembolsables y de agencias de cooperación, con el mismo temor de fondo.</p>
          </div>
        </div>
      </div>
      <PhotoBelt />
    </section>
  )
}
```

```tsx
// app/(landing)/sections/FearStatement.tsx
import { StatementKicker, StatementNote } from '@/components/ui/Statement'

export default function FearStatement() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-[88px] pt-[88px] md:pb-[104px] md:pt-28">
        <StatementKicker>El temor de fondo</StatementKicker>
        <blockquote className="max-w-[1180px] font-sans text-[44px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[84px]">
          Si el fondo se acaba, <em className="not-italic text-rl-red">el bionegocio se cae.</em>
        </blockquote>
        <StatementNote next="Por eso">
          Es lo que escuchamos en cada territorio: negocios con potencial real que dependen de fondos no reembolsables y de la cooperación. Resolver esa dependencia es el punto de partida de todo lo que hacemos.
        </StatementNote>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Componer en `app/page.tsx` (parcial; la Task 7 completa el resto)**

```tsx
import HomeHero from './(landing)/sections/HomeHero'
import AlliesLine from './(landing)/sections/AlliesLine'
import ThesisSection from './(landing)/sections/ThesisSection'
import FearStatement from './(landing)/sections/FearStatement'

export default function Home() {
  return (
    <>
      <HomeHero />
      <AlliesLine />
      <ThesisSection />
      <FearStatement />
    </>
  )
}
```

- [ ] **Step 6: Verificar**

Run: `npx tsc --noEmit && npm run lint`, y luego `npm run dev`. Comparar `/` con `home-v6.html`:
- el hero cambia de foto cada 6 s con su barra de progreso;
- aparecen los 35 aliados;
- el cinturón es continuo, sin huecos, y se pausa al pasar el mouse;
- la declaración mide unos 590 px a 1440 × 900.

Revisar también en 375 px.

- [ ] **Step 7: Commit**

```bash
git add data/photo-belt.ts components/ui/PhotoBelt.tsx "app/(landing)/sections/HomeHero.tsx" "app/(landing)/sections/AlliesLine.tsx" "app/(landing)/sections/ThesisSection.tsx" "app/(landing)/sections/FearStatement.tsx" app/page.tsx
git commit -m "feat(home): hero slideshow, allies line, thesis with photo belt, fear statement

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Home — propuesta, divisiones, instituciones, conocimiento, fundadores y cierre

**Files:**
- Create: `data/resources.ts`, `app/(landing)/sections/ProposalSection.tsx`, `DivisionsSection.tsx`, `InstitutionsBand.tsx`, `KnowledgeSection.tsx`, `FoundersSection.tsx`, `HomeClosing.tsx`
- Modify: `app/conocimiento/sections/ResourcesList.tsx`, `app/page.tsx`

**Interfaces:**
- Consumes: `FillPanel`, `DuotoneImage`, `SectionLabel`, `Statement*`, `ArrowIcon`, `buttonClasses`, `CalendarButton`, `DIVISIONS`, `team`, `ResourceDrawer`.
- Produces: `resources` (exportado desde `data/resources.ts`, mismo tipo que hoy) y `type ResourceItem = (typeof resources)[number]`.

- [ ] **Step 1: Extraer los recursos a `data/resources.ts` y corregir las dos guías sin archivo**

1. Mover **tal cual** el arreglo `const resources = [ … ]` de `app/conocimiento/sections/ResourcesList.tsx` a un archivo nuevo `data/resources.ts`, como `export const resources = [ … ]`, y agregar al final `export type ResourceItem = (typeof resources)[number]`.
2. En ese arreglo, en las entradas `slug: 'due-diligence-tecnico'` y `slug: 'inversion-comunidades-nativas'`, cambiar:

```ts
    type: 'Próximamente',
    available: false,
```

(hoy dicen `type: 'Disponible ahora · PDF · Español'` y `available: true` con `downloadUrl: '#'`, es decir, una descarga rota; spec §7.1 b).

3. En `ResourcesList.tsx`, borrar el arreglo local e importar `import { resources } from '@/data/resources'`.

- [ ] **Step 2: `ProposalSection.tsx` e `InstitutionsBand.tsx`**

```tsx
// app/(landing)/sections/ProposalSection.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import FillPanel from '@/components/ui/FillPanel'

export default function ProposalSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl flex min-h-[92vh] flex-col justify-center pb-28 pt-24 md:pb-[168px] md:pt-[136px]">
        <SectionLabel n="02" className="mb-4">Nuestra propuesta</SectionLabel>
        <h2 className="mb-11 max-w-[900px] font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[46px]">
          Por eso hacemos Venture Building: construimos negocios nuevos, y escalamos los que ya existen.
        </h2>
        <div className="grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
          <FillPanel href="/empresas" tone="light" kicker="Para escalar" title="Empresas" cta="Ver cómo trabajamos con empresas">
            Si ya tienes un bionegocio, te ayudamos a escalarlo a nivel comercial, operativo y financiero.
          </FillPanel>
          <FillPanel href="/biobuilders" tone="graphite" kicker="Para construir" title="Bio/Builders" cta="Conoce Bio/Builders">
            Si quieres construir un nuevo bionegocio, te conectamos con la red de desarrolladores de negocio.
          </FillPanel>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// app/(landing)/sections/InstitutionsBand.tsx
import Image from 'next/image'
import Link from 'next/link'
import ArrowIcon from '@/components/ui/ArrowIcon'
import { buttonClasses } from '@/components/ui/buttonStyles'

export default function InstitutionsBand() {
  return (
    <section className="section-accent relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.28] mix-blend-multiply">
        <Image src="/assets/hero/hero-09.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_40%] contrast-[1.1] grayscale" />
      </div>
      <div className="container-rl relative grid grid-cols-1 items-end gap-6 py-16 md:py-[88px] lg:grid-cols-12">
        <p className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/75 lg:col-span-12">
          <span className="text-white">04</span>
          <span aria-hidden="true" className="inline-block h-px w-[18px] bg-current opacity-60" />
          Para fondos y agencias de cooperación
        </p>
        <h2 className="font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-7">
          ¿Quieres llevar esto a tus empresas beneficiarias?
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="mb-5 text-[15px] leading-[1.6] text-white/90">
            Cada división nos permite compartir nuestra experiencia en company building con tu cartera, en todo el territorio.
          </p>
          <Link href="/fondos" className={buttonClasses('dark')}>
            Conoce cómo trabajamos con instituciones <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: `DivisionsSection.tsx`**

```tsx
// app/(landing)/sections/DivisionsSection.tsx
import { StatementKicker, StatementNote } from '@/components/ui/Statement'
import DuotoneImage from '@/components/ui/DuotoneImage'
import ArrowIcon from '@/components/ui/ArrowIcon'
import { DIVISIONS, type Division } from '@/lib/constants'
import { cn } from '@/lib/utils'

function Row({ d }: { d: Division }) {
  const soon = d.domain === null
  const inner = (
    <>
      {d.image ? (
        <DuotoneImage src={d.image} alt="" sizes="84px" hoverColor className="h-12 w-16 rounded-[2px] md:h-16 md:w-[84px]" />
      ) : (
        <span className="grid h-12 w-16 place-items-center rounded-[2px] border border-dashed border-text-on-dark/30 text-text-on-dark/40 md:h-16 md:w-[84px]">+</span>
      )}
      <div>
        <h3 className="font-sans text-[22px] font-normal leading-[1.1] tracking-[-0.03em] transition-colors group-hover:text-white md:text-[25px]">{d.theme}</h3>
        <span className={cn('mt-2 flex items-center gap-2 text-[13px]', soon ? 'text-text-on-dark/40' : 'text-rl-red')}>
          <span aria-hidden="true" className="inline-block h-px w-3.5 bg-current" />
          {d.brand}
        </span>
      </div>
      <p className="col-span-2 text-[14px] leading-[1.55] text-text-muted md:col-span-1">{d.description}</p>
      <span className={cn('col-span-2 text-[13px] md:col-span-1 md:text-right', soon ? 'font-mono uppercase tracking-[0.15em] text-text-on-dark/40' : 'text-text-on-dark')}>
        {soon ? 'Próximamente' : d.domain}
        {d.href && <ArrowIcon className="ml-1.5 text-rl-red" />}
      </span>
    </>
  )
  const rowClass = cn(
    'group grid grid-cols-[64px_1fr] items-center gap-x-5 gap-y-3 border-b border-border-dark py-5 transition-colors md:grid-cols-[84px_1.05fr_1.1fr_190px] md:gap-7',
    soon && 'opacity-50',
    d.href && 'hover:bg-white/[0.025]'
  )
  return (
    <li>
      {d.href ? (
        <a href={d.href} target="_blank" rel="noopener noreferrer" className={rowClass}>{inner}</a>
      ) : (
        <div className={rowClass}>{inner}</div>
      )}
    </li>
  )
}

export default function DivisionsSection() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-24 md:pb-[104px]">
        <div className="flex min-h-[88vh] flex-col justify-center py-24 md:py-[120px]">
          <StatementKicker n="03">Cómo escalamos el modelo</StatementKicker>
          <h2 className="max-w-[1180px] font-sans text-[44px] font-normal leading-[0.98] tracking-[-0.05em] md:text-[96px]">
            No podemos construir todas las empresas, <em className="not-italic text-rl-red">pero podemos multiplicar el impacto.</em>
          </h2>
          <StatementNote next="Seis divisiones">
            Nuestro modelo de Venture Building es, a propósito, acotado: no podemos crear cada compañía que nos gustaría. Pero esa experiencia, esa capacidad y esa red sí pueden llegar más lejos. Por eso desplegamos seis divisiones, cada una con su propio equipo y liderazgo, que amplifican nuestro impacto a más empresas de las que alcanzaríamos solos.
          </StatementNote>
        </div>
        <ul className="border-t border-border-dark">
          {DIVISIONS.map((d) => (
            <Row key={d.brand} d={d} />
          ))}
        </ul>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: `KnowledgeSection.tsx` (descarga mediante el mismo formulario de `/conocimiento`)**

```tsx
// app/(landing)/sections/KnowledgeSection.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import ResourceDrawer from '@/components/ui/ResourceDrawer'
import { resources, type ResourceItem } from '@/data/resources'

const FEATURED = ['birf', 'innovation-matrix', 're-ia-propuesta']

export default function KnowledgeSection() {
  const [open, setOpen] = useState<ResourceItem | null>(null)
  const items = FEATURED.map((slug) => resources.find((r) => r.slug === slug)).filter((r): r is ResourceItem => !!r)

  return (
    <section className="section-neutral">
      <div className="container-rl grid grid-cols-1 gap-10 py-24 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionLabel n="05" className="mb-4">Conoce nuestros modelos de trabajo</SectionLabel>
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[36px]">
            Lo que aprendemos en campo, lo compartimos con el ecosistema.
          </h2>
          <p className="mb-7 mt-5 text-[15px] leading-[1.7] text-text-secondary">
            Convertimos lo que aprendemos en el campo en modelos y documentos de libre descarga, para que cualquier persona en la región pueda replicarlos y multiplicar el impacto.
          </p>
          <Link href="/conocimiento" className="border-b border-rl-red pb-[3px] text-[14px] font-medium">Ver todos los recursos →</Link>
        </div>
        <ul className="border-t border-rl-dark lg:col-span-6 lg:col-start-7">
          {items.map((r, k) => (
            <li key={r.slug}>
              <button type="button" onClick={() => setOpen(r)} className="group grid w-full grid-cols-[32px_56px_1fr_auto] items-center gap-4 border-b border-border-light py-5 text-left md:grid-cols-[40px_64px_1fr_auto]">
                <span className="font-mono text-[10.5px] tracking-[0.15em] text-text-tertiary">{String(k + 1).padStart(2, '0')}</span>
                <span className="relative h-[70px] w-14 overflow-hidden rounded-[2px] md:h-20 md:w-16">
                  <Image src={r.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
                </span>
                <span>
                  <span className="block text-[17px] font-medium tracking-[-0.01em] transition-colors group-hover:text-rl-red md:text-[18px]">{r.name}</span>
                  <small className="mt-1 block text-[13px] text-text-tertiary">{r.type.replace('Disponible ahora · ', '')}</small>
                </span>
                <span className="text-[13px] font-medium text-rl-red">PDF ↓</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ResourceDrawer isOpen={!!open} resource={open} onClose={() => setOpen(null)} />
    </section>
  )
}
```

- [ ] **Step 5: `FoundersSection.tsx` y `HomeClosing.tsx`**

```tsx
// app/(landing)/sections/FoundersSection.tsx
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import DuotoneImage from '@/components/ui/DuotoneImage'
import { team } from '@/data/team'

export default function FoundersSection() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-[104px]">
        <SectionLabel n="06" tone="dark" className="mb-4">Los fundadores</SectionLabel>
        <h2 className="max-w-[860px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">
          Eddie y Lorenzo fundaron Redesign Lab sobre una red activa de expertos, operadores y fondos, que hoy co-construye algunos de los proyectos más ambiciosos de bioeconomía en la región.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-14 md:grid-cols-2">
          {team.map((m) => (
            <article key={m.name} className="group">
              <div className="mb-5 flex items-end gap-5 border-b border-border-dark pb-5">
                {m.photo && <DuotoneImage src={m.photo} alt={m.name} sizes="112px" hoverColor className="h-[140px] w-28 shrink-0 rounded-[3px]" />}
                <div>
                  <h3 className="font-sans text-[28px] font-normal tracking-[-0.03em]">{m.name}</h3>
                  <p className="mb-3 mt-2 font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">{m.role}</p>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="border-b border-border-dark pb-0.5 text-[12px] text-text-muted hover:text-text-on-dark">LinkedIn ↗</a>
                  )}
                </div>
              </div>
              <div className="space-y-3 text-[14px] leading-[1.72] text-text-muted">
                {m.bio.split('\n\n').map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
              </div>
              {m.quote && (
                <blockquote className="mt-5 border-l-2 border-rl-red pl-4 text-[17px] leading-[1.45] tracking-[-0.01em]">“{m.quote}”</blockquote>
              )}
            </article>
          ))}
        </div>
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border-dark pt-7 md:flex-row md:items-center">
          <p className="max-w-[620px] text-[15px] leading-[1.6] text-text-muted">
            El equipo se extiende más allá de los fundadores. Expertos senior co-construyen con nosotros los negocios más ambiciosos de bioeconomía en América Latina.
          </p>
          <Link href="/biobuilders" className="text-[16px] font-medium">Súmate a Bio/Builders <span className="text-rl-red">→</span></Link>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// app/(landing)/sections/HomeClosing.tsx
import CalendarButton from '@/components/ui/CalendarButton'
import { SITE_CONFIG } from '@/lib/constants'

export default function HomeClosing() {
  return (
    <section className="section-neutral" data-no-announce>
      <div className="container-rl grid grid-cols-1 items-end gap-6 pb-24 pt-24 md:pb-[104px] md:pt-28 lg:grid-cols-12">
        <p className="mb-6 border-b border-border-light pb-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary lg:col-span-12 lg:mb-9">
          The AI Studio for Bioeconomy Industries
        </p>
        <h2 className="font-sans text-[36px] font-normal leading-none tracking-[-0.03em] md:text-[56px] lg:col-span-8">
          Empecemos a construir bionegocios que compiten de verdad.
        </h2>
        <div className="lg:col-span-3 lg:col-start-10">
          <CalendarButton location="home_closing">Agendar una conversación</CalendarButton>
          <p className="mt-3.5 text-[13px] text-text-tertiary">
            o escríbenos a <a href={`mailto:${SITE_CONFIG.email}`} className="underline underline-offset-2">{SITE_CONFIG.email}</a>
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Home completa en `app/page.tsx`**

```tsx
import HomeHero from './(landing)/sections/HomeHero'
import AlliesLine from './(landing)/sections/AlliesLine'
import ThesisSection from './(landing)/sections/ThesisSection'
import FearStatement from './(landing)/sections/FearStatement'
import ProposalSection from './(landing)/sections/ProposalSection'
import DivisionsSection from './(landing)/sections/DivisionsSection'
import InstitutionsBand from './(landing)/sections/InstitutionsBand'
import KnowledgeSection from './(landing)/sections/KnowledgeSection'
import FoundersSection from './(landing)/sections/FoundersSection'
import HomeClosing from './(landing)/sections/HomeClosing'

export default function Home() {
  return (
    <>
      <HomeHero />
      <AlliesLine />
      <ThesisSection />
      <FearStatement />
      <ProposalSection />
      <DivisionsSection />
      <InstitutionsBand />
      <KnowledgeSection />
      <FoundersSection />
      <HomeClosing />
    </>
  )
}
```

- [ ] **Step 7: Verificar**

Run: `npx tsc --noEmit && npm run lint`, y luego `npm run dev`. Comparar `/` completa con `home-v6.html`, en 1440 y 375 px:
- relleno rojo en las tarjetas de la propuesta;
- las 6 divisiones, con Circular Club sin enlace e IA como "Próximamente";
- la banda roja con foto al fondo;
- los 3 PDF abren el formulario de descarga (no descargan directo);
- bios completas;
- la pestaña de anuncios desaparece sobre el cierre.

En `/conocimiento`, las dos guías sin archivo dicen "Próximamente".

- [ ] **Step 8: Commit**

```bash
git add data/resources.ts app/conocimiento/sections/ResourcesList.tsx "app/(landing)/sections" app/page.tsx
git commit -m "feat(home): proposal panels, divisions index, institutions band, knowledge, founders, closing

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Página Empresas (`/empresas`)

**Files:**
- Create: `data/track-record.ts`, `components/ui/PhotoStrip.tsx`, `components/ui/StatGrid.tsx`, `app/empresas/page.tsx`, `app/empresas/sections/{EmpresasHero,PartnerSection,HelpSection,StrengthsSection,AISection,EmpresasClosing}.tsx`, `public/assets/partners/claude-logo-white.png`, `app/empresas/opengraph-image.png`, `app/empresas/opengraph-image.alt.txt`, `app/empresas/twitter-image.png`, `app/empresas/twitter-image.alt.txt`

**Interfaces:**
- Consumes: `CalendarButton`, `FillPanel`, `SectionLabel`, `Tag`.
- Produces: `TRACK_RECORD: { plus: boolean; value: string; label: string }[]`, `<PhotoStrip images: string[] />` y `<StatGrid tone: 'light' | 'dark'; columns: 2 | 3 />`.

- [ ] **Step 1: Recursos**

```bash
mkdir -p public/assets/partners app/empresas/sections
cp docs/superpowers/assets/2026-09-24/claude-logo-white.png public/assets/partners/claude-logo-white.png
cp docs/superpowers/assets/2026-09-24/og-empresas.png app/empresas/opengraph-image.png
cp docs/superpowers/assets/2026-09-24/og-empresas.png app/empresas/twitter-image.png
printf 'Empresas — Redesign Lab: diseñamos, escalamos e invertimos en negocios con potencial real.' > app/empresas/opengraph-image.alt.txt
cp app/empresas/opengraph-image.alt.txt app/empresas/twitter-image.alt.txt
```


- [ ] **Step 2: `data/track-record.ts`, `PhotoStrip` y `StatGrid`**

```ts
// data/track-record.ts — cifras confirmadas por Eddie (2026-09-24)
export const TRACK_RECORD: { plus: boolean; value: string; label: string }[] = [
  { plus: true, value: '10', label: 'Empresas invertidas en América Latina' },
  { plus: true, value: 'USD 26 MM', label: 'Facturación total del portafolio 2025' },
  { plus: true, value: 'USD 1,5 MM', label: 'Capital levantado' },
  { plus: false, value: 'USD 80 MM', label: 'Financiamiento estructurado' },
  { plus: true, value: '28%', label: 'Crecimiento de ventas interanual' },
  { plus: true, value: '5', label: 'Países en los que hemos trabajado' },
]
```

```tsx
// components/ui/PhotoStrip.tsx
import DuotoneImage from './DuotoneImage'
import { cn } from '@/lib/utils'

/** Franja de 4 fotos en duotono al pie de los heros de Empresas e Instituciones. */
export default function PhotoStrip({ images }: { images: [string, string, string, string] }) {
  return (
    <div className="mt-16 grid h-[160px] grid-cols-2 gap-2.5 md:mt-[88px] md:h-[220px] md:grid-cols-[1.3fr_.8fr_1fr_.9fr]">
      {images.map((src, i) => (
        <DuotoneImage key={src} src={src} alt="" sizes="(min-width: 768px) 30vw, 50vw" className={cn('rounded-[2px]', i > 1 && 'hidden md:block')} />
      ))}
    </div>
  )
}
```

```tsx
// components/ui/StatGrid.tsx
import { TRACK_RECORD } from '@/data/track-record'
import { cn } from '@/lib/utils'

export default function StatGrid({ tone, columns }: { tone: 'light' | 'dark'; columns: 2 | 3 }) {
  const dark = tone === 'dark'
  return (
    <div className={cn('grid grid-cols-2 border-t', columns === 3 && 'md:grid-cols-3', dark ? 'border-border-dark' : 'border-rl-dark')}>
      {TRACK_RECORD.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'border-b py-7 pr-5',
            dark ? 'border-border-dark' : 'border-border-light',
            // móvil: siempre 2 columnas; md+: 2 o 3 según `columns`
            i % 2 !== 0 && 'border-l pl-5',
            columns === 3 && (i % 3 !== 0 ? 'md:border-l md:pl-5' : 'md:border-l-0 md:pl-0')
          )}
        >
          <b className={cn('block font-sans text-[34px] font-normal leading-none tracking-[-0.045em] md:text-[52px]', dark && 'text-text-on-dark')}>
            {s.plus && <span className="text-rl-red">+</span>}
            {s.value}
          </b>
          <span className={cn('mt-3 block text-[13px] md:text-[14px]', dark ? 'text-text-muted' : 'text-text-secondary')}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
```

Nota sobre `StatGrid`: en móvil siempre son 2 columnas (línea izquierda en los impares); en `md+` con `columns={3}` la línea va en las posiciones no múltiplos de 3.

- [ ] **Step 3: Hero, 01 y 02**

```tsx
// app/empresas/sections/EmpresasHero.tsx
import Tag from '@/components/ui/Tag'
import CalendarButton from '@/components/ui/CalendarButton'
import PhotoStrip from '@/components/ui/PhotoStrip'

export default function EmpresasHero() {
  return (
    <section className="section-dark">
      <div className="container-rl pb-24 pt-36 md:pb-28 md:pt-44">
        <Tag className="mb-3">Empresas</Tag>
        <h1 className="max-w-[1060px] font-sans text-[40px] font-normal leading-none tracking-[-0.04em] md:text-[64px]">
          Diseñamos, escalamos e invertimos en negocios con potencial real,{' '}
          <span className="text-text-muted">para convertirlos en empresas que compitan en los mercados más exigentes.</span>
        </h1>
        <p className="mt-7 max-w-[560px] text-[18px] leading-[1.6] text-text-muted">Buscamos empresas con potencial real para asociarnos y escalar juntos.</p>
        <div className="mt-9">
          <CalendarButton location="empresas_hero">Escalemos juntos</CalendarButton>
        </div>
        <PhotoStrip images={['/assets/hero/hero-08.jpg', '/assets/hero/hero-21.jpg', '/assets/hero/hero-17.jpg', '/assets/hero/hero-19.jpg']} />
      </div>
    </section>
  )
}
```

```tsx
// app/empresas/sections/PartnerSection.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import CalendarButton from '@/components/ui/CalendarButton'
import StatGrid from '@/components/ui/StatGrid'

export default function PartnerSection() {
  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="01" className="mb-5">Nuestra propuesta principal</SectionLabel>
        <div className="grid grid-cols-1 items-end gap-8 rounded-[4px] border-t-[3px] border-rl-red bg-white p-8 shadow-[0_0_0_1px_rgba(13,13,13,.1)] md:grid-cols-[1.1fr_.9fr] md:gap-14 md:p-12">
          <div>
            <span className="mb-3.5 block font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">Asociarnos</span>
            <h2 className="font-sans text-[38px] font-normal leading-[0.98] tracking-[-0.045em] md:text-[56px]">¿Necesitas un socio para crecer?</h2>
          </div>
          <div>
            <p className="mb-6 text-[17px] leading-[1.6] text-text-secondary md:text-[18px]">
              Si crees que podemos asociarnos contigo, conversemos sobre lo que significa trabajar con Redesign Lab, con nuestra red y nuestra experiencia detrás de tu empresa.
            </p>
            <CalendarButton location="empresas_asociarnos">Conversemos</CalendarButton>
          </div>
        </div>
        <p className="mb-4 mt-20 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary md:mt-[88px]">Nuestro track record como socios</p>
        <StatGrid tone="light" columns={3} />
      </div>
    </section>
  )
}
```

```tsx
// app/empresas/sections/HelpSection.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import FillPanel from '@/components/ui/FillPanel'
import { SITE_CONFIG } from '@/lib/constants'

export default function HelpSection() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="02" tone="dark" className="mb-4">Asesoría y capital</SectionLabel>
        <h2 className="max-w-[900px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">¿Prefieres solo ayuda, sin asociarte?</h2>
        <div className="mt-12 grid max-w-[1080px] grid-cols-1 gap-4 md:grid-cols-2">
          <FillPanel href={SITE_CONFIG.calendarUrl} external trackLocation="empresas_asesoria" tone="ink" kicker="Asesoría" title="¿Necesitas resolver lo urgente?" cta="Agenda una conversación" titleClassName="text-[30px] md:text-[36px] leading-[1.02]">
            Identificamos el incendio más urgente de tu empresa, lo apagamos primero, y eso desbloquea ventas y acceso a capital.
          </FillPanel>
          <FillPanel href={SITE_CONFIG.calendarUrl} external trackLocation="empresas_capital" tone="ink" kicker="Capital" title="¿Necesitas capital para invertir?" cta="Agenda una conversación" titleClassName="text-[30px] md:text-[36px] leading-[1.02]">
            Te acompañamos desde el modelo financiero hasta el levantamiento de fondos, nacionales, internacionales o propios.
          </FillPanel>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 03 Fortalezas (recorrido con foto fija)**

```tsx
// app/empresas/sections/StrengthsSection.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import { cn } from '@/lib/utils'

const FRONTS = [
  { n: '01', title: 'Negocios y Tecnología', image: '/assets/hero/hero-16.jpg', text: 'La tecnología es una palanca de la estrategia, no un área de soporte. Trabajamos escenarios de crecimiento, posicionamiento y modelo de negocio junto con el diagnóstico tecnológico y las oportunidades de IA, como una sola decisión.' },
  { n: '02', title: 'Operaciones y Finanzas', image: '/assets/hero/hero-08.jpg', text: 'Eficiencia y sostenibilidad del modelo, analizadas juntas: detectamos ineficiencias operativas y las traducimos en estructura de costos, rentabilidad por línea y criterios reales para invertir o asignar recursos.' },
  { n: '03', title: 'Marca y Comercial', image: '/assets/hero/hero-14.jpg', text: 'La marca define qué tan fácil es vender y a qué precio, no es un gasto de diseño aislado. Trabajamos posicionamiento y mensaje junto con pipeline, conversión y el mapeo del ecosistema competitivo.' },
  { n: '04', title: 'Impacto', image: '/assets/conocimiento/birf.jpg', text: 'En bioeconomía, el impacto no es un reporte de sostenibilidad, es parte de la tesis de valor. Medimos el impacto ambiental, social y económico, y lo alineamos con lo que valoran clientes, inversores y aliados.' },
]

export default function StrengthsSection() {
  const [active, setActive] = useState(0)
  const items = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i)) }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    items.current.forEach((n) => n && io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="03" className="mb-4">Nuestras fortalezas como socios</SectionLabel>
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-7">La misma disciplina, en cada empresa en la que nos asociamos.</h2>
          <p className="text-[15px] leading-[1.65] text-text-secondary lg:col-span-4 lg:col-start-9">Cuatro frentes que cubren el espacio completo de decisiones que mueven un negocio en crecimiento.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          <div className="hidden self-start md:sticky md:top-[110px] md:block">
            <div className="relative h-[360px] overflow-hidden rounded-[3px]">
              {FRONTS.map((f, i) => (
                <Image key={f.image} src={f.image} alt="" fill sizes="40vw" className={cn('object-cover transition-[opacity,transform] duration-700', i === active ? 'scale-100 opacity-100' : 'scale-[1.04] opacity-0')} />
              ))}
            </div>
            <div className="mt-3.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary">
              <span><b className="font-normal text-rl-red">{FRONTS[active].n}</b> / 04</span>
              <span>{FRONTS[active].title}</span>
            </div>
          </div>
          <div>
            {FRONTS.map((f, i) => (
              <div
                key={f.n}
                ref={(n) => { items.current[i] = n }}
                data-i={i}
                className={cn('mb-14 border-b border-border-light pb-16 pt-2 transition-opacity duration-500 last:mb-0 last:border-b-0 md:opacity-[.35]', i === active && 'md:opacity-100')}
              >
                <span className="font-mono text-[10.5px] tracking-[0.15em] text-rl-red">{f.n}</span>
                <h3 className="my-4 font-sans text-[32px] font-normal leading-none tracking-[-0.04em] md:text-[44px]">{f.title}</h3>
                <p className="max-w-[560px] text-[16px] leading-[1.7] text-text-secondary md:text-[18px]">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

(En móvil se oculta la foto fija y los frentes se ven completos; el atenuado solo aplica en `md+`.)

- [ ] **Step 5: 04 IA (`id="ia"`) y cierre**

```tsx
// app/empresas/sections/AISection.tsx
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AISection() {
  return (
    <section id="ia" className="section-dark scroll-mt-20">
      <div className="container-rl grid grid-cols-1 items-center gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <SectionLabel n="04" tone="dark" className="mb-4">El rol de la IA en nuestros proyectos</SectionLabel>
          <h2 className="mb-7 font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[44px]">Usamos IA para amplificar nuestro criterio y experiencia.</h2>
          <p className="max-w-[540px] text-[17px] leading-[1.7] text-text-muted">
            La usamos para diagnosticar más rápido y decidir con más criterio. Pero el objetivo no es que nosotros trabajemos más rápido, es que tu equipo se quede con algo: instalamos capacidad que tu empresa sigue usando después de que el proyecto termina.
          </p>
          <Link href="/inteligencia-artificial/diagnostico" className="mt-8 flex max-w-[540px] items-center justify-between border-t border-border-dark pt-5 text-[15px] font-medium hover:text-rl-red">
            Haz el diagnóstico de IA de tu empresa <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="rounded-md border border-claude/45 bg-claude/5 p-8 md:p-10 lg:col-span-5 lg:col-start-8">
          <Image src="/assets/partners/claude-logo-white.png" alt="Claude" width={252} height={54} className="h-[46px] w-auto md:h-[54px]" />
          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-2 border-t border-claude/30 pt-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-claude">Network Partner</span>
            <span className="text-[13px] text-text-muted">Redesign Lab es partner de la red de Claude</span>
          </div>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// app/empresas/sections/EmpresasClosing.tsx
import CalendarButton from '@/components/ui/CalendarButton'

export default function EmpresasClosing() {
  return (
    <section className="section-neutral" data-no-announce>
      <div className="container-rl grid grid-cols-1 items-end gap-6 py-24 md:py-32 lg:grid-cols-12">
        <p className="mb-6 border-b border-border-light pb-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary lg:col-span-12 lg:mb-9">Empresas · Redesign Lab</p>
        <h2 className="font-sans text-[34px] font-normal leading-none tracking-[-0.03em] md:text-[56px] lg:col-span-8">¿Crees que podemos ser un buen socio para tu empresa?</h2>
        <div className="lg:col-span-3 lg:col-start-10">
          <CalendarButton location="empresas_closing">Agendar una conversación</CalendarButton>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: `app/empresas/page.tsx` con metadata y breadcrumb**

```tsx
import type { Metadata } from 'next'
import EmpresasHero from './sections/EmpresasHero'
import PartnerSection from './sections/PartnerSection'
import HelpSection from './sections/HelpSection'
import StrengthsSection from './sections/StrengthsSection'
import AISection from './sections/AISection'
import EmpresasClosing from './sections/EmpresasClosing'

const DESCRIPTION =
  'Diseñamos, escalamos e invertimos en bionegocios con potencial real en América Latina: estrategia, operaciones, marca, impacto e IA como socios.'

export const metadata: Metadata = {
  title: 'Empresas',
  description: DESCRIPTION,
  alternates: { canonical: '/empresas' },
  openGraph: { title: 'Empresas | Redesign Lab', description: DESCRIPTION, url: 'https://redesignlab.org/empresas' },
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
    { '@type': 'ListItem', position: 2, name: 'Empresas', item: 'https://redesignlab.org/empresas' },
  ],
}

export default function EmpresasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <EmpresasHero />
      <PartnerSection />
      <HelpSection />
      <StrengthsSection />
      <AISection />
      <EmpresasClosing />
    </>
  )
}
```

- [ ] **Step 7: Verificar**

Run: `npx tsc --noEmit && npm run lint`, y luego `npm run dev`. Comparar `/empresas` con `empresas-v5.html` en 1440 y 375 px:
- la foto fija cambia al recorrer los frentes;
- Asesoría y Capital se llenan de rojo y abren el calendario;
- el logo de Claude se ve nítido;
- `/empresas#ia` salta a la sección de IA.

Revisar que la description tenga ≤160 caracteres (`node -e "console.log('…'.length)"` con el texto).

- [ ] **Step 8: Commit**

```bash
git add data/track-record.ts components/ui/PhotoStrip.tsx components/ui/StatGrid.tsx app/empresas public/assets/partners
git commit -m "feat(empresas): new /empresas page — partner, help, strengths scrollytelling, AI with Claude partner

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Página Instituciones (`/fondos`)

**Files:**
- Create: `app/fondos/sections/{InstitucionesHero,AudienceSwitch,CapabilitiesSection,ProcessTimeline,TrackRecordNote,InstitucionesClosing}.tsx`, `app/fondos/opengraph-image.png`, `app/fondos/opengraph-image.alt.txt`, `app/fondos/twitter-image.png`, `app/fondos/twitter-image.alt.txt`
- Modify: `app/fondos/page.tsx`

**Interfaces:**
- Consumes: `Tag`, `CalendarButton`, `PhotoStrip`, `SectionLabel`, `StatGrid`, `ArrowIcon`.

- [ ] **Step 1: Imágenes para redes**

```bash
cp docs/superpowers/assets/2026-09-24/og-instituciones.png app/fondos/opengraph-image.png
cp docs/superpowers/assets/2026-09-24/og-instituciones.png app/fondos/twitter-image.png
printf 'Instituciones — Redesign Lab: experiencia real en el territorio para fondos de impacto y agencias de cooperación.' > app/fondos/opengraph-image.alt.txt
cp app/fondos/opengraph-image.alt.txt app/fondos/twitter-image.alt.txt
```

- [ ] **Step 2: Hero y 01 (selector "¿Quién eres?")**

```tsx
// app/fondos/sections/InstitucionesHero.tsx
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
```

```tsx
// app/fondos/sections/AudienceSwitch.tsx
'use client'

import { useState } from 'react'
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
              id={`aud-tab-${i}`}
              aria-selected={i === k}
              aria-controls={`aud-panel-${i}`}
              onClick={() => setK(i)}
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
```

(Los paneles se apilan en la misma celda de la grilla, así la altura se adapta sin posicionamiento absoluto. El panel inactivo queda `invisible`, que lo saca del foco y del lector de pantalla.)

- [ ] **Step 3: 02 Capacidades y 03 Proceso animado**

```tsx
// app/fondos/sections/CapabilitiesSection.tsx
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
```

```tsx
// app/fondos/sections/ProcessTimeline.tsx
'use client'

import { useEffect, useRef } from 'react'
import SectionLabel from '@/components/ui/SectionLabel'

const STEPS = [
  { title: 'Sourcing', text: 'Identificamos oportunidades en cadenas de valor y territorios.' },
  { title: 'Due Diligence', text: 'Validamos técnicamente el modelo de negocio, cadena, equipo y territorio, no solo números.' },
  { title: 'Value Building', text: 'Aceleramos la creación de valor en las organizaciones: comercialización, operación y tecnología.' },
  { title: 'Monitoring', text: 'Monitoreo continuo con datos de campo y alertas tempranas para el comité de inversión.' },
  { title: 'Impact Reporting', text: 'Métricas de impacto y reportes verificables con datos de campo, los que LP y mercado exigen.' },
]
const SEG = 2600 // ms por tramo, lineal (ritmo de la barra del hero)
const START = 500

export default function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null)
  const prog = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = root.current
    const bar = prog.current
    if (!el || !bar) return
    const steps = Array.from(el.querySelectorAll<HTMLElement>('.timeline__step'))
    const dots = steps.map((s) => s.querySelector<HTMLElement>('.timeline__dot')!)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const horizontal = () => window.matchMedia('(min-width: 768px)').matches
    const prop = (): 'width' | 'height' => (horizontal() ? 'width' : 'height')
    const pos = (i: number) => {
      const d = dots[i].getBoundingClientRect()
      const c = el.getBoundingClientRect()
      return horizontal() ? d.left - c.left + d.width / 2 : d.top - c.top + d.height / 2
    }
    let timers: number[] = []
    let played = false
    let last = -1
    const clear = () => { timers.forEach((t) => window.clearTimeout(t)); timers = [] }
    const light = (i: number) => { last = i; steps[i].classList.add('is-on') }
    const play = () => {
      clear()
      steps.forEach((s) => s.classList.remove('is-on'))
      bar.style.transition = 'none'
      bar.style.width = ''
      bar.style.height = ''
      bar.style[prop()] = '0px'
      void bar.offsetWidth
      bar.style.transition = ''
      if (reduce) {
        steps.forEach((_, i) => light(i))
        bar.style[prop()] = `${pos(steps.length - 1)}px`
        return
      }
      el.classList.add('is-running')
      steps.forEach((_, i) => {
        timers.push(window.setTimeout(() => {
          light(i)
          if (i < steps.length - 1) bar.style[prop()] = `${pos(i + 1)}px`
        }, START + i * SEG))
      })
      timers.push(window.setTimeout(() => el.classList.remove('is-running'), START + (steps.length - 1) * SEG + 900))
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !played) { played = true; play() }
        else if (!e.isIntersecting && e.boundingClientRect.top > 0) played = false
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    const onResize = () => {
      if (last < 0) return
      bar.style.transition = 'none'
      bar.style.width = ''
      bar.style.height = ''
      bar.style[prop()] = `${pos(Math.min(last + (last < steps.length - 1 ? 1 : 0), steps.length - 1))}px`
      void bar.offsetWidth
      bar.style.transition = ''
    }
    window.addEventListener('resize', onResize)
    return () => { io.disconnect(); clear(); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="section-neutral">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="03" className="mb-4">Proceso integral de acompañamiento</SectionLabel>
        <h2 className="max-w-[900px] font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px]">Acompañamos a tu portafolio de empresas u organizaciones en cada etapa.</h2>
        <div ref={root} className="timeline mt-16">
          <span aria-hidden="true" className="timeline__rail" />
          <span aria-hidden="true" ref={prog} className="timeline__prog" />
          <ol className="grid grid-cols-1 gap-10 pl-16 md:grid-cols-5 md:gap-0 md:pl-0">
            {STEPS.map((s, i) => (
              <li key={s.title} className="timeline__step relative md:pr-7">
                <span className="timeline__dot -ml-16 md:ml-0">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-3 mt-4 font-sans text-[24px] font-normal tracking-[-0.03em] md:mt-7 md:text-[26px]">{s.title}</h3>
                <p className="text-[15px] leading-[1.65] text-text-secondary">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
```

(El riel y la barra van en un `div` contenedor, porque un `<ol>` solo puede tener `<li>` como hijos. En móvil el punto se desplaza a la izquierda con `-ml-16` sobre el riel vertical, y el `pl-16` del `<ol>` deja espacio al texto. Si el punto no queda centrado sobre el riel en 375 px, ajustar `-ml-16` y el `left: 19px` del CSS para que coincidan.)

- [ ] **Step 4: 04 Track record + Nota, y cierre**

```tsx
// app/fondos/sections/TrackRecordNote.tsx
import SectionLabel from '@/components/ui/SectionLabel'
import StatGrid from '@/components/ui/StatGrid'
import ArrowIcon from '@/components/ui/ArrowIcon'

export default function TrackRecordNote() {
  return (
    <section className="section-dark">
      <div className="container-rl py-24 md:py-32">
        <SectionLabel n="04" tone="dark" className="mb-8">Nuestro track record</SectionLabel>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7"><StatGrid tone="dark" columns={2} /></div>
          <aside className="self-start rounded-[4px] border border-border-dark p-7 lg:col-span-4 lg:col-start-9">
            <span className="mb-4 block font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">Nota</span>
            <p className="text-[15px] leading-[1.7] text-text-muted">
              Este trabajo complementa, no reemplaza: el de fondos de inversión más grandes, y el de agencias de cooperación en territorio. Redesign Lab, además, opera su propio fondo privado de inversión de impacto desde 2022, que invierte directamente en las empresas de nuestro portafolio con el mismo criterio de diagnóstico técnico que aplicamos para nuestros clientes. Esa experiencia como gestores de capital, no solo como asesores, es lo que hace distinto nuestro trabajo: sabemos lo que es tomar la decisión de inversión, no solo informarla.
            </p>
            <a href="https://fondodeimpacto.pe" target="_blank" rel="noopener noreferrer" className="group mt-6 flex justify-between border-t border-border-dark pt-4 text-[15px] font-medium">
              fondodeimpacto.pe <ArrowIcon />
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}
```

```tsx
// app/fondos/sections/InstitucionesClosing.tsx
import CalendarButton from '@/components/ui/CalendarButton'

export default function InstitucionesClosing() {
  return (
    <section className="section-neutral" data-no-announce>
      <div className="container-rl grid grid-cols-1 items-end gap-6 py-24 md:py-32 lg:grid-cols-12">
        <p className="mb-6 border-b border-border-light pb-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-tertiary lg:col-span-12 lg:mb-9">Instituciones · Redesign Lab</p>
        <h2 className="font-sans text-[34px] font-normal leading-none tracking-[-0.03em] md:text-[56px] lg:col-span-8">La conversación correcta comienza aquí.</h2>
        <div className="lg:col-span-3 lg:col-start-10">
          <CalendarButton location="instituciones_closing">Iniciar conversación</CalendarButton>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: `app/fondos/page.tsx`**

Reemplazar el archivo completo:

```tsx
import type { Metadata } from 'next'
import InstitucionesHero from './sections/InstitucionesHero'
import AudienceSwitch from './sections/AudienceSwitch'
import CapabilitiesSection from './sections/CapabilitiesSection'
import ProcessTimeline from './sections/ProcessTimeline'
import TrackRecordNote from './sections/TrackRecordNote'
import InstitucionesClosing from './sections/InstitucionesClosing'

const DESCRIPTION =
  'Acompañamos a fondos de impacto y agencias de cooperación en bioeconomía: sourcing, due diligence en campo, value building, monitoreo y reporte de impacto.'

export const metadata: Metadata = {
  title: 'Instituciones: fondos y cooperación',
  description: DESCRIPTION,
  keywords: ['due diligence bioeconomía', 'fondos impacto LATAM', 'cooperación internacional bioeconomía', 'investment readiness bionegocios', 'capital de impacto'],
  alternates: { canonical: '/fondos' },
  openGraph: { title: 'Instituciones | Redesign Lab', description: DESCRIPTION, url: 'https://redesignlab.org/fondos' },
}

const BREADCRUMB = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://redesignlab.org' },
    { '@type': 'ListItem', position: 2, name: 'Instituciones', item: 'https://redesignlab.org/fondos' },
  ],
}

export default function FondosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB) }} />
      <InstitucionesHero />
      <AudienceSwitch />
      <CapabilitiesSection />
      <ProcessTimeline />
      <TrackRecordNote />
      <InstitucionesClosing />
    </>
  )
}
```

- [ ] **Step 6: Verificar**

Run: `npx tsc --noEmit && npm run lint`, y luego `npm run dev`. Comparar `/fondos` con `instituciones-v3.html`:
- el selector cambia el caso con fundido;
- la línea de tiempo avanza en unos 11 s (2,6 s por tramo), cada punto se enciende al llegar la línea y se repite al volver a entrar;
- en 375 px la línea de tiempo es vertical;
- "Iniciar conversación" (×4) abre el calendario;
- no aparece el texto "Redesign Lab trabaja con un número acotado…".

- [ ] **Step 7: Commit**

```bash
git add app/fondos
git commit -m "feat(instituciones): rebuild /fondos as Instituciones — audience switch, capabilities, animated process, track record

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Redirects, sitemap, enlaces internos y 404

**Files:**
- Modify: `next.config.mjs`, `app/sitemap.ts`, `components/sections/MaturityChecker.tsx`, `app/proyectos/sections/CtaSection.tsx`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Redirects**

En `next.config.mjs`, agregar al final del arreglo de `redirects()`:

```js
      {
        // IA pasa a ser una sección de /empresas. El código de la ruta se conserva.
        source: '/inteligencia-artificial',
        destination: '/empresas#ia',
        permanent: true,
      },
      {
        // Los programas BBS viven ahora en el sitio de Bio Business School.
        source: '/cursos-bbs',
        destination: 'https://biobusinessschool.org',
        permanent: true,
      },
      {
        source: '/cursos-bbs/:slug',
        destination: 'https://biobusinessschool.org',
        permanent: true,
      },
```

(Sin `:path*` en la de IA: `/inteligencia-artificial/diagnostico` debe seguir respondiendo 200.)

- [ ] **Step 2: Sitemap**

En `app/sitemap.ts`:
- en `staticRoutes`, agregar `'/empresas'` después de `''` y quitar `'/inteligencia-artificial'` y `'/cursos-bbs'` (mantener `'/inteligencia-artificial/diagnostico'` y todas las ocultas);
- borrar la línea `const bbsRoutes = …`, el import de `bbsPrograms` y `...bbsRoutes` del `return`;
- quitar `|| route.startsWith('/cursos-bbs/')` de la prioridad.

- [ ] **Step 3: Enlaces internos**

- `components/sections/MaturityChecker.tsx`: reemplazar cada `href="/acelera"` y `href="/pon-orden"` por `href="/empresas"`. El diagnóstico es la única página oculta que se enlaza.
- `app/proyectos/sections/CtaSection.tsx`: importar `CalendarButton` y reemplazar el `<div className="flex …">` con los dos `Button` por:

```tsx
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CalendarButton location="proyectos_cta">Hablar con el equipo</CalendarButton>
            </div>
```

Quitar los imports de `Button` y `SITE_CONFIG` si quedan sin uso.

- [ ] **Step 4: 404 propia**

`app/not-found.tsx`:

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import ArrowIcon from '@/components/ui/ArrowIcon'

export const metadata: Metadata = { title: 'Página no encontrada', robots: { index: false } }

const PATHS = [
  { href: '/empresas', label: 'Empresas', text: 'Escalemos tu bionegocio.' },
  { href: '/biobuilders', label: 'Bio/Builders', text: 'Construye un nuevo bionegocio con la red.' },
  { href: '/fondos', label: 'Instituciones', text: 'Fondos de impacto y cooperación.' },
  { href: '/', label: 'Inicio', text: 'Volver a la página principal.' },
]

export default function NotFound() {
  return (
    <section className="section-dark" data-no-announce>
      <div className="container-rl flex min-h-[80vh] flex-col justify-center pb-24 pt-36">
        <p className="mb-8 font-mono text-[10.5px] uppercase tracking-[0.15em] text-rl-red">404 · Página no encontrada</p>
        <h1 className="max-w-[900px] font-sans text-[40px] font-normal leading-none tracking-[-0.04em] md:text-[64px]">
          Esta página no existe <span className="text-text-muted">o cambió de lugar.</span>
        </h1>
        <ul className="mt-14 border-t border-border-dark">
          {PATHS.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="group grid grid-cols-1 gap-1 border-b border-border-dark py-5 md:grid-cols-[260px_1fr_auto] md:items-baseline md:gap-6">
                <span className="text-[22px] tracking-[-0.03em] group-hover:text-rl-red">{p.label}</span>
                <span className="text-[15px] text-text-muted">{p.text}</span>
                <ArrowIcon className="hidden text-rl-red md:inline-block" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

> Texto nuevo, pendiente de revisión de Eddie en la revisión en vivo: "Esta página no existe o cambió de lugar." y las descripciones de cada camino.

- [ ] **Step 5: Verificar con el script de aceptación**

Run:

```bash
npx tsc --noEmit && npm run lint && npm run build && (npm start > /tmp/rl-start.log 2>&1 &) && sleep 6 && npm run verify; pkill -f "next start"
```

Expected: todas las comprobaciones de estado, redirects, 404, sitemap, calendario, menú y `#ia` en ✓. Todavía pueden fallar "enlaza a ocultas" o "mailto con asunto" en `/ventures`, las fichas y `/conocimiento`: se corrigen en las Tasks 12–13. Anotar cuáles fallan.

- [ ] **Step 6: Commit**

```bash
git add next.config.mjs app/sitemap.ts components/sections/MaturityChecker.tsx app/proyectos/sections/CtaSection.tsx app/not-found.tsx
git commit -m "feat(seo): redirects for IA and BBS, sitemap update, repoint internal links, custom 404

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Reglas de restyling para las Tasks 11–13 (contenido intacto, spec §10)

Aplicar en cada archivo de sección de la página. **No se cambia ningún texto**, salvo quitar numerales romanos y flechas `&rarr;` que pasan a ser íconos.

| # | Buscar | Reemplazar por |
|---|---|---|
| R1 | `bg-white text-text-primary` · `bg-rl-white text-text-primary` | `section-neutral` |
| R2 | `bg-[#080808] text-text-on-dark` · `bg-[#080808]` | `section-dark` |
| R3 | Etiqueta de sección `<Tag …>Texto</Tag>` (excepto en el hero) | `<SectionLabel n="NN" tone={oscura ? 'dark' : 'light'}>Texto</SectionLabel>`, numerando `01, 02…` en el orden de aparición en la página |
| R4 | Títulos con numeral romano (`I. El riesgo…`, `IX. Tres formas…`) | `SectionLabel` con el número arábigo y el texto sin numeral |
| R5 | `<Button …>Texto &rarr;</Button>` | `<Button … arrow>Texto</Button>` |
| R6 | `href={`mailto:${SITE_CONFIG.email}?subject=…`}` | `<CalendarButton location="<pagina>_<seccion>" context={<nombre>}>Texto</CalendarButton>` |
| R7 | `bg-gradient-to-br …` decorativos en tarjetas | quitar el degradado (fondo plano) |
| R8 | Imagen de tarjeta de portafolio o proyecto | contenedor con `duotone duotone--hover`, y `group` en la raíz de la tarjeta |
| R9 | Invertir el modo de una sección para respetar la alternancia | `section-neutral` ↔ `section-dark`, y en ese archivo `text-text-primary` ↔ `text-text-on-dark`, `text-text-secondary` ↔ `text-text-muted`, `text-text-tertiary` ↔ `text-text-on-dark/40`, `border-border-light` ↔ `border-border-dark` |

Después de cada página: `npx tsc --noEmit && npm run lint`, revisión en `npm run dev` a 1440 y 375 px, y **revisión con Eddie en vivo** (spec §10.4). Si algo requiere una decisión de diseño nueva, se hace un mockup solo de esa parte antes de seguir.

---

### Task 11: Bio/Builders con el estilo nuevo

**Files:**
- Modify: `app/biobuilders/sections/{HeroSection,ThesisSection,WhoSection,HowItWorksSection,GoalsSection,BioBusinessWedge,BusinessTypesSection,CtaSection}.tsx`

- [ ] **Step 1: Fondos objetivo**

| Sección | Hoy | Objetivo | Regla |
|---|---|---|---|
| Hero | dark | dark | — |
| Thesis | `bg-white` | cream | R1 |
| Who | neutral | **dark** | R9 |
| HowItWorks | `bg-rl-white` | cream | R1 (revisar que el diagrama se lea) |
| Goals | `bg-white` | **dark** | R1 → R9 |
| BioBusinessWedge | accent | accent (el único rojo) | — |
| BusinessTypes | neutral | cream | — |
| Cta | dark | dark | — |

- [ ] **Step 2: Etiquetas, botones y canales**

Aplicar R3 en ThesisSection (`Por qué existe Bio/Builders` → `n="01"`) y en el resto de las secciones con etiqueta, en orden. CtaSection: `Súmate a la red` pasa a la etiqueta del último número. Aplicar R5 a todos los `Button` con `&rarr;`. **No** cambiar los enlaces al formulario, a WhatsApp ni a `BIOBUILDERS_BOOKING_URL` (spec §10.3).

- [ ] **Step 3: Verificar y revisar con Eddie**

`npx tsc --noEmit && npm run lint`. Luego `npm run dev` → `/biobuilders` en 1440 y 375 px, y revisión en vivo con Eddie. La pestaña de anuncios **no** debe aparecer aquí.

- [ ] **Step 4: Commit**

```bash
git add app/biobuilders
git commit -m "style(biobuilders): apply 2026 design system (content unchanged)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Ventures y sus fichas con el estilo nuevo, más los cambios vigentes de `copy-alignment`

**Files:**
- Modify: `app/ventures/sections/*.tsx`, `app/ventures/[slug]/page.tsx`, `components/ui/VentureCard.tsx`, `data/ventures.ts`, `data/services.ts`

- [ ] **Step 1: Rehacer los dos cambios vigentes de `fix/copy-alignment`**

```bash
git show 7db6706 -- data/ventures.ts data/services.ts > /tmp/copy-alignment.patch
git apply --3way /tmp/copy-alignment.patch
git diff --stat data/ventures.ts data/services.ts
```

Expected: `data/ventures.ts` (cambia "BioBuilders" por "líderes de bionegocios" / "comunidad BBS") y `data/services.ts` (sin `reSprint`). Si `git apply` falla, aplicar a mano lo que muestra `git show 7db6706 -- data/ventures.ts data/services.ts`.

- [ ] **Step 2: Página `/ventures`**

| Sección | Hoy | Objetivo |
|---|---|---|
| Hero | dark | dark |
| Risk (I) | neutral | cream · R4 `n="01"` |
| Purpose (II) | dark | dark · `n="02"` |
| Pillars (III) | neutral | cream · `n="03"` |
| Route (IV) | dark | dark · `n="04"` |
| Strategy (V) | neutral | cream · `n="05"` |
| Metrics (VI) | dark | dark · `n="06"` |
| Portfolio (VII) | dark | **cream** · R9 · `n="07"` |
| Allies | neutral (`div`) | **dark** · R9 |
| Connect (IX) | encabezado dark + 3 bloques | encabezado cream con `SectionLabel n="08"` + título "Tres formas de conectar con Redesign Lab"; bloques en orden dark / cream / accent |

En `ConnectSection.tsx` (R6), reemplazar el `Button` con `mailto` por:

```tsx
                  <CalendarButton
                    location="ventures_connect"
                    context={conn.subject}
                    variant={conn.mode === 'accent' ? 'dark' : 'primary'}
                  >
                    {conn.cta}
                  </CalendarButton>
```

Quitar los imports sin uso (`Button`, `SITE_CONFIG`).

`components/ui/VentureCard.tsx`: R7 (quitar el `div` con `bg-gradient-to-br`). Si la tarjeta tiene imagen, R8.

- [ ] **Step 3: Ficha `/ventures/[slug]`**

- CTA final (`bg-[#080808]`) → R2. Como la sección anterior (anterior/siguiente) también es oscura, aplicar R9 al CTA para que quede **cream**.
- Reemplazar el `Button` con `mailto` por:

```tsx
              <CalendarButton location="venture_ficha" context={venture.name}>Escribir al equipo</CalendarButton>
```

- El segundo botón ("Ver todo el portafolio"): después de R9, cambiar `className="text-text-on-dark border-text-on-dark/20"` por `className="text-text-primary border-rl-dark/20"`.
- Quitar `SITE_CONFIG` si queda sin uso.

- [ ] **Step 4: Verificar y revisar con Eddie**

`npx tsc --noEmit && npm run lint`. En `npm run dev` revisar `/ventures` y dos fichas (una con hero de imagen, `cotton-nation`, y una sin imagen, `thousandfold`) en 1440 y 375 px, y revisión en vivo.

- [ ] **Step 5: Commit**

```bash
git add app/ventures components/ui/VentureCard.tsx data/ventures.ts data/services.ts
git commit -m "style(ventures): apply 2026 design system, calendar CTAs, redo copy-alignment wording

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 13: Proyectos (con fichas), Conocimiento y Privacidad con el estilo nuevo

**Files:**
- Modify: `app/proyectos/sections/{HeroSection,FilterableGrid}.tsx`, `app/proyectos/[slug]/page.tsx`, `components/ui/ProjectCard.tsx`, `app/conocimiento/sections/{HeroSection,ResourcesList,CtaSection}.tsx`, `app/privacidad/page.tsx`

- [ ] **Step 1: Proyectos**

- `FilterableGrid` (cream): R3 si tiene etiqueta (`n="01"`).
- `ProjectCard`: R8 si tiene imagen; mantener la barra roja lateral.
- La `CtaSection` ya quedó con el calendario en la Task 10.
- Ficha `/proyectos/[slug]`: CTA final → R2 + R9 (cream). Reemplazar el `mailto` por:

```tsx
              <CalendarButton location="proyecto_ficha" context={project.title}>Escribir al equipo</CalendarButton>
```

  El botón "Ver todos los proyectos" pasa a `className="text-text-primary border-rl-dark/20"`. Quitar `SITE_CONFIG` si queda sin uso.

- [ ] **Step 2: Conocimiento**

- `CtaSection`: R2 y luego R9 (queda **cream**, porque el último recurso de la lista es oscuro). Reemplazar el `Button` con `mailto` por:

```tsx
          <CalendarButton location="conocimiento_cta">Conversar</CalendarButton>
```

- `ResourcesList`: mantener la alternancia por recurso. Poner la etiqueta de tipo en `font-mono` y dejar los títulos en 400, que ya lo son por el cambio global de `.font-display`. Las dos guías sin archivo ya muestran "Próximamente" (Task 7).

- [ ] **Step 3: Privacidad**

`app/privacidad/page.tsx`: queda en cream. Aplicar R3 solo si tiene `Tag` fuera del hero. Tipografía: texto legal en `text-[16px] leading-[1.7] text-text-secondary`. Sin otros cambios.

- [ ] **Step 4: Verificación completa del sitio**

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build && (npm start > /tmp/rl-start.log 2>&1 &) && sleep 6 && npm run verify; pkill -f "next start"
```

Expected: `Todo en orden` (0 fallas). Si algo falla, corregirlo antes del commit.

- [ ] **Step 5: Revisión en vivo con Eddie** de `/proyectos`, una ficha de proyecto, `/conocimiento` y `/privacidad` en 1440 y 375 px.

- [ ] **Step 6: Commit**

```bash
git add app/proyectos components/ui/ProjectCard.tsx app/conocimiento app/privacidad
git commit -m "style(subpages): apply 2026 design system to proyectos, conocimiento, privacidad; calendar CTAs

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 14: Cierre — revisión final, README y preparación de publicación

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Pasada final de calidad**

Revisar en `npm run dev`, con `prefers-reduced-motion` activado en DevTools (Rendering → Emulate CSS media feature): el hero no rota, el cinturón está quieto, la línea de tiempo aparece completa y la pestaña no anima.

Correr Lighthouse (DevTools, móvil) en `/`, `/empresas` y `/fondos`, y comparar LCP y CLS con producción (`https://redesignlab.org/`, `/fondos`). Anotar los valores. Si el LCP empeora más de 20%, revisar `priority` y `sizes` de las imágenes del hero.

- [ ] **Step 2: Registro de cambios en `README.md`**

Agregar, como primera entrada bajo `## Registro de cambios`:

```markdown
### 2026-09-24 · Rediseño por audiencias (Empresas, Bio/Builders, Instituciones)

**Rama:** `feat/audiencias-redesign` · **Spec:** `docs/superpowers/specs/2026-09-24-audiencias-redesign-design.md` · **Plan:** `docs/superpowers/plans/2026-09-24-audiencias-redesign.md`

**Por qué:** menú más limpio con los tres públicos claros y páginas de lectura rápida que llevan a una reunión uno a uno.

**Qué cambió**

- Menú: Empresas · Bio/Builders (Ventures) · Instituciones · Proyectos · Conocimiento. "Escribir al equipo" y todos los CTA de conversación abren el calendario.
- Home rediseñada. Página nueva `/empresas`. `/fondos` pasa a ser Instituciones (misma URL).
- Pestaña lateral de anuncios con rotación de campañas (`data/announcements.ts`).
- Sistema visual 2026 (oscuro/crema, numeración editorial, grano, relleno rojo al pasar el mouse) aplicado a Bio/Builders, Ventures, Proyectos, Conocimiento y Privacidad sin cambiar su contenido.
- 404 propia e imágenes para redes de `/empresas` y `/fondos`.

**Impacto SEO**

- Redirects 308: `/inteligencia-artificial` → `/empresas#ia`; `/cursos-bbs` y `/cursos-bbs/*` → `biobusinessschool.org`. El código de esas rutas se conserva.
- Páginas ocultas pero vivas y en el sitemap: ACELERA, Pon Orden, Consigue Capital, Vende más, Crear valor, Transformar el modelo, Cómo pensamos y el diagnóstico de IA.
- Después de publicar: pedir indexación de `/`, `/empresas` y `/fondos` en Search Console y vigilar las páginas ocultas y `/fondos` durante 4 semanas.

**Pendientes:** `circularclub.la` sin HTTPS (fila sin enlace); PDF de las guías de Due Diligence y Comunidades Nativas; revisar la fecha de cierre de la campaña Bio/Builders 2026 en `data/announcements.ts`.

**Verificación:** `npm test`, `npm run verify`, `tsc`, `lint` y `build` sin errores; revisión visual en escritorio y 375 px.
```

- [ ] **Step 3: Commit y resumen para Eddie**

```bash
git add README.md
git commit -m "docs(readme): changelog for audiencias redesign

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

Luego informar a Eddie: resultado de `npm run verify`, valores de Lighthouse, lista de textos nuevos para validar (404, frase OG de Instituciones) y la propuesta de publicar. **No hacer push ni abrir PR sin su confirmación explícita.**

---

## Cobertura de la spec (autorrevisión)

| Spec | Tarea |
|---|---|
| §2.1 Menú | 2, 5 |
| §2.2 Estado de URLs / ocultas | 2, 10 (verify) |
| §2.3 Redirects | 10 |
| §2.4 Enlaces internos | 10, 12, 13 |
| §3.1 Home (todas las secciones y la tabla de divisiones) | 6, 7 |
| §3.2 Empresas | 8 |
| §3.3 Instituciones | 9 |
| §4.1 Menú · §4.2 Footer | 5 |
| §4.3 Pestaña de anuncios | 4 |
| §4.4 Piezas reutilizables · §4.5 Movimiento | 3, 6, 9 |
| §5 Contacto y medición | 3 (`CalendarButton`, `track`), 5, 8–13 |
| §6 SEO (metadata, sitemap, schema, OG) | 8, 9, 10, 14 |
| §7 Pendientes / §7.1 Auditoría | 2 (Circular Club), 7 (guías), 10 (Proyectos, 404), 8–9 (OG), 12 (`copy-alignment`) |
| §8 Verificación | 1, 10, 13, 14 |
| §10 Subpáginas | 11, 12, 13 |
