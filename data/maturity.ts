// Datos enriquecidos para el resultado del RE·IA Maturity Checker.
// Estructura: niveles (perfil), palancas por bloque, ajustes por industria,
// insights por bloque (fortaleza/debilidad) y playbook de 90 días.

export type BlockKey = 'A' | 'B' | 'C' | 'D' | 'E'
export type IndustryId =
  | 'pesca'
  | 'agricultura'
  | 'bosque'
  | 'alimentos'
  | 'textil'
  | 'turismo'
  | 'multi'
  | 'otra'

export const INDUSTRY_LABEL: Record<IndustryId, string> = {
  pesca: 'Pesca y acuicultura',
  agricultura: 'Agricultura y agroindustria',
  bosque: 'Productos del bosque y biocomercio',
  alimentos: 'Alimentos y bebidas',
  textil: 'Textil y confecciones',
  turismo: 'Turismo y hospitalidad',
  multi: 'Múltiples industrias / Fondo de inversión',
  otra: 'Bioeconomía (otra)',
}

// ── Perfil por nivel ────────────────────────────────────────────────────────

export const LEVEL_PROFILE: Record<
  number,
  {
    name: string
    tagline: string
    narrative: string
    typicalCompanies: string
    horizon: string // horizonte temporal del plan: 90 días, 6 meses, 12 meses
  }
> = {
  1: {
    name: 'Observador',
    tagline: 'Tu organización está en el punto de partida. La ventaja disponible es enorme.',
    narrative:
      'La mayoría de las empresas de bioeconomía en LATAM están exactamente donde tú estás hoy. La diferencia entre las que liderarán su industria en cinco años y las que seguirán igual no será la tecnología que usen — será cuándo decidieron empezar. El primer movimiento no es tecnología: es construir una base de datos confiable sobre la cual la IA pueda operar.',
    typicalCompanies:
      'Empresas familiares en transición, cooperativas agrícolas, operadores turísticos locales, pequeños exportadores de productos naturales.',
    horizon: '90 días',
  },
  2: {
    name: 'Experimentador',
    tagline: 'Hay iniciativas. El siguiente paso es profundidad, no más cantidad.',
    narrative:
      'Hay datos en algunas áreas. Hay personas que creen en el potencial de la IA. El riesgo en este nivel no es la falta de acción — es la fragmentación: muchas iniciativas pequeñas sin conexión entre sí ni con la estrategia del negocio producen el mismo resultado que no hacer nada. La métrica de éxito ahora no es cuántas herramientas tienes activas, sino cuántos resultados verificables puedes presentar ante el directorio.',
    typicalCompanies:
      'Medianas empresas agroindustriales, procesadoras con ERP básico, exportadores con trazabilidad parcial.',
    horizon: '6 meses',
  },
  3: {
    name: 'Constructor',
    tagline: 'Tienes capacidades reales. El reto ahora es integración y permanencia.',
    narrative:
      'Tu organización tiene capacidades reales instaladas y las iniciativas generan resultados medibles. Estás entre las más avanzadas de tu industria en LATAM. Pero la ventaja todavía no es sostenible: el salto al Nivel 4 no es tecnológico, es organizacional — conectar las capacidades existentes en un modelo operativo donde la IA sea el sistema nervioso, no una colección de proyectos paralelos.',
    typicalCompanies:
      'Empresas con equipos de datos, exportadores con certificaciones internacionales, agroindustrias con monitoreo digital.',
    horizon: '12 meses',
  },
  4: {
    name: 'Líder',
    tagline: 'Estás entre las más avanzadas de tu industria en LATAM.',
    narrative:
      'La IA no es un proyecto en tu organización — es parte de cómo funciona. Las decisiones se toman con datos, los problemas se detectan antes de ocurrir, el reporte de impacto es una capacidad continua. El desafío es diferente ahora: hacer visible la ventaja construida ante quienes pueden valorarla (compradores globales, fondos de inversión, socios estratégicos) y seguir ampliándola antes de que la competencia cierre la brecha.',
    typicalCompanies:
      'Líderes de industria con equipos de ciencia de datos, empresas con trazabilidad end-to-end, organizaciones con reporting automatizado.',
    horizon: '12 meses',
  },
}

// ── Palancas de IA por bloque ───────────────────────────────────────────────

export const BLOCK_LEVERS: Record<BlockKey, string[]> = {
  A: ['Inteligencia de Mercado', 'Trazabilidad y Certificación'],
  B: ['Optimización Operacional Predictiva', 'Valorización de Residuos'],
  C: ['Desarrollo Acelerado de Producto'],
  D: ['Reportes de Impacto Automatizados'],
  E: [], // E indica problema organizacional, no palanca
}

export const LEVER_DESCRIPTION: Record<string, string> = {
  'Inteligencia de Mercado':
    'Monitoreo automatizado de señales de mercado (precios, competencia, regulación) para anticipar cambios antes de que sean obvios.',
  'Trazabilidad y Certificación':
    'Sistemas digitales que documentan el origen, procesamiento y cadena de custodia de cada lote — requisito para mercados premium.',
  'Optimización Operacional Predictiva':
    'Modelos que anticipan fallas, mermas y desviaciones de calidad antes de que impacten en el resultado del negocio.',
  'Valorización de Residuos':
    'Identificación y modelado de aplicaciones de valor para subproductos — convertir costo de disposición en revenue adicional.',
  'Desarrollo Acelerado de Producto':
    'Herramientas de modelado y simulación que reducen el tiempo de lanzamiento de producto de meses a semanas.',
  'Reportes de Impacto Automatizados':
    'Medición continua y verificable de impacto ambiental/social — acceso a fondos exigentes y compradores con estándares ESG.',
}

// ── Ajustes por industria ───────────────────────────────────────────────────
// Basado en la matriz del Framework RE·IA. Define qué palancas son prioritarias
// para cada industria, independiente del score — y cuáles incluir siempre si
// el bloque D está bajo.

export const INDUSTRY_ADJUSTMENTS: Record<
  IndustryId,
  { priority: string[]; includeIfDLow: string[] }
> = {
  pesca: {
    priority: ['Trazabilidad y Certificación', 'Optimización Operacional Predictiva'],
    includeIfDLow: ['Reportes de Impacto Automatizados'],
  },
  agricultura: {
    priority: ['Trazabilidad y Certificación', 'Optimización Operacional Predictiva'],
    includeIfDLow: [],
  },
  bosque: {
    priority: ['Trazabilidad y Certificación', 'Desarrollo Acelerado de Producto'],
    includeIfDLow: ['Reportes de Impacto Automatizados'],
  },
  alimentos: {
    priority: ['Desarrollo Acelerado de Producto', 'Optimización Operacional Predictiva'],
    includeIfDLow: [],
  },
  textil: {
    priority: ['Trazabilidad y Certificación', 'Desarrollo Acelerado de Producto'],
    includeIfDLow: ['Reportes de Impacto Automatizados'],
  },
  turismo: {
    priority: ['Inteligencia de Mercado', 'Reportes de Impacto Automatizados'],
    includeIfDLow: [],
  },
  multi: {
    priority: ['Reportes de Impacto Automatizados', 'Inteligencia de Mercado'],
    includeIfDLow: [],
  },
  otra: {
    priority: [],
    includeIfDLow: [],
  },
}

// ── Insights por bloque (fortaleza / debilidad) ─────────────────────────────

export const BLOCK_INSIGHT: Record<
  BlockKey,
  { asStrength: string; asWeakness: string }
> = {
  A: {
    asStrength:
      'Tienes visibilidad de tu operación. Ese dato es el combustible sobre el que toda palanca de IA opera — lo difícil ya lo hiciste.',
    asWeakness:
      'Sin datos digitales sistematizados ninguna herramienta de IA puede funcionar bien. El primer movimiento no es tecnología — es un proceso confiable de captura de información.',
  },
  B: {
    asStrength:
      'Tu operación tiene una base predecible y controlada. Es el terreno donde la IA produce los retornos más rápidos y verificables.',
    asWeakness:
      'La operación reacciona en lugar de anticiparse. Cada problema descubierto tarde es margen que ya se perdió — y capacidad que competidores sí están optimizando.',
  },
  C: {
    asStrength:
      'Tu capacidad de respuesta a mercados emergentes es un activo competitivo real. La IA aquí multiplica lo que ya haces bien.',
    asWeakness:
      'El tiempo entre detectar una oportunidad y lanzar respuesta es demasiado largo. En mercados que se mueven a velocidad de IA, esto equivale a no participar.',
  },
  D: {
    asStrength:
      'Puedes demostrar tu impacto con datos verificables. Esto abre puertas a capital paciente y compradores premium que otros no pueden alcanzar.',
    asWeakness:
      'Si un comprador global o un fondo de impacto exige reporte hoy, no estás preparada. Ese es el criterio que define acceso o no a los mercados que importan en 2026.',
  },
  E: {
    asStrength:
      'Hay liderazgo, mandato y capacidades internas. Ese es el factor que separa iniciativas de IA exitosas de proyectos abandonados.',
    asWeakness:
      'La brecha más importante no es técnica — es de liderazgo y mandato interno. Sin una decisión clara del directorio y un responsable con recursos, cualquier iniciativa será la primera víctima de la próxima crisis.',
  },
}

// ── Playbook 90 días por bloque débil ────────────────────────────────────────
// Acciones tácticas que un equipo puede empezar la próxima semana.

export const BLOCK_90_DAY_ACTIONS: Record<BlockKey, string[]> = {
  A: [
    'Digitalizar los registros de las 3 operaciones más críticas — no requiere software sofisticado, una hoja de cálculo bien diseñada es un avance real.',
    'Configurar monitoreo de mercado con Google Alerts + 3 newsletters sectoriales específicos a tu industria.',
    'Nombrar un responsable del dato — alguien con mandato explícito de asegurar que la información se capture.',
  ],
  B: [
    'Identificar las 3 variables operativas que más impactan margen y definir un monitoreo semanal sobre ellas.',
    'Mapear los residuos y subproductos del proceso y evaluar al menos una aplicación de valor para el mayor de ellos.',
    'Pasar la planificación de producción de experiencia histórica a un modelo simple que incorpore al menos 2 variables externas (clima, precios).',
  ],
  C: [
    'Reducir el ciclo de desarrollo de producto: identificar qué etapa toma más tiempo y qué herramienta digital puede acortarla.',
    'Establecer un proceso sistemático (aunque sea manual) de escaneo de tendencias en los 3 mercados más relevantes.',
  ],
  D: [
    'Definir las 5 métricas de impacto que más importan a tus compradores o inversionistas y establecer un sistema mínimo de medición.',
    'Revisar qué estándares internacionales (B-Corp, ISO, certificaciones sectoriales) aplican y cuál está más cerca del alcance actual.',
  ],
  E: [
    'Presentar al equipo directivo un business case concreto de una palanca específica — no IA en abstracto, sino un dolor de negocio con ROI estimado.',
    'Asignar un responsable de IA con mandato y presupuesto — aunque sea tiempo parcial de una persona con criterio.',
    'Identificar 1 o 2 aliados externos (consultor, universidad, socio tecnológico) para complementar la capacidad interna en el primer año.',
  ],
}

// ── Acciones industria-específicas para enriquecer el playbook ──────────────

export const INDUSTRY_90_DAY_NOTE: Record<IndustryId, string> = {
  pesca:
    'En pesca, el paso más habilitante en 90 días es digitalizar la trazabilidad del lote — es la puerta al precio premium europeo y al acceso a retailers con estándares altos.',
  agricultura:
    'En agroindustria, el mejor uso de los primeros 90 días es conectar datos de campo con decisiones de planificación de cosecha — cada 1% de predictibilidad gana margen directo.',
  bosque:
    'En biocomercio amazónico, el primer movimiento que abre más puertas es documentar origen y cadena de custodia con datos verificables — eso es lo que validan compradores internacionales y fondos de impacto.',
  alimentos:
    'En alimentos y bebidas, los 90 días más rentables son los que acortan el ciclo de desarrollo de producto — adelantarse una temporada a la competencia vale más que cualquier otra iniciativa.',
  textil:
    'En textil, la prioridad de 90 días es trazabilidad + huella de carbono — es lo que marcas globales ya están exigiendo hoy, no en 2030.',
  turismo:
    'En turismo regenerativo, el foco de 90 días debería ser inteligencia de mercado sobre el viajero consciente + reportes de impacto que comuniquen diferenciación real.',
  multi:
    'Para un fondo o actor multi-industria, los primeros 90 días se invierten mejor en un sistema único de reporting que consolide métricas operativas y de impacto del portafolio.',
  otra:
    'El primer movimiento concreto depende del dolor de negocio más crítico hoy — y del bloque donde el score sea más bajo.',
}

// ── Lógica de cálculo de palancas prioritarias ──────────────────────────────

export function computePriorityLevers(
  blockPct: Record<BlockKey, number>,
  industry: IndustryId
): string[] {
  // Bloques ordenados de menor a mayor rendimiento (excluyendo E).
  const sortable = (Object.keys(blockPct) as BlockKey[])
    .filter((b) => b !== 'E')
    .sort((a, b) => blockPct[a] - blockPct[b])

  const fromWeakness: string[] = []
  for (const b of sortable) {
    fromWeakness.push(...BLOCK_LEVERS[b])
    if (fromWeakness.length >= 3) break
  }

  const adj = INDUSTRY_ADJUSTMENTS[industry]
  if (!adj || adj.priority.length === 0) {
    return Array.from(new Set(fromWeakness)).slice(0, 3)
  }

  const alwaysInclude = blockPct.D < 0.5 ? adj.includeIfDLow : []
  const combined = [
    ...alwaysInclude,
    ...adj.priority.filter((l) => !alwaysInclude.includes(l)),
    ...fromWeakness.filter(
      (l) => !alwaysInclude.includes(l) && !adj.priority.includes(l)
    ),
  ]
  return Array.from(new Set(combined)).slice(0, 3)
}
