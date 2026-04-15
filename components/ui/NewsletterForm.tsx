'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { NEWSLETTER } from '@/lib/constants'

type State = 'idle' | 'submitting' | 'success' | 'error'

interface NewsletterFormProps {
  /** Visual variant. `compact` skips the body/disclaimer copy. */
  variant?: 'compact' | 'full'
  className?: string
}

async function subscribeEmail(email: string): Promise<Exclude<State, 'idle' | 'submitting'>> {
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

export default function NewsletterForm({ variant = 'full', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')

  const compact = variant === 'compact'
  const lockedOut = state === 'submitting' || state === 'success'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (lockedOut || !email) return
    setState('submitting')
    const result = await subscribeEmail(email)
    setState(result)
    if (result === 'success') {
      setEmail('')
      // Allow the user to subscribe another email after a short while
      setTimeout(() => setState('idle'), 4000)
    }
  }

  return (
    <div className={className}>
      {!compact && (
        <p className="text-body-sm text-text-muted mb-4">{NEWSLETTER.body}</p>
      )}
      <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? '' : 'mb-2'}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={NEWSLETTER.placeholder}
          required
          disabled={lockedOut}
          aria-label="Correo electrónico para newsletter"
          className={`flex-1 h-10 bg-transparent border border-border-dark text-text-on-dark text-body-sm rounded placeholder:text-text-muted/50 focus:outline-none focus:border-rl-red transition-colors disabled:opacity-60 ${
            compact ? 'px-3' : 'px-4'
          }`}
        />
        <button
          type="submit"
          disabled={lockedOut}
          className={`h-10 bg-rl-red text-white text-body-sm font-medium rounded hover:bg-[#d91f5b] transition-colors whitespace-nowrap disabled:opacity-60 ${
            compact ? 'px-4' : 'px-6'
          }`}
        >
          {state === 'submitting' ? '...' : state === 'success' ? '✓' : NEWSLETTER.cta}
        </button>
      </form>
      {state === 'success' ? (
        <p className={`${compact ? 'mt-2' : ''} text-body-xs text-rl-red`}>
          Gracias por suscribirte.
        </p>
      ) : state === 'error' ? (
        <p className={`${compact ? 'mt-2' : ''} text-body-xs text-rl-red/80`}>
          No pudimos suscribirte. Intenta de nuevo.
        </p>
      ) : !compact ? (
        <p className="text-body-xs text-text-muted/50">{NEWSLETTER.disclaimer}</p>
      ) : null}
    </div>
  )
}
