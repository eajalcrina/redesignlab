'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [cursorText, setCursorText] = useState('')

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show on devices with fine pointer (no touch)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (hasCoarsePointer) return

    setIsVisible(true)

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor]')
      if (interactive) {
        setIsHovering(true)
        const text = interactive.getAttribute('data-cursor') || ''
        setCursorText(text)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor]')
      if (interactive) {
        setIsHovering(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ x, y }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-rl-white"
        animate={{
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          x: isHovering ? -20 : -4,
          y: isHovering ? -20 : -4,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cursorText && isHovering && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[8px] font-medium text-rl-dark whitespace-nowrap"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
