import GlassCard from './GlassCard.jsx';
import Media from './Media.jsx';
import BookButton from './BookButton.jsx';

export default function FleetCard({ v }) {
  return (
    <GlassCard as="article" className="group flex h-full flex-col overflow-hidden p-0">
      <div className="aspect-[16/10] w-full overflow-hidden bg-surface-high">
        <Media
          src={v.image}
          hue={140}
          alt={`${v.name} taxi cab - Lucky Tour & Travel`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-amber/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber">
            {v.type || 'Cab'}
          </span>
          {v.capacity && (
            <span className="text-xs font-medium text-mint bg-pine/50 px-2.5 py-0.5 rounded-md">
              {v.capacity}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-2xl font-serif text-ink">{v.name}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-dim">{v.text}</p>

        {(v.capacity || v.bags || v.ac) && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {v.ac && <span className="glass rounded px-2 py-1 text-ink-dim">AC / Climate Control</span>}
            {v.bags && <span className="glass rounded px-2 py-1 text-ink-dim">{v.bags}</span>}
          </div>
        )}

        {v.note && (
          <p className="mt-3 rounded-md bg-surface-high/60 px-3 py-1.5 text-xs font-medium text-amber">
            ★ {v.note}
          </p>
        )}

        <div className="mt-5 border-t border-linen/10 pt-4">
          <BookButton label="Book This Cab" preset={{ vehicle: v.name }} variant="ghost" className="w-full justify-center !text-sm" icon={false} />
        </div>
      </div>
    </GlassCard>
  );
}
