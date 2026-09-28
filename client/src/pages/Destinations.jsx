import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import PageShell from '../components/PageShell.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { DestinationsSection, BookingCTA } from '../components/sections.jsx';

const travelGuide = [
  { dest: 'Shimla & Kufri', dist: '165 km', time: '4.5 - 5 hrs', route: 'Via Una - Nangal - Nalagarh - Solan - Shimla', to: '/taxi-service-shimla' },
  { dest: 'Manali & Solang Valley', dist: '240 km', time: '6 - 7 hrs', route: 'Via Amb - Bhota - Mandi - Kullu - Manali', to: '/taxi-service-manali' },
  { dest: 'Dharamshala & McLeod Ganj', dist: '110 km', time: '3 - 3.5 hrs', route: 'Via Amb - Kangra - Dharamshala', to: '/taxi-service-dharamshala' },
  { dest: 'Mata Chintpurni Devi Ji', dist: '30 km', time: '45 mins', route: 'Direct highway via Amb', to: '/taxi-service-in-amb' },
  { dest: 'Chandigarh Airport (IXC)', dist: '135 km', time: '2.5 - 3 hrs', route: 'Via Una - Nangal - Ropar - Kharar - Mohali', to: '/airport-taxi-service' },
  { dest: 'Dalhousie & Khajjiar', dist: '185 km', time: '5 - 5.5 hrs', route: 'Via Amb - Talwara - Pathankot - Banikhet', to: '/outstation-taxi-service' }
];

export default function Destinations() {
  return (
    <PageShell
      path="/destinations"
      title="Popular Himachal Taxi Destinations | Shimla, Manali, Dharamshala, Chintpurni"
      description="Book cabs from Una & Amb to top Himachal destinations: Shimla, Manali, Dharamshala, Chintpurni, and Chandigarh Airport with Lucky Tour & Travel."
      h1="Popular Himachal Destinations"
      intro="Convenient private taxi transfers from Una and Amb Andaura Railway Station to Himachal Pradesh’s top hill stations, sacred pilgrimage shrines, and airports."
      crumbs={[{ name: 'Destinations', to: '/destinations' }]}
    >
      <DestinationsSection />

      {/* Distance & Travel Time Guide */}
      <section className="container-x py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">Route &amp; Travel Guide</p>
          <h2 className="mt-1 font-serif text-3xl md:text-4xl">Distances from Una &amp; Amb Andaura (AADR)</h2>
          <p className="mt-2 text-ink-dim">Typical driving distances and average travel times with experienced mountain drivers.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {travelGuide.map((g) => (
            <GlassCard key={g.dest} className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-xl font-bold text-ink">{g.dest}</span>
                <span className="rounded-md bg-amber/10 px-2.5 py-0.5 text-xs font-semibold text-amber">{g.dist}</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-ink-dim">
                <Clock size={16} className="text-amber" aria-hidden="true" />
                <span>Travel Time: <strong className="text-ink">{g.time}</strong></span>
              </div>
              <div className="mt-2 flex items-start gap-2 text-xs text-ink-dim flex-1">
                <MapPin size={16} className="text-mint shrink-0 mt-0.5" aria-hidden="true" />
                <span>{g.route}</span>
              </div>
              <div className="mt-5 border-t border-linen/10 pt-3">
                <Link to={g.to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber hover:underline">
                  Book Taxi to {g.dest.split(' ')[0]} <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Cross link to packages */}
      <section className="container-x pb-12 text-center text-ink-dim">
        <p>
          Want a complete holiday package with hotel stays and sightseeing? Check out our{' '}
          <Link className="font-semibold text-amber underline hover:text-white" to="/himachal-tour-packages">
            Himachal Tour Packages &rarr;
          </Link>
        </p>
      </section>

      <BookingCTA />
    </PageShell>
  );
}
