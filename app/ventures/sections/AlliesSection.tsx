'use client'

import Marquee from '@/components/ui/Marquee'
import { ALLIES_FLAT, ALLIES_LABEL } from '@/lib/constants'

export default function AlliesSection() {
  return (
    <div className="section-neutral py-12 md:py-16 overflow-hidden">
      <Marquee items={ALLIES_FLAT} label={ALLIES_LABEL} />
    </div>
  )
}
