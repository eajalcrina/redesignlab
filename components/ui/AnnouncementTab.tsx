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

  const hoverTimer = useRef<number | undefined>(undefined)
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
