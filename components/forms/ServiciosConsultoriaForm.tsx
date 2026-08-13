'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE_CONFIG } from '@/lib/constants'
import { DURATION, EASE } from '@/lib/animations'

type State = 'idle' | 'submitting' | 'success' | 'error'
type Category = 'Pon Orden' | 'Consigue Capital' | 'Vende más'

interface FormData {
  contact_name: string
  company: string
  email: string
  phone: string
  message: string
}

const initialData: FormData = {
  contact_name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

interface ServiciosConsultoriaFormProps {
  category: Category
  /** Placeholder de la pregunta abierta, adaptado a cada categoría */
  messagePlaceholder: string
}

export default function ServiciosConsultoriaForm({ category, messagePlaceholder }: ServiciosConsultoriaFormProps) {
  const [data, setData] = useState<FormData>(initialData)
  const [state, setState] = useState<State>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const locked = state === 'submitting' || state === 'success'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (locked) return

    if (!data.contact_name || !data.email || !data.message) {
      setErrorMessage('Faltan campos obligatorios.')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMessage(null)

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'servicios-consultoria',
          data: {
            category,
            contact_name: data.contact_name.trim(),
            company: data.company.trim() || null,
            email: data.email.trim().toLowerCase(),
            phone: data.phone.trim() || null,
            message: data.message.trim(),
            source: typeof window !== 'undefined' ? window.location.pathname : null,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          },
        }),
      })

      if (!res.ok) throw new Error('request failed')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[servicios-consultoria] submit failed', err)
      setErrorMessage('No pudimos enviar la solicitud. Intenta de nuevo o escríbenos por correo.')
      setState('error')
      return
    }

    setState('success')
  }

  if (state === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.normal, ease: EASE.out }}
        className="bg-rl-dark text-text-on-dark rounded p-8 md:p-10"
      >
        <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-4">
          Solicitud recibida · Paso 2 / 2
        </p>
        <p className="font-display text-display-sm text-text-on-dark mb-4">
          Ahora agenda tu conversación de fit.
        </p>
        <p className="text-body-md text-text-muted mb-8">
          Tu información ya llegó al equipo. El siguiente paso es agendar directamente la conversación de 30 minutos. Llegaremos con tu información ya revisada.
        </p>

        <a
          href={SITE_CONFIG.calendarUrlFit}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 h-12 px-8 bg-rl-red text-white font-medium rounded hover:bg-[#d91f5b] transition-colors"
        >
          Agendar conversación de fit &rarr;
        </a>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-rl-dark text-text-on-dark rounded p-8 md:p-10" noValidate>
      <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
        Formulario · {category}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <Field label="Nombre de contacto" required>
          <input
            type="text"
            value={data.contact_name}
            onChange={(e) => update('contact_name', e.target.value)}
            placeholder="Tu nombre completo"
            disabled={locked}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Empresa">
          <input
            type="text"
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            placeholder="Nombre de tu empresa"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <Field label="Correo electrónico" required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="tu@empresa.com"
            disabled={locked}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Celular">
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="+51 9XX XXX XXX"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <div className="md:col-span-2">
          <p className="text-label-sm uppercase text-rl-red mb-2">
            Cuéntanos tu situación <span aria-hidden>*</span>
          </p>
          <textarea
            value={data.message}
            onChange={(e) => update('message', e.target.value)}
            placeholder={messagePlaceholder}
            disabled={locked}
            required
            rows={5}
            className="w-full bg-transparent border border-border-dark rounded p-4 text-body-sm text-text-on-dark placeholder:text-text-muted/60 focus:outline-none focus:border-rl-red transition-colors resize-y disabled:opacity-60"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          type="submit"
          disabled={locked}
          className="h-12 px-8 bg-rl-red text-white font-medium rounded hover:bg-[#d91f5b] transition-colors disabled:opacity-60 cursor-pointer"
        >
          {state === 'submitting' ? 'Enviando…' : 'Enviar solicitud →'}
        </button>
        <p className="text-body-xs text-text-muted/70">
          Después del envío agendarás la reunión directamente · Tus datos quedan privados.
        </p>
      </div>

      <AnimatePresence>
        {state === 'error' && errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-body-sm text-rl-red"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

const inputCls =
  'w-full bg-transparent border-b border-border-dark py-2 text-body-sm text-text-on-dark placeholder:text-text-muted/60 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-label-sm uppercase text-text-muted mb-2">
        {label} {required && <span className="text-rl-red" aria-hidden>*</span>}
      </p>
      {children}
    </div>
  )
}
