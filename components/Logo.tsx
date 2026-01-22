import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Text */}
      <div className="relative">
        {/* Yellow background bars */}
        <div className="absolute -top-1 -left-2 -right-2 h-8 bg-brand-yellow rounded-sm transform -skew-x-12 opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-6 -left-1 -right-1 h-12 bg-brand-yellow rounded-sm transform -skew-x-12 opacity-90 group-hover:opacity-100 transition-opacity" />
        
        {/* Text */}
        <div className="relative z-10">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-white uppercase tracking-tight">SUL BRASILEIRO</span>
            <span className="text-xs font-bold text-white uppercase">DE</span>
          </div>
          <div className="mt-0.5">
            <span className="text-2xl md:text-3xl font-black text-white uppercase italic transform -skew-x-12 tracking-tight">
              MOTOVELOCIDADE
            </span>
          </div>
        </div>
      </div>

      {/* Motorcyclist Icon - Stylized SVG */}
      <div className="hidden md:block relative -ml-2">
        <svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform group-hover:scale-105 transition-transform"
        >
          {/* Motorcycle wheels */}
          <circle cx="18" cy="52" r="9" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="45" cy="52" r="9" fill="#000000" stroke="#FFFFFF" strokeWidth="1" />
          
          {/* Motorcycle frame */}
          <path
            d="M 15 35 L 20 30 L 25 28 L 35 28 L 42 32 L 48 38 L 50 45"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Motorcycle body */}
          <rect x="20" y="28" width="25" height="10" rx="2" fill="#FFFFFF" />
          <rect x="18" y="30" width="8" height="12" rx="2" fill="#FFFFFF" />
          
          {/* Rider body - leaning right */}
          <ellipse cx="28" cy="18" rx="7" ry="7" fill="#FFFFFF" />
          <path
            d="M 25 18 L 25 35 L 31 35 L 31 18"
            fill="#FFFFFF"
          />
          
          {/* Rider suit details */}
          <rect x="22" y="25" width="12" height="10" rx="2" fill="#000000" opacity="0.3" />
          <path
            d="M 25 22 L 25 30 L 31 30 L 31 22"
            stroke="#000000"
            strokeWidth="1"
            fill="none"
          />
          
          {/* Yellow chevron/arrow on motorcycle */}
          <path
            d="M 35 30 L 40 28 L 40 32 Z"
            fill="#FFD700"
          />
          <path
            d="M 38 30 L 43 28 L 43 32 Z"
            fill="#FFD700"
          />
          
          {/* Helmet */}
          <ellipse cx="28" cy="15" rx="6" ry="5" fill="#FFFFFF" stroke="#000000" strokeWidth="0.5" />
          <path
            d="M 24 15 Q 28 12 32 15"
            stroke="#000000"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>
    </Link>
  )
}
