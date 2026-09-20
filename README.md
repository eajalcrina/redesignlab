# Redesign Lab

Sitio web de [redesignlab.org](https://redesignlab.org): AI Studio para industrias de bioeconomía en América Latina.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (tokens en `tailwind.config.ts`) y Framer Motion
- Tipografía: Mluvka (CDNFonts) y JetBrains Mono
- Leads: Brevo (email) + Google Sheets, vía `/api/lead`
- Analytics: Google Tag Manager

## Desarrollo

```bash
npm install
cp .env.local.example .env.local   # completar variables
npm run dev                        # http://localhost:3000
npm run lint
npm run build
```

## Estructura

| Ruta | Propósito |
|---|---|
| `app/` | Páginas (cada una con `page.tsx` + `sections/`) |
| `components/layout/` | `Navigation` y `Footer` |
| `components/ui/`, `components/sections/` | Componentes reutilizables |
| `lib/constants.ts` | Menú (`NAV_LINKS`), footer, enlaces y datos de contacto |
| `data/` | Contenido estructurado (ventures, proyectos, BBS) |
| `next.config.mjs` | Redirects |
| `docs/` | Documentación técnica y planes |

## Registro de cambios

Trazabilidad de cambios relevantes del sitio, del más reciente al más antiguo. Cada entrada indica el motivo, qué cambió, el impacto en SEO y dónde está el código.

### 2026-09-20 · Bio/Builders reemplaza a Builders

**Rama:** `feat/biobuilders-page` · **Commit:** `b9b9634`

**Por qué:** Bio/Builders es la versión final del programa y reemplaza la página preliminar `/builders`. Spec de origen: `bio-builders-landing-spec.md`.

**Qué cambió**

- **Página nueva `/biobuilders`** (`app/biobuilders/`): 8 secciones — Hero, La tesis, Quién es un Bio/Builder, Cómo funciona (diagrama), Lo que buscamos lograr, cuña para bionegocios, Tipos de negocios y CTA final. Usa los tokens del sitio (`rl-red`, Mluvka, JetBrains Mono), no los del spec.
- **Se eliminó `/builders`** y sus 6 secciones antiguas (Participación, Re. Share, Especialidades, Ofertas de red, Ruta de inversión, Postulación).
- **Redirect permanente** `/builders` → `/biobuilders` en `next.config.mjs` (Next lo responde como 308).
- **Sitemap** actualizado (`app/sitemap.ts`) y canonical `/biobuilders`.
- **Enlaces** en `lib/constants.ts`: `BIOBUILDERS_FORM_URL` (formulario de postulación), `BIOBUILDERS_WHATSAPP_URL` (cuña de bionegocios, mensaje "Hola, soy un bionegocio") y `BIOBUILDERS_BOOKING_URL` (calendario, tarjeta "Cuéntanos sobre tu negocio").
- **Navegación** (`NAV_LINKS` + `components/layout/Navigation.tsx`):
  - Bio/Builders reemplaza a Fondos en el menú principal y hereda el punto rojo de marca.
  - Ventures y Fondos pasan a su submenú; Bio/Builders sale del submenú de Mindset.
  - Los submenús de escritorio ahora siempre están en el HTML (se ocultan con CSS) para que los enlaces sigan siendo rastreables.
  - En mobile, el submenú incluye el enlace a la página principal.
- **Enlaces internos** apuntan a `/biobuilders` y el label visible pasa de "Builders" a "Bio/Builders" (menú, footer, home, TeamSection, `ReIntelligenceBlock`). Se actualizó el copy de `BuildersPreview` en la home.

**Impacto SEO**

- `/builders` → `/biobuilders` con redirect permanente para conservar enlaces externos (LinkedIn, formulario).
- `/ventures` y `/fondos` siguen enlazadas desde el menú (ahora dentro del submenú) y desde el footer. Vigilar impresiones y posición de ambas URL en Search Console durante las 3–4 semanas posteriores a publicar.
- Reindexar `/biobuilders` en Search Console tras el despliegue.

**Integración con `main`:** antes del PR se integró `main` (rediseño de servicios, PR #1). Se resolvieron 3 conflictos: se aceptó la eliminación de `app/re-intelligence/sections/{BenefitsSection,WhatItIsSection}.tsx` (ruta reemplazada por `/acelera`) y en `ReIntelligenceBlock.tsx` se conservó el texto nuevo de `main` con el enlace a `/biobuilders`. El menú final combina los Servicios nuevos (ACELERA, Pon Orden, Consigue Capital, Vende más) con Bio/Builders.

**Verificación:** `tsc`, `npm run lint` y `npm run build` sin errores; revisión visual en escritorio y mobile (375 px).

**Pendiente**

- Probar a mano los enlaces externos (formulario, WhatsApp, calendario) en producción.
- Confirmar si "Cuéntanos sobre tu negocio" debe ir a un formulario dedicado en lugar del calendario.
