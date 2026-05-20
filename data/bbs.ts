// ============================================================
// Bio Business School — Program Data Model & Content
// ============================================================

export type ProgramType = 'curso' | 'diplomado'

export interface CurriculumMonth {
  month: string
  subtitle?: string
  modules: { code: string; title: string; body: string }[]
}

export interface BBSProgram {
  slug: string
  type: ProgramType
  code: string
  title: string
  tagline: string
  summary: string
  audience: string
  duration: string
  modality: string
  deliverable: string
  price: { usd: string; pen: string }
  startDate: string
  collaborator?: string
  enrollUrl?: string

  hero: { lines: string[]; paragraph: string }
  problem?: { heading: string; body: string[] }
  forWhom?: { title: string; body: string }[]
  notFor?: string
  outcomes?: { lead: string; body: string }[]
  includes?: string[]
  framework?: { heading: string; body: string[] }[]
  curriculum?: CurriculumMonth[]
  perks: { all: string[]; topHeading: string; top: string[] }
  faculty: { name: string; role: string }[]
  faq: { q: string; a: string }[]
}

// ============================================================
// CURSO EJECUTIVO 01 — IA para Nuevos Profesionales
// ============================================================
const iaNuevosProfesionales: BBSProgram = {
  slug: 'ia-nuevos-profesionales',
  type: 'curso',
  code: 'CURSO EJECUTIVO 01',
  title: 'IA para Nuevos Profesionales',
  tagline: 'Rediseña tu camino en el mundo corporativo',
  summary:
    'Aprende las herramientas de IA más demandadas — y el mindset para liderar la transformación corporativa, no solo ejecutarla.',
  audience:
    'Profesionales en entornos corporativos que buscan liderar la transformación con IA',
  duration: '4 semanas · 4 sesiones en vivo de 2h',
  modality: 'En vivo · Google Meet + Drive',
  deliverable: 'Propuesta de Transformación Corporativa con IA',
  price: { usd: '$70 USD', pen: 'S/. 250' },
  startDate: '22 Junio 2026',

  hero: {
    lines: [
      'Sí, te enseñamos las herramientas.',
      'Y también lo que la mayoría ignora.',
    ],
    paragraph:
      'Las herramientas de IA las puede aprender cualquiera. Lo que separa a quien las usa de quien lidera con ellas es el mindset. Este programa te da los dos — y te prepara para liderar la transformación corporativa hacia IA en América Latina.',
  },

  problem: {
    heading: 'EL PUNTO DE PARTIDA',
    body: [
      'Hay algo que la mayoría de los programas de IA no te dicen:',
      'Las herramientas son el mínimo. Son necesarias — y en este programa las dominarás. Pero no son suficientes.',
      'La IA amplifica lo que le das. Darle una directiva mal formulada, un contexto pobremente definido o un problema mal diagnosticado no produce un resultado mediocre — produce un error a mayor velocidad y a mayor escala.',
      'El profesional que lidera la transformación corporativa no es el que usa más herramientas. Es el que desarrolló el mindset para usarlas con criterio estratégico, pensamiento crítico y visión sistémica.',
      'Eso es lo que construimos en este programa.',
    ],
  },

  forWhom: [
    {
      title: 'Para el profesional senior que quiere seguir siendo high potential',
      body: 'Tienes años de experiencia, criterio construido y una red real. Sabes que la IA está cambiando las reglas — y quieres estar del lado que lidera ese cambio, no del que lo ejecuta. Este programa te da las herramientas y el framework estratégico para hacerlo con la solidez que ya tienes como base.',
    },
    {
      title: 'Para el joven profesional que quiere avanzar rápido',
      body: 'Eres cómodo con la tecnología y quieres adoptar IA con criterio — no solo aprender a usarla. Quieres construir desde ya la reputación de ser quien lidera la transformación en su empresa. Este programa te da las herramientas más relevantes del mercado y los frameworks de pensamiento que las hacen realmente poderosas.',
    },
  ],

  outcomes: [
    {
      lead: 'Dominado las herramientas de IA que usan los profesionales más demandados del mundo corporativo.',
      body: 'Claude, Perplexity y las herramientas de automatización más relevantes para entornos corporativos — aplicadas a casos reales de tu industria, no a ejercicios genéricos.',
    },
    {
      lead: 'Desarrollado el mindset para liderar — no solo ejecutar — la transición hacia IA en tu empresa.',
      body: 'Pensamiento crítico para cuestionar supuestos antes de delegar en la herramienta. Visión sistémica para anticipar consecuencias no intencionales. Criterio estratégico para saber cuándo la IA amplifica y cuándo distorsiona.',
    },
    {
      lead: 'Redefinido tu visión profesional con IA como palanca de liderazgo.',
      body: 'Sabrás exactamente en qué lugar de la transformación corporativa quieres estar — y tendrás los argumentos concretos para ocupar ese lugar.',
    },
    {
      lead: 'Construido y sustentado una propuesta real de transformación corporativa.',
      body: 'Con diagnóstico sistémico, benchmarking global, indicadores, resultados y presupuesto — para un problema real de tu industria. Sustentada ante un comité evaluador. Lista para presentar ante la gerencia de tu empresa.',
    },
    {
      lead: 'Ingresado a la Base de Datos de Talento BBS.',
      body: 'Un directorio curado de profesionales evaluados por Redesign Lab, presentado activamente a las empresas más importantes de América Latina que buscan perfiles capaces de liderar la transición hacia IA.',
    },
    {
      lead: 'Formado parte de una comunidad que se mueve.',
      body: 'Profesionales de distintas industrias con el mismo estándar de criterio, que se abren puertas mutuamente y siguen creciendo juntos después del programa. Una comunidad activa de por vida — no una red de egresados pasiva.',
    },
  ],

  includes: [
    '4 sesiones en vivo de 2 horas cada una — en Google Meet con Eddie Ajalcriña y Lorenzo Ortiz',
    'Material de trabajo asincrónico curado por sesión — lecturas, casos y plantillas en Google Drive',
    'Trabajo integrador real — una propuesta de transformación corporativa con IA que construyes semana a semana y sustentas al final ante un comité evaluador',
    'Sustentación ante Comité BBS — con feedback estratégico real de Eddie, Lorenzo y un especialista invitado del mundo corporativo',
    'Inclusión en la Base de Datos de Talento BBS — al completar el programa',
    'Comunidad BBS de por vida — profesionales que lideran la transformación corporativa con IA en América Latina',
  ],

  perks: {
    all: [
      'Inclusión en la Base de Datos de Talento BBS, presentada activamente por Redesign Lab a empresas de América Latina con necesidades reales de este perfil.',
      'Acceso de por vida a la comunidad BBS.',
    ],
    topHeading:
      'Para los 2 mejores — cuya propuesta sea aprobada por el comité de gerencia de su empresa:',
    top: [
      '1 mes de cuenta PRO en Claude',
      '1 sesión de asesoría estratégica con Eddie Ajalcriña y/o Lorenzo Ortiz',
      'Entrevista de trabajo simulada individual en vivo con feedback detallado',
      'Perfil destacado en la Base de Datos de Talento con recomendación escrita de Redesign Lab',
      'Caso de referencia presentado en el ecosistema BBS y redes de Redesign Lab',
    ],
  },

  faculty: [
    {
      name: 'Eddie Ajalcriña',
      role: 'CEO & Co-founder de Bio Business School y Redesign Lab. Estratega de negocios con experiencia en transformación corporativa, diseño de modelos de negocio y liderazgo de equipos en contextos de alta complejidad en América Latina.',
    },
    {
      name: 'Lorenzo Ortiz',
      role: 'CIO & Co-founder de Bio Business School y Redesign Lab. Especialista en arquitectura de sistemas de trabajo con IA, pensamiento crítico aplicado a entornos corporativos y diseño de modelos de ejecución aumentada.',
    },
    {
      name: '+ Especialista invitado',
      role: 'Un CHRO, Head of Talent o CEO de empresa latinoamericana que está buscando activamente este perfil — presente en la sesión final como evaluador y como puerta al mercado real.',
    },
  ],

  faq: [
    {
      q: '¿Necesito experiencia previa en IA?',
      a: 'No. Necesitas experiencia profesional real y disposición para pensar con rigor. Las herramientas las aprendes en el programa — el criterio para usarlas bien es lo que construimos juntos.',
    },
    {
      q: '¿En qué plataforma se dicta el programa?',
      a: 'Todas las sesiones son en Google Meet. Los materiales están en Google Drive. No necesitas instalar nada adicional.',
    },
    {
      q: '¿Qué pasa si no puedo asistir a alguna sesión?',
      a: 'Recomendamos asistir a todas las sesiones en vivo — el programa está diseñado para que la sesión sea el momento de mayor valor. Si tienes una circunstancia puntual, conversa con el equipo.',
    },
    {
      q: '¿Cómo funciona la Base de Datos de Talento?',
      a: 'Al completar el programa y superar la sustentación ante el Comité BBS, tu perfil es incorporado al directorio. Redesign Lab lo presenta activamente a empresas con necesidades específicas — no esperamos a que las empresas busquen, nosotros presentamos.',
    },
    {
      q: '¿El programa tiene certificado?',
      a: 'Sí. Los participantes que completan el programa reciben un certificado de Bio Business School respaldado por Redesign Lab.',
    },
  ],
}

// ============================================================
// CURSO EJECUTIVO 02 — IA para Pymes y Emprendimientos
// ============================================================
const iaPymesEmprendimientos: BBSProgram = {
  slug: 'ia-pymes-emprendimientos',
  type: 'curso',
  code: 'CURSO EJECUTIVO 02',
  title: 'IA para Pymes y Emprendimientos',
  tagline: 'Acelera tu posicionamiento en el mercado',
  summary:
    'Las herramientas de IA para empresas reales — y el plan estratégico para que funcionen en tus productos, procesos y equipo.',
  audience: 'Dueños y gerentes de Pymes y emprendimientos con tracción establecida',
  duration: '4 semanas · 4 sesiones en vivo de 2h',
  modality: 'En vivo · Google Meet + Drive',
  deliverable: 'Plan de Adopción de IA en la empresa',
  price: { usd: '$150 USD', pen: 'S/. 540' },
  startDate: '22 Junio 2026',

  hero: {
    lines: [
      'Sí, te enseñamos las herramientas de IA.',
      'Y también lo que tu empresa necesita',
      'para que realmente funcionen.',
    ],
    paragraph:
      'Adoptar IA sin estrategia no hace crecer a tu empresa — la distrae. Este programa te da las herramientas más relevantes del mercado y el plan concreto para implementarlas en tu negocio: en tus productos, tus procesos y tu equipo.',
  },

  problem: {
    heading: 'EL PROBLEMA REAL',
    body: [
      'Hay un patrón que se repite en las Pymes y emprendimientos de América Latina que intentan adoptar IA:',
      'Compran las herramientas. Las usan un par de semanas. El equipo las abandona. La inversión no retorna. Y la conclusión — equivocada — es que "la IA no es para nosotros".',
      'El problema nunca fue la herramienta. Fue la ausencia de una estrategia de adopción.',
      'La IA amplifica lo que le das. Si le das procesos desordenados, los desordena más rápido. Si le das un equipo sin criterio para usarla, produce resultados sin criterio a mayor escala. Pero si le das una empresa con un plan claro de dónde, cómo y para qué adoptarla — los resultados son exponenciales.',
      'Eso es lo que construimos en este programa.',
    ],
  },

  forWhom: [
    {
      title: 'El dueño de Mype que compite contra empresas más grandes',
      body: 'Tienes entre 5 y 50 personas, años en el mercado y sabes que tus competidores más grandes están adoptando tecnología. La IA puede nivelar el campo de juego — si sabes cómo usarla con estrategia.',
    },
    {
      title: 'El gerente con procesos que consumen más tiempo del necesario',
      body: 'Cada semana pierdes horas en tareas que podrían resolverse en minutos. El problema no es la falta de herramientas — es la falta de un sistema para integrarlas bien.',
    },
    {
      title: 'El fundador con tracción que quiere escalar sin crecer en headcount',
      body: 'Lograste la tracción. Ahora necesitas sistemas más robustos para lo que viene. La IA bien adoptada te permite operar como una empresa más grande sin serlo.',
    },
    {
      title: 'El empresario que quiere preparar su negocio para crecer con capital externo',
      body: 'Necesitas demostrar que tu empresa tiene sistemas, no solo resultados. La adopción estratégica de IA es hoy una señal de escalabilidad que los inversores leen con claridad.',
    },
  ],

  notFor:
    'Este programa no es para: Fundadores en etapa cero que aún están validando su idea. Para eso tenemos otro camino.',

  outcomes: [
    {
      lead: 'Dominado las herramientas de IA más relevantes para empresas reales.',
      body: 'Claude, Perplexity y las herramientas de automatización más utilizadas en Pymes y emprendimientos — aplicadas directamente a los procesos y desafíos de tu negocio, no a casos genéricos.',
    },
    {
      lead: 'Desarrollado el criterio estratégico para adoptar IA con retorno real.',
      body: 'No todas las herramientas sirven para todo. Habrás aprendido a identificar dónde la IA tiene mayor impacto en tu empresa específica — y dónde no vale la pena invertir todavía.',
    },
    {
      lead: 'Construido el Plan de Adopción de IA de tu empresa.',
      body: 'Un plan concreto y ejecutable que cubre tres dimensiones: qué cambia en tus productos o servicios, qué procesos se automatizan o mejoran y cómo llevas a tu equipo a adoptar IA sin resistencia. Listo para implementar desde la semana siguiente.',
    },
    {
      lead: 'Posicionado tu empresa para competir en el mercado que viene.',
      body: 'Habrás diseñado cómo comunicar la evolución de tu empresa a clientes, talento y potenciales inversores — porque la adopción de IA no es solo un cambio interno, es un argumento de mercado.',
    },
    {
      lead: 'Dado el primer paso hacia Re. Intelligence.',
      body: 'Si tu empresa está creciendo y necesita inteligencia estratégica continua — no solo herramientas — conocerás Re. Intelligence, el servicio de Redesign Lab que lleva la toma de decisiones de tu empresa al siguiente nivel.',
    },
  ],

  includes: [
    '4 sesiones en vivo de 2 horas cada una — en Google Meet con Eddie Ajalcriña y Lorenzo Ortiz',
    'Material de trabajo asincrónico curado por sesión — lecturas, casos reales de Pymes latinoamericanas y plantillas en Google Drive',
    'Trabajo integrador real — el Plan de Adopción de IA de tu empresa, construido semana a semana y presentado ante un comité evaluador al final del programa',
    'Sustentación ante Comité BBS — con feedback estratégico real de Eddie, Lorenzo y un especialista invitado con experiencia en transformación de Pymes',
    'Certificado de Bio Business School respaldado por Redesign Lab',
    'Comunidad BBS de por vida — empresarios y fundadores que están construyendo empresas más inteligentes en América Latina',
  ],

  framework: [
    {
      heading: 'RE. INTELLIGENCE — EL SIGUIENTE NIVEL',
      body: [
        'Implementar IA en tu empresa es el primer paso. Sostenerla con inteligencia estratégica continua es lo que la hace crecer.',
        'Re. Intelligence es el servicio de Redesign Lab para empresas en crecimiento que necesitan tomar decisiones con datos, no con intuición: monitoreo de mercado, análisis competitivo continuo, inteligencia de cliente y reportes estratégicos construidos con IA y criterio humano.',
        'Los participantes del programa acceden a un 15% de descuento en la contratación de Re. Intelligence.',
      ],
    },
  ],

  perks: {
    all: [
      'Acceso de por vida a la comunidad BBS — empresarios y fundadores que comparten el mismo estándar de criterio, se apoyan mutuamente y construyen juntos empresas más competitivas en América Latina.',
      'Descuento del 15% en Re. Intelligence de Redesign Lab.',
    ],
    topHeading: 'Para los 2 mejores Planes de Adopción de IA del cohorte:',
    top: [
      '3 meses de cuenta PRO en Claude — para seguir implementando y escalando el plan aprobado con la herramienta central del programa',
      'Caso de referencia presentado en el ecosistema BBS y redes de Redesign Lab, con visibilidad ante empresas, inversores y aliados estratégicos de la plataforma',
    ],
  },

  faculty: [
    {
      name: 'Eddie Ajalcriña',
      role: 'CEO & Co-founder de Bio Business School y Redesign Lab. Estratega de negocios con experiencia en transformación de empresas, diseño de modelos de negocio y construcción de sistemas de inteligencia estratégica en América Latina.',
    },
    {
      name: 'Lorenzo Ortiz',
      role: 'CIO & Co-founder de Bio Business School y Redesign Lab. Especialista en arquitectura de sistemas operativos con IA, automatización de procesos para empresas en crecimiento y diseño de modelos de adopción tecnológica.',
    },
    {
      name: '+ Especialista invitado',
      role: 'Un dueño, gerente o directivo de empresa que implementó IA con resultados documentados y medibles — presente en la sesión final como evaluador y como evidencia viva de que esto funciona.',
    },
  ],

  faq: [
    {
      q: '¿Necesito conocimientos previos de IA o tecnología?',
      a: 'No. Necesitas tener un negocio real y disposición para cuestionar cómo opera hoy. Las herramientas las aprendes en el programa — el criterio para aplicarlas a tu empresa es lo que construimos juntos.',
    },
    {
      q: '¿Para qué tipo de empresas está diseñado?',
      a: 'Para Mypes comerciales, de manufactura y de servicios, y para emprendimientos con tracción y facturación establecida. Si todavía estás validando tu idea, este no es el programa correcto — hay uno mejor para esa etapa.',
    },
    {
      q: '¿En qué plataforma se dicta?',
      a: 'Todas las sesiones son en Google Meet. Los materiales están en Google Drive. No necesitas instalar nada adicional.',
    },
    {
      q: '¿Qué es Re. Intelligence?',
      a: 'Es el servicio de inteligencia estratégica continua de Redesign Lab para empresas en crecimiento. El programa es la introducción práctica — Re. Intelligence es el sistema permanente para quienes quieren seguir tomando decisiones con datos.',
    },
    {
      q: '¿El programa tiene certificado?',
      a: 'Sí. Los participantes que completan el programa reciben un certificado de Bio Business School respaldado por Redesign Lab.',
    },
  ],
}

// ============================================================
// CURSO EJECUTIVO 03 — Construcción de Marcas Regenerativas
// ============================================================
const marcasRegenerativas: BBSProgram = {
  slug: 'marcas-regenerativas',
  type: 'curso',
  code: 'CURSO EJECUTIVO 03',
  title: 'Construcción de Marcas Regenerativas',
  tagline: 'Deja de vender bien. Empieza a vender mejor.',
  summary:
    'Construye una marca regenerativa que captura el valor real de tu producto — con el framework RIZOMA de Thousandfold.',
  audience:
    'Dueños y fundadores de Mypes con marcas sostenibles, regenerativas o de origen territorial',
  duration: '4 semanas · 4 sesiones en vivo de 2h',
  modality: 'En vivo · Google Meet + Drive',
  deliverable: 'Brand Starter Kit Regenerativo',
  price: { usd: '$70 USD', pen: 'S/. 250' },
  startDate: '22 Junio 2026',
  collaborator: 'Thousandfold · thousandfold.la',

  hero: {
    lines: [
      'Una marca bien construida',
      'no solo te permite vender más.',
      'Te permite vender mejor.',
    ],
    paragraph:
      'Sí, te enseñamos el método para construir una marca regenerativa. Y también lo que la mayoría de los programas de branding ignora: el framework estratégico para que tu marca capture el valor real que tu producto merece — y te permita cobrarlo.',
  },

  problem: {
    heading: 'EL PROBLEMA TIENE NOMBRE Y TIENE COSTO',
    body: [
      'El 73% de las marcas de impacto en América Latina son percibidas como ecogenéricas por su propio público objetivo.',
      'Mismo tono verde. Mismo lenguaje de impacto. Misma estética orgánica que el mercado aprendió a ignorar. Una marca que hace bien las cosas pero se ve como todas las demás cobra el precio de lo genérico — aunque su producto valga mucho más.',
      'El café de especialidad peruano llega a Europa como commodity sin nombre. El cacao amazónico se convierte en chocolate belga de precio premium. Los biomateriales andinos regresan empaquetados como lujo europeo.',
      'América Latina exporta materia prima extraordinaria y recibe de vuelta el valor que no supo capturar. No es un problema de producto. Es un problema de marca.',
      'Una marca regenerativa bien construida captura 4 veces más valor que una sostenible genérica. No vende más unidades — vende mejor cada una. Esa diferencia no la hace el logo. La hace la arquitectura de significado que está detrás.',
      'Eso es exactamente lo que este programa enseña a construir.',
    ],
  },

  forWhom: [
    {
      title: 'El dueño de Mype con un producto de origen real',
      body: 'Tienes un producto con historia — ingredientes amazónicos, procesos artesanales, comunidades de origen, territorio específico. Sabes que vale más de lo que el mercado te está pagando. Lo que te falta es la arquitectura de marca que lo demuestre y lo justifique.',
    },
    {
      title: 'El fundador de bionegocio con propuesta de valor compleja',
      body: 'Tu negocio tiene una lógica regenerativa real — pero traducirla a una marca que el consumidor entienda y por la que esté dispuesto a pagar más es el desafío que no has podido resolver del todo.',
    },
    {
      title: 'El emprendedor que quiere acceder a mercados premium',
      body: 'Sabes que tu producto tiene potencial en mercados europeos, norteamericanos o en el segmento premium de LATAM. Llegar ahí requiere una marca con una arquitectura más sólida que un logo bonito — y una estrategia de pricing que el mercado sostenga.',
    },
    {
      title: 'El brand manager que trabaja con marcas de impacto',
      body: 'Gestionas marcas con propósito real pero enfrentas el mismo problema una y otra vez: cómo diferenciarlas genuinamente en un mercado saturado de claims sostenibles que nadie cree — y cómo traducir esa diferencia en precio.',
    },
  ],

  notFor:
    'Este programa no es para: Quienes todavía están definiendo su producto o su modelo de negocio. Para participar necesitas tener una marca real — existente o en proceso de lanzamiento inminente — sobre la cual trabajar.',

  outcomes: [
    {
      lead: 'Entendido exactamente por qué tu marca no está capturando el valor que debería.',
      body: 'Con el diagnóstico honesto y estructurado del método Regen Brands de Thousandfold, habrás identificado dónde está la fuga de valor en tu marca actual y qué la está frenando para cobrar lo que merece.',
    },
    {
      lead: 'Construido la arquitectura de tu marca regenerativa desde el territorio.',
      body: 'Usando el framework RIZOMA de Thousandfold — el primer sistema de arquitectura de marca regenerativa diseñado específicamente para América Latina — habrás diseñado los pilares que hacen a tu marca genuinamente irreplicable y capaz de justificar un precio premium con coherencia.',
    },
    {
      lead: 'Convertido tu historia de origen en tu ventaja competitiva más difícil de copiar.',
      body: 'La historia de origen es el activo que ningún competidor puede replicar. Habrás aprendido a construirla en tres capas — para el cliente final, para la industria y para el movimiento cultural — y a usarla para sostener un precio más alto con argumentos reales.',
    },
    {
      lead: 'Diseñado tu estrategia de entrada al mercado con criterio de negocio.',
      body: 'Una estrategia concreta de qué canales activar, qué alianzas construir, cómo justificar el precio premium ante el distribuidor y el consumidor, y cómo construir la credibilidad que convierte interés en compra.',
    },
    {
      lead: 'Completado tu Brand Starter Kit Regenerativo.',
      body: 'El conjunto de documentos que tu marca necesita para vender mejor desde hoy: diagnóstico, arquitectura de marca, narrativa y plan de lanzamiento — construido sobre tu marca específica, no sobre un caso ficticio.',
    },
  ],

  includes: [
    '4 sesiones en vivo de 2 horas cada una — en Google Meet con Eddie Ajalcriña y Lorenzo Ortiz',
    'Material de trabajo asincrónico curado por sesión — lecturas, análisis de casos de marcas regenerativas latinoamericanas e internacionales, y plantillas en Google Drive',
    'Trabajo integrador real — el Brand Starter Kit Regenerativo de tu marca, construido semana a semana y presentado ante un comité evaluador al final del programa',
    'Sustentación ante Comité BBS — con feedback estratégico de Eddie, Lorenzo y un especialista invitado con experiencia en marcas regenerativas con presencia internacional',
    'Certificado de Bio Business School respaldado por Redesign Lab',
    'Comunidad BBS de por vida — fundadores y dueños de marcas regenerativas que se abren puertas mutuamente en América Latina y más allá',
  ],

  framework: [
    {
      heading: 'RIZOMA — EL FRAMEWORK QUE LO HACE POSIBLE',
      body: [
        'La mayoría de los frameworks de branding — Golden Circle, Kapferer, Brand Key — fueron diseñados para marcas que operan en economías extractivas. Ninguno fue construido para marcas que quieren regenerar el territorio del que dependen sin perder coherencia al escalar a mercados globales.',
        'RIZOMA es el primer sistema de arquitectura de marca regenerativa diseñado específicamente para América Latina y el Caribe.',
        'Desarrollado por Thousandfold (www.thousandfold.la) e impulsado por Redesign Lab, RIZOMA organiza la construcción de marca en 7 capas que conectan el territorio de origen con los mercados internacionales que están dispuestos a pagar por lo que esa marca representa. No es un modelo teórico — es el método con el que Thousandfold ha construido marcas que capturan el valor real de sus activos territoriales.',
        'Los 5 arquetipos del sistema — El Custodio, El Constructor, El Revelador, El Regenerador y El Visionario — permiten identificar desde qué posición estratégica tu marca tiene mayor potencial de diferenciación y pricing premium.',
        'En este programa aprendes RIZOMA. Y lo aplicas a tu marca.',
      ],
    },
  ],

  perks: {
    all: [
      'Acceso de por vida a la comunidad BBS — fundadores y dueños de marcas regenerativas que comparten el mismo estándar de criterio, se apoyan mutuamente y construyen juntos negocios más rentables.',
      'Feedback escrito del equipo de Redesign Lab sobre el sistema de identidad visual de tu marca — con observaciones específicas sobre coherencia, diferenciación y potencial de pricing premium.',
    ],
    topHeading: 'Para los 2 mejores Brand Starter Kits del cohorte:',
    top: [
      'Sesión de asesoría estratégica de marca — 60 minutos individuales con Eddie Ajalcriña y Lorenzo Ortiz para revisar la arquitectura de la marca, identificar los próximos pasos de implementación y definir la estrategia de entrada al mercado con criterio real. Este es el perk más valioso: acceso directo a los creadores del framework con foco total en tu marca.',
      'Vitrina en el ecosistema BBS — presentación de la marca en el newsletter de BBS y redes de la comunidad Biobuilders, con visibilidad ante inversores, compradores y aliados estratégicos de la plataforma',
      'Caso de referencia presentado en las redes de Redesign Lab y Thousandfold como ejemplo de lo que es posible cuando una marca regenerativa se construye con método',
    ],
  },

  faculty: [
    {
      name: 'Eddie Ajalcriña',
      role: 'CEO & Co-founder de Bio Business School, Redesign Lab y Thousandfold. Co-creador del framework RIZOMA. Business designer especializado en la intersección entre regeneración y arquitectura de valor de marca, con experiencia en marcas como Cotton Nation, Neofibers y Endemics.',
    },
    {
      name: 'Lorenzo Ortiz',
      role: 'CIO & Co-founder de Bio Business School, Redesign Lab y Thousandfold. Co-creador del framework RIZOMA. Especialista en arquitectura de identidad, sistemas de marca territorial y narrativa de origen para marcas regenerativas latinoamericanas.',
    },
    {
      name: '+ Especialista invitado',
      role: 'Un fundador o directivo de marca regenerativa latinoamericana con presencia y pricing premium en mercados internacionales — presente en la sesión final como evaluador y como evidencia de que el método funciona.',
    },
  ],

  faq: [
    {
      q: '¿Necesito tener una marca ya existente para participar?',
      a: 'Sí. El programa está diseñado para trabajar sobre una marca real — existente o en proceso de lanzamiento inminente. No es para quienes están definiendo si van a tener una marca.',
    },
    {
      q: '¿Necesito ser diseñador o tener equipo de diseño?',
      a: 'No. El programa trabaja sobre la arquitectura estratégica de la marca — la capa de significado y posicionamiento que precede y orienta al diseño. Puedes aplicar lo aprendido con o sin equipo de diseño propio.',
    },
    {
      q: '¿Qué es Thousandfold?',
      a: 'Thousandfold (www.thousandfold.la) es la iniciativa colectiva fundada por Eddie Ajalcriña y Lorenzo Ortiz para construir marcas regenerativas en América Latina. Es la casa del framework RIZOMA — el primer sistema de arquitectura de marca regenerativa diseñado para ALC.',
    },
    {
      q: '¿El framework RIZOMA aplica a cualquier tipo de marca regenerativa?',
      a: 'Sí. RIZOMA fue diseñado para marcas con activos territoriales, biológicos o culturales como base de su propuesta de valor — desde marcas de alimentos naturales hasta cosméticos, textiles técnicos, servicios ecoturísticos y bionegocios.',
    },
    {
      q: '¿En qué plataforma se dicta?',
      a: 'Todas las sesiones son en Google Meet. Los materiales están en Google Drive. No necesitas instalar nada adicional.',
    },
    {
      q: '¿El programa tiene certificado?',
      a: 'Sí. Los participantes que completan el programa reciben un certificado de Bio Business School respaldado por Redesign Lab.',
    },
  ],
}

// ============================================================
// DIPLOMADO EJECUTIVO 01 — Diseño de Negocios Regenerativos
// ============================================================
const negociosRegenerativos: BBSProgram = {
  slug: 'negocios-regenerativos',
  type: 'diplomado',
  code: 'DIPLOMADO EJECUTIVO 01',
  title: 'Diseño de Negocios Regenerativos',
  tagline: 'Construyendo modelos rentables en territorios críticos',
  summary:
    'El método RIZOMA + FARA para diseñar negocios regenerativos rentables, invertibles y escalables desde el territorio.',
  audience:
    'Fundadores · Consultores ONG · Analistas de fondos · Funcionarios públicos en bioeconomía',
  duration: '3 meses · 12 sesiones en vivo de 2h · Demo Day final',
  modality: 'En vivo · Google Meet + Drive',
  deliverable: 'Portafolio de Negocio Regenerativo',
  price: { usd: '$297 USD', pen: 'S/. 1,080' },
  startDate: '22 Junio 2026',
  collaborator: 'Thousandfold · thousandfold.la',

  hero: {
    lines: [
      'América Latina tiene el capital',
      'biológico más extraordinario del mundo.',
      'La mayoría de los negocios',
      'no saben cómo convertirlo en valor.',
    ],
    paragraph:
      'Sí, te enseñamos los frameworks y las herramientas para diseñar negocios regenerativos. Y también lo que la mayoría de los programas ignora: cómo hacer que sean financieramente sólidos, invertibles y escalables desde los territorios donde operan.',
  },

  problem: {
    heading: 'EL PROBLEMA QUE ESTE DIPLOMADO RESUELVE',
    body: [
      'La bioeconomía regenerativa en América Latina tiene un problema de diseño.',
      'Los negocios con activos biológicos extraordinarios — ingredientes amazónicos, agroecosistemas únicos, biodiversidad sin equivalente en el planeta — no están capturando el valor que esos activos representan. Y el problema no es la falta de visión ni de compromiso con la regeneración.',
      'Es la falta de un método.',
      'Un método que sepa cómo leer un territorio como activo estratégico. Que sepa cómo diseñar un modelo de negocio que sea rentable sin ser extractivo. Que sepa cómo estructurar el financiamiento para que el capital llegue — y en los términos correctos. Que sepa cómo construir la marca y la narrativa que conectan ese negocio con los mercados globales que están dispuestos a pagar por él.',
      'Ese método existe. Se llama RIZOMA + FARA. Y es lo que este diplomado enseña a aplicar.',
    ],
  },

  forWhom: [
    {
      title: 'El emprendedor con tracción que quiere escalar',
      body: 'Tienes un negocio regenerativo que ya funciona — clientes, facturación, modelo validado. El desafío ahora no es validar: es posicionarte en mercados internacionales, acceder a capital de impacto y escalar sin perder la esencia que te diferencia. Necesitas el framework estratégico que conecte todo eso en un plan coherente.',
    },
    {
      title: 'El consultor o experto de ONG en agricultura sostenible y bionegocios',
      body: 'Llevas años acompañando a productores y comunidades en la mejora de sus prácticas. Pero has visto que las buenas prácticas sin modelos económicos sólidos no generan prosperidad sostenida. Quieres migrar desde la asistencia técnica hacia el diseño de negocios regenerativos que sean rentables y replicables — y necesitas el método para hacerlo con rigor.',
    },
    {
      title: 'El asociado de fondo de impacto',
      body: 'Evalúas deals en bioeconomía con regularidad. Sabes que los negocios regenerativos tienen un perfil distinto — sus activos son difíciles de valorar con modelos convencionales, su gobernanza es más compleja y sus mercados son menos predecibles. Necesitas un marco más preciso para hacer mejores preguntas, mejores evaluaciones y mejores inversiones.',
    },
    {
      title: 'El funcionario público o gestor de política',
      body: 'Trabajas en el diseño o implementación de políticas vinculadas a bioeconomía, territorios críticos o transición regenerativa. Sabes que los instrumentos de política más efectivos son los que entienden cómo funcionan realmente los negocios que quieren apoyar. Necesitas ese entendimiento profundo para crear condiciones habilitantes que realmente funcionen.',
    },
  ],

  outcomes: [
    {
      lead: 'Dominado los dos frameworks propietarios de Redesign Lab para negocios regenerativos.',
      body: 'RIZOMA para construir la arquitectura de marca y valor que conecta el negocio con mercados internacionales. FARA para diseñar la estructura económica, financiera, comercial y tecnológica del negocio desde el territorio amazónico. Dos metodologías complementarias que juntas cubren el ciclo completo del diseño de un negocio regenerativo rentable.',
    },
    {
      lead: 'Aprendido a leer un territorio como activo estratégico.',
      body: 'La biodiversidad, el conocimiento tradicional y la especificidad ecológica de un territorio no son solo valores ambientales — son activos económicos con potencial de diferenciación global. Habrás aprendido a identificarlos, evaluarlos y convertirlos en ventajas competitivas reales.',
    },
    {
      lead: 'Construido o evaluado un modelo de negocio regenerativo con rigor financiero.',
      body: 'No desde los valores — desde los números. Modelo financiero, unit economics, estructura de costos en territorios críticos y estrategia de financiamiento por etapa. El lenguaje que el capital necesita escuchar para moverse.',
    },
    {
      lead: 'Navegado el ecosistema de estándares y certificaciones internacionales.',
      body: 'Comprendido cómo los estándares más exigentes del mercado global — desde Regenagri hasta la Regenerative Organic Certification — se convierten en activos comerciales que justifican un precio premium y abren puertas a los mercados que más valoran la regeneración.',
    },
    {
      lead: 'Diseñado la estrategia de marca y mercado que conecta el negocio con compradores globales.',
      body: 'Aplicando RIZOMA, habrás construido o evaluado la arquitectura de marca que permite a un negocio regenerativo justificar un precio premium en mercados que valoran el origen, la trazabilidad y la gobernanza.',
    },
    {
      lead: 'Completado un Portafolio de Negocio Regenerativo adaptado a tu perfil.',
      body: 'El fundador tendrá un plan de negocio completo listo para presentar ante inversores. El consultor de ONG tendrá una metodología transferible a sus proyectos de campo. El analista de fondo tendrá un framework de evaluación más preciso. El funcionario tendrá un modelo de política pública con fundamento real en la economía regenerativa.',
    },
  ],

  includes: [
    '12 sesiones en vivo de 2 horas cada una — en Google Meet con Eddie Ajalcriña y Lorenzo Ortiz a lo largo de 3 meses',
    'Material de trabajo asincrónico curado por sesión — lecturas, casos de negocios regenerativos latinoamericanos, plantillas y frameworks en Google Drive',
    'Trabajo integrador — el Portafolio de Negocio Regenerativo, construido módulo a módulo y presentado ante un panel de evaluadores externos en el Demo Day final',
    'Demo Day ante panel externo — evaluadores con perfil de inversor de impacto, especialista en estándares internacionales regenerativos y policy maker o representante de organismo multilateral',
    'Certificación BBS — respaldada por Redesign Lab y Thousandfold',
    'Comunidad BBS de por vida — fundadores, consultores, analistas e inversores que operan en el ecosistema regenerativo de LATAM',
  ],

  framework: [
    {
      heading: 'RIZOMA — Para marcas regenerativas conectadas a mercados internacionales',
      body: [
        'Desarrollado por Thousandfold (www.thousandfold.la) e impulsado por Redesign Lab, RIZOMA es el primer framework de arquitectura de marca regenerativa diseñado para América Latina.',
        'En el contexto de los negocios regenerativos, RIZOMA responde a una pregunta crítica: ¿cómo conectas la propuesta de valor de tu negocio — arraigada en un territorio específico, en una comunidad real, en una práctica genuinamente regenerativa — con los mercados internacionales que están dispuestos a pagar por ella?',
        'RIZOMA diseña esa conexión como una red de nodos de valor — no como una cadena lineal — y por eso produce marcas y negocios con una coherencia y una resiliencia que los modelos convencionales no pueden replicar.',
      ],
    },
    {
      heading: 'FARA — Para agro-negocios regenerativos en la Amazonía',
      body: [
        'Desarrollado por Redesign Lab, FARA es el framework de diseño y aceleración de agro-negocios regenerativos con foco en la Amazonía y los territorios críticos de América Latina.',
        'FARA integra cuatro dimensiones que los modelos convencionales tratan por separado:',
        'Adaptación al territorio — cómo leer las condiciones biológicas, sociales y regulatorias específicas del ecosistema amazónico y convertirlas en ventajas estructurales del negocio.',
        'Diseño de modelos económicos y de financiamiento — cómo estructurar un modelo que capture valor sin extraerlo, y cómo acceder a los instrumentos de capital que corresponden a cada etapa del negocio.',
        'Estrategias comerciales y certificaciones — cómo diseñar la ruta al mercado que permite cobrar el precio que el activo merece, y qué certificaciones construyen la credibilidad que ese precio requiere.',
        'Tecnología e IA — cómo las herramientas digitales amplían la capacidad operativa de negocios en territorios de baja infraestructura, y cómo la inteligencia artificial permite tomar mejores decisiones con menos recursos.',
      ],
    },
    {
      heading: 'Estándares internacionales como activos de negocio',
      body: [
        'Los frameworks RIZOMA y FARA no operan en un vacío — se articulan con los estándares y modelos regenerativos más rigurosos del mundo, que en este diplomado aprendemos a usar no como requisitos de compliance sino como activos estratégicos que abren mercados y justifican precios premium.',
        'A lo largo del programa trabajamos con los referentes más relevantes del ecosistema regenerativo global: Regenagri y la Regenerative Organic Certification (ROC) como los estándares más exigentes en agricultura regenerativa a escala internacional; B Corp como marco de gobernanza empresarial de impacto; Rainforest Alliance y Fair Trade como credenciales de acceso a mercados premium conscientes; y el 4 Returns Framework de Commonland como modelo de restauración de paisajes productivos. Para cada negocio y cada territorio, el diplomado ayuda a identificar qué estándares tienen mayor valor estratégico — y cómo construir el camino hacia ellos de forma financieramente viable.',
      ],
    },
  ],

  curriculum: [
    {
      month: 'MES 1 — TERRITORIO Y OPORTUNIDAD',
      subtitle: 'Aprender a ver lo que otros no pueden ver',
      modules: [
        {
          code: 'Módulo 01',
          title: 'La lógica de los negocios regenerativos',
          body: 'El punto de partida no es una herramienta — es un cambio de paradigma. Entenderás por qué los modelos convencionales fallan sistemáticamente en territorios de alta biodiversidad, qué taxonomía de negocios regenerativos existe en LATAM con métricas reales, y cómo RIZOMA y FARA se articulan para cubrir el ciclo completo del diseño.',
        },
        {
          code: 'Módulo 02',
          title: 'Inteligencia territorial con FARA',
          body: 'El territorio no es el contexto del negocio — es su activo más valioso. Aprenderás a identificar activos biológicos con potencial comercial real, a mapear los actores que determinan el acceso y la gobernanza, y a evaluar el nivel de madurez tecnológica de un recurso antes de invertir en él. FARA — Dimensión 1: Adaptación al territorio.',
        },
        {
          code: 'Módulo 03',
          title: 'Problem-Market Fit en territorios críticos',
          body: 'El error más costoso en negocios regenerativos es construir una solución para un problema que el mercado no paga. Aprenderás metodologías de validación diseñadas para contextos con baja infraestructura de datos — y cómo cada perfil del diplomado valida diferente: el fundador con clientes, el consultor con productores, el analista con tesis de inversión, el funcionario con evidencia de política.',
        },
        {
          code: 'Módulo 04',
          title: 'Propuesta de valor regenerativa con RIZOMA y FARA',
          body: 'Con el territorio entendido y el mercado validado, construyes la propuesta de valor que los conecta. Aprenderás a extraer los diferenciadores genuinamente irreplicables de un negocio — los que nacen del territorio y la comunidad — y a convertirlos en argumentos que los mercados premium globales entienden, valoran y pagan.',
        },
      ],
    },
    {
      month: 'MES 2 — MODELO Y ESTRUCTURA',
      subtitle: 'Construir lo que funciona',
      modules: [
        {
          code: 'Módulo 05',
          title: 'Diseño del modelo de negocio con RIZOMA',
          body: 'Un negocio regenerativo no es una cadena de valor optimizada — es una red de relaciones entre territorio, comunidad, mercado y capital. Aplicarás RIZOMA en su dimensión más completa para diseñar el Bio Business Model Canvas: un modelo que captura valor en toda la red, no solo en el nodo central.',
        },
        {
          code: 'Módulo 06',
          title: 'Estructura operativa y tecnológica con FARA',
          body: 'Un modelo brillante que no se puede operar no vale nada. Diseñarás la arquitectura operativa del negocio aplicando FARA — Dimensión 4 (Tecnología e IA): qué tecnología realmente se necesita en territorios de baja infraestructura, cómo la IA amplifica la capacidad operativa con equipos pequeños y cómo convertir la regulación en ventaja competitiva desde el inicio.',
        },
        {
          code: 'Módulo 07',
          title: 'Diseño de modelos económicos y de financiamiento',
          body: 'El modelo financiero es el lenguaje con el que un negocio regenerativo habla con los inversores, los donantes y los policy makers. Construirás el modelo que cuenta la historia correcta — con unit economics sólidos, estructura de costos en territorios críticos y análisis de sensibilidad que resiste el escrutinio real. FARA — Dimensión 2: Modelos económicos y de financiamiento.',
        },
        {
          code: 'Módulo 08',
          title: 'Gobernanza, estructura legal y certificaciones',
          body: 'La gobernanza es el componente más subestimado y más crítico de un negocio regenerativo en territorio. Aprenderás las estructuras legales disponibles en LATAM, cómo diseñar acuerdos de gobernanza comunitaria que convierten la relación con el territorio en un activo, y cómo navegar el ecosistema de certificaciones internacionales — Regenagri, Regenerative Organic Certification, B Corp — como activos estratégicos que abren mercados y reducen el costo del capital.',
        },
      ],
    },
    {
      month: 'MES 3 — CAPITAL Y ESCALA',
      subtitle: 'Llevarlo al mundo',
      modules: [
        {
          code: 'Módulo 09',
          title: 'Ecosistema de financiamiento e inversión de impacto',
          body: 'El capital existe para los negocios regenerativos que saben buscarlo con el argumento correcto. Mapearás el ecosistema completo de financiamiento disponible en LATAM — desde ángeles especializados hasta BID, CAF y GEF — y aprenderás a construir la estrategia de financiamiento por etapa adaptada a tu perfil: el fundador que levanta capital, el analista que lo asigna, el funcionario que lo moviliza mediante política pública.',
        },
        {
          code: 'Módulo 10',
          title: 'Narrativa de inversión, política y cooperación',
          body: 'En negocios regenerativos, la narrativa no es solo para inversores — es para múltiples audiencias con poderes de decisión distintos. Construirás la narrativa específica de tu perfil: el pitch de inversión para el fundador, el caso de política para el funcionario, el argumento de cooperación para el consultor de ONG y el investment memo para el analista de fondo. Con un principio común: convertir la complejidad territorial en ventaja narrativa.',
        },
        {
          code: 'Módulo 11',
          title: 'Escala, política pública y ecosistema regional',
          body: 'El módulo que prepara para el siguiente nivel. Los fundadores aprenderán cuándo y cómo escalar sin comprometer los nodos de origen. Los consultores de ONG aprenderán a replicar modelos en múltiples territorios. Los analistas identificarán las señales de madurez para el scale-up. Los funcionarios diseñarán los marcos de política que crean condiciones habilitantes reales para el ecosistema regenerativo a escala regional.',
        },
        {
          code: 'Módulo 12',
          title: 'Integración y Demo Day',
          body: 'El cierre no es un examen — es una presentación ante el mundo real. Cada participante presenta su Portafolio de Negocio Regenerativo completo ante un panel externo de inversores de impacto, especialistas en estándares regenerativos internacionales y representantes de organismos multilaterales. El feedback es real, las preguntas son difíciles y los mejores portafolios abren conversaciones que continúan después del programa.',
        },
      ],
    },
  ],

  perks: {
    all: [
      'Certificación BBS — respaldada por Redesign Lab y Thousandfold',
      'Acceso de por vida a la comunidad BBS — el ecosistema de referentes en bionegocios y negocios regenerativos de América Latina',
    ],
    topHeading:
      'Para los 2 mejores Portafolios del cohorte — seleccionados por el panel del Demo Day:',
    top: [
      'Sesión de consultoría estratégica 1-on-1 — 90 minutos con Eddie Ajalcriña y Lorenzo Ortiz para revisar el portafolio completo, resolver los cuellos de botella más críticos y definir los próximos pasos con criterio real',
      '3 meses de cuenta PRO en Claude — para continuar desarrollando e implementando el portafolio construido durante el programa',
      'Presentación activa ante la red de inversión BBS — VCs, family offices y fondos de impacto vinculados a la plataforma. No visibilidad pasiva: introducción activa con contexto del proyecto',
      'Caso de referencia presentado en el ecosistema BBS, redes de Redesign Lab y Thousandfold — con visibilidad ante inversores, empresas y organismos del ecosistema regenerativo de LATAM',
    ],
  },

  faculty: [
    {
      name: 'Eddie Ajalcriña',
      role: 'CEO & Co-founder de Bio Business School, Redesign Lab y Thousandfold. Co-creador de los frameworks RIZOMA y FARA. Business designer con experiencia en diseño de negocios regenerativos en territorios críticos de América Latina, incluyendo la Amazonía peruana, colombiana y ecuatoriana.',
    },
    {
      name: 'Lorenzo Ortiz',
      role: 'CIO & Co-founder de Bio Business School, Redesign Lab y Thousandfold. Co-creador de los frameworks RIZOMA y FARA. Especialista en modelos económicos y financieros para negocios regenerativos, arquitectura de identidad territorial y diseño de sistemas de gobernanza para empresas que operan en territorios con comunidades.',
    },
    {
      name: '+ Especialistas invitados por módulo',
      role: 'A lo largo del diplomado participan especialistas con experiencia operativa real: investigadores en bioprospección amazónica, abogados especializados en propiedad intelectual biológica, analistas de fondos de impacto con cartera en bioeconomía, representantes de organismos certificadores internacionales y fundadores de negocios regenerativos con presencia en mercados premium globales.',
    },
    {
      name: 'Panel del Demo Day',
      role: 'La sesión final convoca un panel mixto con perfil de inversor de impacto, especialista en estándares regenerativos internacionales y representante de organismo multilateral o política pública — para una evaluación que refleja las exigencias del mundo real.',
    },
  ],

  faq: [
    {
      q: '¿Necesito tener un negocio regenerativo para participar?',
      a: 'No necesariamente. El diplomado está diseñado para cuatro perfiles: fundadores con negocio en marcha, consultores y expertos de ONG, analistas de fondos de impacto y funcionarios públicos. Lo que necesitas es operar — o querer operar — en el ecosistema de los negocios regenerativos con mayor rigor y criterio.',
    },
    {
      q: '¿Cuál es la diferencia entre RIZOMA y FARA?',
      a: 'RIZOMA es el framework de arquitectura de marca y valor — responde a cómo conectar la propuesta de un negocio regenerativo con mercados que la valoren y paguen bien. FARA es el framework de diseño económico y operativo — responde a cómo estructurar el negocio desde el territorio amazónico para que sea rentable, financiable y escalable. Son complementarios: RIZOMA trabaja hacia afuera (el mercado), FARA trabaja hacia adentro (el modelo).',
    },
    {
      q: '¿Qué son Regenagri y la Regenerative Organic Certification?',
      a: 'Son los dos estándares internacionales más exigentes en agricultura regenerativa. Regenagri fue desarrollado por Control Union y evalúa prácticas regenerativas en sistemas agrícolas a escala global. La ROC fue desarrollada por el Rodale Institute y es considerada el estándar más alto del mundo en la intersección entre agricultura regenerativa y orgánica. En el diplomado aprendemos a evaluar cuál aplica a cada tipo de negocio y cómo construir el camino hacia la certificación de forma viable.',
    },
    {
      q: '¿En qué plataforma se dicta el diplomado?',
      a: 'Todas las sesiones son en Google Meet. Los materiales están en Google Drive. No necesitas instalar nada adicional.',
    },
    {
      q: '¿El diplomado tiene certificado?',
      a: 'Sí. Los participantes que completan el programa reciben la certificación de Bio Business School, respaldada por Redesign Lab y Thousandfold.',
    },
  ],
}

// ============================================================
// DIPLOMADO EJECUTIVO 02 — Economía Circular para la Industria
// ============================================================
const economiaCircularIndustria: BBSProgram = {
  slug: 'economia-circular-industria',
  type: 'diplomado',
  code: 'DIPLOMADO EJECUTIVO 02',
  title: 'Economía Circular para la Industria',
  tagline: 'De la teoría al Roadmap que tu empresa puede ejecutar',
  summary:
    'De la teoría al Roadmap de Economía Circular que tu empresa puede ejecutar — con Nordic Toolkit e ISO 59000.',
  audience:
    'Ingenieros · Gerentes de operaciones · Profesionales de sostenibilidad · Consultores industriales',
  duration: '3 meses · 12 sesiones en vivo de 2h · Demo Day final',
  modality: 'En vivo · Google Meet + Drive',
  deliverable: 'Roadmap de Implementación de Economía Circular',
  price: { usd: '$297 USD', pen: 'S/. 1,080' },
  startDate: '22 Junio 2026',

  hero: {
    lines: [
      'La economía circular no es',
      'una tendencia de sostenibilidad.',
      'Es la próxima ventaja competitiva',
      'de tu empresa — si sabes',
      'cómo implementarla.',
    ],
    paragraph:
      'Un programa técnico y aplicativo para profesionales que quieren liderar — no solo entender — la transición circular en sus empresas. Al terminar tendrás el Roadmap de Implementación de Economía Circular de tu empresa: concreto, ejecutable y construido con los estándares metodológicos más rigurosos del mundo.',
  },

  problem: {
    heading: 'EL PROBLEMA QUE ESTE DIPLOMADO RESUELVE',
    body: [
      'Hay mucha teoría sobre economía circular. Hay pocas empresas que saben realmente cómo implementarla.',
      'El conocimiento conceptual no falta. Lo que falta es el método técnico para traducir los principios circulares en decisiones operativas concretas: qué cambiar en el producto, qué rediseñar en el proceso, cómo estructurar el modelo de negocio para que la circularidad genere retorno financiero real y cómo medir el avance con los indicadores que el mercado global está empezando a exigir.',
      'Las presiones para actuar ya están aquí. El Carbon Border Adjustment Mechanism europeo, la Corporate Sustainability Reporting Directive y los estándares de compra de las cadenas globales ya están cambiando las condiciones de acceso a los mercados que más pagan. Las empresas latinoamericanas que no inicien su transición circular ahora van a llegar tarde — y la diferencia entre llegar a tiempo y llegar tarde se mide en contratos perdidos y mercados cerrados.',
      'Este diplomado existe para que no llegues tarde. Y para que cuando actúes, lo hagas con un plan.',
    ],
  },

  forWhom: [
    {
      title: 'El ingeniero o técnico que quiere liderar la transición circular en su empresa',
      body: 'Tienes formación técnica y entiendes los procesos productivos de tu empresa. Sabes que la economía circular tiene potencial real — pero necesitas el método estructurado para diseñar e implementar la transición con rigor, indicadores y un plan que tu dirección apruebe.',
    },
    {
      title: 'El gerente de operaciones o manufactura que necesita resultados',
      body: 'Tu empresa tiene compromisos de sostenibilidad que bajar a tierra. Necesitas un roadmap concreto — no una declaración de intenciones — que sea ejecutable con los recursos disponibles y que muestre retorno financiero real a mediano plazo.',
    },
    {
      title: 'El profesional de sostenibilidad corporativa que quiere ir más allá del reporte',
      body: 'Llevas tiempo midiendo y reportando indicadores de sostenibilidad. Ahora quieres pasar de medir a transformar: diseñar los sistemas circulares que cambien los números, no solo los que los reportan.',
    },
    {
      title: 'El consultor industrial que acompaña empresas en transición',
      body: 'Trabajas con empresas que necesitan implementar circularidad y buscas un marco metodológico riguroso — con referencia en los estándares internacionales más reconocidos — para estructurar mejor tus proyectos y dar resultados más sólidos a tus clientes.',
    },
  ],

  notFor:
    'Este programa no es para: Quienes buscan un enfoque de política pública, regulación ambiental o teoría académica de la economía circular. Para eso hay otros espacios. Aquí el foco es la implementación en empresas reales.',

  outcomes: [
    {
      lead: 'Dominado los marcos metodológicos internacionales más rigurosos para la implementación circular.',
      body: 'Nordic Innovation Circular Economy Toolkit, WBCSD Circular Economy Indicators, la serie de normas ISO 59000 sobre economía circular y los frameworks de la Ellen MacArthur Foundation — no como lectura de referencia, sino como herramientas operativas que aplicarás directamente en tu empresa.',
    },
    {
      lead: 'Diagnosticado con precisión técnica el estado circular de tu empresa.',
      body: 'Aplicando Material Flow Analysis y las herramientas de diagnóstico del Nordic Toolkit, habrás identificado los cinco puntos de fuga de valor en tu operación y cuantificado el potencial económico de cerrar esos ciclos.',
    },
    {
      lead: 'Diseñado soluciones circulares concretas por dimensión.',
      body: 'Producto, proceso, modelo de negocio, tecnología y cultura organizacional — habrás diseñado intervenciones específicas para cada dimensión de tu empresa, con criterio técnico y viabilidad financiera documentada.',
    },
    {
      lead: 'Construido el sistema de indicadores de circularidad de tu empresa.',
      body: 'Basado en la norma ISO 59020 y los indicadores de la WBCSD, tendrás un dashboard operativo que mide el avance real de la transición circular — el mismo lenguaje que los mercados globales y los fondos ESG ya están usando para evaluar a sus proveedores e inversiones.',
    },
    {
      lead: 'Completado el Roadmap de Implementación de Economía Circular de tu empresa.',
      body: 'El entregable central del diplomado: un plan ejecutable con diagnóstico, soluciones por dimensión, indicadores de avance, business case financiero, gestión del cambio organizacional y cronograma de implementación. Un documento que tu dirección puede aprobar y tu equipo puede ejecutar.',
    },
  ],

  includes: [
    '12 sesiones en vivo de 2 horas cada una — en Google Meet con Eddie Ajalcriña y Lorenzo Ortiz a lo largo de 3 meses',
    'Material de trabajo asincrónico curado por sesión — documentos técnicos de referencia, herramientas del Nordic Toolkit, guías ISO y casos de implementación real en Google Drive',
    'Trabajo integrador — el Roadmap de Implementación de Economía Circular de tu empresa, construido módulo a módulo y presentado ante un panel de evaluadores en el Demo Day final',
    'Demo Day ante panel técnico externo — evaluadores con perfil de especialista en economía circular industrial y representante de cadena de valor global o fondo ESG',
    'Certificación BBS — respaldada por Redesign Lab',
    'Comunidad BBS de por vida — líderes técnicos de circularidad industrial de distintos sectores y países de América Latina',
  ],

  framework: [
    {
      heading: 'Nordic Innovation Circular Economy Toolkit',
      body: [
        'Desarrollado por Nordic Innovation, Accenture y el Finnish Innovation Fund Sitra, es el toolkit más completo disponible para empresas manufactureras que quieren iniciar su transición circular. El programa trabaja con sus 9 herramientas operativas: Business Model Development Toolkit, Business Model Canvas circular, Value Case Tool, Capability Maturity Assessment, Technology Maturity Assessment, Culture Gap Analysis, Ecosystem Partner Identification, Funding Requirement Analysis y Roadmap Development Tool.',
      ],
    },
    {
      heading: 'ISO 59000 — Normas internacionales de economía circular',
      body: [
        'La serie ISO 59000 es el marco normativo internacional de referencia para la economía circular empresarial. El programa trabaja con las tres normas centrales de la serie: ISO 59004 (vocabulario, principios y orientación para la implementación), ISO 59010 (orientación sobre la transición de modelos de negocio hacia la economía circular) e ISO 59020 (medición y evaluación de la circularidad). Estas normas no son solo referencia conceptual — son el estándar con el que las cadenas de valor globales y los auditores de sostenibilidad están empezando a evaluar a sus proveedores.',
      ],
    },
    {
      heading: 'WBCSD Circular Economy Indicators',
      body: [
        'El World Business Council for Sustainable Development ha desarrollado el marco de indicadores de circularidad más adoptado por empresas multinacionales. El programa usa estos indicadores como base para el sistema de medición del Roadmap — asegurando que los avances sean comparables, comunicables y alineados con el lenguaje que los inversores ESG y los compradores globales ya están utilizando.',
      ],
    },
    {
      heading: 'Ellen MacArthur Foundation — Circularity Metrics',
      body: [
        'El marco de métricas de la Fundación Ellen MacArthur complementa el sistema de indicadores con enfoque en tasas de circularidad de materiales, utilidad del producto a lo largo del ciclo de vida y flujos de valor en economías de ciclo cerrado. Referencia de uso extendido en reportes corporativos de circularidad a escala global.',
      ],
    },
  ],

  curriculum: [
    {
      month: 'MES 1 — DIAGNÓSTICO Y FUNDAMENTOS',
      subtitle: 'Entender el sistema antes de intervenir',
      modules: [
        {
          code: 'Módulo 01',
          title: 'La economía circular como ventaja competitiva industrial',
          body: 'El punto de partida no es la ética ambiental — es el caso de negocio. Entenderás las cinco ineficiencias del modelo lineal que generan pérdida de valor en toda empresa industrial, los tres drivers que están acelerando la transición circular a escala global (centralidad del cliente, presión regulatoria y tecnología), y cómo las empresas que actúan hoy están construyendo ventajas que sus competidores tardíos no podrán replicar fácilmente. Referencia central: Nordic Innovation Circular Economy Playbook, Capítulo 1.',
        },
        {
          code: 'Módulo 02',
          title: 'Diagnóstico circular de la empresa: mapear para intervenir',
          body: 'No se puede mejorar lo que no se mide — y no se puede medir lo que no se mapea. Aprenderás a aplicar el Material Flow Analysis (MFA) para mapear los flujos de materiales, energía y agua de tu empresa, a identificar los cinco puntos de fuga de valor del modelo lineal y a cuantificar el potencial económico de cerrar cada ciclo. Referencia central: Nordic Toolkit — Business Model Development Tool y Value Case Tool.',
        },
        {
          code: 'Módulo 03',
          title: 'Diseño circular de productos y servicios',
          body: 'La circularidad empieza en el diseño — no en la gestión de residuos. Aprenderás los principios del ecodiseño circular: durabilidad programada, modularidad, desmontabilidad, uso de materiales circulares y diseño para el fin de vida. Cómo aplicar estos principios a productos y servicios existentes sin rediseñar desde cero — y cómo cuantificar el impacto de cada decisión de diseño en el ciclo de vida del producto. Referencia central: ISO 59004 — principios de implementación circular; Cradle to Cradle design principles.',
        },
        {
          code: 'Módulo 04',
          title: 'Modelos de negocio circulares: elegir el correcto para tu empresa',
          body: 'No todos los modelos circulares aplican a todas las empresas. Aprenderás los cinco arquetipos de modelo circular con mayor tracción en industria manufacturera — Circular Inputs, Sharing Platform, Product-as-a-Service, Product Use Extension y Resource Recovery — con análisis de casos reales latinoamericanos, la herramienta de Value Hill para identificar dónde está el mayor potencial de valor en tu cadena, y el método para priorizar el modelo de mayor palanca para tu contexto específico. Referencia central: Nordic Innovation Playbook, Capítulo 2.',
        },
      ],
    },
    {
      month: 'MES 2 — DISEÑO E IMPLEMENTACIÓN',
      subtitle: 'Construir las soluciones que funcionan',
      modules: [
        {
          code: 'Módulo 05',
          title: 'Tecnologías habilitadoras de la circularidad',
          body: 'La circularidad a escala industrial no es posible sin tecnología. Aprenderás a evaluar las 19 tecnologías habilitadoras identificadas en el Nordic Playbook — digitales (IoT, IA, blockchain, digital twins), físicas (fabricación aditiva, diseño modular) y biológicas (biotecnología industrial, bioplásticos) — con el Technology Maturity Assessment para identificar cuáles tienen mayor impacto en tu empresa y cuáles son accesibles con los recursos disponibles hoy. Referencia central: Nordic Innovation Playbook, Capítulo 4.',
        },
        {
          code: 'Módulo 06',
          title: 'Cultura organizacional circular: gestión del cambio desde adentro',
          body: 'El mayor obstáculo para la implementación circular no es técnico — es cultural. Aprenderás a diagnosticar la madurez cultural de tu organización frente a la circularidad, a identificar las resistencias específicas por área y nivel jerárquico, y a diseñar el plan de gestión del cambio que hace sostenible la transición en el tiempo. El mismo técnico que diseña la solución circular necesita saber cómo llevar a su equipo a adoptarla. Referencia central: Nordic Toolkit — Culture Gap Analysis Tool y Capability Maturity Assessment.',
        },
        {
          code: 'Módulo 07',
          title: 'Indicadores de circularidad: medir lo que importa',
          body: 'Sin indicadores, no hay transición — hay intención. Aprenderás a construir el sistema de medición de circularidad de tu empresa usando los tres marcos más rigurosos disponibles: la norma ISO 59020 (medición y evaluación de la circularidad), los Circular Economy Indicators de la WBCSD y las métricas operativas del Nordic Toolkit. El resultado es un dashboard de circularidad que mide el avance real de la transición, comunica resultados a dirección y habla el lenguaje que los mercados globales y fondos ESG están empezando a exigir.',
        },
        {
          code: 'Módulo 08',
          title: 'Sostenibilidad financiera del modelo circular',
          body: 'La transición circular que no tiene business case no se implementa — o se abandona a mitad de camino. Aprenderás a construir el caso financiero de la circularidad: cómo calcular el ROI de cerrar un ciclo productivo, cómo modelar la reducción de costos y los nuevos flujos de ingresos del modelo circular, y cómo presentar el business case a un directorio con los argumentos que mueven decisiones de inversión. Referencia central: Nordic Toolkit — Value Case Tool y Funding Requirement Analysis.',
        },
      ],
    },
    {
      month: 'MES 3 — ROADMAP Y EJECUCIÓN',
      subtitle: 'Del diseño a la implementación real',
      modules: [
        {
          code: 'Módulo 09',
          title: 'Diseño del Roadmap de Circularidad',
          body: 'Con todos los componentes construidos en los meses anteriores, este módulo los integra en la estructura del Roadmap de Implementación. Aprenderás a usar el Roadmap Development Tool del Nordic Toolkit para secuenciar la transición en tres horizontes: quick wins (0-6 meses), transformaciones de mediano plazo (6-18 meses) y consolidación (18-36 meses). Cómo identificar y diseñar el primer piloto circular con el menor riesgo y mayor aprendizaje. Referencia central: Nordic Innovation Playbook, Capítulo 5.',
        },
        {
          code: 'Módulo 10',
          title: 'Implementación por dimensión: producto, proceso, modelo y tecnología',
          body: 'El Roadmap sin implementación es solo un documento. Este módulo baja el plan a tierra: cómo secuenciar las intervenciones por dimensión (producto, proceso, modelo de negocio y tecnología) para que se refuercen mutuamente, cómo gestionar las interdependencias y los cuellos de botella típicos de la implementación circular, y cómo construir el sistema de seguimiento que mantiene el momentum más allá del entusiasmo inicial. Referencia central: ISO 59010 — orientación sobre la transición de modelos de negocio circular.',
        },
        {
          code: 'Módulo 11',
          title: 'Ecosistema de socios y simbiosis industrial',
          body: 'Ninguna empresa puede cerrar todos sus ciclos sola. Aprenderás a mapear los socios estratégicos que tu empresa necesita para completar su modelo circular — proveedores de materias primas secundarias, operadores de logística inversa, plataformas de reuso y centros de I+D — y cómo estructurar alianzas que generen valor para todos los actores del ecosistema. El concepto de simbiosis industrial aplicado a cadenas de valor latinoamericanas con casos documentados. Referencia central: Nordic Toolkit — Ecosystem Partner Identification Tool.',
        },
        {
          code: 'Módulo 12',
          title: 'Integración y Demo Day',
          body: 'El cierre es una presentación ante evaluadores externos con experiencia real en implementación circular industrial. Cada participante presenta su Roadmap de Implementación completo — con diagnóstico, soluciones por dimensión, indicadores ISO/WBCSD, business case y cronograma — en 12 minutos más preguntas del panel. El feedback es técnico, directo y orientado a la implementación real. Los mejores roadmaps reciben acompañamiento para dar el siguiente paso.',
        },
      ],
    },
  ],

  perks: {
    all: [
      'Certificación BBS — respaldada por Redesign Lab',
      'Acceso de por vida a la comunidad BBS — líderes técnicos de circularidad industrial de distintos sectores y países de América Latina',
    ],
    topHeading:
      'Para los 2 mejores Roadmaps del cohorte — seleccionados por el panel del Demo Day:',
    top: [
      '3 meses de cuenta PRO en Claude — para continuar desarrollando e implementando el Roadmap con la herramienta de IA central del programa',
      'Sesión de consultoría técnica 1-on-1 — 90 minutos con Eddie Ajalcriña y Lorenzo Ortiz para revisar el Roadmap completo, resolver los cuellos de botella técnicos más críticos y definir los próximos pasos de implementación con criterio real',
      'Caso de referencia presentado en el ecosistema BBS y redes de Redesign Lab — con visibilidad ante empresas, consultoras y organismos del ecosistema de economía circular de LATAM',
    ],
  },

  faculty: [
    {
      name: 'Eddie Ajalcriña',
      role: 'CEO & Co-founder de Bio Business School y Redesign Lab. Estratega de negocios con experiencia en diseño de modelos de negocio circulares y regenerativos, análisis financiero de impacto y transformación de empresas industriales en América Latina.',
    },
    {
      name: 'Lorenzo Ortiz',
      role: 'CIO & Co-founder de Bio Business School y Redesign Lab. Especialista en arquitectura de sistemas operativos, diseño de modelos de circularidad industrial y construcción de sistemas de indicadores para empresas en transición hacia la economía circular.',
    },
    {
      name: '+ Especialistas invitados por módulo',
      role: 'A lo largo del diplomado participan especialistas con experiencia técnica operativa: ingenieros especializados en ecodiseño circular, expertos en Material Flow Analysis con casos en manufactura latinoamericana, técnicos certificados en normas ISO 59000, representantes de cadenas de valor globales con requisitos de circularidad activos y líderes de empresas que han implementado modelos circulares con ROI documentado.',
    },
    {
      name: 'Panel del Demo Day',
      role: 'La sesión final convoca un panel técnico con perfil de especialista en economía circular industrial, representante de cadena de valor global o fondo ESG con criterios de circularidad y consultor con experiencia en implementación de EC en manufactura latinoamericana.',
    },
  ],

  faq: [
    {
      q: '¿Necesito tener experiencia previa en economía circular?',
      a: 'No es necesario. Lo que sí necesitas es trabajar en o con una empresa industrial real — el diplomado está diseñado para construir el Roadmap sobre una empresa concreta, no sobre casos ficticios. El nivel de experiencia en EC puede ser cero, siempre que el contexto empresarial sea real.',
    },
    {
      q: '¿El diplomado tiene enfoque técnico o estratégico?',
      a: 'Ambos, pero con énfasis en lo técnico-aplicativo. El objetivo central es que termines con un Roadmap ejecutable, no con conocimiento conceptual. Eso requiere tanto rigor técnico (diagnóstico, diseño de soluciones, indicadores) como criterio estratégico (business case, gestión del cambio, priorización).',
    },
    {
      q: '¿Qué es la serie ISO 59000?',
      a: 'Es el conjunto de normas internacionales desarrolladas por ISO para estandarizar la implementación de economía circular en organizaciones. ISO 59004 establece vocabulario y principios, ISO 59010 orienta la transición de modelos de negocio e ISO 59020 define cómo medir y evaluar la circularidad. Son las normas que los mercados globales y los auditores de sostenibilidad están adoptando como referencia — conocerlas y aplicarlas es una ventaja técnica real.',
    },
    {
      q: '¿Qué es el Nordic Innovation Circular Economy Toolkit?',
      a: 'Es el conjunto de herramientas operativas desarrollado por Nordic Innovation, Accenture y Sitra para acompañar a empresas manufactureras en su transición circular. Incluye 9 herramientas descargables que van desde el diagnóstico hasta el diseño del roadmap. Es el toolkit más riguroso y completo disponible para implementación circular en industrias y la columna vertebral metodológica de este diplomado.',
    },
    {
      q: '¿En qué plataforma se dicta el diplomado?',
      a: 'Todas las sesiones son en Google Meet. Los materiales técnicos de referencia están en Google Drive. No necesitas instalar nada adicional.',
    },
    {
      q: '¿El diplomado tiene certificado?',
      a: 'Sí. Los participantes que completan el programa reciben la certificación de Bio Business School, respaldada por Redesign Lab.',
    },
  ],
}

// ============================================================
// Exports
// ============================================================

export const bbsPrograms: BBSProgram[] = [
  iaNuevosProfesionales,
  iaPymesEmprendimientos,
  marcasRegenerativas,
  negociosRegenerativos,
  economiaCircularIndustria,
]

export const bbsCourses = bbsPrograms.filter((p) => p.type === 'curso')
export const bbsDiplomas = bbsPrograms.filter((p) => p.type === 'diplomado')
export const getProgram = (slug: string): BBSProgram | undefined =>
  bbsPrograms.find((p) => p.slug === slug)
export const allProgramSlugs = (): string[] => bbsPrograms.map((p) => p.slug)
