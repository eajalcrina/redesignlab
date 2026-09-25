import Image from 'next/image'
import Link from 'next/link'
import ArrowIcon from '@/components/ui/ArrowIcon'
import { buttonClasses } from '@/components/ui/buttonStyles'

export default function InstitutionsBand() {
  return (
    <section className="section-accent relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.28] mix-blend-multiply">
        <Image src="/assets/hero/hero-09.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_40%] contrast-[1.1] grayscale" />
      </div>
      <div className="container-rl relative grid grid-cols-1 items-end gap-6 py-16 md:py-[88px] lg:grid-cols-12">
        <p className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-white/75 lg:col-span-12">
          <span className="text-white">04</span>
          <span aria-hidden="true" className="inline-block h-px w-[18px] bg-current opacity-60" />
          Para fondos y agencias de cooperación
        </p>
        <h2 className="font-sans text-[32px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[40px] lg:col-span-7">
          ¿Quieres llevar esto a tus empresas beneficiarias?
        </h2>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="mb-5 text-[15px] leading-[1.6] text-white/90">
            Cada división nos permite compartir nuestra experiencia en company building con tu cartera, en todo el territorio.
          </p>
          <Link href="/fondos" className={buttonClasses('dark')}>
            Conoce cómo trabajamos con instituciones <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}
