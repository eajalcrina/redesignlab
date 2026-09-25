import Image from 'next/image'
import { PHOTO_BELT } from '@/data/photo-belt'

/** Cinturón continuo: dos copias idénticas que se desplazan exactamente una copia (-50%). */
export default function PhotoBelt() {
  const set = PHOTO_BELT.map((p) => (
    <Image key={p.src} src={p.src} alt="" width={p.width} height={84} sizes={`${p.width * 2}px`} className="photo-belt__img" style={{ width: p.width }} />
  ))
  return (
    <div className="photo-belt" aria-hidden="true">
      <div className="photo-belt__track">
        <div className="photo-belt__set">{set}</div>
        <div className="photo-belt__set">{set}</div>
      </div>
    </div>
  )
}
