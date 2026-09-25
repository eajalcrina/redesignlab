# Rediseño por audiencias: Home, Empresas e Instituciones

**Fecha:** 2026-09-24 · **Autor:** Eddie Ajalcriña (decisiones) con Claude (diseño y spec)
**Estado:** spec aprobada por Eddie (2026-09-24). Rama: `feat/audiencias-redesign` desde `main`.

## 1. Objetivo

Reorganizar redesignlab.org alrededor de sus tres clientes: **Empresas**, **Bio/Builders** e **Instituciones**, más **Proyectos**, **Ventures** (dentro de Bio/Builders) y **Conocimiento**. La prioridad es la lectura rápida: páginas cortas que lleven a una reunión uno a uno, no a leer más. La prioridad secundaria es no perder SEO: nada se borra si se puede ocultar, y solo se redirige cuando una página nueva reemplaza a la anterior.

### Fuentes de contenido

| Página | Fuente de texto | Mockup aprobado (local, ignorado por git) |
|---|---|---|
| Home | `~/Downloads/Home vf.pdf` + cambios aprobados en esta sesión | `.superpowers/brainstorm/23145-1790287874/content/home-v6.html` |
| Empresas | `~/Downloads/Empresas — vf.pdf` + cambios aprobados | `…/content/empresas-v5.html` |
| Instituciones | `~/Downloads/Redesign Lab — Home (propuesta).pdf` (vista de Instituciones, 24-sep 16:32) + cambios aprobados | `…/content/instituciones-v3.html` |
| Pestaña de anuncios | — | `…/content/_ann.part` (componente aislado) |

Los mockups son la referencia visual y de comportamiento. Para verlos: `scripts/start-server.sh --project-dir <repo>` del skill de brainstorming, o abrirlos directo (las imágenes se sirven desde `/files/`).

## 2. Arquitectura de información

### 2.1 Menú principal (`NAV_LINKS`)

```
Empresas · Bio/Builders ▾ · Instituciones · Proyectos · Conocimiento        [Escribir al equipo ↗]
                └ Ventures
```

| Etiqueta | URL | Notas |
|---|---|---|
| Empresas | `/empresas` | Página nueva |
| Bio/Builders | `/biobuilders` | Conserva el punto rojo. Submenú: Bio/Builders, Ventures (`/ventures`) |
| Instituciones | `/fondos` | **La URL no cambia** (decisión SEO); solo cambian la etiqueta y el contenido |
| Proyectos | `/proyectos` | Sin cambios |
| Conocimiento | `/conocimiento` | Pasa al primer nivel |
| Escribir al equipo ↗ | `SITE_CONFIG.calendarUrl` | Hoy es `mailto:`; pasa al calendario, igual que el resto de los CTA de conversación |

Salen del menú: Mindset (Cómo pensamos, Cursos BBS), IA (Inteligencia artificial, Diagnóstico), Servicios (ACELERA, Pon Orden, Consigue Capital, Vende más) y Fondos (renombrado a Instituciones).

### 2.2 Estado de cada URL

| URL | Estado | En sitemap | Enlazada desde el sitio |
|---|---|---|---|
| `/` | Rediseñada | Sí | — |
| `/empresas` | **Nueva** | Sí | Menú, Home, footer |
| `/fondos` | **Contenido reemplazado** (Instituciones) | Sí | Menú, Home, footer |
| `/biobuilders`, `/ventures`, `/ventures/*`, `/proyectos`, `/proyectos/*`, `/conocimiento`, `/privacidad` | Sin cambios de contenido (heredan menú y footer) | Sí | Sí |
| `/acelera`, `/pon-orden`, `/consigue-capital`, `/vende-mas` | **Ocultas y vivas** | Sí | No |
| `/crear-valor`, `/transformar-el-modelo`, `/como-pensamos` | **Ocultas y vivas** | Sí | No |
| `/inteligencia-artificial/diagnostico` | **Oculta y viva** | Sí | Solo desde la sección de IA de `/empresas` |
| `/inteligencia-artificial` | **Redirect 308** → `/empresas#ia` | No | No |
| `/cursos-bbs`, `/cursos-bbs/:slug` | **Redirect 308** → `https://biobusinessschool.org` | No | No |

"Oculta y viva" significa que la página sigue respondiendo 200, indexable y en el sitemap, sin enlaces internos. Sigue recibiendo tráfico de Google y enlaces externos, y hereda el menú y el footer nuevos.

**El código no se borra.** Las carpetas `app/inteligencia-artificial/` y `app/cursos-bbs/` se quedan donde están: en Next, los `redirects()` de `next.config.mjs` tienen prioridad sobre las rutas, así que no se renderizan y se pueden restaurar quitando el redirect. `/inteligencia-artificial/diagnostico` necesita una excepción, porque el redirect de `/inteligencia-artificial` no puede capturarla (se usa `source: '/inteligencia-artificial'` exacto, sin `:path*`).

### 2.3 Redirects (`next.config.mjs`)

Se agregan a los existentes (`www`, `/builders`, `/index`, `/re-intelligence`, `/redisenar-el-trabajo`), que no cambian. No se forman cadenas nuevas: `/acelera` y `/pon-orden` siguen vivas.

```js
{ source: '/inteligencia-artificial', destination: '/empresas#ia', permanent: true },
{ source: '/cursos-bbs', destination: 'https://biobusinessschool.org', permanent: true },
{ source: '/cursos-bbs/:slug', destination: 'https://biobusinessschool.org', permanent: true },
```

### 2.4 Enlaces internos que hay que retirar o repuntar

Todas las referencias actuales a páginas ocultas o redirigidas se quitan o apuntan a la página nueva. Inventario (grep del 2026-09-24):

| Archivo | Hoy apunta a | Nuevo destino |
|---|---|---|
| `lib/constants.ts` → `NAV_LINKS`, `SERVICE_PATHS`, `FOOTER_LINKS` | varias | Según §2.1 y §4.2 |
| `app/(landing)/sections/*` | `/acelera`, `/inteligencia-artificial*`, `/fondos`, servicios | La Home se reescribe (§3.1); las secciones que no se usan quedan sin importar |
| `app/proyectos/sections/CtaSection.tsx` | `/acelera` + `mailto:` | **Solo calendario** (decisión 2026-09-24): se retira toda referencia a ACELERA y a las páginas de servicio |
| `components/sections/MaturityChecker.tsx` | `/acelera`, `/pon-orden`, `/conocimiento` | Solo se usa en `/inteligencia-artificial/diagnostico` (oculta): `/acelera` y `/pon-orden` → `/empresas`, porque el diagnóstico es la única página oculta que sí se enlaza |
| `components/sections/ReIntelligenceBlock.tsx` | `/acelera`, `/inteligencia-artificial/diagnostico` | Solo se usa en `/transformar-el-modelo` (oculta) y en `LandingReIntelligence` (sale de la Home): se deja |
| `components/sections/services/CrossLinks.tsx` | `/acelera` | Solo aparece en páginas ocultas: se deja |
| `components/bbs/ProgramDetail.tsx` | `/cursos-bbs` | Solo en páginas redirigidas: se deja |
| `app/biobuilders/sections/HowItWorksSection.tsx` | `/ventures` | Se mantiene |

Los enlaces **entre** páginas ocultas (por ejemplo `/crear-valor` → `/pon-orden`) se mantienen.

## 3. Páginas

Sistema visual común (§4): alternancia de secciones oscuras (`#0D0D0D`), crema (`#F5F3F0`) y un único bloque rojo (`#F32769`) por página como máximo. Mluvka para títulos y texto, JetBrains Mono para etiquetas. Etiquetas de sección con numeración editorial (`01 —— Nombre`).

### 3.1 Home (`/`) · mockup `home-v6.html`

| # | Sección | Fondo | Contenido y comportamiento |
|---|---|---|---|
| — | Hero | Oscuro | Etiqueta "The AI Studio for Bioeconomy Industries". H1 *"La bioeconomía de América Latina tiene el potencial."* + segunda frase en gris *"Nosotros lo convertimos en negocios que escalan."* Párrafo "Somos un Venture Studio boutique…". **Dos botones, ambos al calendario:** "Escalemos juntos ↗" (rojo) y "Accede a capital de impacto ↗" (contorno). A la derecha, fundido entre 4 fotos en duotono rojo, cada 6 s con zoom leve, y barra de progreso `01 —— 04`. |
| — | Aliados | Oscuro | "Hemos colaborado con" + la **lista completa de `ALLIES`** (35) como texto corrido separado por `/`. Sin carrusel. |
| 01 | Nuestra tesis | Crema | H2 "¿Por qué los bionegocios en América Latina no escalan?" a la izquierda; dos párrafos a la derecha. |
| — | Cinturón de fotos | Crema | Tira de 84 px de alto con **todas** las fotos del sitio (hero, ventures, portadas de conocimiento; 37 hoy). Dos copias idénticas en bucle (`translateX(-50%)`, 150 s, lineal), bordes con máscara difuminada. Se pausa al pasar el mouse. Miniaturas livianas (≈170 px de alto). |
| — | Declaración "El temor de fondo" | Oscuro | Sección compacta (~590 px a 1440×900). Etiqueta con línea roja. *"Si el fondo se acaba, **el bionegocio se cae.**"* (84 px; la segunda mitad en rojo). Línea fina + frase de apoyo aprobada: *"Es lo que escuchamos en cada territorio: negocios con potencial real que dependen de fondos no reembolsables y de la cooperación. Resolver esa dependencia es el punto de partida de todo lo que hacemos."* + "Por eso ↓". **Sin** revelado por línea. |
| 02 | Nuestra propuesta | Crema | Sección protagonista (≈92vh, contenido centrado). H2 46 px "Por eso hacemos Venture Building…". Dos paneles compactos, ancho máx. 1080 px: **Empresas** (blanco) → `/empresas`; **Bio/Builders** (grafito `#2A2A2A`) → `/biobuilders`. Al pasar el mouse, el rojo sube y llena el panel; el círculo de la flecha gira. |
| 03 | Cómo escalamos el modelo | Oscuro | Declaración grande (96 px): *"No podemos construir todas las empresas, **pero podemos multiplicar el impacto.**"* + párrafo del modelo + "Seis divisiones ↓". Debajo, índice de 6 filas. **La temática es el título** y la marca va debajo, en rojo. Miniatura en duotono que pasa a color al pasar el mouse. Dominio a la derecha con ↗ animada. |
| 04 | Para instituciones | Rojo | Foto de comunidad en duotono al fondo. "¿Quieres llevar esto a tus empresas beneficiarias?" + botón oscuro "Conoce cómo trabajamos con instituciones ↗" → `/fondos`. |
| 05 | Conocimiento | Crema | Texto + "Ver todos los recursos →" (`/conocimiento`). A la derecha, 3 PDFs con portada: BIRF, Innovation Matrix, Re·IA (descarga directa). |
| 06 | Fundadores | Oscuro | H2 del mockup. **Bios completas de `data/team.ts`**, foto en duotono → color al pasar el mouse, LinkedIn, cita. Cierre "Súmate a Bio/Builders →". **Sin** "Conócenos más". |
| — | Cierre | Crema | "Empecemos a construir bionegocios que compiten de verdad." + "Agendar una conversación ↗" (calendario) + correo. Sin pestaña de anuncios (`data-no-announce`). |

**Divisiones (fila por fila):**

| Temática (título) | Marca | Texto | Enlace |
|---|---|---|---|
| Acceso a capital de impacto | Fondo de Impacto | Estudio especializado en facilitar el acceso a capital de impacto y canalizar inversión privada hacia empresas de alto potencial. | `https://fondodeimpacto.pe` |
| Marcas regenerativas | ThousandFold | Estudio de branding que construye la identidad y narrativa de marcas con propósito verificable. | `https://www.thousandfold.la` |
| Bioeconomía | Bio Business School | Concentra nuestro conocimiento trabajando con bionegocios en los territorios y lo convierte en consultoría y formación especializada. | `https://biobusinessschool.org` |
| Negocios regenerativos | Regenerative Platform Latam | Plataforma que promueve negocios regenerativos en toda América Latina. | `https://regenerativelatam.org` |
| Economía circular | Circular Club | Comunidad de expertos que diseñan soluciones para la transición circular. | `https://circularclub.la` ⚠️ ver §7 |
| Inteligencia artificial | IA para Empresas · nueva división | Integramos inteligencia artificial en la operación de empresas de toda América Latina, no solo de bioeconomía. | Sin enlace · "Próximamente" |

Los enlaces externos se abren en pestaña nueva con `rel="noopener"`.

### 3.2 Empresas (`/empresas`, nueva) · mockup `empresas-v5.html`

| # | Sección | Fondo | Contenido y comportamiento |
|---|---|---|---|
| — | Hero | Oscuro | Etiqueta "Empresas". H1 "Diseñamos, escalamos e invertimos en negocios con potencial real, *para convertirlos en empresas que compitan en los mercados más exigentes.*" (segunda parte en gris). Subtítulo "Buscamos empresas con potencial real para asociarnos y escalar juntos." Botón "Escalemos juntos ↗" (calendario). Franja de 4 fotos en duotono. |
| 01 | Nuestra propuesta principal | Crema | Tarjeta blanca con borde superior rojo: "Asociarnos" / **"¿Necesitas un socio para crecer?"** + texto + botón **"Conversemos ↗" (calendario)**. Debajo, "Nuestro track record como socios": grilla 3×2 con líneas finas; "+" en rojo y número en tinta. |
| 02 | ¿Prefieres solo ayuda, sin asociarte? | Oscuro | Dos tarjetas grafito, **Asesoría** y **Capital**, con relleno rojo al pasar el mouse. Ambas → "Agenda una conversación" (calendario). **No enlazan a las páginas de servicio ocultas.** |
| 03 | Nuestras fortalezas como socios | Crema | **Recorrido con foto fija**: columna izquierda `sticky` (top ≈110 px) con una foto que cambia según el frente activo, más un contador `01 / 04` y el nombre. Columna derecha: los 4 frentes con mucho aire (título 44 px, texto 18 px). El activo se muestra al 100% y los demás al 35%. Detección con `IntersectionObserver` (`rootMargin: -45% 0 -45% 0`). Fotos: mapeo (hero-16) · planta (hero-08) · producto textil (hero-14) · productora con fibra (`conocimiento/birf.jpg`). |
| 04 | El rol de la IA (`id="ia"`) | Oscuro | Destino del redirect de `/inteligencia-artificial`. Izquierda: H2 "Usamos IA para amplificar nuestro criterio y experiencia." + texto + "Haz el diagnóstico de IA de tu empresa →" (`/inteligencia-artificial/diagnostico`). Derecha: **tarjeta de partner Claude**, con borde y etiqueta en terracota `#D97757`: **logo oficial completo en versión blanca** (54 px de alto) + "Network Partner · Redesign Lab es partner de la red de Claude". **Usar el archivo oficial del kit de partners** (ver §7). "Descubre IA para Empresas" **no se muestra**. |
| — | Cierre | Crema | "¿Crees que podemos ser un buen socio para tu empresa?" + "Agendar una conversación ↗" (calendario). |

### 3.3 Instituciones (`/fondos`, contenido reemplazado) · mockup `instituciones-v3.html`

| # | Sección | Fondo | Contenido y comportamiento |
|---|---|---|---|
| — | Hero | Oscuro | Etiqueta "Instituciones · Fondos y cooperación". H1 "Invertir e intervenir en bioeconomía tiene un riesgo que la asistencia técnica tradicional no resuelve. *Nuestra experiencia real en el territorio, sí.*" + subtítulo del PDF + "Iniciar conversación ↗" (calendario). Franja de 4 fotos: comunidad, campo, COP16, pesca. |
| 01 | Dos grandes problemas | Crema | Título aprobado: **"¿Desde dónde trabajas la bioeconomía?"**. Selector segmentado **"Soy un fondo de inversión / Soy una agencia u ONG"**. Cada panel muestra la etiqueta del actor, el problema (título 44 px + texto) y, a la derecha, una tarjeta blanca con borde rojo "Cómo ayudamos" + respuesta + "Iniciar conversación ↗". Transición de fundido y desplazamiento. Accesible como `tablist`. |
| 02 | Lo que aportamos | Oscuro | Las tres capacidades en filas tipo índice (número, título 30 px, texto). |
| 03 | Proceso integral de acompañamiento | Crema | Línea de tiempo de 5 etapas con **animación progresiva** al entrar en pantalla (50% visible): la 01 se enciende en rojo; la línea roja avanza **lineal, 2,6 s por tramo**, hasta la siguiente, que se enciende al llegar; y así hasta la 05 (~11 s en total). Mientras corre, las etapas pendientes se ven al 45%. Se repite si el usuario sale por arriba y vuelve a entrar. Con reducción de movimiento, se muestra todo encendido. Textos: ver abajo. |
| 04 | Nuestro track record | Oscuro | 6 cifras en grilla 2×3 a la izquierda. A la derecha, la **Nota** completa sobre el fondo propio + `fondodeimpacto.pe ↗`. |
| — | Cierre | Crema | "La conversación correcta comienza aquí." + "Iniciar conversación ↗". **Sin** el párrafo "Redesign Lab trabaja con un número acotado…". |

**Textos del proceso (aprobados):**

1. **Sourcing:** Identificamos oportunidades en cadenas de valor y territorios.
2. **Due Diligence:** Validamos técnicamente el modelo de negocio, cadena, equipo y territorio, no solo números.
3. **Value Building:** Aceleramos la creación de valor en las organizaciones: comercialización, operación y tecnología.
4. **Monitoring:** Monitoreo continuo con datos de campo y alertas tempranas para el comité de inversión. *(Sin "¿Te interesa? Escríbenos.")*
5. **Impact Reporting:** Métricas de impacto y reportes verificables con datos de campo, los que LP y mercado exigen.

## 4. Componentes y sistema compartido

### 4.1 Menú (`components/layout/Navigation.tsx`)
- Fijo y oscuro con desenfoque, como hoy. **No** se esconde al hacer scroll ni cambia de tono (efecto 2 descartado).
- Estado activo en blanco. Submenú de Bio/Builders con Ventures. En móvil, el submenú sigue incluyendo la página principal, como ya hace el componente.

### 4.2 Footer (`components/layout/Footer.tsx` + `FOOTER_LINKS`)
- Columnas: **Trabaja con nosotros** (Empresas, Bio/Builders, Instituciones) · **Portafolio** (Proyectos, Ventures, Conocimiento) · **Contacto** (correo, teléfono, dirección, newsletter).
- Base: © 2026 Redesign Ventures SAC · Privacidad | **"Diseño y desarrollo por Thousandfold"** → `https://www.thousandfold.la/` (se mantiene el crédito actual).
- Se retira la columna "Servicios" (sus enlaces van a páginas ocultas).

### 4.3 Pestaña de anuncios (`components/ui/AnnouncementTab.tsx` + `data/announcements.ts`)
- **Datos:** arreglo de campañas `{ id, label, kicker, title, primary: {label, href}, secondary: {label, href}, start, end, excludePaths[] }`. Se muestra la primera campaña vigente. Primera campaña: `biobuilders-2026` → "Súmate a la red de Bio/Builders 2026." · "Postula aquí ↗" (`BIOBUILDERS_FORM_URL`) · "Descubre más →" (`/biobuilders`) · excluida en `/biobuilders`.
- **Escritorio:** lengüeta vertical fija en el borde derecho, al 62% de la altura (34 px de ancho, texto en mono y punto rojo que late 3 veces). Aparece a los 2,5 s o al 20% de scroll, nunca en el primer pintado. Se repliega mientras se hace scroll hacia abajo y vuelve al detenerse o subir. Se abre al pasar el mouse (140 ms de intención), con clic o con teclado; se cierra con Esc o clic fuera. La primera visita tiene un "asomo" de 3 s. **Tono adaptable:** crema sobre secciones oscuras y oscura sobre crema o rojo (`data-theme` en cada sección). Oculta sobre secciones con `data-no-announce` (cierre y footer).
- **× = minimizar** (no cerrar): la pestaña se ve igual, pero ya no se abre sola ni al pasar el mouse, solo con clic. El estado se recuerda por campaña (`localStorage` en try/catch). Un clic la restaura.
- **Móvil (<768 px):** píldora abajo a la derecha que abre una tarjeta compacta.
- **Eventos (dataLayer):** `announcement_view`, `announcement_open`, `announcement_click_apply`, `announcement_click_more`, `announcement_minimize`, `announcement_restore`, cada uno con `campaign`.
- Carga diferida (`next/dynamic`, `ssr: false`).

### 4.4 Piezas reutilizables nuevas
- `SectionLabel`: numeración editorial `01 —— Texto` (número rojo, línea, texto gris).
- `StatementSection`: declaración grande con etiqueta, frase con segunda parte en rojo, línea y nota inferior.
- `PhotoBelt`: cinturón continuo (§3.1), con `next/image` y `sizes` pequeños.
- `ArrowIcon`: ↗ que sale por una esquina y entra por la otra al pasar el mouse (refinamiento 7).
- `FillPanel`: tarjeta con relleno rojo desde abajo al pasar el mouse (Home 02, Empresas 02).
- `ProgressTimeline`: proceso animado de Instituciones.
- `AudienceSwitch`: selector de Instituciones 01.
- Grano analógico: pseudo-elemento con ruido SVG al 7% en `overlay` sobre `.section-dark` (refinamiento 5).

### 4.5 Movimiento
- **Se usan:** aparición suave al hacer scroll (`SectionReveal`, ya existe), fundido del hero, cinturón, rellenos al pasar el mouse, pestaña de anuncios, proceso animado, flechas animadas, grano.
- **Descartados por decisión:** revelado de títulos por línea, menú que se adapta y se esconde, fotos con recorte (efectos 1, 2 y 3).
- **Transición entre páginas (refinamiento 8):** `@view-transition { navigation: auto }` solo aplica a navegaciones de documento completo, y Next navega del lado del cliente. Se implementa con `document.startViewTransition` alrededor de la navegación del router (evaluar `next-view-transitions`) o, si da problemas, con el `PageTransition` de framer-motion que ya envuelve `app/layout.tsx`. Mejora progresiva: sin soporte, la navegación funciona igual.
- Todo respeta `prefers-reduced-motion`.

## 5. Contacto y medición
- **Todos** los CTA de conversación (hero, Asociarnos, Asesoría, Capital, Iniciar conversación, cierres, "Escribir al equipo") → `SITE_CONFIG.calendarUrl`, en pestaña nueva. Si más adelante hay agendas por público, se agregan `calendarUrlEmpresas` y `calendarUrlInstituciones` en `SITE_CONFIG` sin tocar los componentes.
- Evento `cta_calendar` en dataLayer con `{ page, location }` en cada botón.
- Se conserva el correo visible (`eddie@redesignlab.org`) bajo los cierres.

## 6. SEO

- **Metadata:**
  - `/empresas`: title "Empresas" · description ≤160 caracteres a partir del H1.
  - `/fondos`: title "Instituciones: fondos y cooperación" · description nueva ≤160 caracteres · canonical `/fondos`.
  - Home: revisar la description actual, que supera 160 caracteres (auditoría del 18-abr).
- **Encabezados:** un H1 por página. Las declaraciones grandes son H2 (la de "El temor de fondo" es `blockquote`).
- **Sitemap (`app/sitemap.ts`):** agregar `/empresas`; quitar `/inteligencia-artificial`, `/cursos-bbs` y `/cursos-bbs/*`; **mantener** las páginas ocultas.
- **Schema:** mantener Organization y WebSite. Agregar `BreadcrumbList` en `/empresas` y `/fondos`, y `Service` para Empresas e Instituciones (opcional en esta fase).
- **Enlaces externos** de divisiones: `rel="noopener noreferrer"`. No `nofollow`: son marcas propias.
- **Después de publicar:**
  - Search Console: inspeccionar y pedir indexación de `/`, `/empresas` y `/fondos`.
  - Validar los redirects.
  - Vigilar impresiones de las páginas ocultas y de `/fondos` durante 4 semanas.
  - Registrar el cambio en el README (registro de cambios).

## 7. Pendientes antes de publicar

| # | Tema | Responsable | Bloquea |
|---|---|---|---|
| 1 | ~~Validar las 6 cifras del track record~~ ✅ Confirmadas por Eddie (2026-09-24) | — | — |
| 2 | ~~Claude Network Partner~~ ✅ Permiso confirmado y **ícono oficial recibido** (PNG 1000×1000, transparente; copia en `.superpowers/brainstorm/23145-1790287874/assets/claude-spark-original.png`). Luego Eddie compartió el **logo completo** (espiga + logotipo). Se usa ese, con el texto convertido a blanco para fondo oscuro: `docs/superpowers/assets/2026-09-24/claude-logo-white.png` (2000×429, transparente) → `public/assets/partners/claude-logo-white.png`. Mockup: `empresas-v5.html` | — | — |
| 3 | **`circularclub.la` no carga por HTTPS** (por `http` redirige a `https`, y ahí no responde; probablemente el certificado). Mientras no se arregle, la fila queda sin enlace | Eddie / Circular Club | No |
| 4 | `/conocimiento`: la *Guía de Due Diligence Técnico* y la *Guía de Inversión con Comunidades Nativas* figuran como disponibles, pero su descarga es `#` (fallan hoy en producción). Subir los PDFs o marcarlas "Próximamente" | Eddie | No (se corrige en esta rama) |
| 5 | Frase casi repetida: H1 de Empresas ≈ párrafo del hero de la Home ("Diseñamos, escalamos e invertimos…"). Decidir si se ajusta uno | Eddie | No |
| 6 | Agendas separadas por público (opcional) | Eddie | No |
| 7 | ~~Rama base~~ ✅ Decisión: la rama nueva sale de **`main`**. `fix/copy-alignment` queda sin efecto (no se integra ni se borra). Sus cambios que siguen vigentes se rehacen en esta rama: el wording "líderes de bionegocios" en `data/ventures.ts` (la página Ventures sigue visible) y quitar `reSprint` de `data/services.ts`. El resto de esa rama tocaba páginas que ahora quedan ocultas o redirigidas | — | — |

**Textos nuevos aprobados en esta sesión (no estaban en los PDF):**
- Home: frase de apoyo bajo "El temor de fondo".
- Home: "Por eso ↓" y "Seis divisiones ↓".
- Instituciones: "¿Desde dónde trabajas la bioeconomía?", "Soy un fondo de inversión / Soy una agencia u ONG" y "Cómo ayudamos".
- Empresas: "Conversemos", "Agenda una conversación" y "Asesoría y capital" (etiqueta de la sección 02).

## 7.1 Auditoría de enlaces (2026-09-24)

**Externos verificados (HTTP 200):**
- Calendario general `calendar.app.google/C8nGhVz5m6SAR61r5`
- Formulario Bio/Builders `forms.gle/V4DgjHSDM589hJ1W9`
- Agenda Bio/Builders `calendar.app.google/j4bJRNs2ZhHvuXqP6`
- Newsletter (`campaigns.redesignlab.org`)
- LinkedIn de Eddie y de Lorenzo
- `thousandfold.la`, `fondodeimpacto.pe`, `biobusinessschool.org`, `regenerativelatam.org`
- Los 3 PDF de conocimiento enlazados en la Home
- `/inteligencia-artificial/diagnostico`

**Sueltos detectados, que se resuelven en esta rama:**

| # | Qué | Acción |
|---|---|---|
| a | `circularclub.la` no responde por HTTPS | La fila queda sin enlace hasta que se arregle (pendiente 3) |
| b | 2 guías de `/conocimiento` con descarga `#` | Marcar como "Próximamente" hasta tener el PDF (pendiente 4) |
| c | `app/proyectos/sections/CtaSection.tsx` → `/acelera` | → **solo calendario** |
| d | No existe página 404 propia (`app/not-found.tsx`); hoy se ve la genérica de Next, sin menú ni marca | **Sí se necesita.** Crear una con el nuevo estilo y enlaces a Empresas, Bio/Builders, Instituciones y Home |
| e | `/empresas` y `/fondos` sin imagen para redes propia | ✅ Generadas (1200×630): `docs/superpowers/assets/2026-09-24/og-empresas.png` y `og-instituciones.png` → `app/empresas/opengraph-image.png` y `app/fondos/opengraph-image.png` (+ `.alt.txt`). La frase de Instituciones ("…para que el resultado permanezca.") es nueva y está pendiente de validación |
| f | Los mockups son solo de escritorio | El plan define el comportamiento en móvil (375 px) de cada sección y se verifica en la implementación; la pestaña de anuncios ya tiene versión móvil |
| g | `mailto:` con asunto en Ventures (`ConnectSection`, ficha), Proyectos (ficha, CTA) y Conocimiento (CTA) | → Calendario (decisión §10.3) |

## 8. Verificación
- `tsc`, `npm run lint` y `npm run build` sin errores.
- Redirects con `curl -sI` para cada URL de §2.3: 308 al destino correcto. `/inteligencia-artificial/diagnostico` responde 200.
- Las páginas ocultas responden 200, siguen en `sitemap.xml` y no aparecen en el HTML de ninguna página visible (grep del build).
- Revisión visual en 1440, 1024, 768 y 375 px contra los mockups, en tema oscuro y crema.
- Pestaña de anuncios: aparición, repliegue al hacer scroll, cambio de tono, minimizar/restaurar, persistencia, exclusión en `/biobuilders` y móvil.
- Animaciones con `prefers-reduced-motion` activado.
- Lighthouse en Home, Empresas e Instituciones: sin regresión de LCP ni CLS respecto de producción.

## 9. Fuera de alcance
- Cambios de **contenido** en `/biobuilders`, `/ventures`, `/proyectos`, `/conocimiento` y `/privacidad` (sí se les aplica el estilo nuevo, ver §10).
- Restyling de las páginas ocultas: solo heredan menú, footer y pestaña de anuncios.
- Página propia de IA para Empresas (hasta que la división tenga contenido).
- Formularios propios de contacto (se usa el calendario).
- Dominios personales y de ventures (`eddieajalcrina.com`, `lorenzoortiz.com`, `cottonnation.pe`, `neofibers.pe` no responden o redirigen mal; se revisan aparte).

## 10. Subpáginas con el estilo nuevo (contenido intacto)

### 10.1 Alcance
`/biobuilders`, `/ventures`, `/ventures/[slug]` (9 fichas), `/proyectos`, `/proyectos/[slug]`, `/conocimiento`, `/privacidad` y la nueva 404 (`app/not-found.tsx`).

**Se conserva:** los textos, el orden de las secciones, los datos (`data/*.ts`) y las funciones (filtros de Proyectos, diagrama de Bio/Builders, navegación anterior/siguiente de las fichas).
**Cambia:** la presentación, que se alinea al sistema de §4.

### 10.2 Reglas que se aplican a cada página
1. **Ritmo de fondos:** hero oscuro y luego alternancia crema / oscuro. Rojo como bloque completo solo una vez por página, como máximo.
2. **Etiquetas de sección** con `SectionLabel` numerado (`01 ——`), en el orden en que aparecen.
3. **Títulos:** Mluvka 400, 40–46 px en H2 y 56–64 px en H1, con `letter-spacing` negativo como en las páginas nuevas. Texto de 16–18 px con interlineado 1.6–1.7.
4. **Tarjetas y CTA:** `FillPanel` (relleno rojo al pasar el mouse) para tarjetas que llevan a otra página. Botones con `ArrowIcon`.
5. **Fotos:** duotono rojo que pasa a color al pasar el mouse en miniaturas y retratos. Fotos grandes solo donde ya existen (heros, fichas), sin agregar nuevas.
6. **Listas e índices** (portafolio, recursos, proyectos): filas con líneas finas, el mismo lenguaje que las divisiones de la Home.
7. **Grano** en secciones oscuras, **aparición suave** al hacer scroll (`SectionReveal`) y nada más: sin los efectos descartados (§4.5).
8. **Pestaña de anuncios** en todas, salvo en su página destino.

### 10.3 Contacto en subpáginas
- **Todos** los `mailto:` de Ventures (`ConnectSection`, ficha), Proyectos (ficha, `CtaSection`) y Conocimiento (`CtaSection`) → **calendario general** (decisión 2026-09-24). Se acepta que se pierde el asunto prellenado. Cada botón envía `cta_calendar` con `{ page, location, context }`, donde `context` es el nombre del venture o proyecto, para no perder el dato en la medición.
- **Bio/Builders conserva sus canales propios:** formulario de postulación, WhatsApp de la cuña de bionegocios y su agenda (`BIOBUILDERS_BOOKING_URL`). Son parte de su contenido, que no cambia.
- El correo sigue visible como texto en el footer.

### 10.4 Método de revisión
Sin mockups previos (decisión 2026-09-24). Cada página se implementa y se revisa con Eddie en la vista previa local (`npm run dev`), en escritorio y móvil, antes de publicar. Si una página necesita una decisión de diseño nueva (algo que el sistema no resuelve), se hace un mockup **solo de esa parte**.

### 10.5 Orden sugerido
1. Sistema compartido (§4): tokens, componentes, menú, footer, anuncios, 404.
2. Home, Empresas e Instituciones (`/fondos`).
3. Redirects, sitemap y enlaces internos (§2).
4. Subpáginas: Bio/Builders → Ventures y fichas → Proyectos y fichas → Conocimiento → Privacidad.
5. Verificación completa (§8) y publicación única.
