'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { bbsWhatsappUrl } from '@/lib/constants'
import type { BBSProgram } from '@/data/bbs'
import SectionReveal from '@/components/animations/SectionReveal'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface EnrollFormProps {
  program: BBSProgram
}

export default function EnrollForm({ program }: EnrollFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [referralSource, setReferralSource] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')

  const isSubmitting = formState === 'submitting'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return

    if (!supabase) {
      setFormState('error')
      return
    }

    setFormState('submitting')

    const { error } = await supabase.from('bbs_enrollments').insert({
      program_slug: program.slug,
      program_title: program.title,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company.trim() || null,
      role: role.trim() || null,
      referral_source: referralSource || null,
      source: typeof window !== 'undefined' ? window.location.pathname : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
    })

    if (error && error.code !== '23505') {
      // eslint-disable-next-line no-console
      console.error('[bbs_enrollments] insert failed', error)
      setFormState('error')
      return
    }

    setFormState('success')
  }

  const inputClass =
    'w-full h-11 px-4 border border-border-light rounded bg-rl-white text-text-primary text-body-sm focus:outline-none focus:border-rl-red transition-colors'
  const labelClass = 'block text-label-sm uppercase text-text-tertiary mb-1'

  const mercadopagoHref = program.mercadopagoUrl || '#'
  const mercadopagoExternal = mercadopagoHref.startsWith('http')

  return (
    <section id="inscripcion" className="section-neutral py-24 md:py-32">
      <div className="container-rl">
        <SectionReveal>
          <Tag color="red" className="mb-4">
            Inscripción
          </Tag>
          <h2 className="font-display text-display-md md:text-display-lg text-text-primary max-w-3xl mb-2">
            Inscríbete a {program.title}
          </h2>
          <p className="font-mono text-mono-md text-text-secondary mb-10">
            {program.price.usd} · {program.price.pen}
          </p>
        </SectionReveal>

        {formState === 'success' ? (
          <SectionReveal>
            <div className="max-w-xl space-y-6">
              <p className="text-body-lg text-text-primary">
                ¡Listo! Recibimos tus datos.
              </p>
              <p className="text-body-sm text-text-secondary">
                El siguiente paso es completar el pago para reservar tu cupo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Button
                  variant="primary"
                  href={mercadopagoHref}
                  {...(mercadopagoExternal
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  Pagar con tarjeta · Mercadopago
                </Button>
                <a
                  href={bbsWhatsappUrl(program.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-text-secondary hover:text-rl-red transition-colors underline underline-offset-2 self-center"
                >
                  Otros medios de pago
                </a>
              </div>
            </div>
          </SectionReveal>
        ) : (
          <SectionReveal delay={0.05}>
            <form onSubmit={handleSubmit} className="max-w-xl">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label htmlFor="enroll-name" className={labelClass}>
                    Nombre
                  </label>
                  <input
                    id="enroll-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="enroll-email" className={labelClass}>
                    Correo
                  </label>
                  <input
                    id="enroll-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="enroll-phone" className={labelClass}>
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="enroll-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="enroll-company" className={labelClass}>
                    Empresa u organización
                  </label>
                  <input
                    id="enroll-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="enroll-role" className={labelClass}>
                    Cargo
                  </label>
                  <input
                    id="enroll-role"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="enroll-referral" className={labelClass}>
                    ¿Cómo te enteraste?
                  </label>
                  <select
                    id="enroll-referral"
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    disabled={isSubmitting}
                    className={inputClass}
                  >
                    <option value="">Selecciona…</option>
                    <option value="Google">Google</option>
                    <option value="Instagram">Instagram</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Recomendación">Recomendación</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              {formState === 'error' && (
                <p className="text-body-xs text-rl-red/80 mb-4">
                  Algo salió mal. Revisa tu conexión e intenta de nuevo.
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando…' : 'Enviar inscripción'}
              </Button>
            </form>
          </SectionReveal>
        )}
      </div>
    </section>
  )
}
