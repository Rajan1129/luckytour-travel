import { MapPin, ExternalLink } from 'lucide-react';
import GlassCard from './GlassCard.jsx';
import SectionHeading from './SectionHeading.jsx';
import { SITE } from '../config/site.js';

export default function MapSection() {
  const q = encodeURIComponent(SITE.plusCode);
  return (
    <section id="location" className="section" aria-labelledby="map-h">
      <div className="container-x grid gap-8 lg:grid-cols-5">
        <GlassCard className="p-6 lg:col-span-2 md:p-8">
          <SectionHeading as="h2" title="Find us in Amb / Amb Andaura" />
          <address className="not-italic text-lg text-ink-dim"><strong className="text-ink">Lucky Tour &amp; Travel</strong><br />M4C6+54R, Amb Andaura Railway Station Rd,<br />Amb, Himachal Pradesh 177203</address>
          <p className="mt-3 text-ink-dim">Google Plus Code: <span className="text-ink">{SITE.plusCode}</span></p>
          <a className="mt-5 inline-flex items-center gap-2 font-semibold text-amber underline" href={`https://maps.google.com/?q=${q}`} target="_blank" rel="noopener noreferrer"><MapPin size={18} aria-hidden="true" />Open in Google Maps<ExternalLink size={14} aria-hidden="true" /></a>
        </GlassCard>
        <div className="min-h-[320px] overflow-hidden rounded-2xl border border-linen/10 lg:col-span-3">
          {SITE.mapsEmbed
            ? <iframe title="Lucky Tour & Travel location map" src={SITE.mapsEmbed} className="h-full min-h-[320px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            : <div className="grid h-full min-h-[320px] place-items-center bg-surface-mid p-6 text-center text-ink-dim">Map preview will appear once the Google Maps embed URL is configured. Use “Open in Google Maps” for directions.</div>}
        </div>
      </div>
    </section>
  );
}
