export interface Service {
  name: string
  duration: string
  price: string
  description: string
  includes: string[]
  isSignature?: boolean
}

export const crearValorServices: Service[] = [
  {
    name: 'Opportunity Scan',
    duration: '2 semanas',
    price: 'USD 3,500 – 5,000',
    description:
      'El Opportunity Scan responde la pregunta más cara de equivocar: ¿cuál de todas las oportunidades que percibo es la que más vale la pena desarrollar ahora? Cruza tres dimensiones simultáneamente: el estado del mercado global en el segmento de interés, los activos y capacidades reales de la organización, y las brechas de oferta que representan una ventana de entrada con ventaja competitiva defendible. El resultado no es un reporte de tendencias — es una recomendación accionable sobre dónde poner los recursos en los próximos doce meses.',
    includes: [
      'Análisis de mercado focalizado',
      'Mapeo de activos disponibles',
      'Identificación de brechas de oferta',
      'Recomendación de oportunidad prioritaria con fundamento',
    ],
  },
  {
    name: 'Innovation Blueprint',
    duration: '5 a 7 semanas',
    price: '',
    description:
      'Lanzar un nuevo producto o servicio sin haberlo diseñado con rigor es uno de los errores más costosos que una empresa puede cometer. No porque la idea sea mala — sino porque la distancia entre una buena idea y un producto que el mercado está dispuesto a comprar, al precio correcto y en el formato correcto, es mucho mayor de lo que parece antes de hacer el trabajo. El Innovation Blueprint cubre esa distancia antes de que la organización comprometa recursos en producción o implementación. Redesign Lab entrega el diseño completo. La organización es quien lo produce y lo lanza.',
    includes: [
      'Investigación de mercado y perfil de comprador',
      'Conceptualización del producto o servicio',
      'Diseño y validación de MVP',
      'Proyección financiera',
      'Estrategia de go-to-market con canales y narrativa de posicionamiento',
    ],
  },
  {
    name: 'Bioventure Blueprint',
    duration: '4 a 6 semanas',
    price: '',
    description:
      'Diseñar un nuevo negocio en bioeconomía sin un modelo robusto no es emprender — es apostar. El Bioventure Blueprint convierte una oportunidad identificada en un modelo de negocio verificable: cadena de valor definida, estructura de costos real, estrategia de certificación, modelo de distribución de valor con comunidades o productores y proyecciones financieras con supuestos explícitos.',
    includes: [
      'Diseño de modelo de negocio',
      'Cadena de valor completa',
      'Estructura financiera con supuestos documentados',
      'Estrategia de certificación y go-to-market',
      'Modelo de distribución de valor',
    ],
  },
  {
    name: 'Corporate Spin-off Design',
    duration: '4 a 6 semanas',
    price: '',
    description:
      'Muchas corporaciones tienen activos estratégicos que su modelo principal no está diseñado para valorizar: conocimiento territorial acumulado, relaciones con comunidades productoras, acceso a biodiversidad, tecnologías propias o cadenas de suministro que podrían ser la base de una empresa independiente con mercado propio. El Corporate Spin-off Design convierte esos activos en una empresa.',
    includes: [
      'Diagnóstico de activos con potencial de spin-off',
      'Diseño de modelo de negocio independiente',
      'Arquitectura legal y de gobernanza',
      'Caso de negocio para inversión externa',
      'Estrategia de go-to-market',
    ],
  },
  {
    name: 'Fundraising Estratégico',
    duration: '4 semanas + 3 meses',
    price: 'USD 2,500 + fee de éxito 5-10%',
    description:
      'Capital de impacto con estrategia real — y fee solo si hay resultado. Track record: USD 1.5 millones levantados para nuevos negocios y proyectos del portafolio. USD 80 millones acompañados en procesos de levantamiento para gran industria.',
    includes: [
      'Diagnóstico de madurez de inversión (BIRF)',
      'Mapeo actualizado de fondos activos',
      'Diseño de la narrativa de inversión',
      'Perfil de postulación completo para el fondo prioritario',
      'Gestión activa de postulaciones por 3 meses',
    ],
  },
  {
    name: 'Impact Value Report',
    duration: '2 a 3 semanas',
    price: '',
    description:
      'El impacto que no se puede demostrar no existe para el mercado. El Impact Value Report convierte la historia de impacto de una organización en un documento que resiste el escrutinio de un LP exigente, de un comprador que audita su cadena de suministro o de un organismo de certificación internacional.',
    includes: [
      'Diagnóstico del sistema de medición de impacto existente',
      'Alineación con estándares internacionales (IRIS+, GRI, TNFD)',
      'Construcción de narrativa de impacto con evidencia',
      'Recomendaciones de fortalecimiento del sistema de medición',
    ],
  },
]

export const ventureCoBuilding: Service = {
  name: 'Venture Co-Building',
  duration: 'Equity + participación',
  price: 'Conversación directa',
  description:
    'La Línea Signature de Redesign Lab no se vende. Se conversa. Cuando el activo es extraordinario, el fundador tiene la convicción y el mercado ya existe — pero la distancia entre la idea y la empresa requiere más que un entregable — Redesign Lab puede entrar como co-fundador operativo con participación real. Esto no es consultoría. Es construcción conjunta con piel en el juego desde el primer día.',
  includes: [
    'Co-diseño del modelo de negocio',
    'Validación de mercado en campo',
    'Desarrollo de MVP y primeros clientes',
    'Operación del primer año',
    'Estrategia de fundraising y cap table',
    'Acceso a la red de Redesign Lab',
    'Reportería mensual de progreso',
  ],
  isSignature: true,
}

export const redisenarTrabajoServices: Service[] = [
  {
    name: 'Circular Operations Redesign',
    duration: '6 a 8 semanas',
    price: '',
    description:
      'La economía circular no es un principio de sostenibilidad — es un modelo de reducción de costos, apertura de mercados y generación de valor a partir de recursos que hoy se están descartando. El Circular Operations Redesign identifica dónde están esas oportunidades en la operación existente y diseña el camino para capturarlas.',
    includes: [
      'Mapeo de flujos de materiales y energía',
      'Identificación de oportunidades circulares',
      'Diseño de iniciativas priorizadas',
      'Arquitectura de implementación',
      'Métricas de seguimiento',
    ],
  },
  {
    name: 'Supply Chain Intelligence',
    duration: '4 a 6 semanas',
    price: '',
    description:
      'Una cadena de suministro que no se puede ver con precisión no se puede gestionar con inteligencia. Y una cadena que no se puede trazar no puede acceder a los mercados premium que hoy exigen visibilidad completa como condición de elegibilidad.',
    includes: [
      'Diagnóstico de la cadena actual',
      'Diseño del sistema de trazabilidad',
      'Implementación de herramientas de captura de datos',
      'Dashboard de gestión',
      'Protocolo de alertas y reportes',
    ],
  },
  {
    name: 'Re.·IA Application',
    duration: '6 a 10 semanas',
    price: '',
    description:
      'La promesa de la IA para las industrias de bioeconomía es real. Pero la mayoría de las implementaciones fallan por la misma razón: se despliegan herramientas genéricas sobre procesos que no fueron diseñados para recibirlas.',
    includes: [
      'Diagnóstico de madurez Re.·IA',
      'Identificación de aplicaciones prioritarias',
      'Diseño e implementación de la solución',
      'Capacitación del equipo',
      'Protocolo de operación y mejora continua',
    ],
  },
]

export const reSprint: Service = {
  name: 'Re. Sprint',
  duration: '3 semanas',
  price: 'USD 4,000 · precio fijo',
  description:
    'El Re. Sprint es el punto de entrada para organizaciones que quieren trabajar con Redesign Lab antes de comprometerse a un proyecto mayor — y para que Redesign Lab entienda en profundidad el contexto antes de recomendar algo que no se pueda ejecutar.',
  includes: [
    'Diagnóstico operativo completo',
    'Identificación de quick wins',
    'Plan de acción de 90 días',
    'Presentación ejecutiva de hallazgos',
  ],
}

export const transformarModeloServices: Service[] = [
  {
    name: 'Operating Model Design',
    duration: '8 a 12 semanas',
    price: '',
    description:
      'El modelo operativo de una organización es la forma en que todo funciona junto: estructura de decisión, flujos de información, distribución de responsabilidades, sistemas de gestión y mecanismos de aprendizaje. Cuando ese modelo fue diseñado para una etapa anterior — o cuando nunca fue diseñado deliberadamente — se convierte en el principal freno del crecimiento.',
    includes: [
      'Diagnóstico del modelo operativo actual',
      'Diseño del modelo objetivo',
      'Arquitectura de transición',
      'Diseño de sistemas de gestión y toma de decisiones',
      'Plan de implementación con hitos verificables',
    ],
  },
  {
    name: 'AI Transformation Roadmap',
    duration: '4 a 6 semanas',
    price: '',
    description:
      'La mayoría de las hojas de ruta de adopción de IA tienen el mismo problema: fueron diseñadas por personas que conocen la tecnología pero no conocen la operación, o por personas que conocen la operación pero no saben lo que la IA puede hacer realmente.',
    includes: [
      'Diagnóstico de madurez Re.·IA',
      'Identificación de oportunidades por función y proceso',
      'Diseño de la hoja de ruta con tres horizontes',
      'Arquitectura tecnológica recomendada',
      'Plan de gestión del cambio y capacitación',
    ],
  },
  {
    name: 'AI Leadership Sprint',
    duration: '2 a 3 semanas',
    price: '',
    description:
      'La brecha más crítica en la adopción de IA en las industrias de bioeconomía no está en la tecnología — está en los equipos directivos. Los líderes que no entienden qué puede y qué no puede hacer la IA delegan decisiones que deberían tomar ellos.',
    includes: [
      'Programa de sesiones con el equipo directivo',
      'Framework de toma de decisiones sobre IA',
      'Evaluación de las decisiones de IA en curso',
      'Diseño del modelo de gobernanza de IA de la organización',
    ],
  },
  {
    name: 'Scale Strategy',
    duration: '4 a 6 semanas',
    price: '',
    description:
      'Escalar una empresa de bioeconomía no es lo mismo que escalar una empresa de tecnología. Los activos naturales tienen sus propios tiempos. Las comunidades productoras tienen sus propias lógicas de gobernanza. Las certificaciones internacionales tienen sus propios procesos.',
    includes: [
      'Diagnóstico de los factores de éxito no replicables',
      'Diseño del modelo de escala',
      'Estrategia de entrada a nuevas geografías o mercados',
      'Arquitectura de gobernanza para la escala',
      'Plan de inversión y financiamiento del crecimiento',
    ],
  },
]
