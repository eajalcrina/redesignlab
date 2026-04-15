'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileOpen(false)
    setActiveSubmenu(null)
    setMobileSubmenu(null)
  }, [pathname])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileOpen])

  const handleMouseEnter = (label: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
      submenuTimeoutRef.current = null
    }
    setActiveSubmenu(label)
  }

  const handleMouseLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null)
    }, 150)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-[10px]',
          isScrolled
            ? 'bg-rl-dark/80 border-b border-border-dark'
            : 'bg-rl-dark/15'
        )}
      >
        <div className="container-rl flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-text-on-dark font-display text-xl tracking-tight z-10">
            Redesign Lab<span className="text-rl-red">.</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const hasSubmenu = 'submenu' in link && link.submenu
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => hasSubmenu ? handleMouseEnter(link.label) : undefined}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'group/link relative text-body-sm text-text-muted hover:text-text-on-dark transition-colors duration-200 flex items-center gap-1',
                      pathname === link.href && 'text-text-on-dark'
                    )}
                  >
                    <span className="relative inline-block">
                      {link.label}
                      {/* Ventures: persistent thin red underline, widens on hover */}
                      {link.label === 'Ventures' && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-[5px] left-0 h-[1.5px] bg-rl-red transition-all duration-300 w-3 group-hover/link:w-full"
                        />
                      )}
                    </span>
                    {/* Fondos: brand red dot suffix (echoes the logo period) */}
                    {link.label === 'Fondos' && (
                      <span
                        aria-hidden="true"
                        className="ml-0.5 inline-block w-[5px] h-[5px] rounded-full bg-rl-red translate-y-[1px]"
                      />
                    )}
                    {hasSubmenu && (
                      <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 12 12">
                        <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>

                  {/* Desktop dropdown */}
                  {hasSubmenu && (
                    <AnimatePresence>
                      {activeSubmenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <div className="bg-rl-dark/95 backdrop-blur-md py-4 px-6 rounded-b-lg border border-border-dark border-t-0 min-w-[220px] shadow-xl">
                            <div className="flex flex-col gap-3">
                              {link.submenu!.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className={cn(
                                    'text-body-sm text-text-muted hover:text-text-on-dark transition-colors duration-200 whitespace-nowrap',
                                    pathname === sub.href && 'text-rl-red'
                                  )}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button variant="text" size="sm" href={`mailto:${SITE_CONFIG.email}`} className="text-body-sm !text-text-on-dark hover:!text-rl-red transition-colors">
              Escribir al equipo
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden relative z-10 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label={isMobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <motion.span className="block w-6 h-px bg-text-on-dark" animate={isMobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
            <motion.span className="block w-6 h-px bg-text-on-dark" animate={isMobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }} transition={{ duration: 0.2 }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-rl-dark flex flex-col items-center justify-center overflow-y-auto py-20"
          >
            <div className="flex flex-col items-center gap-6">
              {NAV_LINKS.map((link, i) => {
                const hasSubmenu = 'submenu' in link && link.submenu
                const isExpanded = mobileSubmenu === link.label
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {hasSubmenu ? (
                      <button
                        onClick={() => setMobileSubmenu(isExpanded ? null : link.label)}
                        className={cn(
                          'font-display text-display-sm text-text-on-dark hover:text-rl-red transition-colors flex items-center gap-2',
                          isExpanded && 'text-rl-red'
                        )}
                      >
                        {link.label}
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 12 12"
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </motion.svg>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={cn(
                          'font-display text-display-sm text-text-on-dark hover:text-rl-red transition-colors',
                          pathname === link.href && 'text-rl-red'
                        )}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}

                    {/* Mobile submenu — collapsible */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden flex flex-col items-center gap-3 mt-3"
                          >
                            {link.submenu!.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={cn(
                                  'text-body-md text-text-muted hover:text-text-on-dark transition-colors',
                                  pathname === sub.href && 'text-rl-red'
                                )}
                                onClick={() => setIsMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 + 0.2 }}
              >
                <Button variant="primary" href={`mailto:${SITE_CONFIG.email}`} className="mt-4">
                  Escribir al equipo &rarr;
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
