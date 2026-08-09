'use client'

import { useState } from 'react'
import { bbsPrograms } from '@/data/bbs'
import Button from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface CohortInterestFormProps {
  className?: string
}

export default function CohortInterestForm({ className = '' }: CohortInterestFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [programInterest, setProgramInterest] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const isSubmitting = formState === 'submitting'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return

    setFormState('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'cohort-interest',
          data: {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim() || null,
            program_interest: programInterest || null,
            source: typeof window !== 'undefined' ? window.location.pathname : null,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
            referrer: typeof document !== 'undefined' ? document.referrer || null : null,
          },
        }),
      })
      if (!res.ok) throw new Error('request failed')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[bbs_cohort_interest] submit failed', err)
      setFormState('error')
      return
    }

    setFormState('success')
  }

  const inputClass =
    'w-full h-11 px-4 bg-transparent border border-border-dark text-text-on-dark text-body-sm rounded placeholder:text-text-muted/50 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60'
  const labelClass = 'block text-label-sm uppercase text-text-muted mb-1'

  if (formState === 'success') {
    return (
      <div className={className}>
        <p className="text-body-md text-text-on-dark">
          Listo. Te avisaremos cuando abra la próxima cohorte.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="cohort-name" className={labelClass}>
            Nombre
          </label>
          <input
            id="cohort-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cohort-email" className={labelClass}>
            Correo
          </label>
          <input
            id="cohort-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="tu@empresa.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cohort-phone" className={labelClass}>
            Teléfono{' '}
            <span className="normal-case text-text-muted/60">(opcional)</span>
          </label>
          <input
            id="cohort-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
            placeholder="+51 999 999 999"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="cohort-program" className={labelClass}>
            Programa de interés{' '}
            <span className="normal-case text-text-muted/60">(opcional)</span>
          </label>
          <select
            id="cohort-program"
            value={programInterest}
            onChange={(e) => setProgramInterest(e.target.value)}
            disabled={isSubmitting}
            className={`${inputClass} appearance-none`}
          >
            <option value="">Selecciona…</option>
            {bbsPrograms.map((p) => (
              <option key={p.slug} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Aún no estoy seguro">Aún no estoy seguro</option>
          </select>
        </div>

        {formState === 'error' && (
          <p className="text-body-xs text-rl-red/80">
            Algo salió mal. Revisa tu conexión e intenta de nuevo.
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando…' : 'Avisarme de la próxima cohorte'}
        </Button>
      </form>
    </div>
  )
}
