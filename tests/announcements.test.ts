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
