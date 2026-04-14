export const DURATION = {
  instant: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  verySlow: 1.2,
}

export const EASE = {
  out: [0.0, 0.0, 0.2, 1.0],
  inOut: [0.4, 0.0, 0.2, 1.0],
  spring: { type: 'spring' as const, stiffness: 100, damping: 20 },
  springFast: { type: 'spring' as const, stiffness: 200, damping: 25 },
}

export const STAGGER = {
  fast: 0.05,
  normal: 0.10,
  slow: 0.15,
}
