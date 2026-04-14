import LandingHero from './(landing)/sections/LandingHero'
import ThreeAxes from './(landing)/sections/ThreeAxes'
import BioeconomyPills from './(landing)/sections/BioeconomyPills'
import ProblemSection from './(landing)/sections/ProblemSection'
import ThreePaths from './(landing)/sections/ThreePaths'
import LandingReIntelligence from './(landing)/sections/LandingReIntelligence'
import AISection from './(landing)/sections/AISection'
import FundsAccent from './(landing)/sections/FundsAccent'
import VenturesPreview from './(landing)/sections/VenturesPreview'
import BuildersPreview from './(landing)/sections/BuildersPreview'
import KnowledgePreview from './(landing)/sections/KnowledgePreview'
import TeamSection from './(landing)/sections/TeamSection'
import AlliesMarquee from './(landing)/sections/AlliesMarquee'
import FinalCta from './(landing)/sections/FinalCta'

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <LandingHero />
      {/* 2. Los tres ejes */}
      <ThreeAxes />
      {/* 3. Qué es una industria de bioeconomía */}
      <BioeconomyPills />
      {/* 4. El problema que resolvemos */}
      <ProblemSection />
      {/* 5. Cómo trabajamos (3 caminos) */}
      <ThreePaths />
      {/* 6. Re. Intelligence */}
      <LandingReIntelligence />
      {/* 7. IA para bioeconomía */}
      <AISection />
      {/* 8. Para fondos de inversión */}
      <FundsAccent />
      {/* 10. El portafolio de ventures */}
      <VenturesPreview />
      {/* 11. Red de Builders */}
      <BuildersPreview />
      {/* 12. Conocimiento */}
      <KnowledgePreview />
      {/* 13. Quiénes somos */}
      <TeamSection />
      {/* 14. Aliados institucionales */}
      <AlliesMarquee />
      {/* 15. CTA Final */}
      <FinalCta />
    </>
  )
}
