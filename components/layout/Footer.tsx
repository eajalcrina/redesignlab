'use client'

import Link from 'next/link'
import { SITE_CONFIG, FOOTER_LINKS, NEWSLETTER } from '@/lib/constants'
import Divider from '@/components/ui/Divider'
import NewsletterForm from '@/components/ui/NewsletterForm'

export default function Footer() {
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
        </div>

        <Divider mode="dark" className="mb-8 md:mb-16" />

        {/* Newsletter — full width on mobile, shown in column on desktop */}
        <div className="mb-10 md:mb-16 lg:hidden">
          <h3 className="text-label-sm uppercase text-text-muted mb-3">
            {NEWSLETTER.headline}
          </h3>
          <NewsletterForm variant="compact" />
        </div>

        {/* Links grid — 2 cols mobile, 5 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-8 mb-10 md:mb-16">
          {/* Newsletter (desktop only — mobile version above) */}
          <div className="hidden lg:block lg:col-span-2">
            <h3 className="text-label-md uppercase text-text-muted mb-4">
              {NEWSLETTER.headline}
            </h3>
            <NewsletterForm variant="full" />
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
