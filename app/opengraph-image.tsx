import { ImageResponse } from 'next/og'

// Default site-wide OG image — used as fallback when a page doesn't define its own.
// Rendered server-side at request time (cached). No font fetch needed.

export const runtime = 'edge'
export const alt = 'Redesign Lab — The AI Studio for Bioeconomy Industries'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0D0D0D',
          padding: '64px 80px',
          color: '#FAFAF8',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'baseline',
          }}
        >
          Redesign Lab<span style={{ color: '#F32769' }}>.</span>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.22em',
              color: '#F32769',
              textTransform: 'uppercase',
              marginBottom: 28,
              fontWeight: 500,
            }}
          >
            THE AI STUDIO FOR BIOECONOMY INDUSTRIES
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              maxWidth: 980,
            }}
          >
            Negocios que funcionan.{' '}
            <span style={{ color: 'rgba(250,250,248,0.55)' }}>En industrias que importan.</span>
          </div>
        </div>

        {/* Footer line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 18,
            color: 'rgba(250,250,248,0.6)',
          }}
        >
          <span>redesignlab.org</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#F32769' }} />
            Lima · LATAM
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
