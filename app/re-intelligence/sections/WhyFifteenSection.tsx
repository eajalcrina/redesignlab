'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import Divider from '@/components/ui/Divider'

export default function WhyFifteenSection() {
  return (
    <div className="max-w-3xl mx-auto">
      <SectionReveal>
        <Divider variant="red" className="w-16 mb-8" animated />
        <p className="text-body-xl text-text-on-dark mb-8">
          La respuesta corta: porque con 16, Re. Intelligence Pro deja de ser lo que es.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <div className="space-y-6 text-body-lg text-text-muted">
          <p>
            El valor de Pro no está en el contenido — está en la integración real con los datos del negocio y en el criterio aplicado al contexto específico de cada empresa. Eso requiere que Eddie Ajalcriña y Lorenzo Ortiz tengan espacio mental real para pensar en cada empresa — para recordar en qué escenario está, qué decisión está tomando esta semana y qué información del ecosistema cambia esa ecuación.
          </p>
          <p>
            Con 15 empresas activas, eso es posible. Con 20, empieza a degradarse. Con 50, se convierte en otro producto — uno que ya existe y que no es Re. Intelligence Pro.
          </p>
          <p>
            El límite de 15 protege a la empresa miembro tanto como a Redesign Lab. Garantiza que cuando el fundador o gerente general llega a su sesión mensual, la persona al otro lado ha estado pensando en su negocio específico — no preparando una reunión genérica.
          </p>
          <p className="text-text-on-dark font-medium">
            Cuando los 15 cupos están completos, hay lista de espera. No hay excepciones.
          </p>
          <p className="text-body-md text-text-muted italic pt-2 opacity-70">
            Re. Intelligence Lite no tiene límite de empresas activas — el formato no requiere la misma intensidad de integración por miembro.
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
