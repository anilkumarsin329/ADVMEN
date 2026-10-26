import SEOHead from '@components/common/SEOHead'
import PageTransition from '@components/common/PageTransition'
import ServicesPageContent, { SERVICES_FAQS } from '@components/sections/Services/ServicesPageContent'

const ServicesPage = () => (
  <PageTransition>
    <SEOHead
      title="Digital Marketing Services | SEO, Web & Technology | ADVMEN"
      description="Get digital marketing, SEO, AEO, GEO, web design, mobile app, e-commerce, branding, social media, UI/UX, and custom CRM services from ADVMEN Technologies."
      schemaType="collection"
      canonical="https://www.advmen.com/services"
      schemaData={{
        breadcrumbs: [
          { name: 'Home', url: 'https://www.advmen.com/' },
          { name: 'Services', url: 'https://www.advmen.com/services' }
        ],
        faqs: SERVICES_FAQS
      }}
    />
    <ServicesPageContent />
  </PageTransition>
)

export default ServicesPage
