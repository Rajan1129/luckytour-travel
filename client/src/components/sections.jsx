import { Link } from 'react-router-dom';
import { Star, MapPin, Sparkles, ShieldCheck, Clock, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import GlassCard from './GlassCard.jsx';
import ServiceCard from './ServiceCard.jsx';
import DestinationCard from './DestinationCard.jsx';
import FleetCard from './FleetCard.jsx';
import ReviewCard from './ReviewCard.jsx';
import BookButton from './BookButton.jsx';
import CTAButton from './CTAButton.jsx';
import CallButton from './CallButton.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import BookingForm from './BookingForm.jsx';
import { Icon } from '../utils/icons.jsx';
import { SITE } from '../config/site.js';
import { useAppData } from '../context/DataContext.jsx';
import { services as defaultServices, destinations, packages as defaultPackages, fleet as defaultFleet, benefits, steps, reviews as defaultReviews, serviceArea } from '../data/content.js';

export const TrustStrip = () => (
  <section aria-label="Trust highlights" className="container-x -mt-8 relative z-20">
    <div className="rounded-3xl border border-amber/30 bg-surface-mid/95 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl md:p-8">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-linen/10">
        <div className="flex flex-col items-center text-center p-2">
          <span className="font-serif text-3xl md:text-4xl font-bold text-amber">15+ Years</span>
          <span className="mt-1 text-sm font-semibold text-ink">Mountain Driving Experience</span>
          <span className="text-xs text-ink-dim mt-0.5">Verified Local Chauffeurs</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
          <span className="font-serif text-3xl md:text-4xl font-bold text-mint">8 Fleet Models</span>
          <span className="mt-1 text-sm font-semibold text-ink">Ertiga, Innova &amp; Urbania</span>
          <span className="text-xs text-ink-dim mt-0.5">100% Sanitized &amp; AC Cabs</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
          <span className="font-serif text-3xl md:text-4xl font-bold text-amber">15-Min Dispatch</span>
          <span className="mt-1 text-sm font-semibold text-ink">Amb Andaura Station (AADR)</span>
          <span className="text-xs text-ink-dim mt-0.5">Ready for Vande Bharat</span>
        </div>
        <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
          <span className="font-serif text-3xl md:text-4xl font-bold text-linen">5.0 ★ Rating</span>
          <span className="mt-1 text-sm font-semibold text-ink">Top Rated on Google</span>
          <span className="text-xs text-ink-dim mt-0.5">Zero Hidden Mountain Fees</span>
        </div>
      </div>
    </div>
  </section>
);

export const UrgentStationBanner = () => (
  <section className="container-x py-8">
    <div className="relative overflow-hidden rounded-3xl border border-amber/40 bg-gradient-to-r from-pine/90 via-surface-high/90 to-pine/80 p-6 md:p-8 shadow-xl">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber/15 blur-3xl" />
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber border border-amber/30">
            ⚡ Express Station Pickup
          </span>
          <h2 className="mt-2.5 font-serif text-2xl md:text-3xl font-bold text-linen">
            Arriving on the Vande Bharat Express or Himachal Express?
          </h2>
          <p className="mt-1.5 text-sm text-ink-dim max-w-2xl">
            Our sanitized cabs are parked right at <strong className="text-ink">Amb Andaura Railway Station (AADR)</strong> and Una station. Direct doorstep pickups with zero waiting time to Chintpurni, Kangra, Dharamshala, or Shimla.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <CallButton className="!py-3.5 !px-6 shadow-lg shadow-amber/20 hover:scale-105 transition-transform" />
          <WhatsAppButton className="!py-3.5 !px-6 hover:scale-105 transition-transform" />
        </div>
      </div>
    </div>
  </section>
);

export const ServicesSection = () => {
  const { services } = useAppData();
  const list = services && services.length > 0 ? services : defaultServices;
  return (
    <section id="services" className="section"><div className="container-x">
      <SectionHeading title="Taxi services for every kind of trip" text="Local rides in Una & Amb, Vande Bharat railway transfers, outstation journeys, and Himachal tours." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <ServiceCard key={s._id || s.id} service={s} />)}</div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-linen/10 bg-surface-mid/60 p-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-amber">Popular routes:</span>
          <Link className="hover:text-amber underline text-ink-dim" to="/taxi-service-in-una">Una Town</Link> ·
          <Link className="hover:text-amber underline text-ink-dim" to="/taxi-service-in-amb">Amb Town</Link> ·
          <Link className="hover:text-amber underline text-ink-dim" to="/taxi-service-amb-andaura">Amb Andaura Station (AADR)</Link> ·
          <Link className="hover:text-amber underline text-ink-dim" to="/nangal-taxi-service">Nangal Dam</Link> ·
          <Link className="hover:text-amber underline text-ink-dim" to="/airport-taxi-service">Chandigarh Airport</Link> ·
          <Link className="hover:text-amber underline text-ink-dim" to="/outstation-taxi-service">Outstation Cabs</Link>
        </div>
        <Link to="/taxi-service-himachal-pradesh" className="text-sm font-bold text-amber hover:underline inline-flex items-center gap-1">
          All Taxi Services &rarr;
        </Link>
      </div>
    </div></section>
  );
};

export const HomeFleetSpotlight = () => {
  const { fleet } = useAppData();
  const list = fleet && fleet.length > 0 ? fleet : defaultFleet;
  const featured = list.slice(0, 3);
  return (
    <section className="section bg-surface-low">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber">Featured Rides</span>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl text-ink">Most Popular Fleet Choices</h2>
            <p className="mt-2 text-sm text-ink-dim">Clean, sanitized cabs with dedicated climate control and verified hill drivers.</p>
          </div>
          <Link
            to="/fleet"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber hover:underline shrink-0"
          >
            Explore All {list.length} Fleet Vehicles &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((v) => (
            <FleetCard key={v._id || v.id} v={v} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomeDestinationsSpotlight = () => {
  const topDests = destinations.slice(0, 3);
  return (
    <section className="section">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber">Top Hill Escapes</span>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl text-ink">Trending Himachal Destinations</h2>
            <p className="mt-2 text-sm text-ink-dim">Private doorstep taxi transfers from Una &amp; Amb Andaura Station.</p>
          </div>
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber hover:underline shrink-0"
          >
            View Route Guides &amp; Distances &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {topDests.map((d) => (
            <DestinationCard key={d.id} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const DestinationsSection = () => (
  <section id="destinations" className="section bg-surface-low"><div className="container-x">
    <SectionHeading title="Popular Himachal destinations" text="Tell us where you want to go and we will arrange the ride." />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{destinations.map((d) => <DestinationCard key={d.id} d={d} />)}</div>
  </div></section>
);

export const WhySection = () => (
  <section className="section bg-surface-low/50">
    <div className="container-x">
      <SectionHeading
        title="Why travellers choose Lucky Tour & Travel"
        text="Over a decade of mountain driving expertise, pristine vehicles, and unmatched punctuality across Himachal Pradesh."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <GlassCard as="div" key={b.title} className="group p-6 transition-all duration-300 hover:border-amber/40 hover:-translate-y-1">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-pine/70 text-amber border border-amber/20 shadow-inner group-hover:scale-110 transition-transform">
              <Icon name={b.icon} size={24} />
            </div>
            <h3 className="mt-4 font-serif text-xl font-bold text-ink group-hover:text-amber transition-colors">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{b.desc}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </section>
);

export const PackagesSection = () => {
  const { packages } = useAppData();
  const list = packages && packages.length > 0 ? packages : defaultPackages;
  return (
    <section id="packages" className="section bg-surface-low"><div className="container-x">
      <SectionHeading title="Tour packages" text="Customized Himachal hill tours with clean cabs, experienced mountain drivers, and transparent pricing." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <GlassCard as="article" key={p._id || p.id} className="group flex flex-col overflow-hidden p-0">
            {p.image && (
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface-high">
                <Link to={p.to || '/himachal-tour-packages'} tabIndex={-1} aria-hidden="true">
                  <img
                    src={p.image}
                    alt={`${p.title} - Lucky Tour & Travel`}
                    loading="lazy"
                    width="600"
                    height="450"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-amber/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber">{p.duration || 'Custom Tour'}</span>
                <span className="text-xs text-ink-dim">{p.destination}</span>
              </div>
              <h3 className="mt-3 text-2xl font-serif">
                <Link to={p.to || '/himachal-tour-packages'} className="hover:text-amber">
                  {p.title}
                </Link>
              </h3>
              {p.highlights && <p className="mt-2 text-xs font-medium text-mint">{p.highlights}</p>}
              <p className="mt-2 flex-1 text-sm text-ink-dim">{p.text}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-linen/10 pt-3">
                <BookButton label="Enquire" preset={{ tripType: 'Tour Package', destination: p.destination }} variant="ghost" className="!text-sm" icon={false} />
                {p.to && (
                  <Link to={p.to} className="text-sm font-semibold text-amber hover:underline">
                    Tour Details &rarr;
                  </Link>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
      <p className="mt-8 text-center"><Link className="font-semibold text-amber underline hover:text-white" to="/himachal-tour-packages">Explore All Himachal Tour Packages &rarr;</Link></p>
    </div></section>
  );
};

export const FleetSection = () => {
  const { fleet } = useAppData();
  const list = fleet && fleet.length > 0 ? fleet : defaultFleet;
  return (
    <section id="fleet" className="section"><div className="container-x">
      <SectionHeading title="Our vehicle fleet" text="Clean, air-conditioned cabs driven by verified hill chauffeurs. Chosen for safety, comfort, and mountain reliability." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{list.map((v) => <FleetCard key={v._id || v.id} v={v} />)}</div>
    </div></section>
  );
};

export const HowItWorks = () => (
  <section className="section bg-surface-low"><div className="container-x">
    <SectionHeading title="How it works" text="Booking your cab with Lucky Tour & Travel is fast, smooth, and transparent in 3 simple steps." />
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((s, i) => (
        <GlassCard as="li" key={s.title} className="group flex flex-col overflow-hidden rounded-2xl border border-linen/10 p-0">
          {s.image && (
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-high">
              <img
                src={s.image}
                alt={s.title}
                width={600}
                height={375}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 rounded-full bg-forest/85 backdrop-blur-md px-3.5 py-1 font-serif text-lg font-bold text-amber border border-amber/30 shadow-md">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            {!s.image && <span className="font-serif text-4xl text-amber">{String(i + 1).padStart(2, '0')}</span>}
            <h3 className="text-xl font-bold text-ink">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim flex-1">{s.text}</p>
          </div>
        </GlassCard>
      ))}
    </ol>
    <div className="mt-8 flex justify-center">
      <BookButton label="Plan My Trip" />
    </div>
  </div></section>
);

export const ReviewsSection = ({ full = false }) => {
  const { reviews } = useAppData();
  const list = reviews && reviews.length > 0 ? reviews : defaultReviews;
  return (
    <section id="reviews" className="section"><div className="container-x">
      <SectionHeading title="What travellers say" text="Verified feedback and testimonials from travellers who rode with Lucky Tour & Travel" />
      <div className="grid gap-5 md:grid-cols-3">{list.map((r) => <ReviewCard key={r.id || r._id || r.name} r={r} />)}</div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {SITE.googleBusinessUrl && <CTAButton href={SITE.googleBusinessUrl} target="_blank" rel="noopener noreferrer" variant="ghost">View All Reviews on Google</CTAButton>}
        {!full && <Link to="/reviews" className="font-semibold text-amber underline">Read reviews page</Link>}
      </div>
    </div></section>
  );
};

export const ServiceAreaSection = () => (
  <section className="section bg-surface-low"><div className="container-x">
    <SectionHeading title="Primary Service Areas & Taxi Hubs" text="Based in Tehsil Amb, District Una — connecting passengers across Himachal Pradesh, Punjab & Delhi NCR." />
    <ul className="flex flex-wrap gap-3">{serviceArea.map((a) => <li key={a} className="glass flex items-center gap-2 rounded-full px-5 py-2"><MapPin size={16} className="text-amber" aria-hidden="true" />{a}</li>)}</ul>
  </div></section>
);

export const BookingCTA = () => (
  <section className="section"><div className="container-x">
    <GlassCard className="bg-pine/60 p-8 text-center md:p-14">
      <Sparkles className="mx-auto text-amber" aria-hidden="true" />
      <h2 className="mt-3 text-3xl md:text-5xl">Ready to book your Himachal taxi?</h2>
      <p className="mx-auto mt-3 max-w-xl text-ink">Call us or send your trip details for a quote.</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><CallButton /><BookButton label="Request a Quote" variant="ghost" /><WhatsAppButton /></div>
    </GlassCard>
  </div></section>
);

export const ContactSection = () => {
  const { settings } = useAppData();
  const phone1 = settings?.phone1 || SITE.phones[0].display;
  const phone1Tel = settings?.phone1Tel || SITE.phones[0].tel;
  const phone2 = settings?.phone2 || SITE.phones[1].display;
  const phone2Tel = settings?.phone2Tel || SITE.phones[1].tel;
  return (
    <section id="contact" className="section bg-surface-low"><div className="container-x grid gap-10 lg:grid-cols-5">
      <div className="lg:col-span-2">
        <SectionHeading title="Request a taxi quote" text="Fill in your trip details. We will contact you to confirm." />
        <p className="text-ink-dim">Prefer to talk? Call <a className="text-amber underline" href={`tel:${phone1Tel}`}>{phone1}</a> or <a className="text-amber underline" href={`tel:${phone2Tel}`}>{phone2}</a>.</p>
      </div>
      <GlassCard className="p-6 md:p-8 lg:col-span-3"><BookingForm /></GlassCard>
    </div></section>
  );
};
