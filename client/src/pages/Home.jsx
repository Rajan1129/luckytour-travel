import SEO, { localBusinessLd } from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import * as S from '../components/sections.jsx';

export default function Home() {
  return (
    <>
      <SEO path="/" title="Taxi Service in Amb & Amb Andaura | Lucky Tour & Travel"
        description="Book 24/7 reliable taxi service in Amb & Amb Andaura Railway Station (AADR). Clean Ertiga, Innova & Urbania cabs for Vande Bharat pickups, Chintpurni, Baglamukhi & Himachal tours. Call 09816980599."
        jsonLd={[localBusinessLd()]} />
      <Hero />
      <S.TrustStrip />
      <S.UrgentStationBanner />
      <S.ServicesSection />
      <S.HomeFleetSpotlight />
      <S.HomeDestinationsSpotlight />
      <S.HowItWorks />
      <S.WhySection />
      <S.ReviewsSection />
      <S.ServiceAreaSection />
      <S.BookingCTA />
    </>
  );
}
