import LandingHero from './(landing)/sections/LandingHero'
import ProblemSection from './(landing)/sections/ProblemSection'
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
      {/* 2. Aliados institucionales (puente tonal entre hero y Re. Intelligence) */}
      <AlliesMarquee />
      {/* 3. Re. Intelligence */}
      <LandingReIntelligence />
      {/* 4. Tres formas de trabajar */}
      <ThreePaths />
      {/* 5. El problema que resolvemos */}
      <ProblemSection />
      {/* 6. IA para bioeconomía */}
      <AISection />
      {/* 7. Conocimiento */}
      <KnowledgePreview />
      {/* 8. Quiénes somos */}
      <TeamSection />
      {/* 9. CTA Final (acento rojo de marca) */}
      <FinalCta />
    </>
  )
}
