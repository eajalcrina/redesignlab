import DuotoneImage from './DuotoneImage'
import { cn } from '@/lib/utils'

/** Franja de 4 fotos en duotono al pie de los heros de Empresas e Instituciones. */
export default function PhotoStrip({ images }: { images: [string, string, string, string] }) {
  return (
    <div className="mt-16 grid h-[160px] grid-cols-2 gap-2.5 md:mt-[88px] md:h-[220px] md:grid-cols-[1.3fr_.8fr_1fr_.9fr]">
      {images.map((src, i) => (
        <DuotoneImage key={src} src={src} alt="" sizes="(min-width: 768px) 30vw, 50vw" className={cn('rounded-[2px]', i > 1 && 'hidden md:block')} />
      ))}
    </div>
  )
}
