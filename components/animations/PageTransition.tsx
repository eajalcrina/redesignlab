'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

/**
 * Simple fade-in on route change. No AnimatePresence exit animation —
 * mode="wait" with server-component children was blocking the new tree
 * from rendering and left the viewport blank on navigation.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
