'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

interface ProgramHeroProps {
  tag: string
  lines: string[]
  /** Prominent program name. When set, it becomes the large H1 and `lines` render as a supporting hook. */
  title?: string
  paragraph?: string
  ctaLabel?: string
  ctaHref?: string
  /** Background image path (in /public). When set, renders behind a dark readability overlay. */
  image?: string
}

export default function ProgramHero({
  tag,
  lines,
  title,
  paragraph,
  ctaLabel,
  ctaHref,
  image,
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

  return (
    <section
      className={`section-dark relative flex items-center overflow-hidden ${
        image ? 'min-h-[78vh]' : 'min-h-[60vh]'
      }`}
    >
      {image && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          {/* Readability filters: solid darkening + bottom-weighted gradient so the text stays legible */}
          <div className="absolute inset-0 bg-rl-dark/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-rl-dark via-rl-dark/55 to-rl-dark/30" />
        </div>
      )}

      <div className="container-rl py-32 md:py-40 relative z-10">
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
                className="font-display font-normal text-display-xl md:text-[64px] lg:text-[88px] lg:leading-[0.98] text-text-on-dark max-w-5xl"
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
