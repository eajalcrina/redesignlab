'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { SITE_CONFIG } from '@/lib/constants'
import { DURATION, EASE } from '@/lib/animations'

type State = 'idle' | 'submitting' | 'success' | 'error'

const REVENUE_BUCKETS = [
  '< $100K',
  '$100K – $500K',
  '$500K – $1M',
  '$1M – $5M',
  '> $5M',
] as const

type RevenueBucket = (typeof REVENUE_BUCKETS)[number]

interface FormData {
  contact_name: string
  country: string
  phone: string
  email: string
  company_legal_name: string
  annual_revenue_bucket: RevenueBucket | ''
  product_or_service: string
  website: string
  social_handle: string
  main_challenge: string
}

const initialData: FormData = {
  contact_name: '',
  country: '',
  phone: '',
  email: '',
  company_legal_name: '',
  annual_revenue_bucket: '',
  product_or_service: '',
  website: '',
  social_handle: '',
  main_challenge: '',
}

export default function ReIntelligenceForm() {
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

    if (!data.contact_name || !data.email || !data.company_legal_name || !data.main_challenge) {
      setErrorMessage('Faltan campos obligatorios.')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMessage(null)

    if (!supabase) {
      setErrorMessage('La captura de datos está desactivada en este entorno.')
      setState('error')
      return
    }

    const { error } = await supabase.from('re_intelligence_applications').insert({
      contact_name: data.contact_name.trim(),
      country: data.country.trim() || null,
      phone: data.phone.trim() || null,
      email: data.email.trim().toLowerCase(),
      company_legal_name: data.company_legal_name.trim(),
      annual_revenue_bucket: data.annual_revenue_bucket || null,
      product_or_service: data.product_or_service.trim() || null,
      website: data.website.trim() || null,
      social_handle: data.social_handle.trim() || null,
      main_challenge: data.main_challenge.trim(),
      source: typeof window !== 'undefined' ? window.location.pathname : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    })

    if (error) {
      // eslint-disable-next-line no-console
      console.error('[re-intelligence] insert failed', error)
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
          Solicitud recibida
        </p>
        <p className="font-display text-display-sm text-text-on-dark mb-4">
          Gracias. Te contactamos en 48 horas hábiles.
        </p>
        <p className="text-body-md text-text-muted mb-8">
          Eddie Ajalcriña o Lorenzo Ortiz revisan personalmente cada solicitud. Si hay alineación
          con Re. Intelligence, recibirás una invitación a la conversación de fit. Si no la hay, te
          comunicamos con claridad y sugerimos el camino más apropiado.
        </p>

        <div className="border-t border-border-dark pt-6">
          <p className="text-label-sm uppercase text-rl-red mb-3">
            ¿Quieres avanzar más rápido?
          </p>
          <p className="text-body-sm text-text-muted mb-5">
            Puedes agendar tú mismo la conversación de fit de 30 minutos directamente en el calendario del equipo.
          </p>
          <a
            href={SITE_CONFIG.calendarUrlFit}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-12 px-8 bg-rl-red text-white font-medium rounded hover:bg-[#d91f5b] transition-colors"
          >
            Agendar conversación de fit &rarr;
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-rl-dark text-text-on-dark rounded p-8 md:p-10"
      noValidate
    >
      <p className="font-mono text-mono-sm text-rl-red uppercase tracking-[0.18em] mb-6">
        Formulario · Re. Intelligence
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

        <Field label="País">
          <input
            type="text"
            value={data.country}
            onChange={(e) => update('country', e.target.value)}
            placeholder="Perú · Colombia · México…"
            disabled={locked}
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

        <Field label="Razón social de la empresa" required>
          <input
            type="text"
            value={data.company_legal_name}
            onChange={(e) => update('company_legal_name', e.target.value)}
            placeholder="Nombre legal"
            disabled={locked}
            required
            className={inputCls}
          />
        </Field>

        <Field label="Facturación anual estimada">
          <select
            value={data.annual_revenue_bucket}
            onChange={(e) => update('annual_revenue_bucket', e.target.value as RevenueBucket | '')}
            disabled={locked}
            className={`${inputCls} ${data.annual_revenue_bucket ? '' : 'text-text-muted/60'} appearance-none pr-8`}
          >
            <option value="" className="bg-rl-dark text-text-muted">Selecciona un rango (USD)</option>
            {REVENUE_BUCKETS.map((b) => (
              <option key={b} value={b} className="bg-rl-dark text-text-on-dark">
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Producto o servicio principal">
          <input
            type="text"
            value={data.product_or_service}
            onChange={(e) => update('product_or_service', e.target.value)}
            placeholder="Una línea"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <Field label="Página web">
          <input
            type="url"
            value={data.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <Field label="Red social principal" className="md:col-span-2">
          <input
            type="text"
            value={data.social_handle}
            onChange={(e) => update('social_handle', e.target.value)}
            placeholder="@tu-empresa"
            disabled={locked}
            className={inputCls}
          />
        </Field>

        <div className="md:col-span-2">
          <p className="text-label-sm uppercase text-rl-red mb-2">
            Principales desafíos <span aria-hidden>*</span>
          </p>
          <textarea
            value={data.main_challenge}
            onChange={(e) => update('main_challenge', e.target.value)}
            placeholder="¿Cuál es el desafío más crítico que enfrenta tu empresa en los próximos seis meses — y por qué crees que no puedes resolverlo solo?"
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
          Te respondemos en 48 horas hábiles · Tus datos quedan privados.
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
  className = '',
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <p className="text-label-sm uppercase text-text-muted mb-2">
        {label} {required && <span className="text-rl-red" aria-hidden>*</span>}
      </p>
      {children}
    </div>
  )
}
