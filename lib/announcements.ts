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

const day = (iso: string) => new Date(iso + 'T00:00:00Z').getTime()

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
