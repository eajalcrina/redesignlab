type Payload = Record<string, string | number | boolean | undefined>

/** Empuja un evento a GTM. No hace nada en el servidor ni si GTM no cargó. */
export function track(event: string, payload: Payload = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event, ...payload })
}
