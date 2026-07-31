import { NEWSLETTER } from '@/lib/constants'

interface NewsletterFormProps {
  className?: string
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  return (
    <div className={className}>
      <p className="text-body-sm text-text-muted mb-4">{NEWSLETTER.body}</p>
      <div className="w-full h-[400px] overflow-hidden rounded">
        <iframe
          src={NEWSLETTER.subscribeUrl}
          title="Suscríbete al boletín de Redesign Lab"
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <a
        href={NEWSLETTER.subscribeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3 text-body-xs text-text-muted/50 hover:text-text-on-dark transition-colors underline underline-offset-2"
      >
        ¿No carga? Abrir el formulario en una pestaña nueva ↗
      </a>
    </div>
  )
}
