import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DuotoneImageProps {
  src: string
  alt: string
  sizes: string
  hoverColor?: boolean
  priority?: boolean
  className?: string
  imgClassName?: string
}

/** Foto en duotono rojo. Con hoverColor pasa a color cuando un ancestro `group` recibe hover. */
export default function DuotoneImage({ src, alt, sizes, hoverColor, priority, className, imgClassName }: DuotoneImageProps) {
  return (
    <div className={cn('duotone relative overflow-hidden', hoverColor && 'duotone--hover', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn('object-cover', imgClassName)} />
    </div>
  )
}
