'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { BBSProgram } from '@/data/bbs'
import { BBS_FORM_URL } from '@/lib/constants'

export default function ProgramCard({ program }: { program: BBSProgram }) {
  const enrollHref = program.enrollUrl || BBS_FORM_URL
  const external = enrollHref.startsWith('http')

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        href={`/cursos-bbs/${program.slug}`}
        className="group flex h-full flex-col border border-border-light rounded p-8 bg-rl-white hover:border-rl-red/40 transition-colors"
      >
        <p className="font-mono text-mono-sm text-rl-red uppercase mb-4">{program.code}</p>
        <h3 className="font-display text-display-sm text-text-primary mb-2">{program.title}</h3>
        <p className="text-body-sm text-text-tertiary italic mb-4">{program.tagline}</p>
        <p className="text-body-sm text-text-secondary mb-6 flex-1">{program.summary}</p>
        <p className="font-mono text-mono-md text-text-primary mb-1">{program.price.usd} · {program.price.pen}</p>
        <p className="text-body-xs text-text-tertiary mb-6">{program.duration}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-label-sm uppercase text-text-tertiary group-hover:text-rl-red transition-colors">
            Ver programa →
          </span>
          <a
            href={enrollHref}
            onClick={(e) => e.stopPropagation()}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-body-sm font-medium text-rl-red hover:underline"
          >
            Inscribirse
          </a>
        </div>
      </Link>
    </motion.div>
  )
}
