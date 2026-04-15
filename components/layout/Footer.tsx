'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SITE_CONFIG, FOOTER_LINKS, NEWSLETTER } from '@/lib/constants'
import { supabase } from '@/lib/supabase'
import Divider from '@/components/ui/Divider'

type NewsletterState = 'idle' | 'submitting' | 'success' | 'error'

async function subscribeEmail(email: string): Promise<NewsletterState> {
  if (!supabase) return 'error'
  const { error } = await supabase.from('newsletter_subscribers').insert({
    email: email.trim().toLowerCase(),
    source: typeof window !== 'undefined' ? window.location.pathname : null,
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    referrer: typeof document !== 'undefined' ? document.referrer || null : null,
  })
  // Unique violation = already subscribed → treat as success from UX perspective
  if (error && error.code !== '23505') {
    // eslint-disable-next-line no-console
    console.error('[newsletter] insert failed', error)
    return 'error'
  }
  return 'success'
}

export default function Footer() {
  const [mEmail, setMEmail] = useState('')
  const [dEmail, setDEmail] = useState('')
  const [mState, setMState] = useState<NewsletterState>('idle')
  const [dState, setDState] = useState<NewsletterState>('idle')

  return (
    <footer className="section-dark">
      <div className="container-rl py-10 md:py-24">
        {/* Top: Logo + tagline */}
        <div className="mb-8 md:mb-16">
          <Link href="/" className="font-display text-display-xs md:text-display-sm text-text-on-dark">
            Redesign Lab<span className="text-rl-red">.</span>
          </Link>
          <p className="mt-2 text-body-xs md:text-body-sm text-text-muted">
            {SITE_CONFIG.tagline}
          </p>
          <p className="hidden md:block mt-1 text-body-sm text-text-muted">
            {SITE_CONFIG.taglineEs}
          </p>
        </div>

        <Divider mode="dark" className="mb-8 md:mb-16" />

        {/* Newsletter — full width on mobile, first column on desktop */}
        <div className="mb-10 md:mb-16 lg:hidden">
          <h3 className="text-label-sm uppercase text-text-muted mb-3">
            {NEWSLETTER.headline}
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (mState === 'submitting' || !mEmail) return
              setMState('submitting')
              const r = await subscribeEmail(mEmail)
              setMState(r)
              if (r === 'success') setMEmail('')
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              value={mEmail}
              onChange={(e) => setMEmail(e.target.value)}
              placeholder={NEWSLETTER.placeholder}
              required
              disabled={mState === 'submitting' || mState === 'success'}
              className="flex-1 h-10 px-3 bg-transparent border border-border-dark text-text-on-dark text-body-sm rounded placeholder:text-text-muted/50 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={mState === 'submitting' || mState === 'success'}
              className="h-10 px-4 bg-rl-red text-white text-body-sm font-medium rounded hover:bg-[#d91f5b] transition-colors whitespace-nowrap disabled:opacity-60"
            >
              {mState === 'submitting' ? '...' : mState === 'success' ? '✓' : NEWSLETTER.cta}
            </button>
          </form>
          {mState === 'success' && (
            <p className="mt-2 text-body-xs text-rl-red">Gracias por suscribirte.</p>
          )}
          {mState === 'error' && (
            <p className="mt-2 text-body-xs text-rl-red/80">No pudimos suscribirte. Intenta de nuevo.</p>
          )}
        </div>

        {/* Links grid — 2 cols mobile, 5 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-8 mb-10 md:mb-16">
          {/* Newsletter (desktop only — mobile version above) */}
          <div className="hidden lg:block lg:col-span-2">
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {NEWSLETTER.headline}
            </h3>
            <p className="text-body-sm text-text-muted mb-4">
              {NEWSLETTER.body}
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                if (dState === 'submitting' || !dEmail) return
                setDState('submitting')
                const r = await subscribeEmail(dEmail)
                setDState(r)
                if (r === 'success') setDEmail('')
              }}
              className="flex gap-2 mb-2"
            >
              <input
                type="email"
                value={dEmail}
                onChange={(e) => setDEmail(e.target.value)}
                placeholder={NEWSLETTER.placeholder}
                required
                disabled={dState === 'submitting' || dState === 'success'}
                className="flex-1 h-10 px-4 bg-transparent border border-border-dark text-text-on-dark text-body-sm rounded placeholder:text-text-muted/50 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={dState === 'submitting' || dState === 'success'}
                className="h-10 px-6 bg-rl-red text-white text-body-sm font-medium rounded hover:bg-[#d91f5b] transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {dState === 'submitting' ? '...' : dState === 'success' ? '✓' : NEWSLETTER.cta}
              </button>
            </form>
            {dState === 'success' ? (
              <p className="text-body-xs text-rl-red">Gracias por suscribirte.</p>
            ) : dState === 'error' ? (
              <p className="text-body-xs text-rl-red/80">No pudimos suscribirte. Intenta de nuevo.</p>
            ) : (
              <p className="text-body-xs text-text-muted/50">
                {NEWSLETTER.disclaimer}
              </p>
            )}
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-label-sm md:text-label-md uppercase text-text-muted mb-3 md:mb-4">
              {FOOTER_LINKS.servicios.titulo}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.servicios.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-xs md:text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosistema */}
          <div>
            <h3 className="text-label-sm md:text-label-md uppercase text-text-muted mb-3 md:mb-4">
              {FOOTER_LINKS.ecosistema.titulo}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {FOOTER_LINKS.ecosistema.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-xs md:text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto — spans 2 cols on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-label-sm md:text-label-md uppercase text-text-muted mb-3 md:mb-4">
              {FOOTER_LINKS.contacto.titulo}
            </h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="text-body-xs md:text-body-sm text-text-muted">
                {SITE_CONFIG.address} · {SITE_CONFIG.city}
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-body-xs md:text-body-sm text-text-muted hover:text-text-on-dark transition-colors break-all"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-body-xs md:text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://fondodeimpacto.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-xs md:text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                >
                  fondodeimpacto.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Divider mode="dark" className="mb-6 md:mb-8" />

        {/* Bottom: Copyright + credits */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="hidden md:inline text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
          >
            {SITE_CONFIG.email}
          </a>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-4">
            <p className="text-body-xs text-text-muted/70">
              {SITE_CONFIG.copyright}
            </p>
            <p className="text-body-xs text-text-muted/70">
              Diseño y desarrollo por{' '}
              <a
                href="https://www.thousandfold.la/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-rl-red transition-colors underline underline-offset-2 decoration-text-muted/30 hover:decoration-rl-red"
              >
                Thousandfold
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
