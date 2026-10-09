import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import Services from '@components/sections/Services/Services'

const ServicesPage = () => (
  <PageTransition>
    <SEOHead
      title="Services — ADVMEN"
      description="Explore our creative design, React engineering, marketing, and SEO growth services."
      schemaType="collection"
      canonical="https://advmen.com/services"
      schemaData={{
        breadcrumbs: [
          { name: 'Home', url: 'https://advmen.com/' },
          { name: 'Services', url: 'https://advmen.com/services' }
        ]
      }}
    />
    <Services isPage={true} />
  </PageTransition>
)

export default ServicesPage
