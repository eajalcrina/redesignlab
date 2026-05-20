import { MetadataRoute } from 'next'
import { projects, getProjectSlug } from '@/data/projects'
import { ventures, getVentureSlug } from '@/data/ventures'
import { bbsPrograms } from '@/data/bbs'

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
    '/inteligencia-artificial/diagnostico',
    '/conocimiento',
    '/ventures',
    '/proyectos',
    '/como-pensamos',
    '/builders',
    '/cursos-bbs',
  ]

  const projectRoutes = projects.map((p) => `/proyectos/${getProjectSlug(p)}`)
  const ventureRoutes = ventures.map((v) => `/ventures/${getVentureSlug(v)}`)
  const bbsRoutes = bbsPrograms.map((p) => `/cursos-bbs/${p.slug}`)

  return [...staticRoutes, ...projectRoutes, ...ventureRoutes, ...bbsRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority:
      route === ''
        ? 1
        : route.startsWith('/proyectos/') || route.startsWith('/ventures/') || route.startsWith('/cursos-bbs/')
        ? 0.6
        : 0.8,
  }))
}
