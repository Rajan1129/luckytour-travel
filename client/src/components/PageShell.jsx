import Breadcrumbs from './Breadcrumbs.jsx';
import SEO, { breadcrumbLd, localBusinessLd } from './SEO.jsx';

// Automatically maps route paths to real, authentic high-resolution Himachal photos
function getAutoBgImage(path = '') {
  const p = path.toLowerCase();
  if (p.includes('fleet')) return '/images/force-urbania.jpg';
  if (p.includes('tour') || p.includes('package')) return '/images/service-tour-package.jpg';
  if (p.includes('destination')) return '/images/manali.jpg';
  if (p.includes('andaura') || p.includes('station')) return '/images/service-railway-station.jpg';
  if (p.includes('baglamukhi') || p.includes('chintpurni')) return '/images/chintpurni.jpg';
  if (p.includes('airport')) return '/images/service-airport.jpg';
  if (p.includes('dalhousie')) return '/images/shimla.jpg';
  if (p.includes('manali')) return '/images/manali.jpg';
  if (p.includes('shimla')) return '/images/shimla.jpg';
  if (p.includes('dharamshala')) return '/images/dharamshala.jpg';
  if (p.includes('nangal')) return '/images/service-nangal.jpg';
  if (p.includes('rental')) return '/images/service-local-taxi.jpg';
  if (p.includes('outstation')) return '/images/service-outstation.jpg';
  return '/images/himachal-taxi-service.jpg';
}

export default function PageShell({
  path,
  title,
  description,
  h1,
  intro,
  crumbs,
  extraLd = [],
  bgImage,
  children
}) {
  const all = [{ name: 'Home', to: '/' }, ...crumbs];
  const heroImage = bgImage || getAutoBgImage(path);

  return (
    <>
      <SEO
        path={path}
        title={title}
        description={description}
        jsonLd={[localBusinessLd(), breadcrumbLd(all), ...extraLd]}
      />

      {/* Hero Header with Real Mountain & Taxi Background Image */}
      <div className="relative min-h-[380px] md:min-h-[460px] flex flex-col justify-end overflow-hidden pb-12 pt-28 md:pt-36 border-b border-linen/10">
        {/* Background Image */}
        <img
          src={heroImage}
          alt={h1}
          className="absolute inset-0 h-full w-full object-cover object-center scale-105"
          loading="eager"
        />

        {/* Multi-layered Overlays for Contrast and Aesthetic Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/85 to-surface/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/75 to-transparent" />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />

        {/* Atmospheric Ambient Glow */}
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-pine/30 blur-3xl" />

        {/* Content */}
        <div className="container-x relative z-10">
          <div className="inline-block rounded-full bg-surface-mid/85 backdrop-blur-md px-3.5 py-1 border border-linen/15 mb-4 shadow-md">
            <Breadcrumbs items={all} />
          </div>
          <h1 className="max-w-4xl font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-linen drop-shadow-md">
            {h1}
          </h1>
          {intro && (
            <p className="mt-4 max-w-3xl text-base sm:text-lg text-ink leading-relaxed drop-shadow bg-surface-mid/50 backdrop-blur-sm p-4 rounded-2xl border border-linen/10">
              {intro}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
