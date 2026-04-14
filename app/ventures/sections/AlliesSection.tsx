'use client'

import Marquee from '@/components/ui/Marquee'

const allies = [
  'IDB', 'Wyss Academy for Nature', 'WWF', 'NESsT', 'Beneficial Returns',
  'Conservation International', 'Textile Exchange', 'GIZ', 'Singularity University',
  'CleantechHUB', 'C Minds', 'CATAL1.5T', 'FIT State University of New York',
  'ImpactAlpha', 'elea', 'IMD', 'UAL University of the Arts London',
  'Tecnológico de Monterrey', 'MIT', 'PromPerú', 'ProInnóvate',
  'Ministerio del Ambiente Perú', 'SNI', 'Unión Europea', 'Green Climate Fund'
]

export default function AlliesSection() {
  return (
    <div className="section-neutral py-12 md:py-16 overflow-hidden">
      <Marquee items={allies} label="Red de aliados" />
    </div>
  )
}
