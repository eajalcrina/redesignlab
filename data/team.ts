export interface TeamMember {
  name: string
  role: string
  bio: string
  quote?: string
}

export const team: TeamMember[] = [
  {
    name: 'Eddie Ajalcriña',
    role: 'CEO & Co-Founder',
    bio: 'Más de 15 años en economía circular, agricultura regenerativa y modelos de negocios innovadores en América Latina. Co-fundador de Redesign Lab, Cotton Nation y Neofibers. Miembro del Directorio del Grupo Cotton Nation. Ha actuado como Experto en Negocios Sostenibles para la Delegación de la Unión Europea en Perú, Country Lead en CleantechHub, mentor de negocios sostenibles en el MIT y la Universidad de Chicago, consultor en producción circular para ONUDI, socio LATAM de Climate KIC, y líder nacional de los Programas Climathon CATAL1.5T financiados por GIZ.',
    quote: 'Hacemos que invertir en negocios sostenibles sea un buen negocio.',
  },
  {
    name: 'Lorenzo Ortiz',
    role: 'CIO & Co-Founder',
    bio: 'Ingeniero Industrial con postgrados en Finanzas y Business Analytics en Universidad del Pacífico, INCAE Business School y MIT. LATAM Fellow de Singularity University con mención en Tecnología. Miembro del Directorio del Grupo Cotton Nation. Más de 12 años de experiencia en gerencia de operaciones, desarrollo de proyectos de inversión e innovación en empresas del Grupo Breca y Gloria — las corporaciones de mayor escala en el Perú.',
    quote: 'El mayor impacto se genera a través de modelos de negocio rentables y sostenibles a largo plazo.',
  },
]
