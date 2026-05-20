'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { BBSProgram } from '@/data/bbs'

type Accent = NonNullable<BBSProgram['heroAccent']>

// Literal class strings so Tailwind's JIT picks them up.
const ACCENT_BAR: Record<Accent, string> = {
  blue: 'bg-blue-500',
  violet: 'bg-violet-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  teal: 'bg-teal-500',
}

export default function ProgramCard({ program }: { program: BBSProgram }) {
  const accent = program.heroAccent ? ACCENT_BAR[program.heroAccent] : 'bg-rl-red'

  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-rl-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
        {/* Accent identity bar */}
        <div className={`h-1.5 w-full ${accent}`} />

        {/* Thumbnail */}
        {program.heroImage && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={program.heroImage}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rl-dark/55 via-transparent to-transparent" />
            <span className="absolute top-3 left-3 rounded-full bg-rl-white/90 backdrop-blur px-3 py-1 font-mono text-mono-sm uppercase text-text-primary">
              {program.code}
            </span>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-display-sm text-text-primary mb-1.5 group-hover:text-rl-red transition-colors">
            {program.title}
          </h3>
          <p className="text-body-sm text-text-tertiary italic mb-3">{program.tagline}</p>
          <p className="text-body-sm text-text-secondary mb-6 flex-1">{program.summary}</p>

          <div className="border-t border-border-light pt-4 mt-auto">
            <div className="flex items-baseline justify-between mb-4">
              <span className="font-display text-display-sm text-text-primary">{program.price.usd}</span>
              <span className="font-mono text-mono-sm text-text-tertiary">{program.price.pen}</span>
            </div>
            <p className="text-body-xs text-text-tertiary mb-4">{program.duration}</p>
            <div className="flex items-center justify-between">
              <Link
                href={`/cursos-bbs/${program.slug}`}
                className="text-label-sm uppercase text-text-tertiary group-hover:text-rl-red transition-colors before:absolute before:inset-0 before:content-['']"
              >
                Ver programa →
              </Link>
              <Link
                href={`/cursos-bbs/${program.slug}#inscripcion`}
                className="relative z-10 rounded bg-rl-red px-4 py-2 text-body-sm font-medium text-white hover:bg-[#d91f5b] transition-colors"
                aria-label={`Inscribirse en ${program.title}`}
              >
                Inscribirse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
