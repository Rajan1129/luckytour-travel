import { Link, Navigate, useLocation } from 'react-router-dom';
import PageShell from '../components/PageShell.jsx';
import GlassCard from '../components/GlassCard.jsx';
import CallButton from '../components/CallButton.jsx';
import BookButton from '../components/BookButton.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import { landingPages } from '../data/landingPages.js';
import { services } from '../data/content.js';
import { faqLd } from '../components/SEO.jsx';

export default function LandingPage() {
  const slug = useLocation().pathname.replace(/^\//, '');
  const p = landingPages[slug];
  if (!p) return <Navigate to="/" replace />;
  const crumbs = [
    ...(p.parent ? [{ name: 'Taxi Services', to: `/${p.parent}` }] : []),
    { name: p.crumb, to: `/${slug}` }
  ];
  if (!p.parent) crumbs[0] = { name: 'Taxi Services', to: `/${slug}` };

  const relatedServices = services.filter((s) => s.to !== `/${slug}`).slice(0, 3);

  return (
    <PageShell path={`/${slug}`} title={p.title} description={p.description} h1={p.h1} intro={p.intro} crumbs={crumbs} extraLd={[faqLd(p.faqs)]}>
      {/* Quick Action Hotline Bar overlapping the hero */}
      <div className="container-x -mt-6 relative z-20 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber/30 bg-surface-mid/95 p-4 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm font-semibold text-ink">
              Live Dispatch Ready &bull; Amb Andaura Station (AADR) &amp; Una
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <CallButton className="!py-2 !px-4 text-xs font-bold" />
            <WhatsAppButton className="!py-2 !px-4 text-xs font-bold" />
            <BookButton label="Get Upfront Quote" preset={{ destination: p.tripDest || '' }} variant="ghost" className="!py-2 !px-4 text-xs" />
          </div>
        </div>
      </div>

      <div className="container-x grid gap-5 py-10 md:grid-cols-2">
        {p.sections.map((s) => (
          <GlassCard as="section" key={s.h2} className="p-6">
            <h2 className="text-3xl">{s.h2}</h2>
            <p className="mt-2 text-ink-dim">{s.body}</p>
            {s.links && (
              <ul className="mt-4 grid gap-2">
                {s.links.map(([t, to]) => (
                  <li key={to}>
                    <Link className="inline-flex items-center gap-1 font-semibold text-amber hover:underline" to={to}>
                      <span>&bull;</span> {t} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </GlassCard>
        ))}
      </div>

      {relatedServices.length > 0 && (
        <section className="container-x py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber">Interconnected Routes</p>
              <h2 className="mt-1 text-3xl">Other Popular Taxi Services</h2>
            </div>
            <Link to="/himachal-tour-packages" className="text-sm font-semibold text-amber hover:underline">
              View All Tour Packages &rarr;
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>
      )}

      <section className="container-x pb-16" aria-labelledby="faq-h">
        <h2 id="faq-h" className="mb-4 text-3xl">Common questions</h2>
        <div className="grid gap-3">
          {p.faqs.map(([q, a]) => (
            <details key={q} className="glass rounded-xl p-4">
              <summary className="cursor-pointer font-semibold">{q}</summary>
              <p className="mt-2 text-ink-dim">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
