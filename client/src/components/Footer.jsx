import { Link } from 'react-router-dom';
import { NAV, SITE } from '../config/site.js';

const legal = [{ label: 'Privacy Policy', to: '/privacy-policy' }, { label: 'Terms & Conditions', to: '/terms' }];
export default function Footer() {
  return (
    <footer className="border-t border-linen/10 bg-surface-low pb-28 pt-14 md:pb-14">
      <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-3xl">Lucky Tour &amp; Travel</p>
          <p className="mt-1 text-amber">{SITE.tagline}</p>
          <address className="mt-4 not-italic text-ink-dim">Amb Andaura Railway Station Rd, Amb,<br />District Una, HP 177203</address>
          <p className="mt-3 flex flex-col gap-1">{SITE.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="hover:text-amber">{p.tel}</a>)}</p>
        </div>
        <nav aria-label="Footer"><h2 className="mb-3 font-sans text-sm font-semibold text-ink-dim">Explore</h2>
          <ul className="grid gap-2">{[...NAV.filter((n) => n.label !== 'Home'), ...legal].map((n) => <li key={n.label}><Link className="hover:text-amber" to={n.to}>{n.label}</Link></li>)}<li><Link className="hover:text-amber" to="/">Home</Link></li></ul>
        </nav>
        <div><h2 className="mb-3 font-sans text-sm font-semibold text-ink-dim">Local Taxi Hubs</h2>
          <ul className="grid gap-2">
            <li><Link className="hover:text-amber" to="/taxi-service-in-una">Taxi service in Una</Link></li>
            <li><Link className="hover:text-amber" to="/taxi-service-in-amb">Taxi service in Amb</Link></li>
            <li><Link className="hover:text-amber" to="/taxi-service-amb-andaura">Amb Andaura Station Taxi</Link></li>
            <li><Link className="hover:text-amber" to="/nangal-taxi-service">Nangal Taxi Service</Link></li>
            <li><Link className="hover:text-amber" to="/taxi-from-dhamandri">Taxi from Dhamandri</Link></li>
          </ul>
        </div>
        <div><h2 className="mb-3 font-sans text-sm font-semibold text-ink-dim">Outstation &amp; Tours</h2>
          <ul className="grid gap-2">
            <li><Link className="hover:text-amber" to="/airport-taxi-service">Airport Taxi Service</Link></li>
            <li><Link className="hover:text-amber" to="/outstation-taxi-service">Outstation Taxi Service</Link></li>
            <li><Link className="hover:text-amber" to="/taxi-service-shimla">Shimla Taxi Service</Link></li>
            <li><Link className="hover:text-manali hover:text-amber" to="/taxi-service-manali">Manali Taxi Service</Link></li>
            <li><Link className="hover:text-amber" to="/taxi-service-dharamshala">Taxi service in Dharamshala</Link></li>
          </ul>
        </div>
      </div>
      <p className="container-x mt-10 text-sm text-outline flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Lucky Tour &amp; Travel. All rights reserved.</span>
        <Link to="/admin" className="text-xs text-ink-dim/50 hover:text-amber transition-colors">
          🔒 Admin Portal
        </Link>
      </p>
    </footer>
  );
}
