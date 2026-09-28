import { MapPin, Route, Mountain, Users, Heart, Bus, Car, UserCheck, Sparkles, Compass, PhoneCall, Home, ShieldCheck, Circle, Plane, Train, Navigation } from 'lucide-react';

// Named map keeps the bundle small. Add an icon here before using its name in data files.
const ICONS = { MapPin, Route, Mountain, Users, Heart, Bus, Car, UserCheck, Sparkles, Compass, PhoneCall, Home, ShieldCheck, Plane, Train, Navigation };
export function Icon({ name, ...props }) {
  const C = ICONS[name] || Circle;
  return <C aria-hidden="true" {...props} />;
}
