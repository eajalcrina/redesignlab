export interface ConsultoriaCategoryContent {
  slug: 'pon-orden' | 'consigue-capital' | 'vende-mas'
  navLabel: string
  category: 'Pon Orden' | 'Consigue Capital' | 'Vende más'
  metaTitle: string
  metaDescription: string
  kicker: string
  h1: string
  tagline: string
  familiarHeading: string
  familiarBullets: string[]
  familiarClosing: string
  processIntro?: string
  steps: { label: 'Diagnóstico' | 'Sprint' | 'Rediseño y consolidación'; body: string }[]
  credentialsLine?: string
  extraSection?: { heading: string; body: string }
  iaBlurb: string
  ctaLabel: string
  messagePlaceholder: string
}

export const CONSULTORIA_CATEGORIES: Record<'pon-orden' | 'consigue-capital' | 'vende-mas', ConsultoriaCategoryContent> = {
  'pon-orden': {
    slug: 'pon-orden',
    navLabel: 'Pon Orden',
    category: 'Pon Orden',
    metaTitle: 'Pon Orden | Redesign Lab',
    metaDescription:
      'Diagnóstico integral, plan de acción inmediato y rediseño de tu operación. Para empresas en crecimiento que sienten que el negocio se les desordenó.',
    kicker: 'SERVICIOS',
    h1: 'Pon Orden',
    tagline: 'Cuando la empresa está desordenada, perdiendo dinero, o el crecimiento tropieza con la propia organización.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Me cuesta pagar la planilla y siento que tengo un equipo muy grande.',
      'Facturo bien, pero casi no me queda ganancia — mis costos se comen el margen.',
      'Tengo demasiado producto en stock y no sé bien por qué.',
      'Mis costos operativos suben cada año y no encuentro dónde recortar sin frenar la operación.',
      'Mi equipo trabaja mucho, pero las cosas igual se demoran más de lo que deberían.',
      'Tengo mucha información del negocio, y nadie la procesa ni la usa para decidir.',
      'Cada vez que algo falla, termino resolviéndolo yo, aunque tenga gente a cargo de eso.',
      'No sé si estoy ganando dinero de verdad hasta que veo el estado de cuenta a fin de mes.',
    ],
    familiarClosing:
      'Ninguna de estas es un problema de esfuerzo. Es un problema de estructura — y la estructura no se arregla mirándola desde adentro.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Analizamos tu negocio completo: modelo de negocio, toma de decisiones, capital humano, finanzas, contabilidad, operaciones, comercial y legal. El síntoma casi nunca está donde parece — miramos el negocio entero para encontrar dónde está realmente el problema.',
      },
      {
        label: 'Sprint',
        body: 'Resolvemos lo urgente primero. Los quick wins no esperan al rediseño completo — mientras se diseña la solución de fondo, ya estás capturando resultado.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Rediseñamos la estructura completa: procesos, flujos de información, gobernanza y sistemas de gestión, con plan de transición y métricas de seguimiento. No es un informe que queda en un cajón. Es la arquitectura que tu equipo opera después de que nos vamos.',
      },
    ],
    iaBlurb: 'En Pon Orden: procesos optimizados para gestionar operaciones de forma más inteligente.',
    ctaLabel: 'Quiero poner orden en mi negocio →',
    messagePlaceholder: '¿Qué parte de tu operación sientes que se desordenó? Cuéntanos qué está pasando.',
  },

  'consigue-capital': {
    slug: 'consigue-capital',
    navLabel: 'Consigue Capital',
    category: 'Consigue Capital',
    metaTitle: 'Consigue Capital | Redesign Lab',
    metaDescription:
      'Diagnóstico de tu capacidad real de financiamiento, mapeo de fondos y acompañamiento hasta el resultado. Fondos no reembolsables, deuda de impacto o venta de acciones.',
    kicker: 'SERVICIOS',
    h1: 'Consigue Capital',
    tagline: 'Cuando el negocio tiene mérito real, pero no sabes cómo estructurar la conversación con quien tiene el dinero.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Sé que mi negocio tiene potencial, pero no sé cómo explicárselo a un inversionista o a un fondo.',
      'He tocado puertas de financiamiento y no consigo respuesta, o me piden cosas que no tengo listas.',
      'No sé si me conviene un fondo, un préstamo o vender parte de mi empresa.',
      'Tengo un proyecto claro, pero necesito capital para desarrollarlo y no sé por dónde empezar.',
      'Escuché de fondos de impacto o cooperación internacional, pero no sé si califico ni cómo acceder.',
      'Ya levanté capital una vez, fue lento y desordenado, y sentí que perdí meses valiosos del negocio en el proceso.',
    ],
    // PENDIENTE DE VALIDAR: redactado por Claude a partir de la lógica de la categoría (no dictado
    // línea por línea por Eddie como Pon Orden). El cliente aprobó el conjunto del documento; si se
    // quiere confirmación explícita línea por línea antes de publicar, es razonable pedirla.
    familiarClosing:
      'Tener un buen negocio no es suficiente. Hay que hablar el idioma correcto con quien tiene el dinero, y llegar a la fuente correcta para tu momento — la diferencia entre levantar capital o quedarte esperando una respuesta que nunca llega.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Evaluamos tus necesidades reales de financiamiento y tu capacidad actual de acceder a él. No todos los negocios están listos para lo mismo, ni necesitan el mismo tipo de capital.',
      },
      {
        label: 'Sprint',
        body: 'Según la fuente correcta para tu caso —fondos no reembolsables, deuda de impacto o venta de acciones— diseñamos la narrativa de inversión y mapeamos los fondos activos que de verdad calzan con tu perfil.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Convertimos tu historia en evidencia que resiste el escrutinio de un fondo exigente. Gestionamos las postulaciones y acompañamos el proceso hasta el resultado. Trabajamos con un fee de éxito solo si hay resultado, no un precio fijo que ancla expectativa sin garantizar nada.',
      },
    ],
    credentialsLine: 'Track record: USD 1.5M levantados para el portafolio; USD 80M acompañados en gran industria.',
    iaBlurb: 'En Consigue Capital: procesos optimizados para el mapeo de fondos y la evaluación de capital de impacto.',
    ctaLabel: 'Quiero explorar cómo conseguir capital →',
    messagePlaceholder: '¿Qué tipo de capital estás buscando y para qué lo necesitas? Cuéntanos tu situación.',
  },

  'vende-mas': {
    slug: 'vende-mas',
    navLabel: 'Vende más',
    category: 'Vende más',
    metaTitle: 'Vende más | Redesign Lab',
    metaDescription: 'Diagnóstico de marca, modelo de ingresos y gestión comercial. Mejora lo que ya vendes o valida un producto nuevo antes de lanzarlo.',
    kicker: 'SERVICIOS',
    h1: 'Vende más',
    tagline: 'Cuando necesitas crecer los ingresos: vender más de lo que ya tienes, o lanzar algo nuevo.',
    familiarHeading: '¿Te suena familiar?',
    familiarBullets: [
      'Mis ventas están estancadas y no tengo claro por qué, ni qué hacer para moverlas.',
      'Tengo un buen producto, pero siento que no lo estoy vendiendo como se merece.',
      'Invierto en marketing, y no veo que eso se traduzca en más ventas.',
      'Mi marca no comunica lo que realmente hacemos, y sospecho que eso nos cuesta ventas y precio.',
      'Sé que hay una oportunidad de crecer, pero no sé si está en lo que ya vendo o en algo nuevo.',
      'Tengo una idea de producto nuevo, pero no quiero invertir en producirla sin saber si el mercado la quiere.',
      'Mi equipo comercial no tiene un proceso claro — cada quien vende como puede.',
    ],
    // PENDIENTE DE VALIDAR: misma nota que en Consigue Capital — ver arriba.
    familiarClosing:
      'Crecer los ingresos casi nunca es falta de esfuerzo comercial. Es falta de enfoque: saber exactamente dónde está la oportunidad —en marca, en el modelo de ingresos o en el proceso comercial— antes de gastar tiempo y dinero persiguiéndola a ciegas.',
    steps: [
      {
        label: 'Diagnóstico',
        body: 'Analizamos tu marca, tu modelo de ingresos y tu gestión comercial actual: cómo te perciben tus clientes, dónde está el techo de lo que ya vendes, y dónde hay una oportunidad que todavía no has capturado.',
      },
      {
        label: 'Sprint',
        body: 'Implementamos mejoras concretas en marca, modelo de ingresos o estrategia comercial — la tracción rápida mientras se diseña la estrategia de fondo.',
      },
      {
        label: 'Rediseño y consolidación',
        body: 'Rediseñamos marketing, posicionamiento de marca, análisis comercial y estrategia de ingresos de forma integral, con procesos que tu equipo sostiene solo, sin depender de nosotros.',
      },
    ],
    extraSection: {
      heading: 'Creación y lanzamiento de nuevos productos',
      body: 'Lanzar sin haber validado es apostar, no emprender. Diseñamos y validamos el producto o negocio antes de comprometer un sol en producirlo: investigación de mercado, validación, proyección financiera y estrategia de lanzamiento.',
    },
    iaBlurb: 'En Vende más: aplicada a marketing, análisis comercial y estrategia de ingresos.',
    ctaLabel: 'Quiero vender más →',
    messagePlaceholder: '¿Qué quieres vender más: lo que ya tienes, o algo nuevo? Cuéntanos tu situación.',
  },
}
