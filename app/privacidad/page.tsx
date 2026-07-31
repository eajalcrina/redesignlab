import type { Metadata } from 'next'
import Divider from '@/components/ui/Divider'
import { NEWSLETTER, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Cómo Redesign Lab recopila, usa y protege los datos personales de quienes visitan el sitio o se suscriben al boletín.',
  alternates: { canonical: '/privacidad' },
  robots: { index: true, follow: true },
}

export default function PrivacidadPage() {
  return (
    <section className="section-neutral pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="container-rl max-w-2xl">
        <p className="text-body-sm text-text-tertiary mb-2">Legal</p>
        <h1 className="font-display text-display-md md:text-display-lg text-text-primary mb-6">
          Política de Privacidad
        </h1>
        <p className="text-body-sm text-text-tertiary mb-10">
          Última actualización: julio de 2026
        </p>

        <Divider className="mb-10" />

        <div className="space-y-10">
          <div>
            <h2 className="text-label-md uppercase text-text-tertiary mb-3">Qué datos recopilamos</h2>
            <p className="text-body-md text-text-secondary">
              Cuando te suscribes a nuestro boletín a través del formulario público de Listmonk, nuestra plataforma de envío de correo, recopilamos tu dirección de correo electrónico y, si lo indicas, tu nombre. No solicitamos ni almacenamos ningún otro dato personal como parte de este proceso.
            </p>
          </div>

          <div>
            <h2 className="text-label-md uppercase text-text-tertiary mb-3">Para qué usamos tus datos</h2>
            <p className="text-body-md text-text-secondary">
              Usamos tu correo electrónico exclusivamente para enviarte el boletín de Redesign Lab: recursos, análisis y noticias relevantes sobre bioeconomía, inteligencia artificial y negocios regenerativos en América Latina. No usamos tus datos con fines distintos a este.
            </p>
          </div>

          <div>
            <h2 className="text-label-md uppercase text-text-tertiary mb-3">Con quién compartimos tus datos</h2>
            <p className="text-body-md text-text-secondary">
              No vendemos ni compartimos tu información con terceros con fines comerciales. Tus datos se almacenan en Listmonk, la plataforma que usamos para gestionar y enviar el boletín, y solo el equipo de Redesign Lab tiene acceso a ellos.
            </p>
          </div>

          <div>
            <h2 className="text-label-md uppercase text-text-tertiary mb-3">Cómo darte de baja</h2>
            <p className="text-body-md text-text-secondary">
              {NEWSLETTER.disclaimer} Cada correo que enviamos incluye un enlace de baja (&quot;unsubscribe&quot;) al final del mensaje. Al usarlo, tu dirección se elimina de la lista de envío de forma inmediata. También puedes escribirnos directamente para solicitar la baja o la eliminación de tus datos.
            </p>
          </div>

          <div>
            <h2 className="text-label-md uppercase text-text-tertiary mb-3">Contacto</h2>
            <p className="text-body-md text-text-secondary">
              Si tienes preguntas sobre esta política o sobre el tratamiento de tus datos, puedes escribirnos a{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-rl-red hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
              .
            </p>
            <p className="text-body-md text-text-secondary mt-2">
              {SITE_CONFIG.address}, {SITE_CONFIG.city}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
