import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-dim">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((it, i) => (
          <li key={it.to} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={14} aria-hidden="true" />}
            {i === items.length - 1 ? <span aria-current="page" className="text-ink">{it.name}</span> : <Link className="hover:text-amber" to={it.to}>{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
