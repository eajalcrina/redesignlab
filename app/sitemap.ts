import { MetadataRoute } from 'next'
import { projects, getProjectSlug } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redesignlab.org'

  const staticRoutes = [
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

  const projectRoutes = projects.map((p) => `/proyectos/${getProjectSlug(p)}`)

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : route.startsWith('/proyectos/') ? 0.6 : 0.8,
  }))
}
