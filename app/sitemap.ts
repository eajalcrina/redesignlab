import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redesignlab.org'

  const routes = [
    '',
    '/crear-valor',
    '/redisenar-el-trabajo',
    '/transformar-el-modelo',
    '/re-intelligence',
    '/fondos',
    '/inteligencia-artificial',
    '/conocimiento',
    '/ventures',
    '/proyectos',
    '/como-pensamos',
    '/builders',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}
