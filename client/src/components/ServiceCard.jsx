import { Link } from 'react-router-dom';
import GlassCard from './GlassCard.jsx';
import BookButton from './BookButton.jsx';
import { Icon } from '../utils/icons.jsx';

export default function ServiceCard({ service }) {
  return (
    <GlassCard as="article" className="group flex h-full flex-col overflow-hidden p-0">
      {service.image && (
        <div className="aspect-[16/10] w-full overflow-hidden bg-surface-high">
          {service.to ? (
            <Link to={service.to} tabIndex={-1} aria-hidden="true">
              <img
                src={service.image}
                alt={`${service.title} - Lucky Tour & Travel`}
                loading="lazy"
                width="640"
                height="400"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </Link>
          ) : (
            <img
              src={service.image}
              alt={`${service.title} - Lucky Tour & Travel`}
              loading="lazy"
              width="640"
              height="400"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-pine text-mint">
            <Icon name={service.icon} size={20} />
          </span>
          <h3 className="text-xl font-semibold text-ink sm:text-2xl">
            {service.to ? (
              <Link to={service.to} className="hover:text-amber">
                {service.title}
              </Link>
            ) : (
              service.title
            )}
          </h3>
        </div>
        <p className="mt-1 flex-1 text-sm text-ink-dim sm:text-base">{service.text}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-linen/10 pt-4">
          <BookButton label="Enquire Now" preset={{ tripType: service.tripType }} variant="ghost" className="self-start !text-sm" icon={false} />
          {service.to && (
            <Link to={service.to} className="text-sm font-semibold text-amber hover:underline">
              View Route &rarr;
            </Link>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
