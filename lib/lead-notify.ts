import { JWT } from 'google-auth-library'

/**
 * Server-only. Sends a lead notification email (via Brevo) and appends a row
 * to a Google Sheet (via a service account) whenever one of the site's forms
 * is submitted. Replaces the old Supabase-backed capture, which depended on
 * a project that got paused/deleted for inactivity and silently dropped
 * every submission.
 *
 * Both channels are attempted independently — a failure in one doesn't
 * block the other. The email is the "don't lose the lead" guarantee; the
 * sheet is the running record.
 */

type SheetValue = string | number

interface NotifyResult {
  emailOk: boolean
  sheetOk: boolean
}

const EMAIL_FROM = process.env.EMAIL_FROM || 'hola@redesignlab.org'
const EMAIL_NOTIFY = process.env.EMAIL_NOTIFY || 'eddie@redesignlab.org'

// ── Email (Brevo) ────────────────────────────────────────────────────────

function renderFieldsHtml(fields: [string, string | number | null | undefined][]): string {
  const rows = fields
    .map(([label, value]) => {
      const display = value === null || value === undefined || value === '' ? '—' : String(value)
      return `<tr><td style="padding:6px 12px 6px 0;color:#8A8478;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 0;color:#17130F;font-size:14px;">${escapeHtml(display).replace(/\n/g, '<br/>')}</td></tr>`
    })
    .join('')
  return `<table cellpadding="0" cellspacing="0" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">${rows}</table>`
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function sendBrevoEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn('[lead-notify] BREVO_API_KEY not set — skipping email notification.')
    return false
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: EMAIL_FROM, name: 'Redesign Lab — Sitio web' },
        to: [{ email: EMAIL_NOTIFY }],
        subject,
        htmlContent: `<div style="padding:24px;">${html}</div>`,
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      // eslint-disable-next-line no-console
      console.error('[lead-notify] Brevo send failed', res.status, body)
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[lead-notify] Brevo send threw', err)
    return false
  }
}

// ── Google Sheets ────────────────────────────────────────────────────────

let cachedClient: JWT | null = null

function getSheetsClient(): JWT | null {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  if (!email || !rawKey) return null

  if (cachedClient) return cachedClient

  cachedClient = new JWT({
    email,
    // Vercel env vars store the key as a single line with literal "\n" —
    // turn those back into real newlines before handing it to the JWT lib.
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return cachedClient
}

async function appendSheetRow(tabName: string, values: SheetValue[]): Promise<boolean> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const client = getSheetsClient()
  if (!sheetId || !client) {
    // eslint-disable-next-line no-console
    console.warn('[lead-notify] Google Sheets not configured — skipping row append.')
    return false
  }

  try {
    const { token } = await client.getAccessToken()
    const range = encodeURIComponent(`${tabName}!A:A`)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [values] }),
      }
    )
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      // eslint-disable-next-line no-console
      console.error('[lead-notify] Sheets append failed', res.status, body)
      return false
    }
    return true
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[lead-notify] Sheets append threw', err)
    return false
  }
}

// ── Per-form payload shaping ─────────────────────────────────────────────

export type LeadForm =
  | 're-intelligence'
  | 'servicios-consultoria'
  | 'cohort-interest'
  | 'enroll'
  | 'maturity-checker'
  | 'resource-download'

interface LeadEnvelope {
  emailSubject: string
  emailFields: [string, string | number | null | undefined][]
  sheetTab: string
  sheetRow: SheetValue[]
}

function nowLima(): string {
  return new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildEnvelope(form: LeadForm, data: any): LeadEnvelope {
  const ts = nowLima()

  switch (form) {
    case 're-intelligence':
      return {
        emailSubject: `Nuevo lead · Re. Intelligence — ${data.company_legal_name || 'sin empresa'}`,
        emailFields: [
          ['Nombre', data.contact_name],
          ['País', data.country],
          ['Celular', data.phone],
          ['Email', data.email],
          ['Empresa', data.company_legal_name],
          ['Facturación anual', data.annual_revenue_bucket],
          ['Producto/servicio', data.product_or_service],
          ['Web', data.website],
          ['Red social', data.social_handle],
          ['Principal desafío', data.main_challenge],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Re. Intelligence',
        sheetRow: [
          ts,
          data.contact_name || '',
          data.country || '',
          data.phone || '',
          data.email || '',
          data.company_legal_name || '',
          data.annual_revenue_bucket || '',
          data.product_or_service || '',
          data.website || '',
          data.social_handle || '',
          data.main_challenge || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }

    case 'servicios-consultoria':
      return {
        emailSubject: `Nuevo lead · ${data.category || 'Servicios'} — ${data.company || data.contact_name || 'sin nombre'}`,
        emailFields: [
          ['Categoría', data.category],
          ['Nombre', data.contact_name],
          ['Empresa', data.company],
          ['Email', data.email],
          ['Teléfono', data.phone],
          ['Situación', data.message],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Servicios de Consultoría',
        sheetRow: [
          ts,
          data.category || '',
          data.contact_name || '',
          data.company || '',
          data.email || '',
          data.phone || '',
          data.message || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }

    case 'cohort-interest':
      return {
        emailSubject: `Nuevo interés · Cohorte BBS — ${data.name || 'sin nombre'}`,
        emailFields: [
          ['Nombre', data.name],
          ['Email', data.email],
          ['Teléfono', data.phone],
          ['Programa de interés', data.program_interest],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Cohort Interest',
        sheetRow: [
          ts,
          data.name || '',
          data.email || '',
          data.phone || '',
          data.program_interest || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }

    case 'enroll':
      return {
        emailSubject: `Nueva inscripción · ${data.program_title || 'BBS'} — ${data.name || 'sin nombre'}`,
        emailFields: [
          ['Programa', data.program_title],
          ['Nombre', data.name],
          ['Email', data.email],
          ['Teléfono', data.phone],
          ['Empresa', data.company],
          ['Cargo', data.role],
          ['Cómo se enteró', data.referral_source],
          ['Página de origen', data.source],
        ],
        sheetTab: 'BBS Enrollments',
        sheetRow: [
          ts,
          data.program_slug || '',
          data.program_title || '',
          data.name || '',
          data.email || '',
          data.phone || '',
          data.company || '',
          data.role || '',
          data.referral_source || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }

    case 'maturity-checker':
      return {
        emailSubject: `Nuevo diagnóstico RE-IA · ${data.company || 'sin empresa'} — Nivel ${data.maturity_level ?? '?'}`,
        emailFields: [
          ['Nombre', data.name],
          ['Email', data.email],
          ['Empresa', data.company],
          ['Cargo', data.role],
          ['Industria', data.industry],
          ['Tamaño de empresa', data.company_size],
          ['Puntaje total', `${data.total_score} / 48`],
          ['Nivel', `${data.maturity_level} — ${data.maturity_name}`],
          ['Bloque A (Datos)', data.block_a_score],
          ['Bloque B (Operaciones)', data.block_b_score],
          ['Bloque C (Innovación)', data.block_c_score],
          ['Bloque D (Impacto)', data.block_d_score],
          ['Bloque E (Organización)', data.block_e_score],
          ['Palancas prioritarias', Array.isArray(data.priority_levers) ? data.priority_levers.join(' · ') : data.priority_levers],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Maturity Checker',
        sheetRow: [
          ts,
          data.name || '',
          data.email || '',
          data.company || '',
          data.role || '',
          data.industry || '',
          data.company_size || '',
          data.total_score ?? '',
          data.maturity_level ?? '',
          data.maturity_name || '',
          data.block_a_score ?? '',
          data.block_b_score ?? '',
          data.block_c_score ?? '',
          data.block_d_score ?? '',
          data.block_e_score ?? '',
          Array.isArray(data.priority_levers) ? data.priority_levers.join(' · ') : (data.priority_levers || ''),
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }

    case 'resource-download':
      return {
        emailSubject: `Descarga de recurso · ${data.resource_name || 'sin nombre'} — ${data.name || 'sin nombre'}`,
        emailFields: [
          ['Recurso', data.resource_name],
          ['Nombre', data.name],
          ['Organización', data.organization],
          ['Email', data.email],
          ['Página de origen', data.source],
        ],
        sheetTab: 'Resource Downloads',
        sheetRow: [
          ts,
          data.resource_slug || '',
          data.resource_name || '',
          data.name || '',
          data.organization || '',
          data.email || '',
          data.source || '',
          data.user_agent || '',
          data.referrer || '',
        ],
      }
  }
}

/**
 * Fires the email notification and the sheet append in parallel. Neither
 * failing blocks the other; the caller decides what counts as "success"
 * for the form's UI (see app/api/lead/route.ts).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function notifyLead(form: LeadForm, data: any): Promise<NotifyResult> {
  const envelope = buildEnvelope(form, data)

  const [emailResult, sheetResult] = await Promise.allSettled([
    sendBrevoEmail(envelope.emailSubject, renderFieldsHtml(envelope.emailFields)),
    appendSheetRow(envelope.sheetTab, envelope.sheetRow),
  ])

  return {
    emailOk: emailResult.status === 'fulfilled' && emailResult.value,
    sheetOk: sheetResult.status === 'fulfilled' && sheetResult.value,
  }
}
