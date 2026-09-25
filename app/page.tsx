import HomeHero from './(landing)/sections/HomeHero'
import AlliesLine from './(landing)/sections/AlliesLine'
import ThesisSection from './(landing)/sections/ThesisSection'
import FearStatement from './(landing)/sections/FearStatement'
import ProposalSection from './(landing)/sections/ProposalSection'
import DivisionsSection from './(landing)/sections/DivisionsSection'
import InstitutionsBand from './(landing)/sections/InstitutionsBand'
import KnowledgeSection from './(landing)/sections/KnowledgeSection'
import FoundersSection from './(landing)/sections/FoundersSection'
import HomeClosing from './(landing)/sections/HomeClosing'

export default function Home() {
  return (
    <>
      <HomeHero />
      <AlliesLine />
      <ThesisSection />
      <FearStatement />
      <ProposalSection />
      <DivisionsSection />
      <InstitutionsBand />
      <KnowledgeSection />
      <FoundersSection />
      <HomeClosing />
    </>
  )
}
