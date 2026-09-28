import PageShell from '../components/PageShell.jsx';
import { PackagesSection, DestinationsSection, FleetSection } from '../components/sections.jsx';
import { Link } from 'react-router-dom';

export default function TourPackages() {
  return (
    <PageShell path="/himachal-tour-packages" title="Himachal Tour Packages | Lucky Tour & Travel"
      description="Book customized Shimla, Manali, Dharamshala and Himachal Pradesh tour packages with Lucky Tour & Travel. Clean family Ertiga cabs, experienced hill drivers & transparent fares."
      h1="Himachal Tour Packages" intro="Customized hill tour itineraries for families, couples and adventure groups departing from Una, Amb, Nangal and Chandigarh. Choose your tour or tell us your dates."
      crumbs={[{ name: 'Tour Packages', to: '/himachal-tour-packages' }]}>
      <PackagesSection />
      <DestinationsSection />
      <FleetSection />
      <p className="container-x pb-16 text-ink-dim">Prefer a direct point-to-point ride? See our <Link className="text-amber underline" to="/taxi-service-himachal-pradesh">taxi service in Himachal Pradesh</Link> or <Link className="text-amber underline" to="/outstation-taxi-service">outstation taxi service</Link>.</p>
    </PageShell>
  );
}
