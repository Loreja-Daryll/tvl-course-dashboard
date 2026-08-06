/* Small, reusable presentational pieces shared across multiple pages. */

export function initialsFrom(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Gold circular progress ring, built with pure SVG — no images. */
export function CircularProgress({ percent, size = 128, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const gradientId = `progress-gradient-${size}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD86B" />
            <stop offset="100%" stopColor="#E5B842" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2A2419"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-2xl font-semibold text-cream">{percent}%</span>
      </div>
    </div>
  );
}

/** Purely decorative golden wave accent — layered SVG paths, no image assets. */
export function GoldenWave({ className = '' }) {
  return (
    <svg
      viewBox="0 0 500 300"
      fill="none"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5B842" stopOpacity="0" />
          <stop offset="55%" stopColor="#FFD86B" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E5B842" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wave-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E5B842" stopOpacity="0" />
          <stop offset="50%" stopColor="#E5B842" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#E5B842" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 10 }).map((_, i) => (
        <path
          key={i}
          d={`M -20 ${260 - i * 16} C 120 ${180 - i * 14}, 260 ${300 - i * 10}, 520 ${60 - i * 8}`}
          stroke={i === 4 ? 'url(#wave-a)' : 'url(#wave-b)'}
          strokeWidth={i === 4 ? 2.5 : 1}
          opacity={1 - i * 0.07}
        />
      ))}
    </svg>
  );
}

/** Small gold on/off toggle switch used on the Settings page. */
export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
      <span className="text-sm text-cream/80">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 flex-none rounded-full transition-colors ${
          checked ? 'bg-gold-500' : 'bg-charcoal-border'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-charcoal transition-transform ${
            checked ? 'translate-x-[22px] bg-charcoal' : 'translate-x-0.5 bg-cream/60'
          }`}
        />
      </button>
    </label>
  );
}

/** Page header used at the top of every non-Home page for consistency. */
export function PageHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-serif text-3xl text-cream">{title}</h1>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-cream/50">{subtitle}</p>}
    </div>
  );
}
