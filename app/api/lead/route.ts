import { NextRequest, NextResponse } from 'next/server'
import { notifyLead, type LeadForm } from '@/lib/lead-notify'

const KNOWN_FORMS: LeadForm[] = [
  're-intelligence',
  'cohort-interest',
  'enroll',
  'maturity-checker',
  'resource-download',
]

export async function POST(req: NextRequest) {
  let body: { form?: string; data?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const { form, data } = body
  if (!form || !KNOWN_FORMS.includes(form as LeadForm) || typeof data !== 'object' || data === null) {
    return NextResponse.json({ error: 'Missing or invalid "form"/"data".' }, { status: 400 })
  }

  const result = await notifyLead(form as LeadForm, data)

  // The email is the "don't lose the lead" guarantee — treat it as success
  // whenever it goes through, even if the sheet append failed. Only report
  // a hard failure to the user when BOTH channels failed.
  if (!result.emailOk && !result.sheetOk) {
    return NextResponse.json({ error: 'No pudimos procesar la solicitud.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, ...result })
}
