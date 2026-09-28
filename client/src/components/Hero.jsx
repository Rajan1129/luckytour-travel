import { motion, useReducedMotion } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import CallButton from './CallButton.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import HeroBookingCard from './HeroBookingCard.jsx';
import MountainScene from './MountainScene.jsx';

const HERO_IMAGE = '/images/himachal-taxi-service.jpg';

export default function Hero() {
  const reduce = useReducedMotion();
  const a = (d) => (reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d } });

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32" aria-labelledby="hero-h">
      {/* Background Image & Gradient Layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {HERO_IMAGE ? (
          <img
            src={HERO_IMAGE}
            alt="Lucky Tour & Travel taxi on a Himachal Pradesh mountain road"
            width="1920"
            height="1080"
            fetchpriority="high"
            className="h-full w-full object-cover scale-105 transition-transform duration-1000"
          />
        ) : (
          <MountainScene hue={150} label="Himalayan mountains at sunrise" className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-black/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-surface/40 to-surface" />
      </div>

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Headline, Value Props, Call Shortcuts */}
        <div className="lg:col-span-7">
          <motion.div {...a(0)} className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-surface-mid/80 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm shadow-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-amber">24/7 Live Taxi Dispatch</span>
            <span className="text-outline">|</span>
            <span className="text-ink font-medium">Amb Andaura &amp; Una Hub</span>
          </motion.div>

          <motion.h1
            id="hero-h"
            {...a(0.1)}
            className="mt-5 font-serif text-4xl font-bold tracking-tight text-linen sm:text-5xl lg:text-6xl leading-[1.12]"
          >
            Comfortable Mountain Taxis &amp; Outstation Cabs in{' '}
            <span className="bg-gradient-to-r from-amber via-yellow-200 to-amber bg-clip-text text-transparent">
              Himachal
            </span>
          </motion.h1>

          <motion.p {...a(0.2)} className="mt-5 max-w-2xl text-base sm:text-lg text-ink-dim leading-relaxed">
            Punctual pickups at <strong className="text-ink">Amb Andaura Station (Vande Bharat Express)</strong> and Una.
            Clean Ertiga, Innova Crysta &amp; Force Urbania cabs driven by verified hill chauffeurs to Shimla, Manali, Dharamshala, and Chandigarh.
          </motion.p>

          {/* Value Highlights Chips */}
          <motion.div {...a(0.25)} className="mt-5 flex flex-wrap gap-2.5 text-xs sm:text-sm text-ink font-medium">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-high/70 border border-linen/10 px-3 py-1.5">
              <CheckCircle2 size={15} className="text-amber" /> Sanitized AC Cabs
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-high/70 border border-linen/10 px-3 py-1.5">
              <CheckCircle2 size={15} className="text-mint" /> 15-Min Station Pickup
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface-high/70 border border-linen/10 px-3 py-1.5">
              <CheckCircle2 size={15} className="text-amber" /> No Hidden Mountain Tolls
            </span>
          </motion.div>

          {/* Call & WhatsApp Quick Buttons */}
          <motion.div {...a(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
            <CallButton className="shadow-lg shadow-amber/20 hover:brightness-110" />
            <WhatsAppButton />
          </motion.div>

          {/* Social Proof Strip */}
          <motion.div {...a(0.35)} className="mt-8 flex items-center gap-4 border-t border-linen/10 pt-5 text-xs text-ink-dim">
            <div className="flex items-center gap-1 text-amber">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} className="fill-amber text-amber" />
              ))}
            </div>
            <div>
              <span className="font-bold text-ink">5.0 Star Rated Taxi Service</span>
              <span className="mx-2 text-outline">&bull;</span>
              <span>Trusted by 10,000+ Himachal Travellers</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Quick Booking Estimator Card */}
        <motion.div {...a(0.2)} className="lg:col-span-5">
          <HeroBookingCard />
        </motion.div>
      </div>
    </section>
  );
}
