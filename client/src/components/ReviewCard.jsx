import { Star } from 'lucide-react';
import GlassCard from './GlassCard.jsx';

export const Stars = ({ n = 5 }) => (
  <span className="flex gap-0.5 text-amber" role="img" aria-label={`${n} out of 5 stars`}>
    {Array.from({ length: n }).map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
  </span>
);
export default function ReviewCard({ r }) {
  return (
    <GlassCard as="figure" className="flex h-full flex-col p-6">
      <Stars />
      <blockquote className="mt-4 flex-1 font-serif text-xl leading-relaxed text-ink">“{r.text}”</blockquote>
      <figcaption className="mt-4 text-sm font-semibold text-ink-dim">{r.name} · Google review</figcaption>
    </GlassCard>
  );
}
