import { Link } from 'react-router-dom';
import Media from './Media.jsx';
import BookButton from './BookButton.jsx';

export default function DestinationCard({ d }) {
  return (
    <article className="glass group overflow-hidden rounded-2xl">
      <div className="aspect-[4/3] overflow-hidden">
        <Media src={d.image} hue={d.hue} alt={`${d.name}, Himachal Pradesh`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <h3 className="text-3xl"><Link to={d.to} className="hover:text-amber">{d.name}</Link></h3>
        <p className="mt-2 text-ink-dim">{d.text}</p>
        <BookButton label="Book Taxi" preset={{ destination: d.name }} className="mt-5" icon={false} />
      </div>
    </article>
  );
}
