'use client'

import SectionReveal from '@/components/animations/SectionReveal'
import ReIntelligenceForm from '@/components/forms/ReIntelligenceForm'

export default function ApplicationProcess() {
  return (
    <SectionReveal>
      <div className="max-w-2xl mx-auto">
        <ReIntelligenceForm />
      </div>
    </SectionReveal>
  )
}
