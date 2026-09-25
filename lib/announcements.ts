export interface AnnouncementLink {
  label: string
  href: string
  external?: boolean
}

export interface Announcement {
  id: string
  kicker: string
  title: string
  /** Texto vertical de la pestaña */
  handleLabel: string
  primary: AnnouncementLink
  secondary?: AnnouncementLink
  /** ISO yyyy-mm-dd, inclusivo */
  start: string
  /** ISO yyyy-mm-dd, exclusivo */
  end: string
  excludePaths: string[]
}

// Las fechas se interpretan en hora de Lima (UTC-5): una campaña con `end: '2026-11-29'`
// se ve hasta el 28 a las 23:59 en Perú.
const day = (iso: string) => new Date(iso + 'T00:00:00-05:00').getTime()

export function pickAnnouncement(list: Announcement[], now: Date, pathname: string): Announcement | null {
  const t = now.getTime()
  return (
    list.find(
      (a) =>
        t >= day(a.start) &&
        t < day(a.end) &&
        !a.excludePaths.some((p) => pathname === p || pathname.startsWith(p + '/'))
    ) ?? null
  )
}
