import type { Metadata } from 'next'
import ServiceHero from '@/components/sections/ServiceHero'
import AccordionSection from '@/components/sections/AccordionSection'
import ServiceGridSection from '@/components/sections/ServiceGridSection'
import HighlightedServices from './sections/HighlightedServices'
import VentureCoBuilding from './sections/VentureCoBuilding'
import ProcessSection from '@/components/sections/ProcessSection'
import CrossNavSection from '@/components/sections/CrossNavSection'
import { crearValorServices, ventureCoBuilding } from '@/data/services'

export const metadata: Metadata = {
  title: 'Crear valor',
  description:
    'Diseñamos modelos de negocio que capturan el valor real de tu cadena productiva. Opportunity Scan, Innovation Blueprint, Bioventure Blueprint y Venture Co-Building.',
  keywords: [
    'consultoría bioeconomía',
    'venture building',
    'modelo de negocio bioeconomía',
    'innovation blueprint',
  ],
  alternates: { canonical: '/crear-valor' },
}

const accordionItems = [
  {
    question: '¿Tienes un activo — territorial, natural, institucional — que vale más de lo que estás capturando?',
    answer:
      'El Opportunity Scan o el Bioventure Blueprint son el punto de partida correcto para convertir ese activo en un modelo de negocio verificable.',
  },
  {
    question: '¿Quieres lanzar un nuevo producto o servicio, pero necesitas validar que el mercado existe antes de producir?',
    answer:
      'El Innovation Blueprint diseña el producto completo — investigación, MVP, validación, go-to-market — antes de comprometer recursos en producción.',
  },
  {
    question: '¿Quieres lanzar un nuevo negocio o un spin-off corporativo?',
    answer:
      'El Bioventure Blueprint o el Corporate Spin-off Design construyen el modelo antes de que el capital llegue.',
  },
  {
    question: '¿Necesitas capital de cooperación, fondos de impacto o deuda verde?',
    answer:
      'El Fundraising Estratégico diseña la estrategia, mapea los fondos y gestiona las postulaciones — con fee solo si hay resultado.',
  },
  {
    question: '¿Necesitas demostrar el valor de impacto que ya generas?',
    answer:
      'El Impact Value Report construye la evidencia que resiste el escrutinio de un LP exigente o un organismo de certificación internacional.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Entendimiento profundo del contexto, los activos disponibles y el objetivo del proyecto. Sin atajos y sin supuestos que no hayan sido validados en campo.',
  },
  {
    number: '02',
    title: 'Análisis y diseño',
    description:
      'Investigación de mercado, diseño del modelo o producto, construcción de la estrategia. Con iteración constante con el equipo cliente.',
  },
  {
    number: '03',
    title: 'Entregable y transferencia',
    description:
      'El documento que resiste el uso real — no solo la presentación. Sesión de trabajo para garantizar que el equipo puede ejecutar lo que se diseñó.',
  },
]

export default function CrearValorPage() {
  return (
    <>
      <ServiceHero
        tag="CREAR VALOR"
        line1="Lo que tienes vale más de lo que el modelo actual puede capturar."
        line2="Diseñamos el modelo que captura ese valor."
        subtitle="Algunas organizaciones no tienen un problema de ejecución. Tienen una oportunidad que todavía no han capturado — porque no saben exactamente cuál es, cómo estructurarla, cómo diseñarla o cómo financiarla."
      />

      <AccordionSection
        title="¿Es este tu camino?"
        items={accordionItems}
      />

      <HighlightedServices
        services={crearValorServices.filter(
          (s) => s.name === 'Opportunity Scan' || s.name === 'Fundraising Estratégico'
        )}
      />

      <ServiceGridSection
        title="Servicios para crear y capturar valor en bioeconomía."
        services={crearValorServices.filter(
          (s) => s.name !== 'Opportunity Scan' && s.name !== 'Fundraising Estratégico'
        )}
      />

      <VentureCoBuilding service={ventureCoBuilding} />

      <ProcessSection
        title="Cómo trabajamos"
        steps={processSteps}
        note="El equipo de Redesign Lab que trabaja cada proyecto es el mismo que co-funda ventures y gestiona el fondo de impacto. No hay equipo junior ejecutando lo que senior diseñó."
      />

      <CrossNavSection
        title="¿No es lo que necesitas?"
        links={[
          {
            label: 'Rediseñar el trabajo',
            href: '/redisenar-el-trabajo',
            description: 'Si tu organización ya tiene clara su oportunidad y lo que necesita es que la operación funcione mejor, el camino es Rediseñar el trabajo →',
          },
          {
            label: 'Transformar el modelo',
            href: '/transformar-el-modelo',
            description: 'Si lo que necesitas es repensar la arquitectura completa de tu modelo de negocio, el camino es Transformar el modelo →',
          },
        ]}
      />
    </>
  )
}
