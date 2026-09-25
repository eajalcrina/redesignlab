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

  // SEO / GEO: ficha para buscadores con IA, imagen para redes y datos estructurados por página
  const llms = await get('/llms.txt')
  llms.status === 200 && (await llms.text()).startsWith('# Redesign Lab') ? ok('llms.txt publicado') : fail('llms.txt ausente o vacío')
  for (const p of VISIBLE) {
    const html = await (await get(p)).text()
    html.includes('property="og:image"') ? ok(`${p} tiene og:image`) : fail(`${p} sin og:image`)
    if (p !== '/' && p !== '/privacidad') html.includes('"BreadcrumbList"') ? ok(`${p} tiene BreadcrumbList`) : fail(`${p} sin BreadcrumbList`)
  }

  console.log(failures ? `\n${failures} fallas` : '\nTodo en orden')
  process.exit(failures ? 1 : 0)
}

main().catch((e) => { console.error(e); process.exit(1) })
