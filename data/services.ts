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
      `Tu organización ve varias oportunidades posibles y no puede equivocarse al elegir. Cada mes invertido en la oportunidad equivocada es un año de desventaja competitiva, y los costos de revertir la decisión crecen con cada recurso ya comprometido.

El Opportunity Scan cruza el estado del mercado global, los activos reales de tu empresa y las brechas de oferta para identificar la oportunidad con mejor retorno y menor riesgo. Entregamos una recomendación concreta sobre dónde poner los recursos en los próximos doce meses.`,
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
      `Lanzar un producto sin haberlo diseñado con rigor es uno de los errores más caros que una empresa puede cometer. La distancia entre una buena idea y un producto que el mercado está dispuesto a comprar (al precio y formato correctos) es mucho mayor de lo que parece antes de hacer el trabajo.

El Innovation Blueprint cubre esa distancia antes de comprometer recursos en producción: investigación de mercado, MVP validado, proyección financiera y go-to-market con canales y narrativa. Entregamos el blueprint completo; tu organización lo produce y lo lanza.`,
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
      `Diseñar un nuevo negocio en bioeconomía sin un modelo robusto no es emprender. Es apostar. Las variables son demasiadas (cadena, certificaciones, comunidades, mercado) y el costo de equivocarse es demasiado alto para resolverse en la marcha.

El Bioventure Blueprint convierte una oportunidad identificada en un modelo verificable: cadena de valor definida, estructura de costos real, estrategia de certificación, distribución de valor con comunidades y proyecciones con supuestos explícitos. Todo lo que necesitas para ejecutar o levantar capital con confianza.`,
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
      `Tu corporación tiene activos que el modelo principal no está diseñado para valorizar: conocimiento territorial, relaciones con comunidades productoras, biodiversidad, tecnologías propias. Quedan atrapados dentro sin capturar el valor que podrían generar afuera como una empresa independiente.

El Corporate Spin-off Design convierte esos activos en una empresa con modelo propio, arquitectura legal, gobernanza y caso de negocio listo para capital externo. La vía para liberar valor sin desenfocar el negocio central.`,
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
      `Tienes un negocio con mérito real pero no sabes cómo estructurar la conversación con fondos de impacto, capital verde o banca multilateral. Hablar el idioma correcto y llegar al fondo correcto es la diferencia entre levantar capital o no, y muchas veces entre escalar o cerrar.

El Fundraising Estratégico diseña la narrativa de inversión, mapea los fondos activos correctos para tu caso y gestiona las postulaciones durante 3 meses, con fee de éxito solo si hay resultado. Track record: USD 1.5M levantados para el portafolio; USD 80M acompañados en gran industria.`,
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
      `El impacto que no se puede demostrar no existe para el mercado. Si un LP exigente, un comprador con auditoría ESG o una certificación internacional te pide evidencia, el storytelling no alcanza, y perder esos procesos bloquea el acceso a capital y a mercados premium.

El Impact Value Report convierte tu historia de impacto en un documento que resiste ese escrutinio: alineado con estándares globales (IRIS+, GRI, TNFD) y construido sobre evidencia verificable. La puerta de entrada a los mercados y al capital que exigen pruebas, no declaraciones.`,
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
  duration: 'Conversación directa',
  price: '',
  description:
    `Tienes un activo extraordinario, convicción de fundador y un mercado que existe, pero la distancia entre la idea y la empresa requiere mucho más que entregables. Necesitas alguien construyendo contigo, no asesorándote desde afuera.

Venture Co-Building entra como co-fundador operativo: diseño del modelo, validación en campo, desarrollo de MVP, primeros clientes y acompañamiento de fundraising. No es consultoría. Es construcción conjunta con piel en el juego desde el primer día.`,
  includes: [
    'Co-diseño del modelo de negocio',
    'Validación de mercado en campo',
    'Desarrollo de MVP y primeros clientes',
    'Operación del primer año',
    'Estrategia de fundraising y acompañamiento al cierre',
    'Acceso a la red de Redesign Lab',
    'Reportería mensual de progreso',
  ],
}

export const redisenarTrabajoServices: Service[] = [
  {
    name: 'Circular Operations Redesign',
    duration: '6 a 8 semanas',
    price: '',
    description:
      `Cada residuo o subproducto que descartas es margen que estás regalando, y cada proceso lineal es un costo creciente a medida que energía, agua y materias primas se vuelven más caras. Las empresas que no rediseñan su operación hoy compiten con costos estructurales más altos mañana.

El Circular Operations Redesign identifica dónde están las oportunidades circulares concretas en tu operación y diseña el camino para capturarlas: iniciativas priorizadas por ROI, arquitectura de implementación y métricas de seguimiento. Reducción de costos y apertura de mercados premium al mismo tiempo.`,
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
      `Una cadena de suministro que no se puede ver con precisión no se puede gestionar con inteligencia. Y una cadena que no se puede trazar queda fuera de los mercados premium que hoy exigen visibilidad completa como condición de compra.

Supply Chain Intelligence diseña el sistema de trazabilidad adaptado a tu operación (incluyendo entornos remotos sin conectividad) con captura de datos, dashboard de gestión y protocolo de alertas. De caja negra a cadena auditable en semanas.`,
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
      `La mayoría de las implementaciones de IA en bioeconomía fallan por la misma razón: se despliegan herramientas genéricas sobre procesos que no fueron diseñados para recibirlas. El resultado es gasto sin retorno, frustración organizacional y escepticismo que bloquea futuras iniciativas.

Re.·IA Application diagnostica la madurez de tu organización, prioriza las aplicaciones con mayor impacto real y las implementa end-to-end: diseño, despliegue, capacitación y protocolo de mejora continua. IA que produce resultados verificables, no teatro tecnológico.`,
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
    `Quieres trabajar con Redesign Lab pero aún no tienes claridad sobre qué proyecto comprometerte, y nosotros necesitamos entender tu contexto en profundidad antes de recomendar algo que efectivamente se pueda ejecutar.

El Re. Sprint es el punto de entrada para resolver ambas cosas: diagnóstico operativo completo, identificación de quick wins, plan de acción de 90 días y presentación ejecutiva de hallazgos. En 3 semanas tienes claridad sobre qué hacer primero; nosotros tenemos la base para una relación de fondo.`,
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
      `Tu modelo operativo fue diseñado para una etapa anterior, o nunca fue diseñado deliberadamente. Cuando eso pasa, la estructura se convierte en el principal freno del crecimiento: las decisiones se demoran, la información se pierde y cada nuevo proyecto tropieza con la organización misma.

Operating Model Design rediseña estructura, flujos de información, sistemas de gestión y gobernanza para la etapa que viene, con plan de transición e hitos verificables. El rediseño que permite ejecutar lo que la estrategia ya definió.`,
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
      `La mayoría de las hojas de ruta de IA las diseña alguien que conoce la tecnología pero no la operación, o al revés. El resultado es un plan que no se puede ejecutar, o que no captura el valor real posible, y la organización termina con una hoja de ruta bonita que nadie sigue.

AI Transformation Roadmap combina ambos lados: diagnóstico de madurez, oportunidades por función y proceso, hoja de ruta con tres horizontes, arquitectura tecnológica y plan de gestión del cambio. Un plan que el directorio puede aprobar y la operación puede ejecutar.`,
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
      `La brecha más crítica en la adopción de IA no está en la tecnología. Está en el equipo directivo. Líderes que no entienden qué puede y qué no puede hacer la IA terminan delegando decisiones estratégicas al área técnica, y las iniciativas se dispersan sin criterio unificado.

AI Leadership Sprint forma al directorio con un framework de toma de decisiones sobre IA, evalúa las iniciativas en curso y diseña el modelo de gobernanza de IA de la organización. Criterio ejecutivo, no cursos genéricos.`,
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
      `Escalar una empresa de bioeconomía no es lo mismo que escalar una de tecnología. Los activos naturales tienen sus tiempos, las comunidades productoras tienen sus lógicas de gobernanza y las certificaciones tienen sus procesos. Aplicar recetas de otros sectores rompe lo que hace funcionar al negocio.

Scale Strategy diagnostica los factores no replicables de tu éxito actual y diseña un modelo de escala que los preserva: estrategia de entrada a nuevas geografías, arquitectura de gobernanza para escala y plan de inversión. Crecimiento sin romper el activo que te trajo hasta aquí.`,
    includes: [
      'Diagnóstico de los factores de éxito no replicables',
      'Diseño del modelo de escala',
      'Estrategia de entrada a nuevas geografías o mercados',
      'Arquitectura de gobernanza para la escala',
      'Plan de inversión y financiamiento del crecimiento',
    ],
  },
]
