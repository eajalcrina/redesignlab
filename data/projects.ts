export interface Project {
  number: string
  title: string
  industry: string
  geo: string
  tags: string[]
  keyline: string
  challenge: string
  approach: string
  results: string[]
  category: 'crear-valor' | 'redisenar-trabajo' | 'transformar-modelo'
}

export const projects: Project[] = [
  {
    number: '01',
    title: 'Fibras amazónicas con valor global',
    industry: 'Bioeconomía · Textil Sostenible · Biomateriales',
    geo: 'Loreto y Madre de Dios, Perú — con presencia comercial global',
    tags: ['bioeconomía amazónica', 'fibras naturales', 'biomateriales', 'comunidades nativas', 'textil sostenible', 'venture building', 'Future Fabrics'],
    keyline: 'Primera empresa peruana en conectar fibras amazónicas con compradores B2B internacionales',
    challenge: 'La Amazonía peruana alberga una de las reservas más grandes del mundo de palmeras nativas como la chambira y la piassaba — materias primas con propiedades técnicas comparables a fibras sintéticas, pero con una huella de carbono opuesta: regenerativa, comunitaria, biodegradable. El problema no era la fibra. Era el modelo. Las comunidades nativas de Loreto y Madre de Dios extraían y procesaban estas fibras con métodos artesanales que hacían imposible la estandarización de calidad y la escala necesaria para acceder a mercados internacionales. El resultado: un activo natural extraordinario atrapado en una cadena de valor que capturaba menos del 5% de su valor potencial. La industria global de materiales sostenibles — impulsada por la regulación europea de economía circular y la demanda de marcas de moda consciente — buscaba exactamente esto. La ventana de oportunidad era real. El desafío era construir el puente.',
    approach: 'Redesign Lab diseñó e implementó un modelo de Venture Building de extremo a extremo: desde la ingeniería del proceso productivo hasta la arquitectura financiera y la estrategia de entrada a mercados internacionales. El trabajo comenzó en campo — mapeo etnobotánico de las zonas de extracción, análisis de la capacidad productiva de las comunidades socias y levantamiento de las brechas técnicas que separaban la fibra artesanal de la fibra exportable. A partir de ese diagnóstico, se diseñó un proceso semi-industrial de desfibrado y estandarización en origen: tecnología apropiada, adaptada a las condiciones logísticas extremas de la selva, operada por las propias comunidades. En paralelo, se estructuró el modelo de financiamiento — combinando capital de BID Lab y Wyss Academy for Nature — y se ejecutó una estrategia de go-to-market internacional de largo aliento: presentación en Future Fabrics Expo London, seguida de participación en SIC Berlín, SIF Copenhague, y presencia en París, Los Ángeles y Nueva York.',
    results: [
      'Empresa operativa exportando a mercados de Reino Unido, Francia y Estados Unidos',
      'Reducción del 40% en tiempos de procesamiento gracias al sistema semi-industrial en origen',
      'Incremento verificable de ingresos en comunidades nativas productoras en Loreto y Madre de Dios',
      'Presencia internacional consolidada en los mercados de materiales sostenibles más relevantes del mundo',
      'Primera empresa peruana en conectar fibras amazónicas de origen comunitario con compradores B2B internacionales bajo estándares de trazabilidad verificable'
    ],
    category: 'crear-valor',
  },
  {
    number: '02',
    title: 'Algodón regenerativo en la Amazonía',
    industry: 'Agricultura Regenerativa · Agroindustria · Textil',
    geo: 'San Martín, Perú',
    tags: ['agricultura regenerativa', 'algodón nativo', 'cadena de suministro sostenible', 'certificación Regenagri', 'textil sostenible', 'Hugo Boss', 'Patagonia'],
    keyline: 'Primera certificación Regenagri en el Perú · Primera en el mundo para Hugo Boss',
    challenge: 'San Martín tiene uno de los suelos más degradados del Perú — consecuencia de décadas de monocultivos y deforestación para actividades agropecuarias sin planificación técnica. Al mismo tiempo, la región alberga variedades nativas de algodón con propiedades técnicas excepcionales que han sido cultivadas por comunidades locales durante generaciones. La industria global de la moda estaba en medio de una transformación estructural. Marcas de primer nivel — presionadas por regulación europea, demanda del consumidor y compromisos de Net Zero — comenzaban a buscar proveedores que no solo redujeran el daño ambiental, sino que lo revirtieran activamente. La agricultura regenerativa no era un nicho de mercado: se estaba convirtiendo en el nuevo estándar de elegibilidad para cadenas de suministro premium. El problema peruano era preciso: pequeños productores con conocimiento territorial pero sin los protocolos, la trazabilidad ni las certificaciones que los hacían elegibles para esos contratos.',
    approach: 'Redesign Lab diseñó e implementó una intervención de múltiples capas para convertir una asociación de productores locales en un proveedor elegible para marcas globales de primer nivel. El núcleo técnico fue la adopción de protocolos de agricultura orgánica y regenerativa sobre variedades nativas de algodón — incluyendo restauración de suelos, sistemas agroforestales de soporte y eliminación de insumos sintéticos. Sobre esa base agronómica se construyó un sistema de trazabilidad digital: de la parcela al hilo, con verificación en cada eslabón de la cadena. El paso más exigente fue el proceso de certificación internacional. El equipo lideró el alistamiento operacional completo para cumplir los estándares Regenagri bajo la supervisión de Control Union Perú y Brasil. Simultáneamente, se ejecutó la estrategia de go-to-market global, conectando directamente a los productores con la cadena de suministro de marcas premium internacionales, con participación activa en el Comité de Agricultura Regenerativa de Textile Exchange.',
    results: [
      'Primera empresa en el mundo en cumplir los requisitos de la línea regenerativa de Hugo Boss',
      'Primera certificación Regenagri en el Perú, en alianza con Control Union Perú y Brasil',
      'Integración a cadenas de suministro de Patagonia, Lacoste y Hugo Boss',
      'Prima de precio del 30% sobre el mercado convencional para los productores',
      'Restauración activa de suelos en hectáreas previamente degradadas en San Martín',
      'Participación en Textile Exchange como referente de agricultura regenerativa en América Latina'
    ],
    category: 'crear-valor',
  },
  {
    number: '03',
    title: 'Trazabilidad blockchain en ingredientes marinos',
    industry: 'Pesca y Acuicultura · Tecnología · Cadena de Suministro',
    geo: 'Perú — Ecuador',
    tags: ['trazabilidad blockchain', 'pesca sostenible', 'ingredientes marinos', 'supply chain', 'MarinTrust', 'harina de pescado', 'tecnología'],
    keyline: 'Primer piloto de trazabilidad blockchain en ingredientes marinos en América Latina',
    challenge: 'El mercado global de ingredientes marinos — harina y aceite de pescado utilizados en acuicultura y ganadería intensiva — enfrenta un problema estructural de opacidad. Los compradores internacionales exigen cada vez más evidencia del origen legal y sostenible de los insumos, impulsados por regulaciones como la EU IUU Fishing Regulation y los estándares de MarinTrust. Sin embargo, la complejidad logística de la cadena — desde la flota en el océano Pacífico hasta las plantas de procesamiento en tierra y los centros de distribución internacionales — hacía que la trazabilidad convencional fuera prácticamente imposible de verificar con la inmutabilidad que los compradores más exigentes requerían. Para una corporación transnacional del sector de alimento balanceado con operaciones en Perú y Ecuador, demostrar esa trazabilidad no era una opción: era la condición de elegibilidad para mantener y escalar su posición en mercados de alto valor.',
    approach: 'Nuestro equipo participó en el diseño e implementación de un sistema de trazabilidad basado en tecnología blockchain que conecta en tiempo real la flota pesquera en Perú con las plantas de producción de alimento balanceado en Ecuador — haciendo visible y verificable cada eslabón de la cadena de custodia de los ingredientes marinos. La arquitectura del sistema resolvió tres problemas simultáneos: la captura de datos en condiciones operacionales extremas (en el mar, con conectividad limitada), la integración con los sistemas ERP existentes de la corporación, y el cumplimiento de los protocolos de verificación de MarinTrust — el estándar internacional de referencia para la certificación de ingredientes marinos responsables. La coordinación requirió articulación transversal entre operaciones pesqueras, tecnología, sostenibilidad y comercial, así como con organismos de certificación externos y compradores en los mercados de destino.',
    results: [
      'Primer piloto exitoso de trazabilidad blockchain en la industria de ingredientes marinos en América Latina',
      'Transparencia B2B total del punto de captura al punto de venta, verificable por compradores internacionales',
      'Cumplimiento de estándares MarinTrust — referencia global de certificación de ingredientes marinos sostenibles',
      'Modelo replicable para otros actores de la industria pesquera regional que enfrentan las mismas exigencias de transparencia de cadena'
    ],
    category: 'redisenar-trabajo',
  },
  {
    number: '04',
    title: 'Economía circular en la industria pesquera',
    industry: 'Pesca Industrial · Economía Circular · Valor Compartido',
    geo: 'Costa peruana — múltiples puertos',
    tags: ['economía circular', 'residuos plásticos marinos', 'valor compartido', 'pesca sostenible', 'comunidades costeras', 'reciclaje industrial'],
    keyline: 'Modelo adoptado a nivel gremial por la Sociedad Nacional de Pesquería',
    challenge: 'Las redes de pesca industrial tienen un ciclo de vida finito. Cuando terminan su vida útil, representan uno de los residuos más peligrosos del océano: redes fantasma que continúan capturando fauna marina durante décadas, y toneladas de plástico que las cadenas formales de reciclaje convencional no están diseñadas para procesar. Las comunidades costeras adyacentes a los puertos industriales pesqueros tenían acceso a ese residuo pero carecían de los modelos de negocio, la capacitación técnica y los mercados finales para convertirlo en una actividad económica sostenible. El resultado era el peor escenario posible: una externalidad ambiental sin solución y una oportunidad económica sin capturar. Un programa de responsabilidad social corporativa había intentado abordar el problema con donaciones y talleres. Los resultados eran modestos y no escalaban. El desafío era transformar la lógica completa: de la filantropía al modelo de negocio.',
    approach: 'Nuestro equipo participó en el rediseño del modelo operativo y la arquitectura de sostenibilidad financiera del programa, transformando una iniciativa de RSE tradicional en un modelo de negocio inclusivo con economía propia. El nuevo modelo identificó los mercados finales con mayor potencial para las redes recicladas — equipos deportivos, materiales industriales, insumos para la construcción — y diseñó los flujos de valor que hacían viable la cadena: desde la recolección y clasificación en puerto hasta el procesamiento y la comercialización del producto reciclado. Las comunidades costeras participantes recibieron capacitación técnica en procesamiento de polímeros, formación empresarial y conexión con compradores del mercado formal. La corporación pesquera pasó de financiar el programa como costo de RSE a integrarlo como parte de su modelo operativo circular, con métricas verificables de impacto ambiental y social.',
    results: [
      'Adopción gremial por parte de la Sociedad Nacional de Pesquería — escalamiento del modelo a nivel sectorial',
      'Generación de empleos formales en múltiples zonas costeras del Perú',
      'Toneladas de residuos plásticos marinos valorizados y reintroducidos en cadenas de valor circulares',
      'Transformación del modelo: de programa de RSE financiado por la corporación a modelo de negocio con economía propia',
      'Reducción verificable de la presencia de redes fantasma en ecosistemas marinos de la costa peruana'
    ],
    category: 'redisenar-trabajo',
  },
  {
    number: '05',
    title: 'Green Loan de USD 80 millones',
    industry: 'Finanzas Verdes · ESG · Consumo Masivo · Acuicultura',
    geo: 'Perú (con alcance regional)',
    tags: ['green loan', 'finanzas verdes', 'ESG', 'due diligence ambiental', 'banca multilateral', 'descarbonización', 'criterios ESG'],
    keyline: 'Cierre exitoso con banca multilateral y privada internacional',
    challenge: 'El acceso a financiamiento verde corporativo — préstamos a tasas preferenciales condicionados al cumplimiento de estándares ambientales, sociales y de gobernanza — se está convirtiendo en una ventaja competitiva estructural para las corporaciones con operaciones de alto impacto ambiental. Sin embargo, las exigencias de la banca multilateral y privada internacional son rigurosas: métricas ambientales auditables, planes de descarbonización con hitos verificables, protocolos de remediación y evidencia de cumplimiento normativo en todos los mercados de operación. Para una corporación transnacional de consumo masivo con operaciones en agroindustria y acuicultura, superar esas salvaguardas no era un ejercicio de reporte — era un proceso de due diligence técnico de alta complejidad, con implicaciones directas sobre el acceso a USD 80 millones en condiciones preferenciales de la banca multilateral y privada internacional.',
    approach: 'Nuestro equipo participó activamente en el proceso de due diligence técnico-regulatorio corporativo para el levantamiento del Green Loan, como parte de un equipo multidisciplinario de alto nivel. La contribución abarcó el mapeo de métricas ambientales en operaciones clave, el análisis de cumplimiento regulatorio, la evaluación de los planes de descarbonización existentes y su alineación con los estándares internacionales exigidos, y el apoyo en el diseño de los protocolos de remediación y monitoreo continuo requeridos por los prestamistas. El proceso requirió coordinación entre las áreas de sostenibilidad, legal, finanzas y operaciones de la corporación, así como interlocución con los equipos técnicos de los bancos y los organismos de verificación externa.',
    results: [
      'Cierre exitoso del Green Loan por USD 80 millones, superando las estrictas salvaguardas ambientales de la banca multilateral y privada internacional',
      'Acceso a capital a tasas preferenciales — ventaja financiera directa derivada del desempeño ambiental demostrado',
      'Marco ESG robusto instalado en la corporación como activo estratégico para futuras operaciones de capital',
      'Modelo de referencia de due diligence ambiental para corporaciones latinoamericanas que buscan acceder a instrumentos de finanzas verdes internacionales'
    ],
    category: 'crear-valor',
  },
  {
    number: '06',
    title: 'Gobernanza circular para el Perú',
    industry: 'Políticas Públicas · Cooperación Internacional · Economía Circular',
    geo: 'Perú — alcance nacional',
    tags: ['economía circular', 'gobernanza', 'política pública', 'cooperación internacional', 'Unión Europea', 'transición circular Perú'],
    keyline: 'Diseño institucional de la plataforma nacional de economía circular',
    challenge: 'La transición de una economía lineal a una circular no ocurre por decreto. Requiere una plataforma de gobernanza que articule intereses frecuentemente divergentes: ministerios con mandatos distintos, gremios empresariales con agendas competitivas y organismos de cooperación con exigencias de accountability propias. El Perú tenía los compromisos internacionales — Acuerdo de Escazú, NDCs, hoja de ruta de economía circular del MINAM — pero carecía del mecanismo institucional que los hiciera operativos. Los esfuerzos de los ministerios de Ambiente y Producción eran paralelos, con poca coordinación y sin un espacio común donde el sector privado pudiera participar con reglas claras. La Unión Europea, a través de su programa de cooperación, tenía el mandato de apoyar esa transición. La pregunta era cómo construir una plataforma que sobreviviera más allá del financiamiento externo.',
    approach: 'Nuestro equipo asumió la coordinación técnica y el diseño institucional de la principal plataforma de gobernanza circular del Perú, bajo el programa de cooperación de la Unión Europea. El trabajo incluyó el diseño de los estatutos operativos de la plataforma, la arquitectura del modelo de toma de decisiones multiactor — incorporando representantes de ministerios, gremios privados y sociedad civil con roles y derechos de participación diferenciados — y el modelo de sostenibilidad financiera post-cooperación: el punto más crítico para asegurar la continuidad institucional más allá del ciclo de financiamiento externo. El diseño incorporó los aprendizajes de plataformas de gobernanza circular en Europa, adaptados al contexto institucional peruano: estructura de poder, cultura de negociación intersectorial y capacidades técnicas de los actores participantes.',
    results: [
      'Plataforma de gobernanza circular operativa articulando a los actores clave del ecosistema de economía circular en el Perú',
      'Modelo de sostenibilidad financiera que proyecta la continuidad institucional más allá del financiamiento de la cooperación europea',
      'Participación activa de ministerios, gremios y sector privado en un espacio compartido de toma de decisiones',
      'Referente regional: modelo de gobernanza replicable en otros países de América Latina en proceso de transición hacia economías circulares'
    ],
    category: 'transformar-modelo',
  },
  {
    number: '07',
    title: 'Diagnóstico estratégico de circularidad — 4 países',
    industry: 'Economía Circular · Agroindustria · Acuicultura',
    geo: 'Perú, Ecuador, Chile y Honduras',
    tags: ['economía circular', 'diagnóstico estratégico', 'agroindustria', 'circularidad empresarial', 'WBCSD', 'Nordic Innovation', 'sostenibilidad corporativa'],
    keyline: 'Framework Nordic Innovation + WBCSD en 4 países simultáneos',
    challenge: 'Las corporaciones con operaciones intensivas en recursos naturales enfrentan una presión creciente desde tres frentes simultáneos: la regulación ambiental internacional — especialmente la europea —, las exigencias de sus cadenas de suministro upstream y downstream, y los requerimientos de los mercados de capital para acceder a financiamiento verde. Responder a esos tres frentes con una estrategia coherente requiere primero un diagnóstico honesto del punto de partida. Para una corporación transnacional de alimento balanceado con operaciones en agroindustria y acuicultura en cuatro países, ese diagnóstico no podía ser genérico: necesitaba ser específico por país, por proceso y por línea de negocio, con métricas que permitieran la comparación internacional y la priorización de intervenciones de alto impacto.',
    approach: 'Nuestro equipo diseñó y ejecutó el diagnóstico estratégico de circularidad siguiendo el framework de Nordic Innovation — uno de los estándares metodológicos más rigurosos para la evaluación de modelos de negocio circular — complementado con las métricas del estándar de Indicadores de Circularidad de la WBCSD (World Business Council for Sustainable Development). El proceso incluyó el levantamiento de datos operacionales en las cuatro geografías, el análisis de flujos de materiales y energía por proceso productivo, la evaluación de la integración circular entre las distintas líneas de negocio y el benchmarking internacional con corporaciones comparables en Europa y Asia. El resultado fue una hoja de ruta de transición circular con iniciativas priorizadas por impacto potencial, viabilidad de implementación y retorno sobre la inversión.',
    results: [
      'Hoja de ruta de transición circular con iniciativas priorizadas para cuatro países y múltiples líneas de negocio',
      'Métricas alineadas con WBCSD — base para reportes de sostenibilidad internacionales y acceso a financiamiento verde',
      'Identificación de oportunidades de ahorro y eficiencia circular en procesos de alta intensidad de recursos',
      'Marco estratégico instalado en los equipos de sostenibilidad de la corporación para la gestión continua de la transición'
    ],
    category: 'redisenar-trabajo',
  },
  {
    number: '08',
    title: 'Innovación tecnológica en bionegocios amazónicos',
    industry: 'Bioeconomía · Innovación Tecnológica · Finanzas de Impacto',
    geo: 'Loreto, Amazonas, San Martín, Junín, Madre de Dios, Ucayali — Perú',
    tags: ['bionegocios amazónicos', 'inversión de impacto', 'innovación tecnológica', 'Amazonía peruana', 'selección de portafolio', 'fondos de impacto'],
    keyline: '8 bionegocios seleccionados y transformados en 3.5 meses',
    challenge: 'Los fondos de cooperación internacional destinados a la innovación tecnológica en bionegocios amazónicos suelen enfrentar el mismo problema de ejecución: dispersión de recursos entre muchos proyectos con impacto marginal, o concentración en proyectos visibles pero no representativos del ecosistema. La pregunta correcta o era cuántos bionegocios podían ser beneficiados — era cuáles tenían la madurez para convertir un fondo semilla en un salto real de capacidad. La complejidad del desafío era doble. Por un lado, la dispersión geográfica de los candidatos — bionegocios distribuidos en seis regiones amazónicas. Por otro, la naturaleza inusual del instrumento: un fondo no reembolsable (grant) que necesitaba ser gestionado con la rigurosidad y los criterios de selección de una inversión de alto impacto.',
    approach: 'Redesign Lab diseñó la metodología de evaluación y selección de portafolio, así como la tesis de inversión que orientó todo el proceso — aplicando criterios propios del capital de riesgo de impacto a un instrumento de cooperación: análisis de madurez empresarial, potencial de escalamiento, brecha tecnológica específica y capacidad del equipo gestor para ejecutar la adopción. A partir de un universo de más de 25 bionegocios candidatos en seis regiones, el proceso identificó y seleccionó los 8 proyectos con mayor potencial de transformación verificable. El sistema de ponderación diseñado para la selección incorporó variables cuantitativas y cualitativas — incluyendo el estado del activo natural, el modelo de gobernanza comunitaria y la elegibilidad para mercados internacionales. Los 8 bionegocios seleccionados recibieron estructuración presupuestal, cotización de proveedores y acompañamiento en un plazo de 3.5 meses.',
    results: [
      'Tesis de inversión de impacto diseñada para un instrumento no reembolsable — metodología sin precedente directo en el ecosistema de bioeconomía amazónica',
      '8 bionegocios amazónicos seleccionados y transformados tecnológicamente en 6 regiones de la Amazonía peruana',
      'Sistema de ponderación replicable para otros fondos de innovación en bioeconomía y conservación',
      'Ejecución en 3.5 meses en condiciones logísticas de alta complejidad territorial',
      'Modelo de referencia para la asignación eficiente de fondos de asistencia técnica con criterios de inversión de alto impacto'
    ],
    category: 'crear-valor',
  },
  {
    number: '09',
    title: 'Infraestructura de calidad para turismo circular',
    industry: 'Turismo · Economía Circular · Infraestructura de Calidad · Tecnología',
    geo: 'Perú — alcance nacional',
    tags: ['turismo sostenible', 'economía circular', 'certificación', 'INACAL', 'infraestructura de calidad', 'greenwashing', 'inteligencia artificial', 'regulación'],
    keyline: 'Estrategia de adopción de IA para modernizar INACAL',
    challenge: 'El turismo sostenible en el Perú enfrenta un problema de credibilidad estructural: proliferan las declaraciones de sostenibilidad sin mecanismos de verificación que las respalden. El resultado es un entorno donde el greenwashing es difícil de distinguir del desempeño genuino. La transición hacia un modelo de turismo circular requiere, como condición mínima, que existan normas técnicas verificables, laboratorios de metrología capaces de aplicarlas y esquemas de certificación que el mercado global pueda reconocer. En el Perú, esa infraestructura de calidad existía de forma fragmentada y con brechas significativas. A esto se sumaba un problema de velocidad: los procesos regulatorios operaban en tiempos muy distintos a los que el mercado necesitaba para dar certeza a los operadores privados.',
    approach: 'Redesign Lab ejecutó un diagnóstico de brechas entre la oferta estatal de infraestructura de calidad (NTPs, acreditadores, laboratorios) y la demanda real del sector privado turístico en proceso de transición circular. El análisis cubrió seis categorías: gestión de residuos, eficiencia energética, uso de agua, cadena de suministro, materiales de construcción y experiencia del visitante. Se identificaron normas internacionales de referencia y el estado de la oferta normativa peruana. Una dimensión crítica fue el diseño de una estrategia de adopción de inteligencia artificial para acelerar los procesos regulatorios de INACAL — identificando los cuellos de botella donde la IA podía comprimir tiempos de análisis normativo, actualización de NTPs y vigilancia tecnológica internacional.',
    results: [
      'Diagnóstico completo de la infraestructura de calidad disponible para el turismo circular en el Perú',
      'Mapa de brechas entre la oferta normativa peruana y los estándares internacionales de referencia',
      'Propuestas de esquemas de certificación adaptados al contexto del sector turístico peruano',
      'Estrategia de adopción de IA para INACAL — hoja de ruta para la modernización de los procesos regulatorios del sistema nacional de calidad',
      'Posicionamiento del Perú en el mapa regional de destinos turísticos con estándares de calidad verificables'
    ],
    category: 'transformar-modelo',
  },
  {
    number: '10',
    title: 'Ecosistema de innovación climática — 7+ ciudades',
    industry: 'Innovación Climática · Ecosistemas de Emprendimiento · Climate Tech · IA',
    geo: 'Perú — 7+ ciudades',
    tags: ['innovación climática', 'climate tech', 'GIZ', 'ecosistemas emprendimiento', 'startups climáticas', 'inteligencia artificial', 'emprendimiento'],
    keyline: 'Primera plataforma con IA para emprendimiento climático en el Perú',
    challenge: 'La innovación climática en América Latina enfrenta un problema de ecosistema: el talento existe, los problemas son urgentes, pero los emprendedores climáticos carecen de acceso a metodologías, redes y recursos que les permitan pasar de una idea a un prototipo con potencial de escala. El Perú — el tercer país más vulnerable al cambio climático — carecía de un mapeo sistemático de quiénes estaban trabajando en soluciones climáticas y con qué brechas prioritarias. Sin ese diagnóstico, la cooperación internacional y el sector privado estaban invirtiendo de forma desarticulada. El desafío adicional era la concentración geográfica: el ecosistema de innovación peruano estaba fuertemente centralizado en Lima, dejando a ciudades secundarias con alta vulnerabilidad climática sin acceso a las metodologías y redes.',
    approach: 'Redesign Lab, en alianza con GIZ y CATAL1.5T, ejecutó un programa de tres años (2022-2025) de desarrollo del ecosistema de innovación climática en el Perú. El primero fue el mapeo del ecosistema: un reporte exhaustivo de los actores de innovación climática en el Perú. El segundo fue el diseño e implementación de programas de innovación climática en más de 7 ciudades, con enfoque en sectores prioritarios (gestión del agua, deforestación, gestión de residuos). El tercero fue el desarrollo de una plataforma digital con soporte de inteligencia artificial para democratizar el acceso a las metodologías de desarrollo de startups climáticas. La plataforma lleva las herramientas de Lima a emprendedores en ciudades secundarias: un guía de IA que acompaña el proceso de ideación, validación y estructuración en tiempo real.',
    results: [
      'Primer mapa completo del ecosistema de innovación climática en el Perú — referente nacional para tomadores de decisiones',
      '7+ ciudades con programas de innovación climática diseñados e implementados',
      '3 años de operación continua (2022-2025) del programa más ambicioso de climate tech en el país',
      'Plataforma con IA que democratiza el acceso a metodologías de emprendimiento climático más allá de Lima — la primera de su tipo en el Perú',
      'Startups climáticas en etapa de prototipo que no existían antes del programa, en sectores de agua, deforestación, energía y gestión de residuos'
    ],
    category: 'transformar-modelo',
  },
  {
    number: '11',
    title: 'Fortalecimiento de portafolio para fondo climático',
    industry: 'Finanzas de Impacto · Bioeconomía · Conservación',
    geo: 'Amazonía peruana — múltiples regiones',
    tags: ['investment readiness', 'bionegocios', 'finanzas de impacto', 'Amazonía', 'conservación', 'pueblos indígenas', 'fondos climáticos'],
    keyline: 'Metodología de fortalecimiento de portafolio replicable',
    challenge: 'Los fondos climáticos con mandato en bioeconomía y conservación enfrentan una paradoja de portafolio: hay capital disponible, hay territorio con valor ecosistémico extraordinario — pero las propuestas tienen una brecha estructural entre la riqueza territorial que representan y la madurez financiera que se requiere. El problema no es de intención. Es de estructura: flujos de caja con supuestos no validados, presupuestos sin separación entre CAPEX y OPEX, modelos de sostenibilidad financiera que dependen íntegramente de subvenciones externas. Esas brechas no se cierran con más fondos — se cierran con acompañamiento técnico especializado antes de que el capital llegue. La consecuencia es que proyectos con alto valor territorial y comunitario son rechazados no por falta de mérito, sino por falta de estructura.',
    approach: 'Redesign Lab diseñó e implementó un programa de fortalecimiento de portafolio para un fondo climático regional — un proceso intensivo de revisión técnica y reestructuración financiera que combina análisis de impacto ambiental y bioeconomía con business analytics riguroso. El proceso para cada proyecto del portafolio incluyó: revisión técnica de los supuestos de impacto ambiental y social, reconstrucción financiera del modelo con separación explícita de CAPEX y OPEX, evaluación de la sostenibilidad financiera post-fondo, e identificación de las brechas específicas que impedían la elegibilidad. El resultado no era un reporte de diagnóstico — era un plan de trabajo acordado con cada proyecto para cerrar las brechas identificadas, con responsables, plazos definidos y criterios de re-evaluación claros.',
    results: [
      'Portafolio de proyectos de conservación y bioeconomía fortalecidos para alcanzar elegibilidad ante fondos climáticos internacionales',
      'Metodología de fortalecimiento de portafolio replicable para fondos con mandato en bioeconomía y conservación',
      'Reducción del tiempo de due diligence gracias a la mejora en la calidad de la documentación técnica y financiera de los proyectos',
      'Comunidades e iniciativas indígenas con propuestas que compiten en condiciones más equitativas con organizaciones de mayor capacidad institucional'
    ],
    category: 'crear-valor',
  },
  {
    number: '12',
    title: 'Modelo operativo para +1,000 agricultores amazónicos',
    industry: 'Agricultura Regenerativa · Tecnología Agrícola · Operaciones',
    geo: 'Amazonía peruana',
    tags: ['agricultura regenerativa', 'modelo operativo', 'tecnología low-tech', 'pequeños agricultores', 'datos offline', 'Amazonía', 'transformación digital agrícola'],
    keyline: '+1,000 familias agricultoras conectadas a sistema de gestión sin conectividad',
    challenge: 'Escalar un modelo de agricultura regenerativa en la Amazonía peruana es un desafío de ingeniería operativa antes que agronómico. Los productores están dispersos en zonas remotas con conectividad casi nula. Los asesores técnicos deben recorrer distancias enormes con limitadas herramientas de registro. Los datos de campo — críticos para la trazabilidad, la certificación y la gestión de costos — existen en cuadernos y en la memoria de los agricultores, no en sistemas que puedan informar decisiones en tiempo real. Para una operación con más de 1,000 familias agricultoras, la ausencia de un modelo operativo tecnológico era un límite estructural para la certificación internacional, el acceso a mercados premium y la gestión financiera que cualquier inversor externo requiere.',
    approach: 'Redesign Lab diseñó e implementó el modelo operativo y tecnológico completo para una operación de agricultura regenerativa de escala en la Amazonía peruana — desde la captura de datos en campo hasta la gestión financiera integrada. El núcleo de la solución fue el diseño de herramientas de captura de datos offline: aplicaciones y dispositivos de bajo costo que funcionan sin conectividad de red y sincronizan cuando el asesor técnico regresa a una zona con señal. Sobre esa base de datos se construyó un dashboard de gestión que da visibilidad en tiempo real al equipo directivo de la operación: estado del portafolio de parcelas, cumplimiento de protocolos y alertas. El dashboard se articuló con el ERP de gestión de costos y presupuestos, creando por primera vez una trazabilidad financiera completa de la operación. El tercer componente fue un programa estructurado de entrenamiento (transferencia de capacidades) para los asesores técnicos de campo.',
    results: [
      'Más de 1,000 familias agricultoras conectadas a un sistema de datos y gestión operativa en condiciones de conectividad casi nula',
      'Sistema de captura de datos offline — solución low-tech diseñada específicamente para las condiciones logísticas de la Amazonía peruana',
      'Trazabilidad completa de la operación desde la parcela hasta la gestión financiera, articulada con ERP',
      'Reducción de costos operativos y mejora de la eficiencia de supervisión gracias a la visibilidad en tiempo real',
      'Modelo de referencia para la digitalización de operaciones agrícolas de escala en entornos remotos de América Latina',
      'Base habilitadora para certificaciones internacionales que requieren trazabilidad de campo verificable'
    ],
    category: 'redisenar-trabajo',
  },
  {
    number: '13',
    title: 'IA para prospección de bioactivos amazónicos',
    industry: 'Bioeconomía · Inteligencia Artificial · Cosmética Natural · Suplementos Alimentarios',
    geo: 'Amazonía peruana — mercado global',
    tags: ['inteligencia artificial', 'bioactivos amazónicos', 'cosmética natural', 'suplementos', 'prospección de mercado', 'biodiversidad', 'bioeconomía', 'IA aplicada'],
    keyline: 'Compresión de meses a horas en el análisis de potencial de bioactivos',
    challenge: 'La Amazonía peruana alberga una de las concentraciones más altas de diversidad biológica del planeta — miles de especies vegetales con compuestos bioactivos de los que la ciencia global apenas comienza a documentar el potencial. Al mismo tiempo, la industria global de cosmética natural y suplementos alimentarios experimenta una demanda acelerada de ingredientes de origen botánico con propiedades funcionales verificables, historias de procedencia auténtica y cadenas de suministro trazables. El problema es de velocidad y escala. Identificar qué especie amazónica tiene mayor potencial para un mercado específico, en qué forma de presentación, con qué respaldo científico existente y con qué barreras regulatorias en cada jurisdicción — ese proceso toma meses de revisión de literatura científica, análisis de mercado y mapeo de competidores. Para una empresa de biocomercio o un fondo que evalúa oportunidades de inversión, esa velocidad no es competitiva.',
    approach: 'Redesign Lab desarrolló un modelo de inteligencia artificial para la prospección acelerada de ingredientes amazónicos con alto potencial comercial — diseñado para comprimir meses de análisis a horas, y con una cobertura de fuentes imposible de alcanzar manualmente. El sistema integra tres tipos de fuentes: literatura científica (bases de datos de propiedades bioactivas documentadas, estudios clínicos, publicaciones etnobotánicas), inteligencia de mercado (tendencias de ingredientes, análisis de patentes, movimientos de competidores), y datos regulatorios (marcos de aprobación de ingredientes en la UE, EE.UU. y mercados asiáticos clave). El modelo genera fichas de prospección por especie o compuesto que incluyen: potencial de mercado estimado, nivel de madurez científica, barreras de entrada regulatorias, referencias de competidores, y recomendaciones de posicionamiento diferencial.',
    results: [
      'Compresión del tiempo de prospección: de meses a horas para el análisis inicial de potencial comercial de un bioactivo amazónico',
      'Cobertura simultánea de literatura científica, inteligencia de mercado y marcos regulatorios en múltiples jurisdicciones',
      'Herramienta de decisión para empresas de biocomercio y fondos de impacto que evalúan oportunidades en ingredientes amazónicos',
      'Posicionamiento de la biodiversidad amazónica como ventaja competitiva verificable y accionable, no solo como narrativa de impacto',
      'Aplicación pionera de IA en la intersección de bioeconomía, mercados de cosmética natural y suplementos alimentarios en América Latina'
    ],
    category: 'transformar-modelo',
  },
]

export const projectCategories = [
  { value: 'all', label: 'Todos' },
  { value: 'crear-valor', label: 'Crear valor' },
  { value: 'redisenar-trabajo', label: 'Rediseñar el trabajo' },
  { value: 'transformar-modelo', label: 'Transformar el modelo' },
] as const

export const projectIndustries = [
  'Todas',
  'Venture Building',
  'Agricultura Regenerativa',
  'Tecnología',
  'Economía Circular',
  'Finanzas Verdes',
  'Política Pública',
  'Bioeconomía',
  'Turismo',
  'Climate Tech',
  'Finanzas de Impacto',
  'Inteligencia Artificial',
] as const
