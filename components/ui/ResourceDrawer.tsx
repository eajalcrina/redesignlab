'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DURATION, EASE } from '@/lib/animations'
import { supabase } from '@/lib/supabase'
import Button from './Button'

export interface Resource {
  slug: string
  name: string
  description: string
  downloadUrl: string
}

interface ResourceDrawerProps {
  isOpen: boolean
  resource: Resource | null
  onClose: () => void
}

export default function ResourceDrawer({ isOpen, resource, onClose }: ResourceDrawerProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ nombre: '', organizacion: '', email: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resource) return
    setFormState('submitting')

    if (supabase) {
      const { error } = await supabase.from('resource_downloads').insert({
        resource_slug: resource.slug,
        resource_name: resource.name,
        name: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        organization: formData.organizacion.trim(),
        source: typeof window !== 'undefined' ? window.location.pathname : null,
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      })
      if (error) {
        // eslint-disable-next-line no-console
        console.error('[resource-download] supabase insert failed', error)
        setFormState('error')
        return
      }
    }

    setFormState('success')
    // Auto-close after 3.5 seconds
    setTimeout(() => {
      onClose()
      setFormState('idle')
      setFormData({ nombre: '', organizacion: '', email: '' })
    }, 3500)
  }

  return (
    <AnimatePresence>
      {isOpen && resource && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            className="fixed inset-0 z-[60] bg-rl-dark/60"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: DURATION.normal, ease: EASE.out }}
            className="fixed right-0 top-0 bottom-0 z-[61] w-full md:w-[400px] bg-rl-white shadow-2xl overflow-y-auto"
          >
            <div className="p-8 md:p-10 h-full flex flex-col">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
                aria-label="Cerrar"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              {/* Resource info */}
              <div className="mb-8">
                <span className="text-label-sm uppercase text-rl-red block mb-3">Descargar recurso</span>
                <h3 className="font-display text-display-sm text-text-primary mb-2">{resource.name}</h3>
                <p className="text-body-sm text-text-secondary">{resource.description}</p>
              </div>

              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  {/* Success check */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-rl-red/10 flex items-center justify-center mb-6"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <motion.path
                        d="M5 13L9 17L19 7"
                        stroke="#F32769"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      />
                    </svg>
                  </motion.div>
                  <h4 className="font-display text-display-sm text-text-primary mb-2">Listo</h4>
                  <p className="text-body-sm text-text-secondary mb-6">
                    Te enviamos el recurso a tu email.
                  </p>
                  <a
                    href={resource.downloadUrl}
                    className="text-body-sm text-rl-red hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Descargar ahora &rarr;
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <label htmlFor="nombre" className="text-label-sm uppercase text-text-tertiary block mb-2">
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full h-10 px-4 border border-border-light text-text-primary text-body-sm rounded bg-transparent focus:outline-none focus:border-rl-red transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="organizacion" className="text-label-sm uppercase text-text-tertiary block mb-2">
                        Organización
                      </label>
                      <input
                        id="organizacion"
                        type="text"
                        required
                        value={formData.organizacion}
                        onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                        className="w-full h-10 px-4 border border-border-light text-text-primary text-body-sm rounded bg-transparent focus:outline-none focus:border-rl-red transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-label-sm uppercase text-text-tertiary block mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-10 px-4 border border-border-light text-text-primary text-body-sm rounded bg-transparent focus:outline-none focus:border-rl-red transition-colors"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full mt-8"
                    disabled={formState === 'submitting'}
                  >
                    {formState === 'submitting' ? 'Enviando...' : 'Descargar'}
                  </Button>
                  {formState === 'error' && (
                    <p className="mt-3 text-body-sm text-rl-red">
                      No pudimos procesar la solicitud. Intenta nuevamente.
                    </p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
