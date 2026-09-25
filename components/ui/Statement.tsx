export function StatementKicker({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="mb-10 flex items-center gap-3.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40">
      <span aria-hidden="true" className="inline-block h-px w-9 bg-rl-red" />
      {n && <span className="text-rl-red">{n}</span>}
      {children}
    </p>
  )
}

export function StatementNote({ next, children }: { next: string; children: React.ReactNode }) {
  return (
    <div className="mt-11 grid grid-cols-1 gap-6 border-t border-border-dark pt-7 md:mt-14 md:grid-cols-12">
      <p className="text-[16px] leading-[1.65] text-text-muted md:col-span-6 md:text-[17px]">{children}</p>
      <span className="self-end font-mono text-[10.5px] uppercase tracking-[0.15em] text-text-on-dark/40 md:col-span-4 md:col-start-9 md:text-right">
        {next} ↓
      </span>
    </div>
  )
}
