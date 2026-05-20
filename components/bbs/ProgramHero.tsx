'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

type HeroAccent = 'blue' | 'violet' | 'amber' | 'emerald' | 'teal'

interface ProgramHeroProps {
  tag: string
  lines: string[]
  /** Prominent program name. When set, it becomes the large H1 and `lines` render as a supporting hook. */
  title?: string
  paragraph?: string
  ctaLabel?: string
  ctaHref?: string
  /** Background image path (in /public). When set, renders behind a readability overlay. */
  image?: string
  /** Soft color filter applied over the background image to differentiate each program. */
  accent?: HeroAccent
}

// Literal class strings so Tailwind's JIT picks them up. Left-weighted colored
// gradient keeps the text legible while the right side of the photo shows through.
const ACCENTS: Record<HeroAccent, { grad: string; tint: string }> = {
  blue: { grad: 'from-blue-950/85 via-blue-900/45 to-transparent', tint: 'bg-blue-900/15' },
  violet: { grad: 'from-violet-950/85 via-violet-900/45 to-transparent', tint: 'bg-violet-900/15' },
  amber: { grad: 'from-amber-950/85 via-amber-900/45 to-transparent', tint: 'bg-amber-900/15' },
  emerald: { grad: 'from-emerald-950/85 via-emerald-900/45 to-transparent', tint: 'bg-emerald-900/15' },
  teal: { grad: 'from-teal-950/85 via-teal-900/45 to-transparent', tint: 'bg-teal-900/15' },
}

export default function ProgramHero({
  tag,
  lines,
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  image,
  accent,
}: ProgramHeroProps) {
  const container = { hidden: {}, visible: { transition: { staggerChildren: STAGGER.slow } } }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }
  const divider = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
  }
  const external = ctaHref?.startsWith('http')
  const accentStyles = accent ? ACCENTS[accent] : null

  return (
    <section
      className={`section-dark relative flex items-center overflow-hidden ${
        image ? 'min-h-[72vh]' : 'min-h-[60vh]'
      }`}
    >
      {image && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          {accentStyles ? (
            <>
              {/* Soft full-photo color cast */}
              <div className={`absolute inset-0 ${accentStyles.tint}`} />
              {/* Left-weighted colored gradient for text legibility */}
              <div className={`absolute inset-0 bg-gradient-to-r ${accentStyles.grad}`} />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-rl-dark/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-rl-dark via-rl-dark/55 to-rl-dark/30" />
            </>
          )}
        </div>
      )}

      <div className="container-rl py-28 md:py-36 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="neutral" className="mb-6">
              {tag}
            </Tag>
          </motion.div>

          {title ? (
            <>
              <motion.h1
                variants={item}
                className="font-display font-normal text-display-xl md:text-[64px] lg:text-[88px] lg:leading-[0.98] text-text-on-dark max-w-5xl drop-shadow-sm"
              >
                {title}
              </motion.h1>
              <motion.div variants={divider} className="h-0.5 bg-rl-red w-24 my-6" />
              {lines.length > 0 && (
                <motion.p
                  variants={item}
                  className="font-display text-display-sm md:text-display-md text-text-on-dark/90 max-w-3xl"
                >
                  {lines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </motion.p>
              )}
            </>
          ) : (
            <>
              <motion.h1
                variants={item}
                className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[1.0] lg:font-normal text-text-on-dark max-w-5xl"
              >
                {lines.map((line, i) => (
                  <motion.span key={i} variants={item} className="block">
                    {line}
                  </motion.span>
                ))}
              </motion.h1>
              <motion.div variants={divider} className="h-0.5 bg-rl-red w-24 my-6" />
            </>
          )}

          {paragraph && (
            <motion.p
              variants={item}
              className="mt-6 text-body-lg md:text-body-xl text-text-muted max-w-2xl"
            >
              {paragraph}
            </motion.p>
          )}
          {ctaLabel && ctaHref && (
            <motion.div variants={item} className="mt-10">
              <Button
                variant="primary"
                href={ctaHref}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {ctaLabel}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
