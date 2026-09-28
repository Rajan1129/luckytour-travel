import { useState } from 'react';
import { MapPin, Navigation, Calendar, Car, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { useEnquiry } from '../hooks/useEnquiryModal.jsx';
import { SITE } from '../config/site.js';

const TABS = [
  { id: 'Outstation', label: 'Outstation' },
  { id: 'Railway/Airport', label: 'Station / Airport' },
  { id: 'Local', label: 'Local Ride' },
  { id: 'Tour Package', label: 'Tour Package' }
];

const QUICK_PICKUPS = ['Amb Andaura Stn', 'Una Town', 'Amb', 'Nangal'];
const QUICK_DROPS = ['Shimla', 'Manali', 'Dharamshala', 'Chandigarh Airport'];

const FLEET_OPTIONS = [
  'Maruti Suzuki Ertiga (6+1 Seater)',
  'Toyota Innova Crysta (Luxury 7+1)',
  'Force Urbania (Executive 10-14 Seater)',
  'Toyota Innova Hycross (Hybrid MPV)',
  'Toyota Fortuner (4x4 SUV)',
  'Mahindra Scorpio-N (Mountain SUV)',
  'Maruti Suzuki Dzire (Sedan)',
  'Force Tempo Traveller (12-17 Seater)'
];

export default function HeroBookingCard() {
  const { openEnquiry } = useEnquiry();
  const [tripType, setTripType] = useState('Outstation');
  const [pickup, setPickup] = useState('Amb Andaura Railway Station');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [vehicle, setVehicle] = useState('Maruti Suzuki Ertiga (6+1 Seater)');

  const handleSubmit = (e) => {
    e.preventDefault();
    openEnquiry({
      tripType: tripType === 'Railway/Airport' ? 'Airport/Railway Transfer' : tripType,
      pickup,
      destination,
      travelDate,
      vehicle: vehicle.split(' (')[0]
    });
  };

  return (
    <div className="relative rounded-3xl border border-amber/30 bg-surface-mid/85 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl md:p-7">
      {/* Decorative gradient glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-mint/10 blur-2xl" />

      {/* Card Header */}
      <div className="relative flex items-center justify-between pb-4 border-b border-linen/10">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-semibold text-amber">
            <Sparkles size={12} className="animate-pulse" /> Instant Upfront Fare
          </span>
          <h2 className="mt-1 font-serif text-2xl font-bold text-ink">Book Your Taxi</h2>
        </div>
        <div className="text-right">
          <span className="block text-xs font-semibold text-mint">★ 5.0 Google Rating</span>
          <span className="text-[11px] text-ink-dim">No Advance Payment</span>
        </div>
      </div>

      {/* Trip Type Tabs */}
      <div className="mt-4 grid grid-cols-4 gap-1 rounded-xl bg-surface-high/80 p-1 text-xs font-medium">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTripType(t.id)}
            className={`rounded-lg py-2 transition-all text-center ${
              tripType === t.id
                ? 'bg-amber text-surface font-bold shadow-md'
                : 'text-ink-dim hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Quick Booking Form */}
      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {/* Pickup Input */}
        <div>
          <label htmlFor="hero-pickup" className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-dim">
            <MapPin size={13} className="text-amber" /> Pickup Location
          </label>
          <div className="relative">
            <input
              id="hero-pickup"
              type="text"
              required
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="e.g. Amb Andaura Station / Una"
              className="w-full rounded-xl border border-linen/15 bg-surface-high/90 px-3.5 py-2.5 text-sm text-ink placeholder:text-outline focus:border-amber focus:outline-none"
            />
          </div>
          {/* Quick Pickup Pills */}
          <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
            {QUICK_PICKUPS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPickup(p)}
                className="rounded-md bg-pine/50 px-2 py-0.5 text-mint hover:bg-pine hover:text-white transition-colors"
              >
                + {p}
              </button>
            ))}
          </div>
        </div>

        {/* Destination Input */}
        <div>
          <label htmlFor="hero-dest" className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-dim">
            <Navigation size={13} className="text-mint" /> Drop Destination
          </label>
          <div className="relative">
            <input
              id="hero-dest"
              type="text"
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Shimla / Manali / Chandigarh"
              className="w-full rounded-xl border border-linen/15 bg-surface-high/90 px-3.5 py-2.5 text-sm text-ink placeholder:text-outline focus:border-amber focus:outline-none"
            />
          </div>
          {/* Quick Destination Pills */}
          <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px]">
            {QUICK_DROPS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDestination(d)}
                className="rounded-md bg-pine/50 px-2 py-0.5 text-mint hover:bg-pine hover:text-white transition-colors"
              >
                + {d}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Vehicle in 2 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label htmlFor="hero-date" className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-dim">
              <Calendar size={13} className="text-amber" /> Travel Date
            </label>
            <input
              id="hero-date"
              type="date"
              required
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full rounded-xl border border-linen/15 bg-surface-high/90 px-3 py-2 text-xs text-ink focus:border-amber focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="hero-vehicle" className="mb-1 flex items-center gap-1.5 text-xs font-medium text-ink-dim">
              <Car size={13} className="text-mint" /> Vehicle
            </label>
            <select
              id="hero-vehicle"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full rounded-xl border border-linen/15 bg-surface-high/90 px-2.5 py-2 text-xs text-ink focus:border-amber focus:outline-none"
            >
              {FLEET_OPTIONS.map((f) => (
                <option key={f} value={f} className="bg-surface text-ink">
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber to-[#e09849] py-3.5 text-sm font-bold text-surface shadow-lg shadow-amber/20 transition-all hover:brightness-110 active:scale-[0.99]"
          >
            <span>Check Upfront Fare &amp; Book</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Fast Call shortcut */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-ink-dim">
          <span>Need immediate station pickup?</span>
          <a
            href={`tel:${SITE.phones[0].tel}`}
            className="inline-flex items-center gap-1 font-semibold text-amber hover:underline"
          >
            <PhoneCall size={12} /> Call: {SITE.phones[0].display}
          </a>
        </div>
      </form>
    </div>
  );
}
