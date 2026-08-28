/**
 * pages/About/index.jsx
 * ─────────────────────────────────────────────────────────────
 * ADVMEN Technologies — About Us Page
 * Phase 1: Rebuilt with fully animated custom sections.
 * ─────────────────────────────────────────────────────────────
 */

import SEOHead       from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'

import AboutHero     from '@components/sections/About/AboutHero'
import AboutStats    from '@components/sections/About/AboutStats'
import AboutStory    from '@components/sections/About/AboutStory'
import AboutValues   from '@components/sections/About/AboutValues'
import AboutTeam     from '@components/sections/About/AboutTeam'
import AboutOffice   from '@components/sections/About/AboutOffice'

const About = () => {
  return (
    <PageTransition>
      <SEOHead
        title="About Us — ADVMEN Technologies"
        description="Learn about ADVMEN's story, core values, our elite team, and design culture."
      />

      {/* Main About Sequence */}
      <AboutHero />
      <AboutStats isPage />
      <AboutStory />
      <AboutValues />
      <AboutTeam />
      <AboutOffice />
    </PageTransition>
  )
}

export default About
