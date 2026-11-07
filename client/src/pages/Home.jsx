import Page from '../components/layout/Page';
import Hero from '../components/sections/Hero';
import Intro from '../components/sections/Intro';
import FeaturedServices from '../components/sections/FeaturedServices';
import Signature from '../components/sections/Signature';
import Why from '../components/sections/Why';
import PortfolioPreview from '../components/sections/PortfolioPreview';
import Testimonials from '../components/sections/Testimonials';
import InstagramSection from '../components/sections/InstagramSection';
import ContactCta from '../components/sections/ContactCta';

export default function Home() {
  return (
    <Page description="Salon Elora is a luxury hair and beauty salon in Sri Lanka. Hair styling, colour, treatments, skincare, makeup, bridal beauty and nail care. Beauty. Elegance. You.">
      <Hero />
      <Intro />
      <FeaturedServices />
      <Signature />
      <Why />
      <PortfolioPreview />
      <Testimonials />
      <InstagramSection />
      <ContactCta />
    </Page>
  );
}
