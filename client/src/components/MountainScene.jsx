// Lightweight inline SVG landscape used until real photography is added (zero network cost).
export default function MountainScene({ hue = 150, label, className = '' }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className}>
      <defs>
        <linearGradient id={`sky${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={`hsl(${hue + 40} 35% 22%)`} /><stop offset="1" stopColor="#faba75" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#sky${hue})`} />
      <circle cx="300" cy="80" r="26" fill="#faba75" opacity=".85" />
      <path d="M0 170 L80 90 L140 150 L210 70 L290 160 L340 115 L400 170 V260 H0Z" fill={`hsl(${hue} 25% 28%)`} />
      <path d="M0 200 L70 140 L150 190 L230 130 L320 195 L400 150 V260 H0Z" fill={`hsl(${hue} 30% 18%)`} />
      <path d="M0 260 V230 C120 210 220 240 400 215 V260Z" fill="#0d1511" />
      <path d="M0 245 C120 228 240 250 400 232" stroke="#faba75" strokeOpacity=".6" strokeWidth="2" strokeDasharray="10 8" fill="none" />
    </svg>
  );
}
