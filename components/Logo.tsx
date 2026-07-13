type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

export function Logo({ className = "", showWordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="9"
          stroke="url(#vd-border)"
          strokeWidth="1.5"
          fill="url(#vd-fill)"
        />
        <path
          d="M16 7.5c-2.8 3.4-4.6 6.2-5.4 8.4-.7 2-.5 3.6.6 4.8 1.2 1.3 3 1.8 4.8 1.3 1.8.5 3.6 0 4.8-1.3 1.1-1.2 1.3-2.8.6-4.8C20.6 13.7 18.8 10.9 16 7.5Z"
          stroke="url(#vd-vortex)"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16.2" r="2.1" fill="#2DE2E6" />
        <defs>
          <linearGradient id="vd-border" x1="2" y1="2" x2="30" y2="30">
            <stop stopColor="#2DE2E6" />
            <stop offset="1" stopColor="#7C6CFF" />
          </linearGradient>
          <linearGradient id="vd-fill" x1="6" y1="4" x2="28" y2="30">
            <stop stopColor="#151D30" />
            <stop offset="1" stopColor="#0A0E18" />
          </linearGradient>
          <linearGradient id="vd-vortex" x1="10" y1="8" x2="22" y2="24">
            <stop stopColor="#2DE2E6" />
            <stop offset="1" stopColor="#7C6CFF" />
          </linearGradient>
        </defs>
      </svg>
      {showWordmark ? (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-ink">
          Vortex Dispatch
        </span>
      ) : null}
    </span>
  );
}
