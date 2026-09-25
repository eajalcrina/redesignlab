'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import ResourceDrawer from '@/components/ui/ResourceDrawer'
import { resources, type ResourceItem } from '@/data/resources'

const FEATURED = ['birf', 'innovation-matrix', 're-ia-propuesta']

export default function KnowledgeSection() {
  const [open, setOpen] = useState<ResourceItem | null>(null)
  const items = FEATURED.map((slug) => resources.find((r) => r.slug === slug)).filter((r): r is ResourceItem => !!r)

  return (
    <section className="section-neutral">
      <div className="container-rl grid grid-cols-1 gap-10 py-24 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <SectionLabel n="05" className="mb-4">Conoce nuestros modelos de trabajo</SectionLabel>
          <h2 className="font-sans text-[30px] font-normal leading-[1.06] tracking-[-0.03em] md:text-[36px]">
            Lo que aprendemos en campo, lo compartimos con el ecosistema.
          </h2>
          <p className="mb-7 mt-5 text-[15px] leading-[1.7] text-text-secondary">
            Convertimos lo que aprendemos en el campo en modelos y documentos de libre descarga, para que cualquier persona en la región pueda replicarlos y multiplicar el impacto.
          </p>
          <Link href="/conocimiento" className="border-b border-rl-red pb-[3px] text-[14px] font-medium">Ver todos los recursos →</Link>
        </div>
        <ul className="border-t border-rl-dark lg:col-span-6 lg:col-start-7">
          {items.map((r, k) => (
            <li key={r.slug}>
              <button type="button" onClick={() => setOpen(r)} className="group grid w-full grid-cols-[32px_56px_1fr_auto] items-center gap-4 border-b border-border-light py-5 text-left md:grid-cols-[40px_64px_1fr_auto]">
                <span className="font-mono text-[10.5px] tracking-[0.15em] text-text-tertiary">{String(k + 1).padStart(2, '0')}</span>
                <span className="relative h-[70px] w-14 overflow-hidden rounded-[2px] md:h-20 md:w-16">
                  <Image src={r.image} alt="" fill sizes="64px" className="object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
                </span>
                <span>
                  <span className="block text-[17px] font-medium tracking-[-0.01em] transition-colors group-hover:text-rl-red md:text-[18px]">{r.name}</span>
                  <small className="mt-1 block text-[13px] text-text-tertiary">{r.type.replace('Disponible ahora · ', '')}</small>
                </span>
                <span className="text-[13px] font-medium text-rl-red">PDF ↓</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ResourceDrawer isOpen={!!open} resource={open} onClose={() => setOpen(null)} />
    </section>
  )
}
