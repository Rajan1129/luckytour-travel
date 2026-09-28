import { Link } from 'react-router-dom';
import { Sparkles, UserCheck, Wrench, Luggage, Snowflake, Navigation } from 'lucide-react';
import PageShell from '../components/PageShell.jsx';
import GlassCard from '../components/GlassCard.jsx';
import { FleetSection, BookingCTA } from '../components/sections.jsx';

export default function Fleet() {
  const fleetFeatures = [
    { icon: Sparkles, title: 'Impeccable Cleanliness', desc: 'Every cab undergoes full sanitisation, vacuuming, and fresh interior checks before pickup.' },
    { icon: UserCheck, title: 'Hill-Trained Drivers', desc: 'Expert mountain chauffeurs licensed and experienced in navigating steep curves and seasonal weather.' },
    { icon: Wrench, title: 'Zero Breakdown Maintenance', desc: 'Fleet serviced according to strict OEM schedules with regular brake and tyre mountain fitness checks.' },
    { icon: Snowflake, title: 'Dual Air Conditioning', desc: 'Individual AC vents and dual-zone climate control for supreme passenger comfort on sunny days.' },
    { icon: Luggage, title: 'Ample Luggage Storage', desc: 'Dedicated boots, carrier options, and folding seat versatility for all passenger luggage.' },
    { icon: Navigation, title: 'GPS Tracked & Safe', desc: 'Vehicles monitored for punctuality, passenger security, and smooth route navigation.' }
  ];

  return (
    <PageShell
      path="/fleet"
      title="Taxi Fleet in Himachal | Force Urbania, Innova Crysta, Fortuner, Ertiga, Scorpio"
      description="Explore the premium taxi fleet of Lucky Tour & Travel in Una & Amb. Force Urbania, Toyota Innova Crysta, Fortuner, Scorpio-N, Ertiga, Dzire & Tempo Traveller."
      h1="Our Taxi Fleet & Vehicles"
      intro="From budget-friendly sedans and comfortable family MPVs to luxury 4x4 mountain SUVs and executive luxury vans — choose the ideal vehicle for your Himachal journey."
      crumbs={[{ name: 'Fleet', to: '/fleet' }]}
    >
      <FleetSection />

      {/* Fleet Standards & Amenities */}
      <section className="container-x py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">Safety &amp; Comfort Standards</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">Why Our Cabs Stand Out</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleetFeatures.map((f) => {
            const Icon = f.icon;
            return (
              <GlassCard key={f.title} className="p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber/10 text-amber">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm text-ink-dim">{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Cross link to packages & services */}
      <section className="container-x pb-12 text-center text-ink-dim">
        <p>
          Planning a hill tour? Explore our curated{' '}
          <Link className="font-semibold text-amber underline hover:text-white" to="/himachal-tour-packages">
            Himachal Tour Packages &rarr;
          </Link>{' '}
          or view all{' '}
          <Link className="font-semibold text-amber underline hover:text-white" to="/taxi-service-himachal-pradesh">
            Taxi Services &rarr;
          </Link>
        </p>
      </section>

      <BookingCTA />
    </PageShell>
  );
}
