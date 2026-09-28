import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { NAV, SITE } from '../config/site.js';
import BookButton from './BookButton.jsx';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(true);
  const dropdownTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setOpen(false);
  }, [location.pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled || open ? 'glass border-x-0 border-t-0 bg-surface/90 shadow-lg' : 'bg-gradient-to-b from-black/70 to-transparent'}`}>
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link to="/" className="flex items-center gap-3" aria-label="Lucky Tour & Travel home">
          <picture><source srcSet="/images/lucky-tour-travel-logo.webp" type="image/webp" />
            <img src={SITE.logo} alt="Lucky Tour & Travel logo" width="96" height="64" className="h-10 w-auto rounded-md bg-linen p-0.5 md:h-12" /></picture>
          <span className="hidden font-serif text-xl font-semibold tracking-wide sm:block md:text-2xl">Lucky Tour &amp; Travel</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 xl:flex">
          {NAV.map((n) => {
            if (n.children) {
              const isChildActive = n.children.some((c) => location.pathname === c.to) || location.pathname === n.to;
              return (
                <div
                  key={n.label}
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={n.to}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition hover:text-amber py-2 ${
                      isChildActive ? 'text-amber' : 'text-ink'
                    }`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{n.label}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-amber' : 'text-ink/60'}`} />
                  </Link>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full pt-1.5 z-50 w-72">
                      <div className="rounded-2xl border border-linen/15 bg-surface-mid/95 p-2 shadow-2xl backdrop-blur-xl">
                        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-amber/90">
                          Popular Taxi Services
                        </div>
                        <div className="grid gap-0.5 max-h-[70vh] overflow-y-auto">
                          {n.children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setDropdownOpen(false)}
                              className={`group/item flex flex-col rounded-lg px-3 py-2 text-left transition hover:bg-surface-high ${
                                location.pathname === child.to ? 'bg-surface-high text-amber font-semibold' : 'text-ink'
                              }`}
                            >
                              <span className="text-sm font-medium group-hover/item:text-amber">
                                {child.label}
                              </span>
                              {child.desc && (
                                <span className="text-[11px] text-ink/60 leading-tight">
                                  {child.desc}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={n.label}
                to={n.to}
                end
                className={({ isActive }) => `text-sm font-medium hover:text-amber ${isActive && !n.to.includes('#') ? 'text-amber' : 'text-ink'}`}
              >
                {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${SITE.phones[0].tel}`} aria-label={`Call ${SITE.phones[0].display}`} className="grid h-11 w-11 place-items-center rounded-full bg-surface-high text-amber xl:hidden"><Phone size={18} /></a>
          <BookButton label="Book a Taxi" className="hidden !min-h-[44px] sm:inline-flex" icon={false} />
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-surface-high xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="container-x max-h-[calc(100vh-4rem)] overflow-y-auto pb-6 xl:hidden">
          <ul className="grid gap-1">
            {NAV.map((n) => {
              if (n.children) {
                return (
                  <li key={n.label} className="border-b border-linen/10 pb-2">
                    <div className="flex items-center justify-between">
                      <Link to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-lg font-semibold hover:bg-surface-high text-amber">
                        {n.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSubmenuOpen((m) => !m)}
                        aria-label="Toggle submenu"
                        className="grid h-9 w-9 place-items-center rounded-lg bg-surface-high text-amber mr-2"
                      >
                        <ChevronDown size={16} className={`transition-transform duration-200 ${mobileSubmenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    {mobileSubmenuOpen && (
                      <ul className="mt-1 space-y-1 rounded-xl bg-surface-mid/80 p-2 border border-linen/10">
                        {n.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              onClick={() => setOpen(false)}
                              className={`block rounded-lg px-3 py-2 text-sm hover:bg-surface-high hover:text-amber ${
                                location.pathname === child.to ? 'text-amber font-semibold bg-surface-high' : 'text-ink/90'
                              }`}
                            >
                              <div className="font-medium">{child.label}</div>
                              {child.desc && <div className="text-xs text-ink/50">{child.desc}</div>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }
              return (
                <li key={n.label}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-lg hover:bg-surface-high">
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
