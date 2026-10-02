import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  Car, 
  Navigation,
  ArrowRight,
  Train,
  Plane
} from 'lucide-react';
import PageShell from '../components/PageShell.jsx';
import GlassCard from '../components/GlassCard.jsx';
import ServiceCard from './../components/ServiceCard.jsx';
import BookButton from '../components/BookButton.jsx';
import CallButton from '../components/CallButton.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import { BookingCTA } from '../components/sections.jsx';
import { services as defaultServices, fleet as defaultFleet } from '../data/content.js';
import { useAppData } from '../context/DataContext.jsx';
import { faqLd } from '../components/SEO.jsx';

const FARES_TABLE = [
  { route: 'Amb Andaura Station to Mata Chintpurni', dist: '28 km', time: '45 mins', dzire: '₹900 - ₹1,100', ertiga: '₹1,200 - ₹1,400', innova: '₹1,800 - ₹2,000', tripDest: 'Chintpurni' },
  { route: 'Amb Andaura Station to Mata Baglamukhi (Bankhandi)', dist: '45 km', time: '1h 15m', dzire: '₹1,400 - ₹1,600', ertiga: '₹1,600 - ₹1,800', innova: '₹2,200 - ₹2,500', tripDest: 'Baglamukhi Temple' },
  { route: 'Amb Andaura Station to Mata Jwala Ji (Jawalamukhi)', dist: '52 km', time: '1h 20m', dzire: '₹1,500 - ₹1,800', ertiga: '₹1,800 - ₹2,100', innova: '₹2,400 - ₹2,700', tripDest: 'Jawalamukhi' },
  { route: 'Una / Amb to Chandigarh Airport (IXC)', dist: '135 km', time: '2.5 - 3 hrs', dzire: '₹2,500 - ₹2,800', ertiga: '₹3,200 - ₹3,600', innova: '₹4,200 - ₹4,800', tripDest: 'Chandigarh Airport' },
  { route: 'Una / Amb to Dharamshala & McLeod Ganj', dist: '110 km', time: '3 - 3.5 hrs', dzire: '₹2,400 - ₹2,800', ertiga: '₹2,800 - ₹3,300', innova: '₹3,800 - ₹4,400', tripDest: 'Dharamshala' },
  { route: 'Una / Amb to Shimla (via Solan / Nalagarh)', dist: '165 km', time: '4.5 - 5 hrs', dzire: '₹3,200 - ₹3,600', ertiga: '₹3,800 - ₹4,400', innova: '₹5,200 - ₹5,800', tripDest: 'Shimla' },
  { route: 'Una / Amb to Manali (via Mandi & Kullu)', dist: '240 km', time: '6.5 - 7 hrs', dzire: '₹4,500 - ₹5,000', ertiga: '₹5,500 - ₹6,200', innova: '₹7,200 - ₹8,000', tripDest: 'Manali' },
  { route: 'Una / Amb to Dalhousie & Khajjiar', dist: '185 km', time: '5 - 5.5 hrs', dzire: '₹3,800 - ₹4,200', ertiga: '₹4,600 - ₹5,200', innova: '₹6,000 - ₹6,800', tripDest: 'Dalhousie' },
  { route: 'Una / Amb to Delhi NCR (One-Way Express Drop)', dist: '365 km', time: '7 - 8 hrs', dzire: '₹5,500 - ₹6,000', ertiga: '₹6,800 - ₹7,500', innova: '₹9,000 - ₹10,000', tripDest: 'Delhi NCR' }
];

const FAQS = [
  ['How do I book a taxi with Lucky Tour & Travel?', 'You can book instantly by calling 09816980599 or 09817980599, messaging us on WhatsApp, or submitting the quick quote form on our website. We provide instant confirmation.'],
  ['Are taxis available at Amb Andaura Railway Station for Vande Bharat Express?', 'Yes, we provide 24/7 dedicated train arrival pickups for the New Delhi – Amb Andaura Vande Bharat Express (Train 22447/22448) and Himachal Express. Your sanitized cab will be waiting right at the station exit when your train pulls in.'],
  ['What are your taxi rates for outstation trips from Una and Amb?', 'Outstation rates start at approximately ₹11–₹13/km for sedans (Maruti Dzire), ₹14–₹16/km for MPVs (Maruti Ertiga), and ₹18–₹22/km for luxury SUVs (Toyota Innova Crysta). We also provide transparent fixed upfront quotes with no hidden charges.'],
  ['Can we hire a cab for same-day Devi Darshan covering multiple temples?', 'Yes, our popular Shaktipeeth Darshan package covers Mata Chintpurni, Mata Baglamukhi (Bankhandi), Mata Jwala Ji, Chamunda Devi, and Kangra Brajeshwari Devi with flexible temple waiting time.'],
  ['Do your cabs have functional air conditioning in hill areas?', 'All our vehicles are modern, dual-AC equipped models in pristine condition. AC runs comfortably throughout plains and gentle climbs.']
];

const CATEGORIES = [
  { id: 'all', label: 'All Taxi Services' },
  { id: 'station', label: 'Railway Transfers' },
  { id: 'temple', label: 'Devi Darshan' },
  { id: 'airport', label: 'Airport Transfers' },
  { id: 'outstation', label: 'Outstation & Hills' }
];

export default function TaxiServices() {
  const { services, fleet } = useAppData();
  const serviceList = services && services.length > 0 ? services : defaultServices;
  const fleetList = fleet && fleet.length > 0 ? fleet : defaultFleet;
  const [activeTab, setActiveTab] = useState('all');

  const filteredServices = serviceList.filter((s) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'station') return s.tripType === 'Station Pickup' || (s.id && s.id.includes('station')) || (s.title && s.title.toLowerCase().includes('station'));
    if (activeTab === 'temple') return s.tripType === 'Temple Yatra' || (s.id && s.id.includes('baglamukhi')) || (s.title && s.title.toLowerCase().includes('temple'));
    if (activeTab === 'airport') return s.tripType === 'Airport' || (s.title && s.title.toLowerCase().includes('airport'));
    if (activeTab === 'outstation') return s.tripType === 'Outstation' || s.tripType === 'Tour Package';
    return true;
  });

  return (
    <PageShell
      path="/taxi-service-himachal-pradesh"
      title="Taxi Service in Himachal Pradesh | 24/7 Outstation, Station & Tour Cabs"
      description="Book the best taxi service in Himachal Pradesh with Lucky Tour & Travel. Punctual Amb Andaura Railway Station pickups, local cabs in Una & Amb, airport drops & hill tours."
      h1="Taxi Services in Himachal Pradesh"
      intro="Reliable, sanitized, and air-conditioned cabs driven by verified mountain chauffeurs. Operating 24/7 across Una, Amb Andaura Railway Station (AADR), Kangra Valley, and all premier Himachal destinations."
      crumbs={[{ name: 'Taxi Services', to: '/taxi-service-himachal-pradesh' }]}
      extraLd={[faqLd(FAQS)]}
    >
      {/* Quick Action & Hotline Bar */}
      <div className="container-x -mt-6 relative z-20 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber/30 bg-surface-mid/95 p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber">Immediate Taxi Dispatch</p>
            <p className="text-sm text-ink-dim">Cabs ready at Amb Andaura Station (AADR) &amp; Una Town</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CallButton className="!py-2.5 !px-5 text-sm" />
          <WhatsAppButton className="!py-2.5 !px-5 text-sm" />
          <BookButton label="Book Online" variant="ghost" className="!py-2.5 !px-5 text-sm" />
        </div>
      </div>

      {/* Service Category Filter Tabs */}
      <section className="container-x pb-8">
        <div className="flex flex-wrap gap-2 border-b border-linen/10 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveTab(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat.id
                  ? 'bg-amber text-surface shadow-md'
                  : 'bg-surface-mid text-ink-dim hover:bg-surface-high hover:text-white border border-linen/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-x pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Transparent Fare Chart & Distance Table */}
      <section className="container-x py-12">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber">
            <Sparkles size={13} /> Transparent Pricing
          </span>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl text-ink">Popular Taxi Routes &amp; Estimated Fares</h2>
          <p className="mt-2 text-sm text-ink-dim max-w-2xl">
            Standard one-way and round-trip fare benchmarks departing from Una and Amb Andaura Railway Station (AADR). All quotes are transparent with zero hidden extras.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-linen/15 bg-surface-mid/80 backdrop-blur-md shadow-xl">
          <table className="w-full text-left text-sm text-ink-dim">
            <thead className="bg-surface-high text-xs uppercase tracking-wider text-amber border-b border-linen/15">
              <tr>
                <th scope="col" className="px-5 py-4 font-bold">Route Destination</th>
                <th scope="col" className="px-4 py-4 font-bold">Distance</th>
                <th scope="col" className="px-4 py-4 font-bold">Duration</th>
                <th scope="col" className="px-4 py-4 font-bold">Sedan (Dzire)</th>
                <th scope="col" className="px-4 py-4 font-bold">Ertiga (6+1)</th>
                <th scope="col" className="px-4 py-4 font-bold">Innova Crysta</th>
                <th scope="col" className="px-5 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen/10">
              {FARES_TABLE.map((row) => (
                <tr key={row.route} className="hover:bg-surface-high/50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-ink flex items-center gap-2">
                    <MapPin size={15} className="text-amber shrink-0" />
                    <span>{row.route}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs">{row.dist}</td>
                  <td className="px-4 py-3.5 text-xs flex-nowrap">{row.time}</td>
                  <td className="px-4 py-3.5 text-mint font-medium">{row.dzire}</td>
                  <td className="px-4 py-3.5 text-amber font-semibold">{row.ertiga}</td>
                  <td className="px-4 py-3.5 text-linen">{row.innova}</td>
                  <td className="px-5 py-3.5 text-right">
                    <BookButton
                      label="Book"
                      preset={{ destination: row.tripDest, tripType: 'Outstation' }}
                      variant="ghost"
                      className="!py-1 !px-3 !text-xs"
                      icon={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-outline">
          * Fares listed above are typical standard benchmarks for one-way journeys and may vary marginally based on seasonal peak demand or night driving hours. Send your trip details for an exact upfront quote.
        </p>
      </section>

      {/* Shaktipeeth Pilgrimage Circuit Highlight */}
      <section className="container-x py-10">
        <div className="relative overflow-hidden rounded-3xl border border-amber/30 bg-gradient-to-r from-pine/90 via-surface-high/90 to-pine/80 p-8 md:p-10 shadow-xl">
          <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full bg-amber/15 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber border border-amber/30">
              🛕 Himachal Devi Darshan Special
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-linen">
              Mata Chintpurni, Baglamukhi &amp; Jwala Ji Pilgrimage Cabs
            </h2>
            <p className="mt-2 text-sm text-ink-dim max-w-3xl leading-relaxed">
              Arriving at Amb Andaura station on the Vande Bharat Express? We provide specialized temple pilgrimage taxis with respectful, courteous drivers who assist devotees with temple parking, darshan schedules, and havan waiting periods.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-ink">
              <span className="rounded-lg bg-surface/60 border border-linen/10 px-3.5 py-2">
                ✓ Mata Chintpurni Devi (28 km)
              </span>
              <span className="rounded-lg bg-surface/60 border border-linen/10 px-3.5 py-2">
                ✓ Mata Baglamukhi Bankhandi (45 km)
              </span>
              <span className="rounded-lg bg-surface/60 border border-linen/10 px-3.5 py-2">
                ✓ Mata Jwalamukhi (52 km)
              </span>
              <span className="rounded-lg bg-surface/60 border border-linen/10 px-3.5 py-2">
                ✓ Kangra Brajeshwari &amp; Chamunda Devi
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/amb-to-baglamukhi-taxi"
                className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-bold text-surface hover:brightness-110 transition-all shadow-md"
              >
                Amb to Baglamukhi Taxi Details <ArrowRight size={15} />
              </Link>
              <BookButton
                label="Book Pilgrimage Cab"
                preset={{ tripType: 'Temple Yatra', destination: 'Chintpurni & Baglamukhi' }}
                variant="ghost"
                className="!py-3 !px-5 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Overview for Taxi Services */}
      <section className="container-x py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber">Vehicles We Operate</span>
            <h2 className="mt-1 font-serif text-3xl md:text-4xl text-ink">Choose Your Preferred Cab</h2>
            <p className="mt-2 text-sm text-ink-dim">All vehicles are sanitized, dual-AC equipped, and driven by verified mountain chauffeurs.</p>
          </div>
          <Link
            to="/fleet"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber hover:underline shrink-0"
          >
            View Complete 8-Vehicle Fleet &rarr;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fleetList.slice(0, 4).map((v) => (
            <GlassCard key={v._id || v.id} className="flex flex-col p-5">
              <span className="rounded bg-amber/10 px-2 py-0.5 text-[11px] font-semibold text-amber w-fit">
                {v.type}
              </span>
              <h3 className="mt-2 font-serif text-xl font-bold text-ink">{v.name}</h3>
              <p className="mt-1 text-xs text-mint font-medium">{v.capacity} • {v.bags}</p>
              <p className="mt-2 text-xs text-ink-dim flex-1">{v.text}</p>
              <div className="mt-4 border-t border-linen/10 pt-3">
                <BookButton
                  label="Book This Cab"
                  preset={{ vehicle: v.name }}
                  variant="ghost"
                  className="w-full justify-center !text-xs !py-2"
                  icon={false}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="container-x py-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-amber">Help &amp; FAQs</span>
          <h2 className="mt-1 font-serif text-3xl md:text-4xl text-ink">Taxi Services FAQ</h2>
          <p className="mt-2 text-sm text-ink-dim">Common questions about taxi booking, station pickups, and outstation fares.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {FAQS.map(([q, a]) => (
            <GlassCard key={q} className="p-6">
              <h3 className="font-serif text-lg font-bold text-ink">{q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{a}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <BookingCTA />
    </PageShell>
  );
}
