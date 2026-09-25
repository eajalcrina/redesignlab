import { MetadataRoute } from 'next'
import { projects, getProjectSlug } from '@/data/projects'
import { ventures, getVentureSlug } from '@/data/ventures'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://redesignlab.org'

  const staticRoutes = [
    '',
    '/empresas',
    '/crear-valor',
    '/transformar-el-modelo',
    '/acelera',
    '/pon-orden',
    '/consigue-capital',
    '/vende-mas',
    '/fondos',
    '/inteligencia-artificial/diagnostico',
    '/conocimiento',
    '/ventures',
    '/proyectos',
    '/como-pensamos',
    '/biobuilders',
  ]

  const projectRoutes = projects.map((p) => `/proyectos/${getProjectSlug(p)}`)
  const ventureRoutes = ventures.map((v) => `/ventures/${getVentureSlug(v)}`)

  return [...staticRoutes, ...projectRoutes, ...ventureRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority:
      route === ''
        ? 1
        : route.startsWith('/proyectos/') || route.startsWith('/ventures/')
        ? 0.6
        : 0.8,
  }))
}
