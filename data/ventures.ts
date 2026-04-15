export interface Venture {
  name: string
  category: string
  location: string
  description: string
  tagline?: string
  hito?: string
  projection?: string
  tags: string[]
}

export const ventures: Venture[] = [
  {
    name: 'Cotton Nation',
    category: 'Agricultura Regenerativa · Textil Sostenible',
    location: 'San Martín, Perú',
    tagline: 'El mayor productor de algodón sostenible del Perú',
    description: 'Líder en el suministro de hilos de algodón orgánico y regenerativo de la Amazonía peruana para marcas globales de primer nivel: Patagonia, Lululemon, Hugo Boss, Lacoste y Eileen Fisher. Cotton Nation es hoy el mayor productor de algodón sostenible en el Perú. Opera una red de más de 1,000 familias agricultoras en San Martín bajo protocolos de agricultura regenerativa certificada — con la primera certificación Regenagri otorgada en el Perú y la primera empresa en el mundo en cumplir los requisitos de la línea regenerativa de Hugo Boss. Su modelo operativo incluye un sistema de trazabilidad digital con herramientas de captura de datos offline para entornos remotos sin conectividad, integradas con dashboard de gestión y ERP de costos en tiempo real.',
    hito: 'Primera empresa en el mundo en cumplir los requisitos de la línea regenerativa de Hugo Boss',
    projection: 'En 5 años, será el mayor productor de algodón del Perú.',
    tags: ['Agricultura Regenerativa', 'Certificación Regenagri', 'Textil Sostenible', 'Trazabilidad', 'Impacto Comunitario'],
  },
  {
    name: 'Neofibers',
    category: 'Biomateriales · Fibras Amazónicas · Moda de Lujo',
    location: 'Loreto y Madre de Dios, Perú',
    tagline: 'Biomateriales amazónicos para el mercado de lujo global',
    description: 'Neofibers desarrolla biomateriales para el mercado de la moda de lujo, conectando biodiversidad amazónica y comunidades indígenas con la industria de la moda global para regenerar la Amazonía. Opera con un proceso semi-industrial de desfibrado y estandarización en origen de palmeras nativas — chambira y piassaba — en Loreto y Madre de Dios, gestionado con participación directa de las comunidades nativas productoras. Tiene presencia comercial activa en los mercados de materiales sostenibles más relevantes del mundo: Future Fabrics Expo — Londres, Seek — Berlín, SIFF — Copenhague, Tranoi — París, Los Ángeles y Nueva York.',
    hito: 'Primera empresa peruana en conectar fibras amazónicas con compradores B2B internacionales bajo estándares de trazabilidad verificable',
    projection: 'Pionero en producción de biomateriales a escala industrial; en 5 años será la marca de lujo sostenible más importante del Perú en el mercado europeo.',
    tags: ['Biomateriales', 'Fibras Naturales', 'Moda de Lujo', 'Comunidades Nativas', 'Loreto · Madre de Dios'],
  },
  {
    name: 'Endemics',
    category: 'Perfumería Fina · Clean Beauty · Biotecnología Amazónica',
    location: 'Perú',
    tagline: 'Perfumería fina y clean beauty desde la biotecnología amazónica',
    description: 'Endemics opera en la intersección entre perfumería fina, clean beauty y biotecnología amazónica para crear ingredientes activos y fragancias de alto valor que no existen en ningún otro lugar del planeta. Combina investigación científica aplicada con procesos de extracción sostenible certificada de la biodiversidad amazónica peruana — operando en el segmento más sofisticado del mercado de cosmética natural: donde el producto no solo debe funcionar, sino tener procedencia verificable, impacto ambiental positivo demostrable y conexión auténtica con los ecosistemas que lo producen.',
    tags: ['Perfumería Fina', 'Clean Beauty', 'Biotecnología', 'Bioactivos Amazónicos', 'Cosmética Natural'],
  },
  {
    name: 'Rare by',
    category: 'Suplementos Nutricionales · Biodiversidad Peruana · Bienestar Funcional',
    location: 'Perú',
    tagline: 'Suplementos de alta gama desde la biodiversidad andina y amazónica',
    description: 'Rare by es una marca de suplementos nutricionales de alta gama construida sobre la biodiversidad andina y amazónica del Perú — una de las más ricas del planeta — con ingredientes activos que tienen evidencia científica de sus propiedades funcionales y una cadena de origen verificable. Opera en la convergencia entre nutrición de precisión, wellness premium y biocomercio — un espacio de crecimiento acelerado a nivel global donde el Perú tiene una ventaja competitiva natural que todavía no ha sido capturada a la escala que el mercado permite.',
    tags: ['Suplementos Nutricionales', 'Wellness Premium', 'Biodiversidad Peruana', 'Biocomercio', 'Ingredientes Activos'],
  },
  {
    name: 'GreenProd',
    category: 'Biotecnología · Bioinsumos Agrícolas · Economía Circular Pesquera',
    location: 'Ancash, Perú',
    tagline: 'De residuos de pesca artesanal a bioinsumos agrícolas de alto rendimiento',
    description: 'GreenProd transforma residuos y subproductos de la pesca artesanal de Chimbote en insumos orgánicos de alto rendimiento para la agricultura, mediante procesos biotecnológicos y un modelo de negocio circular. Genera valor en ambos extremos de la cadena: las asociaciones de pescadores artesanales tienen un destino formal y remunerado para sus subproductos; las asociaciones de agricultores acceden a bioinsumos orgánicos con origen marino verificable. Opera en Ancash con proyección a otras regiones agrícolas del país — incluyendo un vínculo estratégico natural con Cotton Nation, a quien puede proveer bioinsumos a medida para su operación de agricultura regenerativa.',
    projection: 'Posicionarse como el principal aliado de las empresas y asociaciones agrícolas de la costa norte del Perú, con expansión al resto del portafolio de Redesign Lab.',
    tags: ['Biotecnología', 'Bioinsumos', 'Economía Circular', 'Pesca Artesanal', 'Agricultura Orgánica', 'Ancash'],
  },
  {
    name: 'Ecovive',
    category: 'Consumo Saludable · Biodiversidad Peruana · Producción y Retail',
    location: 'Lima, Perú',
    tagline: 'Productos saludables desde la biodiversidad peruana',
    description: 'Ecovive produce y comercializa productos saludables elaborados con ingredientes naturales de origen peruano, seleccionados por su calidad y propiedades nutricionales. Su misión es ofrecer productos nutritivos y sostenibles que contribuyan al bienestar de sus clientes sin comprometer los sistemas naturales que los producen. Con presencia en Lima — incluyendo su tienda en Barranco — opera simultáneamente como productor de marca propia y como espacio curado que conecta al consumidor urbano consciente con la biodiversidad peruana de forma directa y verificable.',
    projection: 'Fortalecer su canal e-commerce e implementar nuevas tiendas en Lima para capturar mayor participación en el creciente mercado de consumo saludable.',
    tags: ['Consumo Saludable', 'Biodiversidad Peruana', 'Producción Propia', 'Retail Consciente', 'E-Commerce'],
  },
  {
    name: 'Thousandfold',
    category: 'Agencia Creativa · Diseño Estratégico · Identidad de Marca',
    location: 'América Latina',
    tagline: 'La agencia creativa que construye las marcas del portafolio',
    description: 'Thousandfold es la agencia creativa aliada del portafolio de Redesign Lab — responsable del diseño estratégico, la identidad visual y la comunicación de las ventures que se construyen desde el estudio. Opera en la intersección entre diseño, marca y narrativa para empresas que necesitan ser leídas, entendidas y recordadas en contextos exigentes: compradores globales, fondos de impacto, compradores premium. Su trabajo convierte la propuesta de valor de una venture en una expresión visual y verbal coherente — del logotipo al sitio web, de la presentación al pitch — sin perder la profundidad técnica del negocio detrás. Responsable del diseño y desarrollo de redesignlab.org y de la identidad visual de buena parte del portafolio.',
    projection: 'Consolidarse como la agencia creativa de referencia para empresas de bioeconomía, climate tech y economía regenerativa en América Latina.',
    tags: ['Agencia Creativa', 'Diseño Estratégico', 'Identidad de Marca', 'Desarrollo Web', 'Comunicación'],
  },
  {
    name: 'Startups4Climate',
    category: 'Plataforma con IA · Emprendimiento Climático',
    location: 'América Latina',
    tagline: 'Democratizando el emprendimiento climático con inteligencia artificial',
    description: 'Startups4Climate democratiza el acceso a las metodologías, herramientas y redes que necesita un emprendedor climático para pasar de una idea a una empresa con potencial de escala — llevando lo que antes solo estaba disponible en los grandes centros de innovación de la región a cualquier ciudad de América Latina. La plataforma utiliza inteligencia artificial para acompañar al emprendedor en tiempo real: desde la ideación hasta la estructuración de su propuesta de valor, con guías adaptadas al contexto geográfico, sector y nivel de madurez de cada usuario. Desarrollada a partir de tres años de trabajo en campo con el programa de innovación climática más ambicioso ejecutado en el Perú (2022-2025), en alianza con GIZ y CATAL1.5T. Presencia activa en más de 7 países de América Latina.',
    tags: ['Inteligencia Artificial', 'Climate Tech', 'Emprendimiento Climático', 'LATAM', 'Plataforma Digital'],
  },
]

// Generate URL-friendly slug from venture name
export function getVentureSlug(venture: Venture): string {
  return venture.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function findVentureBySlug(slug: string): Venture | undefined {
  return ventures.find((v) => getVentureSlug(v) === slug)
}

export const ventureMetrics = [
  { value: 10, label: 'empresas en el portafolio' },
  { prefix: '+USD ', value: 26, suffix: 'MM', label: 'en facturación' },
  { prefix: '+', value: 150, label: 'comunidades beneficiadas' },
  { prefix: '+', value: 70000, label: 'Tn CO₂ capturadas o reducidas' },
  { prefix: '+', value: 3500, label: 'hectáreas bajo manejo regenerativo' },
]
