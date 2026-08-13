import LandingHero from './(landing)/sections/LandingHero'
import ThreePaths from './(landing)/sections/ThreePaths'
import LandingReIntelligence from './(landing)/sections/LandingReIntelligence'
import AISection from './(landing)/sections/AISection'
import KnowledgePreview from './(landing)/sections/KnowledgePreview'
import TeamSection from './(landing)/sections/TeamSection'
import AlliesMarquee from './(landing)/sections/AlliesMarquee'
import FinalCta from './(landing)/sections/FinalCta'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <LandingHero />
      {/* 2. Aliados institucionales (puente tonal entre hero y ACELERA) */}
      <AlliesMarquee />
      {/* 3. Tres formas de trabajar */}
      <ThreePaths />
      {/* 4. ACELERA */}
      <LandingReIntelligence />
      {/* 5. IA para bioeconomía */}
      <AISection />
      {/* 6. Conocimiento */}
      <KnowledgePreview />
      {/* 7. Quiénes somos */}
      <TeamSection />
      {/* 8. CTA Final (acento rojo de marca) */}
      <FinalCta />
    </>
  )
}
