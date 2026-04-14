'use client'

import Link from 'next/link'
import { SITE_CONFIG, FOOTER_LINKS, NEWSLETTER } from '@/lib/constants'
import Divider from '@/components/ui/Divider'

export default function Footer() {
  return (
    <footer className="section-dark">
      <div className="container-rl py-16 md:py-24">
        {/* Top: Logo + tagline */}
        <div className="mb-12 md:mb-16">
          <Link href="/" className="font-display text-display-sm text-text-on-dark">
            Redesign Lab<span className="text-rl-red">.</span>
          </Link>
          <p className="mt-2 text-body-sm text-text-muted">
            {SITE_CONFIG.tagline}
          </p>
          <p className="mt-1 text-body-sm text-text-muted">
            {SITE_CONFIG.taglineEs}
          </p>
        </div>

        <Divider mode="dark" className="mb-12 md:mb-16" />

        {/* Middle: Newsletter + Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-12 md:mb-16">
          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {NEWSLETTER.headline}
            </h3>
            <p className="text-body-sm text-text-muted mb-4">
              {NEWSLETTER.body}
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
              className="flex gap-2 mb-2"
            >
              <input
                type="email"
                placeholder={NEWSLETTER.placeholder}
                required
                className="flex-1 h-10 px-4 bg-transparent border border-border-dark text-text-on-dark text-body-sm rounded placeholder:text-text-muted/50 focus:outline-none focus:border-rl-red transition-colors"
              />
              <button
                type="submit"
                className="h-10 px-6 bg-rl-red text-white text-body-sm font-medium rounded hover:bg-[#d91f5b] transition-colors whitespace-nowrap"
              >
                {NEWSLETTER.cta}
              </button>
            </form>
            <p className="text-body-xs text-text-muted/50">
              {NEWSLETTER.disclaimer}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {FOOTER_LINKS.servicios.titulo}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.servicios.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosistema */}
          <div>
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {FOOTER_LINKS.ecosistema.titulo}
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.ecosistema.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {FOOTER_LINKS.contacto.titulo}
            </h3>
            <ul className="space-y-3">
              <li className="text-body-sm text-text-muted">{SITE_CONFIG.address}</li>
              <li className="text-body-sm text-text-muted">{SITE_CONFIG.city}</li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href="https://fondodeimpacto.pe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
                >
                  fondodeimpacto.pe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Divider mode="dark" className="mb-8" />

        {/* Bottom: Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="text-body-sm text-text-muted hover:text-text-on-dark transition-colors"
          >
            {SITE_CONFIG.email}
          </a>
          <p className="text-body-xs text-text-muted">
            {SITE_CONFIG.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
