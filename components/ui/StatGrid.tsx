import { TRACK_RECORD } from '@/data/track-record'
import { cn } from '@/lib/utils'

export default function StatGrid({ tone, columns }: { tone: 'light' | 'dark'; columns: 2 | 3 }) {
  const dark = tone === 'dark'
  return (
    <div className={cn('grid grid-cols-2 border-t', columns === 3 && 'md:grid-cols-3', dark ? 'border-border-dark' : 'border-rl-dark')}>
      {TRACK_RECORD.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'border-b py-7 pr-5',
            dark ? 'border-border-dark' : 'border-border-light',
            // móvil: siempre 2 columnas; md+: 2 o 3 según `columns`
            i % 2 !== 0 && 'border-l pl-5',
            columns === 3 && (i % 3 !== 0 ? 'md:border-l md:pl-5' : 'md:border-l-0 md:pl-0')
          )}
        >
          <b className={cn('block whitespace-nowrap font-sans text-[32px] font-normal leading-none tracking-[-0.045em] md:text-[52px]', dark && 'text-text-on-dark')}>
            {s.plus && <span className="text-rl-red">+</span>}
            {s.value.startsWith('USD ') ? (
              <>
                {/* móvil: "USD" pequeño para que la cifra no se parta en dos líneas */}
                <span className="mr-[0.2em] align-[0.5em] text-[0.4em] tracking-[0.02em] md:mr-[0.25em] md:align-baseline md:text-[1em] md:tracking-[-0.045em]">USD</span>
                {s.value.slice(4).replace(/ /g, '\u00A0')}
              </>
            ) : (
              s.value
            )}
          </b>
          <span className={cn('mt-3 block text-[13px] md:text-[14px]', dark ? 'text-text-muted' : 'text-text-secondary')}>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
