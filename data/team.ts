export interface TeamMember {
  name: string
  role: string
  bio: string
  quote?: string
  photo?: string
  linkedin?: string
}

export const team: TeamMember[] = [
  {
    name: 'Eddie Ajalcriña',
    role: 'CEO & Co-Founder',
    bio: `Eddie lleva más de quince años haciendo una sola cosa: convencer al mercado de que la sostenibilidad y la rentabilidad son la misma apuesta, y luego demostrarlo.

No desde afuera. Ha liderado como ejecutivo en el mundo corporativo, co-fundado varias empresas, y brindado claridad como director independiente en varias empresas, tomando decisiones que tienen consecuencias directas sobre su propio capital y sobre las comunidades que las hacen posibles.

Lo que hace a su perfil inusual no es solo la estrategia. Es la capacidad de ejecutarla en los dos extremos al mismo tiempo: en una asamblea comunal en la Amazonía y en reuniones de negocios en New York, Berlín o Copenhagen. Ha sido el responsable de conectar las empresas del portafolio con algunas de las marcas más exigentes del mundo: Patagonia, Hugo Boss, Lacoste, Lululemon, además de ser speaker invitado en el evento más importante del mundo sobre Next-Gen Materials de Londres. Ese trabajo de articulación comercial en primera persona es lo que convierte los modelos de negocio en contratos reales.

Su trayectoria institucional refleja el mismo principio: Experto en Negocios Sostenibles para la Delegación de la Unión Europea en Perú, mentor en MIT y Universidad de Chicago, consultor para ONUDI y líder de los Programas Climathon CATAL1.5T financiados por GIZ.`,
    quote: 'Hacemos que invertir en negocios sostenibles sea un buen negocio.',
    photo: '/assets/eddie.jpg',
    linkedin: 'https://www.linkedin.com/in/eddieajalcrina',
  },
  {
    name: 'Lorenzo Ortiz',
    role: 'CIO & Co-Founder',
    bio: `Lorenzo llegó al ecosistema de impacto desde donde menos se espera: las operaciones del Grupo Breca y del Grupo Gloria, las dos corporaciones de mayor escala del Perú. Doce años gestionando proyectos de inversión e innovación en entornos donde el margen de error es mínimo y la exigencia operativa es máxima.

Eso no es un detalle menor. Es la razón por la que Redesign Lab puede hacer lo que hace a la escala que lo hace. La diferencia entre una buena idea y una empresa que funciona es siempre operativa, y Lorenzo sabe exactamente dónde está esa diferencia.

Ingeniero Industrial con postgrados en Finanzas y Business Analytics en Universidad del Pacífico, INCAE Business School y MIT. LATAM Fellow de Singularity University con mención en Tecnología. Ha sido miembro independiente de directorios de varias empresas.`,
    quote: 'El mayor impacto se genera a través de modelos de negocio rentables y sostenibles a largo plazo.',
    photo: '/assets/lorenzo.jpg',
    linkedin: 'https://www.linkedin.com/in/lorenzoortiz/',
  },
]
