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
