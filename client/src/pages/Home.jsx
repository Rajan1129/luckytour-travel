import SEO, { localBusinessLd } from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import * as S from '../components/sections.jsx';

export default function Home() {
  return (
    <>
      <SEO path="/" title="Taxi Service in Una, Amb & Amb Andaura | Lucky Tour & Travel"
        description="Reliable and comfortable taxi service in Una, Amb, Amb Andaura railway station, Nangal & Himachal Pradesh. Clean Ertiga cabs for local rides, outstation trips, airport transfers, Shimla & Manali tours."
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
