'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

/**
 * Simple fade-in on route change. No AnimatePresence exit animation —
 * mode="wait" with server-component children was blocking the new tree
 * from rendering and left the viewport blank on navigation.
 *
 * The very first render (including SSR) skips the fade entirely so the
 * server-rendered HTML never ships `opacity:0` on this wrapper — that was
 * hiding content until hydration and hurting LCP. Only client-side
 * navigations after the first paint get the 0.45s fade.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  return (
    <motion.div
      key={pathname}
      initial={isFirstRender.current ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
