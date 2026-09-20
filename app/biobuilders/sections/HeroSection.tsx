'use client'

import { motion } from 'framer-motion'
import { DURATION, EASE, STAGGER } from '@/lib/animations'
import { BIOBUILDERS_FORM_URL } from '@/lib/constants'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: STAGGER.slow } },
  }
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
  }

  return (
    <section className="section-dark min-h-[70vh] flex items-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(250,250,248,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,248,1) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container-rl py-32 md:py-40 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.div variants={item}>
            <Tag color="red" className="mb-8">Bio/Builders · Red de desarrolladores de negocio</Tag>
          </motion.div>

          <motion.h1 variants={item} className="font-display text-display-lg md:text-display-xl lg:text-[72px] lg:leading-[0.97] text-text-on-dark max-w-5xl">
            La bioeconomía de América Latina tiene todo, menos quien la escale.
          </motion.h1>

          <motion.div
            variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } } }}
            className="h-0.5 bg-rl-red w-24 my-8"
          />

          <motion.p variants={item} className="text-body-xl md:text-body-xl-dt text-text-muted max-w-2xl">
            Bio/Builders es la red que conecta a expertos en escalar empresas con bionegocios que necesitan activar su potencial para competir en el mercado.
          </motion.p>

          <motion.div variants={item} className="mt-10">
            <Button size="lg" href={BIOBUILDERS_FORM_URL} target="_blank" rel="noopener noreferrer">
              Postula a la red &rarr;
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
